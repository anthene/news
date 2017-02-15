import { News } from "news-core";
import { Database } from 'pg-io';

// get a connection session

export class DbPlugin {

	private database: Database;

	constructor() {
		this.database = new Database({
			connection: {
				host: 'localhost',
				database: 'test',
				user: 'postgres',
				password: '1'
			}
		});
	}

	// todo: remove
	init() {

	}

	process(news: News) {
		this.database.connect().then(session => {

			const query = {
				text: 'insert into news values ({{id}}, {{date}}, {{header}});',
				params: news
			};

			return session.execute(query).then(() => session.close());
		});
	}
}
