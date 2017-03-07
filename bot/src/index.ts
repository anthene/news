export * from "./get-auth-string"
export * from "./get-signature"
export * from "./twitter-request"

import { appendFile } from "fs"
import { TwitterBot } from "./twitter-bot"

async function go() {
	const twitterBot = new TwitterBot()
	await twitterBot.like("839177774359261184")
	await twitterBot.reply("839177558046420993")
	const tweets = await twitterBot.getPostsList()
	appendFile("tweets.json", JSON.stringify(tweets, undefined, "\t"), () => console.log("done!"))
}

go()