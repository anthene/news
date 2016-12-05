import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
		public router: Router, // todo: make private
		private newsService: NewsService
		) {
	}

	ngOnInit(): void {
		this.getData(new Date());
	}

	getMoreNews(): void {
		this.getData(new Date(this.lastDate.valueOf()));
	}

	private getData(maxDate: Date): void {
		this.newsService.getNewsList(maxDate)
		.then((newsListResult: ListResult<NewsListItem>) => {
				this.newsList = this.newsList.concat(newsListResult.list);
				this.lastDate = newsListResult.minDate;
			});
	}
}
