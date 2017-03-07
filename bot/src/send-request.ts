import { RequestOptions } from "http"
import { request } from "https"

export function sendRequest<T>(requestOptions: RequestOptions) {
	const requestPromise = new Promise<T>((resolve, reject) => {
		const req = request(requestOptions, result => {
			console.log(result.statusCode)
			let output = ""
			result.on("data", chunk => output += chunk)
			result.on("end", () => resolve(<T>JSON.parse(output)))
		})


		req.on("error", e => reject(e))

		req.end()
	})

	return requestPromise
}
