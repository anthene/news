import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ShortNews } from './news';

const path = 'short-news-list.json';

@Injectable()
export class NewsService {
	constructor(private http: Http) { }

	getShortNews(): Promise<ShortNews[]> {
		return this.http.get(path)
		.toPromise()
		.then(res => res.json() as ShortNews[]).catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
