import { News } from "news-core";

export interface Plugin {
	init?(): Promise<void>
	process(news: News): void
}
