import { toNumberedUtcDate } from "../src"

describe("toNumberedUtcDate", () => {
	const testCases: [Date, string][] = [
		[new Date(Date.UTC(2017, 8 - 1, 3)), "20170803"],
		[new Date(Date.UTC(2017, 8 - 1, 3, 5)), "20170803"],
		[new Date(Date.UTC(2017, 11 - 1, 4)), "20171104"],
		[new Date(Date.UTC(2017, 1 - 1, 14)), "20170114"],
		[new Date(Date.UTC(2017, 10 - 1, 31)), "20171031"]
	]

	testCases.forEach(testCase => 
		it(`should return ${testCase[1]} for ${testCase[0]}`, () => {
			expect(toNumberedUtcDate(testCase[0])).toBe(testCase[1])
		})
	)
})