import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { News } from './news';
import { NewsService } from './news-service';

@Component({
	//moduleId: module.id,
	//selector: 'news',
	templateUrl: 'app/news.html'
})
export class NewsComponent implements OnInit {
	news: News;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private newsService: NewsService
	) {
	}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.newsService.getNews(+params['id']))
			.subscribe((news: News) => this.news = news);
	}
}
