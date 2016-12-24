import { Pipe, PipeTransform } from '@angular/core';

import { to00 } from './extensions';

@Pipe({ name: 'customTime' })
export class CustomTimePipe implements PipeTransform {
	transform(date: Date): string {
		if (toDate(date).valueOf() === toDate(new Date()).valueOf())
			return `${to00(date.getHours())}:${to00(date.getMinutes())}`;
		return  `${to00(date.getDate())}.${to00(1 + date.getMonth())}`;
	}
}

function toDate(date: Date) {
	return new Date(date.getFullYear(), 1 + date.getMonth(), date.getDate());
}