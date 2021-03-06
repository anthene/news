import { getAuthString } from "../src"

describe("getAuthString", () => {
	const testCases: [{ [key: string]: string}, string][] = [
		[{
			"oauth_consumer_key": "xvz1evFS4wEEPTGEFPHBog",
			"oauth_nonce": "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
			"oauth_signature": "tnnArxj06cWHq44gCs1OSKk/jLY=",
			"oauth_signature_method": "HMAC-SHA1",
			"oauth_timestamp": "1318622958",
			"oauth_token": "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
			"oauth_version": "1.0",
		}, `OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318622958", oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", oauth_version="1.0"`]
	]

	testCases.forEach(testCase =>
		it("should ...", () => {
			expect(getAuthString(testCase[0])).toBe(testCase[1])
		})
	)
})