import { toNumberedUtcDate } from "./to-numbered-utc-date"

export function getShortNewsListFileName(date: Date) {
	return `short-news-list-${toNumberedUtcDate(date)}.json`;
}

export function getNewsListFileName(date: Date) {
	return `news-list-${toNumberedUtcDate(date)}.json`;
}

export function getNewsFileName(id: number) {
	return `${id}.json`
}