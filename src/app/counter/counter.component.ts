import { Component, OnChanges, AfterViewInit, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
// import { CounterConfig } from './count.config';
import * as D3 from 'd3';
import * as Moment from 'moment';


@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnChanges, AfterViewInit {

  @Input() config
  @ViewChild('workarea') element: ElementRef;

  //

  private title1;
  private margin;
  private width;
  private height;
  private htmlElement: HTMLElement;
  private tweetsTotal;
  private title2;
  private timeRefresh;
  private title3;
  private followers_count;
  private title4;
  private changetweets;
  private changefollowers;
  private timeTitle1;
  private timeTitle2;

  constructor() {
    // this.dataset = new Array<any>();
  }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.setup();
  }

  ngOnChanges(): void {

    if (!this.config || this.config.length === 0) {
      return;
    }
    else {

      this.setup();
      this.populate();

    }

  }

  private setup(): void {
    this.margin = { top: 5, right: 5, bottom: 5, left: 5 };
    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.4 - this.margin.top - this.margin.bottom;

  }
  private populate() : void {

    if (this.tweetsTotal < this.config.all_tweets || !this.tweetsTotal){
      this.changetweets = '../assets/img/up.png'
    } else if(this.tweetsTotal > this.config.all_tweets){
      this.changetweets = '../assets/img/down.png'
    } else {
      this.changetweets = '../assets/img/equal.png'
    }

    if (this.followers_count < this.config.followers_count || !this.followers_count){
      this.changefollowers = '../assets/img/up.png'
    } else if(this.followers_count > this.config.followers_count){
      this.changefollowers = '../assets/img/down.png'
    }else {
      this.changefollowers = '../assets/img/equal.png'
    }

    this.title1 = 'Tweets Totales';
    this.tweetsTotal= this.config.all_tweets;
    this.title2 = 'Alcance Total';
    this.followers_count = this.config.followers_count;
    this.title3 = 'Periodo de actualización';
    this.timeTitle1= '12 horas'
    this.timeTitle2= '72 horas'


  }




}
