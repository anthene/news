import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list.component';
import { NewsComponent } from './news.component';
import { AboutComponent } from './about.component';
import { NewsService } from './news-service';
import { NewsConverter } from './news-converter';
import { CustomTimePipe } from './custom-time.pipe';
import { CustomDateTimePipe } from './custom-date-time.pipe';
import { NewsNotificationService } from "./news-notification.service";

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		AppRoutingModule
	],
	declarations: [
		AppComponent, NewsListComponent, NewsComponent, AboutComponent,
		CustomTimePipe, CustomDateTimePipe
	],
	providers: [ NewsService, NewsConverter, NewsNotificationService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
