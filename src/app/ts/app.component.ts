import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShortNews } from './news';
import { NewsService } from './news-service';

@Component({
	//moduleId: module.id,
	selector: 'app',
	templateUrl: 'app/html/app.html',
})
export class AppComponent implements OnInit {
	shortNewsList: ShortNews[];
	currentMenuItem = MenuItem.News;

	constructor(
		public router: Router, // todo: make private
		private newsService: NewsService
		) {
	}

	ngOnInit(): void {
		this.newsService.getShortNews()
		.then((shortNewsList: ShortNews[]) => this.shortNewsList = shortNewsList);
	}
}

enum MenuItem {
	ShortNews,
	News
}
