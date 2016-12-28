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

        // let barChartArea: BarChartConfig = {
        //   columns: tweets.docs.map(data => {
        //     return { intents: data.intents[0].intent };
        //   })
        // };

        let barChartArea: BarChartConfig = {
          columns: tweets.docs.reduce(function(intents, data) {
            if (data.intents[0].intent in intents) {
              intents[data.intents[0].intent]++;
            }
            else {
              intents[data.intents[0].intent] = 1;
            }
            return intents;
          }, {})
        };

        // console.log(barChartArea);

        // var countedNames = names.reduce(function(allNames, name) {
        //   if (name in allNames) {
        //     allNames[name]++;
        //   }
        //   else {
        //     allNames[name] = 1;
        //   }
        //   return allNames;
        // }, {});


        this.BarChartConfig = barChartArea;

        // console.log(this.BarChartConfig);

        // console.log(this.BarChartConfig);

        // console.log(barChartArea);

        // this.ChartConfig = new Array<ChartConfig>();
        // this.ChartConfig.push(bubbleChartArea);
      });
  }

}
