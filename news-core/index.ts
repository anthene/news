export function to00(num: number) {
	return ('00' + num).slice(-2);
}

export function toNumberedUtcDate(date: Date) {
	return `${date.getUTCFullYear()}${to00(1+date.getUTCMonth())}${to00(date.getUTCDate())}`;
}

export const millisecondsInDay = 24 * 60 * 60 * 1000;

export interface News {
	id: number;
	header: string;
	content: string[];
}

export const minDateEver = new Date(Date.UTC(2016, 11, 1));