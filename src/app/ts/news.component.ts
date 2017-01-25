import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { News } from './news';
import { NewsService } from './news-service';
import { routeAnimation } from './route.animation';

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
		private titleService: Title,
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
				this.titleService.setTitle(news.header);
				while (new Date().valueOf() < loadStart + 1000) { }
				this.newsLoadInProgress = false;
			});
	}
}
