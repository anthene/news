import { Component, OnInit } from '@angular/core';

import { ShortNews } from './news';
import { NewsService } from './news-service';
import { ListResult } from './get-min-size-array';
import { toTime } from './extensions';

const millisecondsInDay = 24 * 60 * 60 * 1000;

@Component({
	//moduleId: module.id,
	selector: 'app',
	templateUrl: 'app/html/app.html',
})
export class AppComponent implements OnInit {
	shortNewsList: ShortNews[] = [];
	lastDate = new Date();
	currentMenuItem = MenuItem.News;

	constructor(
		private newsService: NewsService
		) {
	}

	ngOnInit(): void {
		this.getData(new Date());
	}

	getMoreNews(): void {
		this.getData(new Date(this.lastDate.valueOf()));
	}

	toTime(date: Date) {
		return toTime(date);
	}

	private getData(maxDate: Date): void {
		this.newsService.getShortNews(maxDate)
		.then((shortNewsListResult: ListResult<ShortNews>) => {
				this.shortNewsList = this.shortNewsList.concat(shortNewsListResult.list);
				this.lastDate = shortNewsListResult.minDate;
			});
	}
}

enum MenuItem {
	ShortNews,
	News
}
