import { ShortNews } from './short-news';
import { ListResult } from './list-result';
import { NewsListItem } from './news';
import { NewsService } from "./services";
import { millisecondsInDay } from "./milliseconds-in-day";

export class AppController {
	shortNewsList: ShortNews[] = [];
	lastNewsId: number;
	initialLoadCompleted = false;
	shortNewsListLoadInProgress = false;
	lastDate = new Date();
	currentMenuItem: number = MenuItem.News;

	constructor(
		private router: { events: { subscribe: (value: any) => void } },
		private titleService: { setTitle: (title: string) => void },
		private newsService: NewsService
		) {
	}

	protected onInit(): void {
		this.getData(new Date());
		this.router.events.subscribe((value: any) => this.titleService.setTitle('ПОСЛЕДНИЕ НОВОСТИ'));
	}

	getMoreNews(): void {
		if (!this.shortNewsListLoadInProgress)
			this.getData(new Date(this.lastDate.valueOf()));
	}

	protected getData(maxDate: Date): void {
		const loadStart = new Date().valueOf()
		this.shortNewsListLoadInProgress = true
		this.newsService.getShortNews(maxDate)
			.then((shortNewsListResult: ListResult<ShortNews>) => {
					this.shortNewsList = this.shortNewsList.concat(shortNewsListResult.list);
					this.lastDate = shortNewsListResult.minDate;
					while (new Date().valueOf() < loadStart + 1000) { }
					this.shortNewsListLoadInProgress = false;
					this.initialLoadCompleted = true;
				});
	}
}

enum MenuItem {
	ShortNews,
	News
}
