import * as fs from "fs";
import * as path from "path";
import { News } from "news-core";

import { Plugin } from "./plugin"

interface IndexPluginConfig {
	outputPath: string
	indexTemplatePath: string
}

export class IndexPlugin implements Plugin {
	private indexTemplate: string

	constructor(private config: IndexPluginConfig) { }

	init() {
		fs.mkdirSync(this.config.outputPath);
		this.indexTemplate = fs.readFileSync(this.config.indexTemplatePath, "utf8");
	}

	process(news: News) {
		const indexFileContent = this.indexTemplate
			.replace("{{title}}", news.header)
			.replace("{{content}}", news.content.join("\r\n"))
		const filePath = path.join(this.config.outputPath, `${news.id}`);
		fs.mkdirSync(filePath);
		fs.writeFileSync(path.join(filePath, this.config.indexTemplatePath), indexFileContent)
	}
}
