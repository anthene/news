import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AppController } from "news-core";

import { NewsService } from './news.service';
import { NewsNotificationService } from "./news-notification.service";

@Component({
	//moduleId: module.id,
	selector: 'app',
	templateUrl: 'app/html/app.html',
})
export class AppComponent extends AppController implements OnInit {
	constructor(
		router: Router,
		titleService: Title,
		newsService: NewsService,
		newsNotificationService: NewsNotificationService
		) {
		super(router, titleService, newsService, newsNotificationService, 10000)
	}

	ngOnInit(): void {
		this.onInit();
	}
}
