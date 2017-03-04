import { Pipe, PipeTransform } from '@angular/core';

import { toTimeOrDate } from "news-web-core"

@Pipe({ name: 'customTime' })
export class CustomTimePipe implements PipeTransform {
	transform(date: Date) {
		return toTimeOrDate(date);
	}
}
