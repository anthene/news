import { AppController } from "../"
import { NewsService, NotificationService } from "../services"

describe("AppController", () => {

	describe("", () => {
		beforeEach(() => jasmine.clock().install())

		it("should receive last news info every second", (done) => {
			// arrange
			var newsPromise = Promise.resolve({
				list: [{ id: 1942761229, header: "news # 1"}]
			})
			let called = false
			const appController = new AppController(
				undefined,
				undefined,
				<NewsService>{
					getNewsList: (maxDate: Date, newsCount: number) => {
						if (newsCount === 1)
							called = true;

						return newsPromise
					}
				},
				undefined,
				1000)

			// act
			appController.startWaitingForNewNews();
			jasmine.clock().tick(1100)

			// assert
			expect(called).toBeTruthy();
			newsPromise.then(res => {
				expect(appController.lastNewsId).toBe(1942761229)
				done()
			})
		})
	})

	describe("getNotificationVisible", () => {
		[
			[false, false],
			[true, true]
		].forEach(testCase => {
			it("should return correct value", () => {
				// arrange
				const appController = new AppController(
					undefined,
					undefined,
					undefined,
					<NotificationService>{
						isNotificationRequestRequired: () => testCase[0]
					})

				// act

				// assert
				expect(appController.getNotificationVisible()).toBe(testCase[1])
			})
		})
	})
})