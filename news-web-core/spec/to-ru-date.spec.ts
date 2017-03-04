import { toRuDate } from "../src"

describe("toRuDate", () => {
	const testCases: [Date, string][] = [
		[new Date(2017, 8 - 1, 3, 12, 15), "03.08.2017, 12:15"]
	]

	testCases.forEach(testCase => 
		it(`should return ${testCase[1]} for ${testCase[0]}`, () => {
			expect(toRuDate(testCase[0])).toBe(testCase[1])
		})
	)
})