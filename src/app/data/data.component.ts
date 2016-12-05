import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ChartConfig } from '../chart/chart.config';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  providers: [DataService]
})
export class DataComponent implements OnInit {

  private ChartConfig: Array<ChartConfig>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets() {
    this.dataService.getTweets()
      .subscribe((tweets: any) => {

        let followersArea: ChartConfig = {
          settings: {
            fill: 'rgba(1, 67, 163, 1)',
            interpolation: 'monotone'
          }, dataset: tweets.docs.map(data => {
            return { x: new Date(data.created_at), y: data.followers_count };
          })
        };

        this.ChartConfig = new Array<ChartConfig>();
        this.ChartConfig.push(followersArea);
      });
  }

}
