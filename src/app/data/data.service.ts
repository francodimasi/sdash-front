import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private url: string = 'http://localhost:4200/tweets';

  constructor(private http: Http) { }

  getTweets(): Observable<any> {
    return this.http.get(this.url);
  }
}
