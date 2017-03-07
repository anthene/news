import { TwitterRequest, getSignature } from "../src"

describe("getSignature", () => {
	
	const twitterRequest = new TwitterRequest({
		host: "api.twitter.com",
		method: "POST",
		path: "/1/statuses/update.json",
	}, {
			consumerKey: "xvz1evFS4wEEPTGEFPHBog",
			consumerSecret: "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
			token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
			tokenSecret: "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE"
		});
	twitterRequest.params["status"] = "Hello Ladies + Gentlemen, a signed OAuth request!"
	twitterRequest.params["include_entities"] = "true"
	twitterRequest.params["oauth_timestamp"] = "1318622958"

	const twitterRequest2 = new TwitterRequest({
		method: "GET",
		host: "api.twitter.com",
		path: "/1.1/statuses/home_timeline.json"
	},
		{
			consumerKey: "p9p371gJa16FrATNAeFJJqQaA",
			consumerSecret: "Ngi3GFrdvsF9M7qbF1DHw1obaPgBCKpd3kVxYaZaBySpbvhe1O",
			token: "831976240911376394-4tSnna1gJYsFVTabzRavRzfgHQcmi7Q",
			tokenSecret: "5RD4a2aPBFmit2jizijgOMxy3XpuGcdMiGDD2rQUzPbNZ"
		});
	twitterRequest2.params["oauth_timestamp"] = "1488921028"

	const testCases: [TwitterRequest, string][] = [
		[twitterRequest, "tnnArxj06cWHq44gCs1OSKk/jLY="],
		[twitterRequest2, "bxFafmc5xi+VrtDgYXIjI5h0Ieo="],
	]

	testCases.forEach(testCase =>
		it("should ...", () => {
			// arrange

			// act

			// assert
			expect(getSignature(testCase[0])).toBe(testCase[1])
		})
	)
})