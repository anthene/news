import { Pipe, PipeTransform } from '@angular/core';

import { toEnTimeOrDate } from "news-web-core"

@Pipe({ name: 'customTime' })
export class CustomTimePipe implements PipeTransform {
	transform(date: Date) {
		return toEnTimeOrDate(date);
	}
}
