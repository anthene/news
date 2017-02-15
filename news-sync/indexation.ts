import { IndexPlugin } from "./index-plugin"
import { SitemapPlugin } from "./sitemap-plugin"
import { DbPlugin } from "news-db-plugin";
import { Processor } from "./processor"

new Processor({
	ignoreListFile: ".newsignore",
	newsPath: "..\\data",
	daysCount: 3,
	getNewsListFileName: (param: string) => `news-list-${param}.json`,
	getNewsFileName: (id: number) => `${id}.json`,
	plugins: [
		new IndexPlugin({
			outputPath: "..\\news",
			indexTemplatePath: "index.html"
		}),
		new SitemapPlugin({
			filePath: "..\\sitemap.txt",
			getLink: (id: number) => `http://psl-news.ru/news/${id}\r\n`
		}),
		new DbPlugin()
	]
}).process();