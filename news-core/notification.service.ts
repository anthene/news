declare var Notification: any; // todo: find typings

export class NotificationService {
	showNotification(message: string) {
		if (this.getPermission() === State[State.granted]){
			new Notification(message);
		}
		else if (this.getPermission() === State[State.default]) {
			this.requestPermission(state => {
				if (state === State[State.granted]) {
					new Notification(message);
				}
			})
		}
	}

	isNotificationPossible() {
		return (<any>window).Notification !== undefined;
	}

	isNotificationDefault() {
		return this.getPermission() === State[State.default];
	}

	requestPermission(callback?: (state: string) => void) {
		Notification.requestPermission(callback);
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