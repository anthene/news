import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { NewsService as NewsServiceBase } from 'news-core';
import { NewsConverter } from './news-converter';

@Injectable()
export class NewsService extends NewsServiceBase {
	constructor(
		http: Http,
		newsConverter: NewsConverter
	) {
		super({ get: (url: string) => http.get(url).toPromise() }, newsConverter)
	}
}
