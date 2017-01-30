import { trigger, state, animate, style, transition } from '@angular/core';

export function routeAnimation() {
	return [
		trigger('routeAnimation', [
			state('void', style({opacity: 0}) ),
			state('*', style({opacity: 1}) ),
			transition('void => *', [
				animate(3000)
			]),
			transition('* => void', [
				animate(3000)
			])
		])
	]
}
