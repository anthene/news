const datePrototype = Date.prototype as any;
datePrototype.toTime = function () {
	return `${this.getHours().to00()}:${this.getMinutes().to00()}`;
}

const numberPrototype = Number.prototype as any;
numberPrototype.to00 = function () {
	return ('00' + this).slice(-2);
}