import { Component, OnChanges, AfterViewInit, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
// import { CounterConfig } from './count.config';
import * as D3 from 'd3';
import * as Moment from 'moment';


@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnChanges {

  @Input() config;

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
  private changetweets = '../assets/img/equal.png';
  private changefollowers = '../assets/img/equal.png';
  private timeTitle1;
  private timeTitle2;
  private history;

  constructor() {
    // this.dataset = new Array<any>();
  }

  ngOnChanges(): void {

    if (!this.config || this.config.length === 0) {
      return;
    }
    else {
      this.populate();

    }

  }

  private populate(): void {

    if (this.tweetsTotal < this.config.all_tweets || !this.tweetsTotal) {
      this.changetweets = '../assets/img/up.png'
    } else if (this.tweetsTotal > this.config.all_tweets) {
      this.changetweets = '../assets/img/down.png'
    } else {
      this.changetweets = '../assets/img/equal.png'
    }

    if (this.followers_count < this.config.followers_count || !this.followers_count) {
      this.changefollowers = '../assets/img/up.png'
    } else if (this.followers_count > this.config.followers_count) {
      this.changefollowers = '../assets/img/down.png'
    } else {
      this.changefollowers = '../assets/img/equal.png'
    }

    this.title1 = 'Tweets Totales';
    this.tweetsTotal = this.config.all_tweets;
    this.title2 = 'Alcance Total';
    this.followers_count = this.config.followers_count;
    this.title3 = 'Periodo de actualización';
    this.timeTitle1 = '12 horas'
    this.timeTitle2 = '72 horas'
    this.history = this.config.all_tweets;

  }




}
