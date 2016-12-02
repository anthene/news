import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { DashboardComponent } from './dashboard.component';
import { NewsListComponent } from './news-list.component';
import { NewsComponent } from './news.component';

const routes: Routes = [
	{ path: '', redirectTo: '/newslist', pathMatch: 'full' },
	{ path: 'newslist',  component: NewsListComponent },
	{ path: 'news/:id', component: NewsComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}