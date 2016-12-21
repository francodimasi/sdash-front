import { Component, OnChanges, AfterViewInit, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BubbleChartConfig } from './bar.config';
import * as D3 from 'd3';
import * as Moment from 'moment';


@Component({
  selector: 'bar-chart',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarComponent implements OnChanges, AfterViewInit {

  @Input() config: Array<BarChartConfig>;
  @ViewChild('workarea') element: ElementRef;

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private xScale;
  private yScale;
  private zScale;
  private htmlElement: HTMLElement;
  private stack;
  private now;
  private start;
  private serie;
  private rect;
  private total;
  private keys;

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
    this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;

    // this.color = D3.scaleOrdinal(D3.schemeCategory20c);
    // this.pack = D3.pack().size([this.width, this.width]).padding(1.5);



    // this.xScale = D3.scaleBand()
    //   .rangeRound([0, this.width])
    //   .padding(0.1)
    //   .align(0.1);

    // this.now = Moment.utc();
    // this.start = Moment().subtract(1, 'hours').utc();


    this.xScale = D3.scaleTime()
      .range([0, this.width ]);


    this.yScale = D3.scaleLinear()
      .rangeRound([this.height, 0]);

    this.zScale = D3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888"]);

    this.stack = D3.stack()
      .offset(D3.stackOffsetExpand);



  }

  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g');

  }

  private populate(): void {

    this.keys = ['Canales', 'ContactCenter', 'Varios'];


    this.now = Moment.utc();
    this.start = Moment().subtract(1, 'hours').utc();

    this.xScale.domain([this.start, this.now]);
    this.zScale.domain(this.keys);

    this.serie = this.svg.selectAll(".serie")
    .data(this.stack.keys(this.keys)(this.config[0].dataset))
    .enter().append("g")
      .attr("class", "serie");
      // .attr("fill", function(d) { return this.zScale(d.intents); });

    this.serie.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) {
        console.log(d);
        return this.xScale(d.data.State); })
      .attr("y", function(d) { return this.yScale(d[1]); })
      .attr("height", function(d) { return this.yScale(d[0]) - this.yScale(d[1]); })
      .attr("width", this.xScale.bandwidth());



  }
}
