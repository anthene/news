import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list.component';
import { NewsComponent } from './news.component';
import { NewsService } from './news-service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		AppRoutingModule
	],
	declarations: [ AppComponent, NewsListComponent, NewsComponent ],
	providers: [ NewsService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
