import { Component, OnInit } from '@angular/core';

import { NewsListItem, ListResult } from "news-web-core"
import { NewsService } from './news.service';
import { routeAnimation } from './route.animation';

@Component({
	//moduleId: module.id,
	//selector: 'news-list',
	templateUrl: 'app/html/news-list.html',
	animations: routeAnimation()
})
export class NewsListComponent implements OnInit {
	private newsList: NewsListItem[] = [];
	newsListLoadInProgress = false;
	initialLoadCompleted = false;
	lastDate = new Date();
	portionsCount = 0;

	constructor(
		private newsService: NewsService
		) {
	}

	ngOnInit() {
		this.getData(new Date(), 7);
	}

	getMoreNews() {
		if (!this.newsListLoadInProgress)
			this.getData(new Date(this.lastDate.valueOf()));
	}

	getNewsList() {
		return this.newsList.slice(0, 6 * this.portionsCount + 1);
	}

	private getData(maxDate: Date, newsCount = 6) {
		const loadStart = new Date().valueOf();
		this.newsListLoadInProgress = true;
		this.newsService.getNewsList(maxDate, newsCount)
			.then((newsListResult: ListResult<NewsListItem>) => {
					this.newsList = this.newsList.concat(newsListResult.list);
					this.portionsCount++;
					this.lastDate = newsListResult.minDate;
					while (new Date().valueOf() < loadStart + 1000) { }
					this.newsListLoadInProgress = false;
					this.initialLoadCompleted = true;
				});
	}
}
