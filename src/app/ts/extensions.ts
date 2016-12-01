Date.prototype.toTime = function (): string {
    return `${this.getHours().to00()}:${this.getMinutes().to00()}`;
}

Number.prototype.to00 = function (): string {
    return ('00' + this).slice(-2);
}