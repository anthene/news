import { News } from "news-core";

export interface Plugin {
	init?(): void
	process(news: News): void
}
