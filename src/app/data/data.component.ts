import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { BubbleChartConfig } from '../bubble/bubble.config';
import { BarChartConfig } from '../bar/bar.config';
import { TrendChartConfig } from '../trend/trend.config';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  providers: [DataService]
})
export class DataComponent implements OnInit {

  private BubbleChartConfig: Array<BubbleChartConfig>;
  private BarChartConfig;
  private TrendChartConfig: TrendChartConfig;

  constructor(private dataService: DataService) {
    setInterval(() => { this.getTweets(); }, 1000 * 90);
  }

  ngOnInit() {
    this.getTweets();
    this.getHistory();
  }

  getTweets() {
    this.dataService.getTweets()
      .subscribe((tweets: any) => {


        // Bubble Chart service
        //
        //

        let bubbleChartArea: BubbleChartConfig = {
          dataset: tweets.docs.map(data => {
            return { screen_name: data.screen_name, followers_count: data.followers_count, sentiment: data.sentiment.type };
          })
        };

        this.BubbleChartConfig = new Array<BubbleChartConfig>();
        this.BubbleChartConfig.push(bubbleChartArea);



        // Bar Chart Service
        //
        //

        let barChartArea: BarChartConfig = {
          intents: tweets.docs.reduce(function(intents, data) {
            if (data.intents[0].intent in intents) {
              intents[data.intents[0].intent]++;
            }
            else {
              intents[data.intents[0].intent] = 1;
            }
            return intents;
          }, {})
        };

        this.BarChartConfig = barChartArea.intents;



      });
  }

  getHistory() {

    this.dataService.getHistory()
      .subscribe((history: any) => {

        // Trend Chart Service
        //
        //


        let trendChartArea: TrendChartConfig = {
          dataset: history.docs.map(data => {
            return { screen_name: data.screen_name, followers_count: data.followers_count, created_at: new Date(data.created_at) };
          })
        };

        this.TrendChartConfig = trendChartArea;

      });
  }

}
