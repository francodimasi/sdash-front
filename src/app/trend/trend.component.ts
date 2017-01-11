import { Component, OnChanges, AfterViewInit, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TrendChartConfig } from './trend.config';
import * as D3 from 'd3';
import * as Moment from 'moment';


@Component({
  selector: 'trend-chart',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrendComponent implements OnChanges, AfterViewInit {

  @Input() config: Array<TrendChartConfig>;
  @ViewChild('workarea') element: ElementRef;

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private xScale;
  private yScale;
  private htmlElement: HTMLElement;
  private pack;
  private root;
  private node;

  constructor() { }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.setup();
  }

  ngOnChanges(): void {
    if (!this.config || this.config.length === 0 || !this.host) return;
    this.setup();
    this.buildSVG();
    this.populate();
  }

  private setup(): void {
    this.margin = { top: 5, right: 5, bottom: 5, left: 5 };
    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.7 - this.margin.top - this.margin.bottom;

  }

  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g');

  }

  private populate(): void {

    // console.log(this.config.dataset);

    var entries = D3.nest()
      .key(function(d) { d.created_at.setMinutes(0); d.created_at.setSeconds(0); return d.created_at; })
      .rollup(function(d) { return d.length })
      .entries(this.config.dataset);

    console.log(entries);

    var x = D3.scaleTime()
      .range([40, this.width])
      .domain(D3.extent(this.config.dataset, function(d) { return d.created_at; }));

    var y = D3.scaleLinear()
      .range([(this.height - 20), 0])
      .domain([0, D3.max(entries, function(d) { return d.value; })]);

    var valueline = D3.line()
      .x(function(d) { return x(new Date(d.key)); })
      .y(function(d) { return y(d.value); });

    this.svg.append("path")
      .data([entries])
      .attr("class", "line")
      .attr("d", valueline);

    this.svg.selectAll("dot")
      .data(entries)
    .enter().append("circle")
      .attr("r", 3)
      .attr("class", function(d) { return d.key; })
      .attr("cx", function(d) { return x(new Date(d.key)); })
      .attr("cy", function(d) { return y(d.value); });

    this.svg.append("g")
      .attr("transform", "translate(0," + (this.height - 20) + ")")
      .call(D3.axisBottom(x));

    // Add the Y Axis
    this.svg.append("g")
      .attr("transform", "translate(40,0)")
      .call(D3.axisLeft(y));

    // var x = d3.scaleTime().range([0, this.width]);
    // var y = d3.scaleLinear().range([this.height, 0]);
    //
    // var valueline = d3.line()
    //   .x(function(d) { return x(d.date); })
    //   .y(function(d) { return y(d.close); });
    //
    // console.log(entries);

  }
}
