import { Component, OnInit } from '@angular/core';

import { NewsListItem } from './news';
import { NewsService } from './news-service';
import { ListResult } from './get-min-size-array';

@Component({
	//moduleId: module.id,
	//selector: 'news-list',
	templateUrl: 'app/html/news-list.html'
})
export class NewsListComponent implements OnInit {
	newsList: NewsListItem[] = [];
	lastDate = new Date();

	constructor(
		private newsService: NewsService
		) {
	}

	ngOnInit(): void {
		this.getData(new Date(), 7);
	}

	getMoreNews(): void {
		this.getData(new Date(this.lastDate.valueOf()));
	}

	private getData(maxDate: Date, newsCount = 6): void {
		this.newsService.getNewsList(maxDate, newsCount)
		.then((newsListResult: ListResult<NewsListItem>) => {
				this.newsList = this.newsList.concat(newsListResult.list);
				this.lastDate = newsListResult.minDate;
			});
	}
}
