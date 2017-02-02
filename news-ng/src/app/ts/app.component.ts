import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ShortNews } from './news';
import { NewsService } from './news-service';
import { ListResult } from './get-min-size-array';
import { NewsNotificationService } from "./news-notification.service";

const millisecondsInDay = 24 * 60 * 60 * 1000;

@Component({
	//moduleId: module.id,
	selector: 'app',
	templateUrl: 'app/html/app.html',
})
export class AppComponent implements OnInit {
	shortNewsList: ShortNews[] = [];
	initialLoadCompleted = false;
	shortNewsListLoadInProgress = false;
	lastDate = new Date();
	currentMenuItem = MenuItem.News;
	notificationVisible = false;

	constructor(
		private router: Router,
		private titleService: Title,
		private newsService: NewsService,
		private newsNotificationService: NewsNotificationService
		) {
		this.setNotificationVisible();
	}

	ngOnInit(): void {
		this.getData(new Date());
		this.router.events.subscribe(value => this.titleService.setTitle('ПОСЛЕДНИЕ НОВОСТИ'));
	}

	getMoreNews(): void {
		if (!this.shortNewsListLoadInProgress)
			this.getData(new Date(this.lastDate.valueOf()));
	}

	showNotification() {
		this.newsNotificationService.showNotification("yes, man!!");
	}

	requestNotification() {
		this.newsNotificationService.requestPermission(state => this.setNotificationVisible());
	}

	private setNotificationVisible() {
		this.notificationVisible = this.newsNotificationService.isNotificationPossible() &&
			this.newsNotificationService.isNotificationDefault();
	}

	private getData(maxDate: Date): void {
		const loadStart = new Date().valueOf()
		this.shortNewsListLoadInProgress = true
		this.newsService.getShortNews(maxDate)
			.then((shortNewsListResult: ListResult<ShortNews>) => {
					this.shortNewsList = this.shortNewsList.concat(shortNewsListResult.list);
					this.lastDate = shortNewsListResult.minDate;
					while (new Date().valueOf() < loadStart + 1000) { }
					this.shortNewsListLoadInProgress = false;
					this.initialLoadCompleted = true;
				});
	}
}

enum MenuItem {
	ShortNews,
	News
}
