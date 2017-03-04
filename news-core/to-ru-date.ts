import { to00 } from "news-core"

export function toRuDate(date: Date) {
	const years = date.getFullYear();
	const months = date.getMonth();
	const days = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return  `${to00(days)}.${to00(1 + months)}.${years}, ${to00(hours)}:${to00(minutes)}`;
}