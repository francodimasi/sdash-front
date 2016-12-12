import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { BubbleChartConfig } from '../chart/chart.config';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  providers: [DataService]
})
export class DataComponent implements OnInit {

  // private ChartConfig: Array<ChartConfig>;
  private BubbleChartConfig: Array<BubbleChartConfig>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets() {
    this.dataService.getTweets()
      .subscribe((tweets: any) => {

        // let followersArea: ChartConfig = {
        //   settings: {
        //     fill: 'rgba(1, 67, 163, 1)',
        //     interpolation: 'monotone'
        //   }, dataset: tweets.docs.map(data => {
        //     return { x: new Date(data.created_at), y: data.followers_count };
        //   })
        // };

        let bubbleChartArea: BubbleChartConfig = {
          dataset: tweets.docs.map(data => {
            return { screen_name: data.screen_name, followers_count: data.followers_count, sentiment: data.sentiment.type };
          })
        };

        this.BubbleChartConfig = new Array<BubbleChartConfig>();
        this.BubbleChartConfig.push(bubbleChartArea);

        // this.ChartConfig = new Array<ChartConfig>();
        // this.ChartConfig.push(bubbleChartArea);
      });
  }

}
