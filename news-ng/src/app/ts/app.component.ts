import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AppController } from "news-core";

import { NewsService } from './news.service';

@Component({
	//moduleId: module.id,
	selector: 'app',
	templateUrl: 'app/html/app.html',
})
export class AppComponent extends AppController implements OnInit {
	constructor(
		router: Router,
		titleService: Title,
		newsService: NewsService
		) {
		super(router, titleService, newsService)
	}

	ngOnInit(): void {
		super.onInit();
	}
}
