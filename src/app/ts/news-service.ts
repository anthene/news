import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ShortNews, NewsListItem, News } from './news';
import { NewsConverter } from './news-converter';
import getMinSizeArray from './get-min-size-array';

const minDate = new Date(2016, 12, 1);
const newsCount = 5;
const shortNewsCount = 30;

const millisecondsInDay = 24 * 60 * 60 * 1000;
const dataPath = 'data';

@Injectable()
export class NewsService {
	constructor(
		private http: Http,
		private newsConverter: NewsConverter
	) { }

	getShortNews() {
		return getMinSizeArray(shortNewsCount,
		day => this.getData(`${dataPath}/short-news-list-${getDate(day)}.json`,
		this.newsConverter.shortNewsListFromJson));
	}

	getNewsList() {
		return getMinSizeArray(newsCount,
		day => this.getData(`${dataPath}/news-list-${getDate(day)}.json`,
		this.newsConverter.newsListFromJson));
	}

	getNews(id: number) {
		return this.getData(`${dataPath}/${id}.json`, this.newsConverter.newsFromJson);
	}

	private getData<T>(url: string, converter: (json: any) => T): Promise<T> {
		return this.http.get(url)
			.toPromise()
			.then(response => converter(response.json()))
			.catch(handleError);
	}
}

function getDate(day: number) {
	const date = new Date(new Date().valueOf() - day * millisecondsInDay) as any;
	return `${date.getUTCFullYear()}${(1+date.getUTCMonth()).to00()}${date.getUTCDate().to00()}`;
}

function handleError(error: any): Promise<any> {
	console.error('An error occurred', error); // for demo purposes only
	return Promise.reject(error.message || error);
}
