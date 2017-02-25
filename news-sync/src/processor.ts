import * as fs from "fs";
import * as path from "path";
import { millisecondsInDay, minDateEver, News } from "news-core";

import { Plugin } from "./plugins"

export interface ProcessorConfig {
	ignoreListFile?: string
	newsPath: string
	daysCount?: number
	getNewsListFileName: (date: Date) => string
	getNewsFileName: (id: number) => string
	plugins: Plugin[]
}

export class Processor {
    private idsToIgnore: number[] = []

    constructor(private config: ProcessorConfig) {
        if (this.config.ignoreListFile) {
			this.idsToIgnore = fs
				.readFileSync(this.config.ignoreListFile, "utf8")
				.split("\r\n")
				.map(id => parseInt(id));
        }
    }

	async process() {
		const newsList = this.getNewsList()
		this.fillNewsList(newsList)

		for (const plugin of this.config.plugins) {
			plugin.init && await plugin.init();
		}

		for (const plugin of this.config.plugins) {
			for (const news of newsList) {
				plugin.process(news);
			}
		}

        if (this.config.ignoreListFile) {
			fs.appendFileSync(this.config.ignoreListFile, newsList.map(news => `${news.id}\r\n`).join(""));
		}
	}

	private getNewsList() {
		let now = new Date();
		let newsList: News[] = [];

		for (let i = 0; !this.config.daysCount || i < this.config.daysCount; i++) {
			const filePath = path.join(this.config.newsPath, this.config.getNewsListFileName(now));
			newsList = newsList.concat(<News[]>JSON.parse(fs.readFileSync(filePath, "utf8")))
			now = new Date(now.valueOf() - millisecondsInDay)
			if (now < minDateEver)
				break;
		}

		return newsList.filter(news => !this.idsToIgnore.some(id => id === news.id)).reverse();
	}

	private fillNewsList(newsList: News[]) {
		for (let i = 0; i < newsList.length; i++) {
			const newsFilePath = path.join(this.config.newsPath, this.config.getNewsFileName(newsList[i].id));
			newsList[i] = <News>JSON.parse(fs.readFileSync(newsFilePath, "utf8"))
		}
	}
}
