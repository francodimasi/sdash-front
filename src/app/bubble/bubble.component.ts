import { Component, OnChanges, AfterViewInit, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BubbleChartConfig } from './bubble.config';
import * as D3 from 'd3';
import * as Moment from 'moment';


@Component({
  selector: 'bubble-chart',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BubbleComponent implements OnChanges, AfterViewInit {

  @Input() config: Array<BubbleChartConfig>;
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
    this.height = this.width * 1.1- this.margin.top - this.margin.bottom;

    this.pack = D3.pack().size([this.width, this.height]).padding(1.5);

  }

  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

  }

  private populate(): void {

    this.root = D3.hierarchy({children: this.config[0].dataset })
      .sum(function(d) {  return d.followers_count })
      .each(function(d) {
        d.id = d.data.screen_name;
        d.sentiment = d.data.sentiment;
      });

    this.node = this.svg.selectAll(".node")
      .data(this.pack(this.root).leaves())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    this.node.append("circle")
      .attr("id", function(d) { return d.id; })
      .attr("class", function(d) { return d.sentiment; })
      .attr("r", function(d) { return d.r; });

    this.node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
      .append("use")
      .attr("xlink:href", function(d) { return "#" + d.id; });

    this.node.append("text")
      .attr("class", "bubble-text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
      .attr("dy", "0.3em")
      .text(function(d) { return d.id; });
  }
}
