declare var Notification: any; // todo: find typings

export class NotificationService {
	showNotification(news: { id: number, header: string, content: string[] }) {
		new Notification(news.header,{
			tag: news.id,
			body: news.content[0] + "...",
			icon: `data\\images\\${news.id}.jpg`
		}).onclick = (event: any) => window.location.href = `#/news/${news.id}`;
	}

	isNotificationDisabled() {
		return !this.isNotificationPossible() || this.getPermission() === State[State.denied];
	}

	isNotificationRequestRequired() {
		return this.isNotificationPossible() && this.getPermission() === State[State.default];
	}

	isNotificationEnabled() {
		return this.isNotificationPossible() && this.getPermission() === State[State.granted];
	}

	requestPermission(callback?: (state: string) => void) {
		Notification.requestPermission(callback);
	}

	private isNotificationPossible() {
		return (<any>window).Notification !== undefined;
	}

	private getPermission() {
		return <string>Notification.permission.toLowerCase();
	}
}

enum State {
	granted,
	denied,
	default
}