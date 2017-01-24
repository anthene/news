import * as fs from "fs";

const titleTemplate = "{{title}}";
const contentTemplate = "{{content}}";
const dataPath = "src\\data";
const indexPath = "syncro\\index.html";
const outputPath = "syncro\\news";

function readNews(newsId: number) {
	const newsData: string = fs.readFileSync(`${dataPath}\\${newsId}.json`, "utf8");
	return <{ header: string, content: string[] }>JSON.parse(newsData);
}

const indexData: string = fs.readFileSync(indexPath, "utf8");

function createFile(id: number) {
	const news = readNews(id);

	const newIndexHtml = indexData
		.replace(titleTemplate, news.header)
		.replace(contentTemplate, news.content.join("\r\n"));

	if (!fs.existsSync(outputPath)) {
		fs.mkdirSync(outputPath);
	}

	if (!fs.existsSync(`${outputPath}\\${id}`)) {
		fs.mkdirSync(`${outputPath}\\${id}`);
	}

	fs.writeFileSync(`${outputPath}\\${id}\\index.html`, newIndexHtml);
}

const files: string[] = fs.readdirSync(dataPath);
files.filter(value => /^(\d+).json$/.test(value)).forEach(value => {
	const val = value.match(/(\d*)/);
	createFile(+val[0]);
})

console.log("Done!")
