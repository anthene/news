import { percentEncode } from "./percent-encode"

export function getAuthString(params: { [key: string]: string }) {

	const pars: string[] = []
	for (const key in params) {
		if (authParamsList.some(authParam => key === `${authPrefix}${authParam}`))
			pars.push(`${percentEncode(key)}="${percentEncode(params[key])}"`)
	}

	return `OAuth ${pars.join(", ")}`
}

const authParamsList = [
	"consumer_key",
	"nonce",
	"signature",
	"signature_method",
	"timestamp",
	"token",
	"version"
]

const authPrefix = "oauth_"
