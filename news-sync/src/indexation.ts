import { DbPlugin } from "news-db-plugin";
import { getNewsListFileName, getNewsFileName } from "news-core"

import { IndexPlugin, SitemapPlugin } from "./plugins"
import { Processor } from "./processor"

new Processor({
	ignoreListFile: ".newsignore",
	newsPath: "..\\data",
	//daysCount: 3,
	getNewsListFileName: getNewsListFileName,
	getNewsFileName: getNewsFileName,
	plugins: [
		new IndexPlugin({
			outputPath: "..\\news",
			indexTemplatePath: "index.html"
		}),
		new SitemapPlugin({
			filePath: "..\\sitemap.txt",
			getLink: (id: number) => `http://psl-news.ru/news/${id}/\r\n`
		}),
		// new DbPlugin(),
		{
			process: news => console.log(`${news.id} successfully processed.`)
		}
	]
}).process();