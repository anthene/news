import { IndexPlugin } from "./index-plugin"
import { Processor } from "./processor"

new Processor({
	newsPath: "..\\data",
	daysCount: 3,
	getNewsListFileName: (param: string) => `news-list-${param}.json`,
	getNewsFileName: (id: number) => `${id}.json`,
	plugins: [new IndexPlugin({
		outputPath: "..\\news",
		indexTemplatePath: "index.html"
	})]
}).process();