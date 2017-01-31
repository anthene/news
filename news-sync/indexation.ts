import { IndexPlugin } from "./index-plugin"
import { SitemapPlugin } from "./sitemap-plugin"
import { Processor } from "./processor"

new Processor({
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
		})
	]
}).process();