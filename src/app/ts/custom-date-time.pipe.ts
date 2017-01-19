import { Pipe, PipeTransform } from '@angular/core';

import { to00 } from './extensions';

@Pipe({ name: 'customDateTime' })
export class CustomDateTimePipe implements PipeTransform {
	transform(date: Date): string {
		const years = date.getFullYear();
		const months = date.getMonth();
		const days = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();

		return  `${to00(days)}.${to00(1 + months)}.${years}, ${hours}:${minutes}`;
	}
}

function toDate(date: Date) {
	return new Date(date.getFullYear(), 1 + date.getMonth(), date.getDate());
}