import { to00 } from "../src"

describe("to00", () => {
	const testCases: [number, string][] = [
		[0, "00"],
		[1, "01"],
		[72, "72"],
		[258, "58"]
	]

	testCases.forEach(testCase => 
		it(`should return ${testCase[1]} for ${testCase[0]}`, () => {
			expect(to00(testCase[0])).toBe(testCase[1])
		})
	)
})