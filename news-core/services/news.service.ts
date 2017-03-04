import { NewsListItem, News, toNumberedUtcDate, millisecondsInDay, minDateEver } from "news-core"

import { ShortNews, ListResult } from '../';
import { NewsConverter } from '../news-converter';
import { getMinSizeArray } from '../get-min-size-array';

const shortNewsCount = 15;

const dataPath = 'data';

export class NewsService {
	constructor(
		private http: { get: (url: string) => Promise<{ json: () => any }> },
		private newsConverter: NewsConverter
	) { }

	getShortNews(maxDate = new Date(), minDate = minDateEver): Promise<ListResult<ShortNews>> {
		return getMinSizeArray(
			shortNewsCount,
			day => this.getData(`${dataPath}/short-news-list-${getDate(day, maxDate)}.json`, this.newsConverter.shortNewsListFromJson),
			maxDate,
			minDate);
	}

	getNewsList(maxDate: Date, newsCount: number, minDate = minDateEver): Promise<ListResult<NewsListItem>> {
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
			.then(response => converter(response.json()))
			.catch(handleError);
	}
}

function getDate(day: number, maxDate: Date) {
	const date = new Date(maxDate.valueOf() - day * millisecondsInDay);
	return toNumberedUtcDate(date);
}

function handleError(error: any): Promise<any> {
	console.error('An error occurred', error); // for demo purposes only
	return Promise.reject(error.message || error);
}
