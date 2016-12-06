import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ShortNews, NewsListItem, News } from './news';
import { NewsConverter } from './news-converter';
import { ListResult, getMinSizeArray } from './get-min-size-array';
import { toNumberedUtcDate } from './extensions';

const minPossibleDate = new Date(2016, 11, 1);
const newsCount = 5;
const shortNewsCount = 15;

const millisecondsInDay = 24 * 60 * 60 * 1000;
const dataPath = 'data';

@Injectable()
export class NewsService {
	constructor(
		private http: Http,
		private newsConverter: NewsConverter
	) { }

	getShortNews(maxDate = new Date(), minDate = minPossibleDate): Promise<ListResult<ShortNews>> {
		return getMinSizeArray(
			shortNewsCount,
			day => this.getData(`${dataPath}/short-news-list-${getDate(day, maxDate)}.json`, this.newsConverter.shortNewsListFromJson),
			maxDate,
			minDate);
	}

	getNewsList(maxDate = new Date(), minDate = minPossibleDate): Promise<ListResult<NewsListItem>> {
		return getMinSizeArray(
			newsCount,
			day => this.getData(`${dataPath}/news-list-${getDate(day, maxDate)}.json`, this.newsConverter.newsListFromJson),
			maxDate,
			minDate);
	}

	getNews(id: number) {
		return this.getData(`${dataPath}/${id}.json`, this.newsConverter.newsFromJson);
	}

	private getData<T>(url: string, converter: (json: any) => T): Promise<T> {
		return this.http.get(url + `?date=${new Date().valueOf()}`)
			.toPromise()
			.then(response => converter(response.json()))
			.catch(handleError);
	}
}

function getDate(day: number, maxDate: Date) {
	const date = new Date(maxDate.valueOf() - day * millisecondsInDay) as any;
	return toNumberedUtcDate(date);
}

function handleError(error: any): Promise<any> {
	console.error('An error occurred', error); // for demo purposes only
	return Promise.reject(error.message || error);
}
