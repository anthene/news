import { to00 } from "./to-00"

export function toNumberedUtcDate(date: Date) {
	return `${date.getUTCFullYear()}${to00(1+date.getUTCMonth())}${to00(date.getUTCDate())}`;
}
