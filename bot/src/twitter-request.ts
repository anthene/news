import { RequestOptions } from "http"

import { UserSettings } from "./user-settings"

export class TwitterRequest {
	params: {
		[key: string]: string
	} = {}

	constructor(
		public requestOptions: RequestOptions,
		public user: UserSettings) {
		this.params["oauth_consumer_key"] = user.consumerKey
		this.params["oauth_nonce"] = getRequestId()
		this.params["oauth_signature_method"] = "HMAC-SHA1"
		this.params["oauth_timestamp"] = Math.floor(new Date().valueOf() / 1000).toString()
		this.params["oauth_token"] = user.token
		this.params["oauth_version"] = "1.0"
	}
}

function getRequestId() {
	return [0, 0, 0, 0]
		.map(item => Math.floor(Math.random() * 0xffffffff).toString(16))
		.join("")
}
