import { Component, OnChanges, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ChartConfig } from './chart.config';
import * as D3 from 'd3';
import * as Moment from 'moment';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges, AfterViewInit {

  @Input() config: Array<ChartConfig>;
  @ViewChild('workarea') element: ElementRef;

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private xScale;
  private yScale;
  private zScale;
  private xAxis;
  private yAxis;
  private zAxis;
  private stack;
  private htmlElement: HTMLElement;

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
    // this.drawXAxis();
    // this.drawYAxis();
  }

  private setup(): void {
    this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
    console.log(this.htmlElement.clientWidth);
    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
    this.xScale = D3.scaleLinear().range([0, this.width]);
    // this.yScale = D3.scale.linear().range([this.height, 0]);
    // this.yScale = D3.scaleLinear().rangeRound([this.height, 0]);
    // this.zScale = D3.scaleOrdinal().range(['#98abc5', '#8a89a6']);
    // this.stack = D3.stack().offset(D3.stackOffsetExpand);
  }

  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  // private drawXAxis(): void {
  //   this.xAxis = D3.svg.axis().scale(this.xScale)
  //     .tickFormat(t => Moment(t).format('HH:mm').toUpperCase())
  //     .tickPadding(15);
  //   this.svg.append('g')
  //     .attr('class', 'x axis')
  //     .attr('transform', 'translate(0,' + this.height + ')')
  //     .call(this.xAxis);
  // }
  //
  // private drawYAxis(): void {
  //   this.yAxis = D3.svg.axis().scale(this.yScale)
  //     .orient('left')
  //     .tickPadding(10);
  //   this.svg.append('g')
  //     .attr('class', 'y axis')
  //     .call(this.yAxis)
  //     .append('text')
  //     .attr('transform', 'rotate(-90)');
  // }

  private getMaxY(): number {
    let maxValuesOfAreas = [];
    this.config.forEach(data => maxValuesOfAreas.push(Math.max.apply(Math, data.dataset.map(d => d.y))));
    return Math.max(...maxValuesOfAreas);
  }

  private populate(): void {
    this.config.forEach((area: any) => {
      this.xScale.domain([0, this.getMaxY()]);
      // this.yScale.domain([0, this.getMaxY()]);
      // this.svg.append('path')
      //   .datum(area.dataset)
      //   .attr('class', 'area')
      //   .style('fill', area.settings.fill)
      //   .attr('d', D3.svg.area()
      //     .x((d: any) => this.xScale(d.x))
      //     .y0(this.height)
      //     .y1((d: any) => this.yScale(d.y))
      //     .interpolate(area.settings.interpolation));

      this.svg.selectAll('circle')
        .data(area.dataset)
        .enter()
        .append('circle')
          .attr('r', 3)
          .attr('cx', ((d: any) => this.xScale(d.y)))

    });
  }
}
