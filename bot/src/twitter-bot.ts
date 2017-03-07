import { RequestOptions } from "http"

import { getAuthString } from "./get-auth-string"
import { getSignature } from "./get-signature"
import { sendRequest } from "./send-request"
import { Tweet } from "./tweet"
import { TwitterRequest } from "./twitter-request"

export class TwitterBot {
	async getPostsList() {
		const result = await this.send<Tweet[]>({
			method: "GET",
			host: "api.twitter.com",
			path: "/1.1/statuses/user_timeline.json?id=831976240911376394&count=800"
		}, { "id": "831976240911376394", "count": "800" })

		const tweets: Tweet[] = []

		for (const tweet of result) {
			tweets.push({
				id: tweet.id,
				id_str: tweet.id_str,
				retweet_count: tweet.retweet_count,
				favorite_count: tweet.favorite_count,
			})
		}

		return tweets
	}

	async like(id: string) {
		await this.send<void>({
			method: "POST",
			host: "api.twitter.com",
			path: `/1.1/favorites/create.json?id=${id}`
		}, { "id": `${id}` })
	}

	async reply(id: string) {
		await this.send<void>({
			method: "POST",
			host: "api.twitter.com",
			path: `/1.1/statuses/retweet/${id}.json`
		}, { /*"id": `${id}`*/ })
	}

	private async send<T>(options: RequestOptions, params: { [key: string]: string }) {
		const twitterRequest = new TwitterRequest(options,
			{
				consumerKey: "p9p371gJa16FrATNAeFJJqQaA",
				consumerSecret: "Ngi3GFrdvsF9M7qbF1DHw1obaPgBCKpd3kVxYaZaBySpbvhe1O",
				token: "831976240911376394-4tSnna1gJYsFVTabzRavRzfgHQcmi7Q",
				tokenSecret: "5RD4a2aPBFmit2jizijgOMxy3XpuGcdMiGDD2rQUzPbNZ"
			}
		)

		for (const key in params)
			twitterRequest.params[key] = params[key]

		getSignature(twitterRequest)
		const auth = getAuthString(twitterRequest.params)

		twitterRequest.requestOptions.auth = auth
		twitterRequest.requestOptions.headers = {
			"Authorization": auth,
			"X-Target-URI": "https://api.twitter.com",
			"Connection": "Keep-Alive"
		}

		return sendRequest<T>(twitterRequest.requestOptions)
	}
}

function random(min: number, max: number) {
	return Math.floor((max - min + 1) * Math.random()) + min
}

function wait(minSeconds: number, maxSeconds: number) {
	return new Promise<void>(resolve => {
		setTimeout(resolve, random(minSeconds, maxSeconds) * 1000)
	})
}

