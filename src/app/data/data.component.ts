import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { BubbleChartConfig } from '../bubble/bubble.config';
import { BarChartConfig } from '../bar/bar.config';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  providers: [DataService]
})
export class DataComponent implements OnInit {

  // private ChartConfig: Array<ChartConfig>;
  private BubbleChartConfig: Array<BubbleChartConfig>;
  private BarChartConfig: BarChartConfig;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getTweets();
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
        
        let barChartAreaTemp = tweets.docs.reduce(function(intents, data) {
          if (data.intents[0].intent in intents) {
            intents[data.intents[0].intent]++;
          }
          else {
            intents[data.intents[0].intent] = 1;
          }
          return intents;
        }, {});

        let barChartArea: BarChartConfig = { columns:[] };

        Object.keys(barChartAreaTemp).forEach(function(intent) {
          barChartArea.columns.push({name: intent, count: barChartAreaTemp[intent]});
        });

        this.BarChartConfig = barChartArea;

      });
  }

}
