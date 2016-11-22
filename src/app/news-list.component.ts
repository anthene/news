import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NewsListItem } from './news';
import { NewsService } from './news-service';

@Component({
	//moduleId: module.id,
	//selector: 'news-list',
	templateUrl: 'app/news-list.html'
})
export class NewsListComponent implements OnInit {
	newsList: NewsListItem[];

	constructor(
		public router: Router, // todo: make private
		private newsService: NewsService
		) {
	}

	ngOnInit(): void {
		this.newsService.getNewsList()
		.then(newsList => this.newsList = newsList);
	}
}
