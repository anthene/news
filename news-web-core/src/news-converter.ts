import { NewsBase, NewsListItem, News } from "news-core"
import { ShortNews } from './';

export class NewsConverter {
	shortNewsListFromJson(json: any): ShortNews[] {
		const shortNewsList = <ShortNews[]>json;
		shortNewsList.forEach(NewsConverter.setDate);
		return shortNewsList;
	}

	newsListFromJson(json: any): NewsListItem[] {
		const shortNewsList = <NewsListItem[]>json;
		shortNewsList.forEach(NewsConverter.setDate);
		return shortNewsList;
	}

	newsFromJson(json: any): News {
		return <News>NewsConverter.setDate(<NewsBase>json);
	}

	private static setDate(newsBase: NewsBase): NewsBase {
		newsBase.date = new Date(<any>newsBase.date);
		return newsBase;
	}
}
