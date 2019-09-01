import { to00 } from "news-core"

export function toTimeOrDate(date: Date) {
	if (toDate(date).valueOf() === toDate(new Date()).valueOf())
		return `${to00(date.getHours())}:${to00(date.getMinutes())}`;
	return  `${to00(date.getDate())}.${to00(1 + date.getMonth())}`;
}

export function toEnTimeOrDate(date: Date) {
	if (toDate(date).valueOf() === toDate(new Date()).valueOf())
		return `${to00(date.getHours())}:${to00(date.getMinutes())}`;
	return  `${to00(1 + date.getMonth())}/${to00(date.getDate())}`;
}

function toDate(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}