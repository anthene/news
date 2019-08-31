import { Pipe, PipeTransform } from '@angular/core';

import { toEnDate } from "news-web-core"

@Pipe({ name: 'customDateTime' })
export class CustomDateTimePipe implements PipeTransform {
	transform(date: Date) {
		return toEnDate(date);
	}
}
