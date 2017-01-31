import * as fs from "fs";
import * as path from "path";
import { toNumberedUtcDate, millisecondsInDay, News } from "news-core";

import { Plugin } from "./plugin"

export interface ProcessorConfig {
	newsPath: string
	daysCount: number
	getNewsListFileName: (param: string) => string
	getNewsFileName: (id: number) => string
	plugins: Plugin[]
}

export class Processor {
	constructor(private config: ProcessorConfig) { }

	process() {
		const newsList = this.getNewsList()
		this.fillNewsList(newsList)

		for (const plugin of this.config.plugins) {
			plugin.init();
			for (const news of newsList) {
				plugin.process(news, this.config);
			}
		}
	}

	private getNewsList() {
		let now = new Date();
		let newsList: News[] = [];

		for (let i = 0; i < this.config.daysCount; i++) {
			const filePath = path.join(this.config.newsPath, this.config.getNewsListFileName(toNumberedUtcDate(now)));
			newsList = newsList.concat(<News[]>JSON.parse(fs.readFileSync(filePath, "utf8")))
			now = new Date(now.valueOf() - millisecondsInDay)
		}

		return newsList;
	}

	private fillNewsList(newsList: News[]) {
		for (let i = 0; i < newsList.length; i++) {
			const newsFilePath = path.join(this.config.newsPath, this.config.getNewsFileName(newsList[i].id));
			newsList[i] = <News>JSON.parse(fs.readFileSync(newsFilePath, "utf8"))
		}
	}
}
