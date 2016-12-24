export function to00(num: number) {
	return ('00' + num).slice(-2);
}

export function toNumberedUtcDate(date: Date) {
	return `${date.getUTCFullYear()}${to00(1+date.getUTCMonth())}${to00(date.getUTCDate())}`;
}
