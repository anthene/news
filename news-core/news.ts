import { NewsBase } from "./news-base"

export interface ImageInfo {
	author: string;
	owner: string;
}

export interface NewsListItem extends NewsBase {
	image: ImageInfo;
}

export interface News extends NewsListItem {
	content: string[];
}
