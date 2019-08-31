import { to00 } from "news-core"

export function toEnDate(date: Date) {
	const years = date.getFullYear();
	const months = date.getMonth();
	const days = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return  `${to00(1 + months)}/${to00(days)}/${years}, ${to00(hours)}:${to00(minutes)}`;
}