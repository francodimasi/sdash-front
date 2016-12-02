import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  providers: [DataService]
})
export class DataComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getTweets() {
    this.dataService.getTweets()
                    .subscribe(tweets => console.log(tweets.json()));
  }

}
