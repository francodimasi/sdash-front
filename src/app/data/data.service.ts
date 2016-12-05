import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private url: string = 'https://santanderrio.mybluemix.net';

  constructor(private http: Http) { }

  getTweets(): Observable<Response> {
    // let headers = new Headers({ 'Access-Control-Allow-Origin': 'http://localhost:4200' });
    // let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + '/tweets').map((res: Response) => res.json());
  }
}
