export interface ImageInfo {
	author: string;
	owner: string;
}

export interface NewsBase {
	id: number;
	date: Date;
	header: string;
}

export interface ShortNews extends NewsBase {
}

export interface NewsListItem extends NewsBase {
	image: ImageInfo;
}

export interface News extends NewsListItem {
	text: string;
}
