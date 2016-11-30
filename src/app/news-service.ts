import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ShortNews, NewsListItem, News } from './news';
import { NewsConverter } from './news-converter';

const shortNewsPath = 'short-news-list.json';
const newsListItemPath = 'news-list.json';

@Injectable()
export class NewsService {
	constructor(
		private http: Http,
		private newsConverter: NewsConverter
	) { }

	getShortNews(): Promise<ShortNews[]> {
		return this.http.get(shortNewsPath)
		.toPromise()
		.then(res => this.newsConverter.shortNewsListFromJson(res.json()))
		.catch(this.handleError);
	}

	getNewsList(): Promise<NewsListItem[]> {
		return this.http.get(newsListItemPath)
		.toPromise()
		.then(res => this.newsConverter.newsListFromJson(res.json()))
		.catch(this.handleError);
	}

	getNews(id: number): Promise<News> {
		return this.http.get(`${id}.json`)
		.toPromise()
		.then(res => this.newsConverter.newsFromJson(res.json()))
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
