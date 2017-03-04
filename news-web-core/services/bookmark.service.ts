export class BookmarkService {
	addBookmark() {
		if ((<any>window).sidebar) { // Mozilla Firefox Bookmark
			(<any>window).sidebar.addPanel(location.href, document.title, "");
		}
		else if ((<any>window).external && ('AddFavorite' in window.external)) { // IE Favorite
			(<any>window).external.AddFavorite(location.href, document.title);
		}
		else if ((<any>window).opera && window.print) { // Opera Hotlist
			(<any>this).title = document.title;
		}
		else {
			alert("Нажмите Ctrl + D для добавления страницы в закладки")
		}
	}

	enabled() {
		const userAgent = navigator.userAgent || navigator.vendor || <string>(<any>window).opera

		if (/windows phone/i.test(userAgent))
			return false

		if (/android/i.test(userAgent))
			return false

		if (/iPad|iPhone|iPod/i.test(userAgent) && !(<any>window).MSStream)
			return false

		return true
	}
}