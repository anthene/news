import { Component, OnInit } from '@angular/core';

import { ShortNews } from './news';
import { NewsService } from './news-service';

@Component({
	selector: 'app',
	templateUrl: 'app/news-list.html',
	providers: [ NewsService ]
})
export class AppComponent implements OnInit {
	shortNewsList: ShortNews[];

	constructor(private newsService: NewsService) {
	}

	ngOnInit(): void {
		this.newsService.getShortNews()
		.then(shortNewsList => this.shortNewsList = shortNewsList);
	}
}
