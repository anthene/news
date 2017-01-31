import { News } from "news-core";

import { ProcessorConfig } from "./processor"

export interface Plugin {
	init(): void
	process(news: News, processorConfig: ProcessorConfig): void
}
