import { Pipe, PipeTransform } from '@angular/core';

import { toRuDate } from "news-web-core"

@Pipe({ name: 'customDateTime' })
export class CustomDateTimePipe implements PipeTransform {
	transform(date: Date) {
		return toRuDate(date);
	}
}
