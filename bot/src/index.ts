export * from "./get-auth-string"
export * from "./get-signature"
export * from "./twitter-request"

import { appendFile as af, writeFile as wf, readFile as rf } from "fs"
import { TwitterBot } from "./twitter-bot"
import { Tweet } from "./tweet"
import { TweetSettings } from "./tweet-settings"
import { UserSettings } from "./user-settings"

async function go(log: (msg: string) => void) {
	log(`start process`)

	const users = <UserSettings[]>JSON.parse(await readFile("users.settings.json"))
	const usersCount = users.length
	log(`users read: ${JSON.stringify(users, undefined, "\t")}`)

	for (const user of users) {
		await processUser(user, usersCount, log)
	}
}

async function processUser(user: UserSettings, usersCount: number, log: (msg: string) => void) {
		const twitterBot = new TwitterBot(user)

		const tweets = await twitterBot.getPostsList(300)
		log(`end obtain tweets`)

		await writeFile("tweets.json", JSON.stringify(tweets, (key, value) => key === "retweeted" || key === "favorited" ? undefined : value, "\t"))
		log(`end writing tweets.json`)

		let tweetsSettings = <TweetSettings[]>JSON.parse(await readFile("tweets.settings.json"))
		log(`end reading tweets.setting.json`)

		await merge(tweets, tweetsSettings)
		log(`end merging tweets to  tweets.setting.json`)

		await fillFavoritedAndRetweetedCollections(tweets, tweetsSettings, user)
		log(`end updating for favourites and retweets tweets.setting.json`)

		await writeFile("tweets.settings.json", JSON.stringify(tweetsSettings, undefined, "\t"))
		log(`end saving tweets.setting.json`)

		await setLikesAndRetweets(tweets, tweetsSettings, twitterBot, usersCount, user, log)
}

async function merge(
		tweets: Tweet[],
		tweetsSettings: TweetSettings[]) {

		tweetsSettings = tweets
			.filter(tweet => !tweetsSettings.find(ts => ts.id === tweet.id))
			.map(tweet => ({
				id: tweet.id,
				id_str: tweet.id_str,
				retweetPercent: Math.random(),
				retweetedBy: [],
				favouritePercent: Math.random(),
				favoritedBy: []
			}))
			.concat(tweetsSettings)
}

async function fillFavoritedAndRetweetedCollections(
		tweets: Tweet[],
		tweetsSettings: TweetSettings[],
		user: UserSettings) {

		for (const tweet of tweets.filter(t => t.favorited)) {
			const tweetSettings = tweetsSettings.find(t => t.id === tweet.id)
			if (!tweetSettings.favoritedBy) {
				tweetSettings.favoritedBy = []
			}
			if (tweetSettings.favoritedBy.indexOf(user.id) === - 1) {
				tweetSettings.favoritedBy.push(user.id)
			}
		}

		for (const tweet of tweets.filter(t => t.retweeted)) {
			const tweetSettings = tweetsSettings.find(t => t.id === tweet.id)
			if (!tweetSettings.retweetedBy) {
				tweetSettings.retweetedBy = []
			}
			if (tweetSettings.retweetedBy.indexOf(user.id) === - 1) {
				tweetSettings.retweetedBy.push(user.id)
			}
		}
}

async function setLikesAndRetweets(
		tweets: Tweet[],
		tweetsSettings: TweetSettings[],
		twitterBot: TwitterBot,
		usersCount: number,
		user: UserSettings,
		log: (msg: string) => void) {

		for (const tweetSettings of tweetsSettings) {
			const tweet = tweets.find(t => t.id === tweetSettings.id)

			if (!tweet)
				continue

			if (tweet.favorite_count < Math.round(tweetSettings.favouritePercent * usersCount)) {
				if (Math.round(Math.random()) && (!tweetSettings.favoritedBy || tweetSettings.favoritedBy.indexOf(user.id) === -1)) {
					await twitterBot.like(tweet.id_str)
					tweet.favorite_count++
					await writeFile("tweets.json", JSON.stringify(tweets, (key, value) => key === "retweeted" || key === "favorited" ? undefined : value, "\t"))
					if (!tweetSettings.favoritedBy)
						tweetSettings.favoritedBy = []
					tweetSettings.favoritedBy.push(user.id)
					await writeFile("tweets.settings.json", JSON.stringify(tweetsSettings, undefined, "\t"))
					log(`tweet (${tweet.id_str}) like by ${user.name}`)

					await wait(random(10, 30))
				}
				else {
					log(`tweet (${tweet.id_str}) like skipped`)
				}
			}
			else {
				log(`tweet (${tweet.id_str}) favourites are full`)
			}

			if (tweet.retweet_count < Math.round(tweetSettings.retweetPercent * usersCount)) {
				if (Math.round(Math.random()) && (!tweetSettings.retweetedBy || tweetSettings.retweetedBy.indexOf(user.id) === -1)) {
					await twitterBot.reply(tweet.id_str)
					tweet.retweet_count++
					await writeFile("tweets.json", JSON.stringify(tweets, (key, value) => key === "retweeted" || key === "favorited" ? undefined : value, "\t"))
					if (!tweetSettings.retweetedBy)
						tweetSettings.retweetedBy = []
					tweetSettings.retweetedBy.push(user.id)
					await writeFile("tweets.settings.json", JSON.stringify(tweetsSettings, undefined, "\t"))
					log(`tweet (${tweet.id_str}) retweeted by ${user.name}`)

					await wait(random(10, 30))
				}
				else {
					log(`tweet (${tweet.id_str}) retweet skipped`)
				}
			}
			else {
				log(`tweet (${tweet.id_str}) retweetes are full`)
			}
		}
}

async function safeGo() {
	const log = (msg: string) => {
		console.log(`${new Date().toLocaleTimeString()}: ${msg}\r\n`)
		appendFile(`log-${new Date().toLocaleDateString()}.log`, `${new Date().toLocaleTimeString()}: ${msg}\r\n`)
	}

	try {
		await go(log)
	}
	catch (e) {
		log(e)
		throw e
	}
}

safeGo()

function appendFile(fileName: string, data: any) {
	return new Promise<void>((resolve, reject) =>
		af(fileName, data, error => error ? reject(error) : resolve()))
}

function writeFile(fileName: string, data: any) {
	return new Promise<void>((resolve, reject) =>
		wf(fileName, data, error => error ? reject(error) : resolve()))
}

function readFile(fileName: string) {
	return new Promise<string>((resolve, reject) =>
		rf(fileName, "utf8", (error, data) => error ? reject(error) : resolve(data)))
}

function wait(seconds: number) {
	return new Promise<void>(resolve => setTimeout(resolve, seconds * 1000))
}

function random(min: number, max: number) {
	return Math.floor((max - min + 1) * Math.random()) + min
}
