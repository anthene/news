export function toTime(date: Date) {
	if (toDate(date).valueOf() === toDate(new Date()).valueOf())
		return `${to00(date.getHours())}:${to00(date.getMinutes())}`;
	return  `${to00(date.getDate())}.${to00(1 + date.getMonth())}`;
}

function to00(num: number) {
	return ('00' + num).slice(-2);
}

export function toNumberedUtcDate(date: Date) {
	return `${date.getUTCFullYear()}${to00(1+date.getUTCMonth())}${to00(date.getUTCDate())}`;
}

function toDate(date: Date) {
	return new Date(date.getFullYear(), 1 + date.getMonth(), date.getDate());
}