import { createHmac } from "crypto"

import { TwitterRequest } from "./twitter-request"
import { percentEncode } from "./percent-encode"

export function getSignature(twitterRequest: TwitterRequest) {
	const path = twitterRequest.requestOptions.path.indexOf("?") > -1
		? twitterRequest.requestOptions.path.substring(0, twitterRequest.requestOptions.path.indexOf("?"))
		: twitterRequest.requestOptions.path
	const params = [
		twitterRequest.requestOptions.method,
		percentEncode(`https://${twitterRequest.requestOptions.host}` + path)
	]

	const array = []
	for (const key in twitterRequest.params) {
		array.push(`${percentEncode(key)}=${percentEncode(twitterRequest.params[key])}`)
	}

	params.push(percentEncode(array.sort().join("&")))

	const signatureBaseString = params.join("&")

	const signingKey = `${twitterRequest.user.consumerSecret}&${twitterRequest.user.tokenSecret}`

	return twitterRequest.params["oauth_signature"] = createHmac('sha1', signingKey).update(signatureBaseString).digest("base64")
}
