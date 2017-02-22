import { News } from "news-core";
import { Database } from 'pg-io';

export class DbPlugin {

	private database: Database;

	constructor() {
		this.database = new Database({
			connection: {
				host: 'localhost',
				database: 'news',
				user: 'postgres',
				password: '1'
			}
		});
	}

	async process(news: News) {
		const session = await this.database.connect();
		try {
			await session.execute({
				text: 'insert into news values ({{id}}, {{date}}, {{header}});',
				params: news
			});
		}
		finally {
			await session.close();
		}
	}
}
