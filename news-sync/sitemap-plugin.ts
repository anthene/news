import * as fs from "fs";
import * as path from "path";
import { News } from "news-core";

import { Plugin } from "./plugin"

interface SitemapPluginConfig {
	filePath: string
	getLink: (id: number) => string
}

export class SitemapPlugin implements Plugin {
	constructor(private config: SitemapPluginConfig) { }

	process(news: News) {
		fs.appendFileSync(this.config.filePath, this.config.getLink(news.id))
	}
}
