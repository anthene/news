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
		this.params["oauth_nonce"] = "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg"
		this.params["oauth_signature_method"] = "HMAC-SHA1"
		this.params["oauth_timestamp"] = Math.floor(new Date().valueOf() / 1000).toString()
		this.params["oauth_token"] = user.token
		this.params["oauth_version"] = "1.0"
	}
}
