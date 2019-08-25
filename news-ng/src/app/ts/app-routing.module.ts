import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsListComponent } from './news-list.component';
import { NewsComponent } from './news.component';
import { AboutComponent } from './about.component';

const routes: Routes = [
	// { path: '', redirectTo: '/newslist', pathMatch: 'full' },
	{ path: '',  component: NewsListComponent },
	{ path: 'news/:id', component: NewsComponent },
	{ path: 'about', component: AboutComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}