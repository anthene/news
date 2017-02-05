import { ShortNews } from './short-news';
import { ListResult } from './list-result';
import { NewsListItem } from './news';
import { NewsService, NotificationService } from "./services";
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
		private newsService: NewsService,
		private notificationService: NotificationService,
		private updateInterval = 60 * 10 * 1000
		) {
	}

	protected onInit(): void {
		this.startWaitingForNewNews();
		this.getData(new Date());
		this.router.events.subscribe((value: any) => this.titleService.setTitle('ПОСЛЕДНИЕ НОВОСТИ'));
	}

	startWaitingForNewNews() {
		setInterval(() => {
			this.newsService.getNewsList(new Date(), 1)
				.then(res => {
					const newsList = res.list;
					if (newsList.length > 0) {
						if (this.lastNewsId === undefined) {
							this.lastNewsId = newsList[0].id
						}
						else {
							if (this.lastNewsId !== newsList[0].id && this.notificationService.isNotificationEnabled()) {
								this.newsService.getNews(this.lastNewsId = newsList[0].id)
									.then(news => this.notificationService.showNotification(news))
							}
						}
					}
				})
		}, this.updateInterval);
	}

	getMoreNews(): void {
		if (!this.shortNewsListLoadInProgress)
			this.getData(new Date(this.lastDate.valueOf()));
	}

	requestNotification() {
		this.notificationService.requestPermission();
	}

	getNotificationVisible() {
		return this.notificationService.isNotificationRequestRequired();
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
