import { RequestOptions } from "http"

import { getAuthString } from "./get-auth-string"
import { getSignature } from "./get-signature"
import { sendRequest } from "./send-request"
import { Tweet } from "./tweet"
import { TwitterRequest } from "./twitter-request"
import { UserSettings } from "./user-settings"

export class TwitterBot {
	constructor (private userSettings: UserSettings) { }

	async getPostsList(count: number) {
		const userId = "831976240911376394"
		const result = await this.send<Tweet[]>({
			method: "GET",
			host: "api.twitter.com",
			path: `/1.1/statuses/user_timeline.json?id=${userId}&count=${count}`
		}, { "id": userId, "count": count.toString() })

		const tweets: Tweet[] = []

		for (const tweet of result) {
			tweets.push({
				id: tweet.id,
				id_str: tweet.id_str,
				retweet_count: tweet.retweet_count,
				retweeted: tweet.retweeted,
				favorite_count: tweet.favorite_count,
				favorited: tweet.favorited,
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
		const twitterRequest = new TwitterRequest(options, this.userSettings)

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

