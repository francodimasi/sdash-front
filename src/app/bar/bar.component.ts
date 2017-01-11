import { Component, OnChanges, AfterViewInit, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
// import { BarChartConfig } from './bar.config';
import * as D3 from 'd3';
import * as Moment from 'moment';


@Component({
  selector: 'bar-chart',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarComponent implements OnChanges, AfterViewInit {

  @Input() config;
  @ViewChild('workarea') element: ElementRef;

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private htmlElement: HTMLElement;
  private dataset: any;
  private stack;
  private now;
  private start;
  private serie;
  private legend;
  private rect;
  private total;
  private keys;
  private xAxis;

  constructor() {
    this.dataset = new Array<any>();
  }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.setup();
  }

  ngOnChanges(): void {

    this.now = Moment.utc();
    this.start = Moment().subtract(1, 'hours').utc();

    if (!this.config || this.config.length === 0 || !this.host) {
      return;
    }
    else {
      this.dataset.columns = Object.keys(this.config);
      this.config.date = this.now;
      this.dataset.push(this.config);

      // console.log(this.dataset);

      this.setup();
      this.buildSVG();
      this.populate();
    }

  }

  private setup(): void {
    this.margin = { top: 5, right: 5, bottom: 5, left: 5 };
    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.4 - this.margin.top - this.margin.bottom;

    this.stack = D3.stack().offset(D3.stackOffsetExpand);

  }

  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g');

  }

  private populate(): void {

    var width = this.width - this.margin.right - this.margin.left;
    var height = this.height;

    var xScale = D3.scaleTime().range([0, this.width])
      .domain([this.start, this.now]);

    var zScale = D3.scaleOrdinal(['#cccccc','#969696','#636363','#252525'])
      .domain(this.dataset.columns);

    var yScale = D3.scaleLinear().rangeRound([(this.height - this.margin.bottom - this.margin.top - 30), 0]);

    this.serie = this.svg.selectAll(".serie")
      .data(this.stack.keys(this.dataset.columns)(this.dataset))
      .enter().append("g")
      .attr("class", "serie")
      .attr("fill", function(d) { return zScale(d.key); })
      .attr("fill-opacity", 0.5)
      // .attr("stroke",  function(d) { return zScale(d.key); })
      // .attr("stroke-opacity", 1)
      // .attr("stroke-width", 1)
        ;

    this.serie.selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("x", function(d) { return xScale(d.data.date); })
      .attr("y", function(d) { return yScale(d[1]); })
      .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
      .attr("width", 10);


    this.svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(" + 0 + "," + (this.height - this.margin.bottom - this.margin.top - 30) + ")")
      .call(D3.axisBottom(xScale));

    this.svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(35,5)")
      .call(D3.axisLeft(yScale).ticks(10, "%"));


    this.legend = this.svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g")
      .data(this.dataset.columns.reverse())
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * 100 + "," + (height - 10) + ")"; });

    this.legend.append("rect")
      .attr("x", 0)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", zScale);

    this.legend.append("text")
      .attr("class", "legend")
      .attr("x", 25)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

  }
}
