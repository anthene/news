import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { routeAnimation } from './route.animation';

import { News } from './news';
import { NewsService } from './news-service';

@Component({
	//moduleId: module.id,
	//selector: 'news',
	templateUrl: 'app/html/news.html',
	animations: routeAnimation()
})
export class NewsComponent implements OnInit {
	news: News;
	newsLoadInProgress = false;

	constructor(
		private route: ActivatedRoute,
		private newsService: NewsService
	) {
	}

	ngOnInit(): void {
		const loadStart = new Date().valueOf();
		this.newsLoadInProgress = true;
		this.route.params
			.switchMap((params: Params) => this.newsService.getNews(+params['id']))
			.subscribe((news: News) => {
				this.news = news;
				while (new Date().valueOf() < loadStart + 1000) { }
				this.newsLoadInProgress = false;
			});
	}
}
