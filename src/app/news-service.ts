import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ShortNews, NewsListItem, News } from './news';

const shortNewsPath = 'short-news-list.json';
const newsListItemPath = 'news-list.json';

@Injectable()
export class NewsService {
	constructor(private http: Http) { }

	getShortNews(): Promise<ShortNews[]> {
		return this.http.get(shortNewsPath)
		.toPromise()
		.then(res => res.json() as ShortNews[])
		.catch(this.handleError);
	}

	getNewsList(): Promise<NewsListItem[]> {
		return this.http.get(newsListItemPath)
		.toPromise()
		.then(res => res.json() as NewsListItem[])
		.catch(this.handleError);
	}

	getNews(id: number): Promise<News> {
		return this.http.get(`${id}.json`)
		.toPromise()
		.then(res => res.json() as News)
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
