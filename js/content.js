/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************!*\
  !*** ./dev/js/content/content.js ***!
  \***********************************/
(() => {
	const imageExtensions = ['png', 'jpg', 'jpeg'];//, 'gif', 'webp'];
	const DATA_IMG = "data64"

	function extractImageSources() {
		const imageSources = {};

		// Initialize imageSources object
		for (const ext of imageExtensions) {
			imageSources[ext] = new Set();
		}
		imageSources[DATA_IMG] = new Set();

		const videoElements = document.getElementsByTagName('video');
		// imgタグの画像
		const imgElements = document.getElementsByTagName('img');
		for (const imgElement of imgElements) {
			const src = imgElement.src;
			const extension = filterImageExtensions(src.split('.').pop().toLowerCase());
			if (extension) {

				imageSources[extension].add(bindProtocol(src));
			}
		}

		// pictureタグ内のsourceタグの画像
		const sourceElements = document.getElementsByTagName('source');
		for (const sourceElement of sourceElements) {
			const srcset = sourceElement.getAttribute('srcset');
			if (srcset) {
				const sources = srcset.split(',').map(src => src.trim().split(' ')[0]);
				sources.forEach(src => {
					const extension = filterImageExtensions(src.split('.').pop().toLowerCase());
					if (extension) {
						imageSources[extension].add(bindProtocol(src));
					}
				});
			}
		}

		// CSS背景画像
		const allElements = document.querySelectorAll('*');
		for (const element of allElements) {
			const style = getComputedStyle(element);
			const backgroundImage = style.backgroundImage;

			if (backgroundImage && backgroundImage !== 'none') {
				const matches = backgroundImage.match(/url\("?(.+?)"?\)/);
				if (matches) {
					const src = matches[1];
					const extension = filterImageExtensions(src.split('.').pop().toLowerCase());
					if (extension) {
						imageSources[extension].add(bindProtocol(src));
					}
				}
			}
		}

		// レイジーロードの画像
		for (const imgElement of imgElements) {
			const lazyLoadSrc = imgElement.dataset.src || imgElement.getAttribute('data-src');
			if (lazyLoadSrc) {
				const extension = filterImageExtensions(lazyLoadSrc.split('.').pop().toLowerCase());
				if (extension) {
					imageSources[extension].add(bindProtocol(lazyLoadSrc));
				}
			}
		}
		// 動画のポスター
		for (const videoElement of videoElements) {
			const posterSrc = videoElement.getAttribute("poster")
			if (posterSrc) {
				const extension = filterImageExtensions(posterSrc.split('.').pop().toLowerCase());
				if (extension) {
					imageSources[extension].add(bindProtocol(posterSrc));
				}
			}
		}


		// ツイッター画像
		// format
		// https://pbs.twimg.com/media/FvCgmV0aYAQTQKf?format=jpg&amp;name=large
		for (const imgElement of imgElements) {
			const lazyLoadSrc = imgElement.src || imgElement.dataset.src || imgElement.getAttribute('data-src');
			if (lazyLoadSrc) {
				const extensions = filterTwImgExtensions(lazyLoadSrc);
				if (extensions && extensions.extension) {
					imageSources[extensions.extension].add(extensions.transformSrc);
				}
			}
		}
		// data64Image
		for (const imgElement of imgElements) {
			const lazyLoadSrc = imgElement.src || imgElement.dataset.src || imgElement.getAttribute('data-src');
			if (lazyLoadSrc) {
				const extensions = filterDataImgExtensions(lazyLoadSrc);
				if (extensions && extensions.extension) {
					imageSources[extensions.extension].add(extensions.transformSrc);
				}
			}
		}
		return imageSources;
	}

	function filterDataImgExtensions(src = "") {
		let extension = null
		if (~src.indexOf("data:image")) {
			return extension;
		}
		let transformSrc = src
		extension = DATA_IMG;
		return {extension, transformSrc};
	}

	function filterTwImgExtensions(src = "") {
		let parsedUrl = parseURL(src)
		let extension = null
		let transformSrc = "";
		if (parsedUrl.query) {
			let query = parsedUrl.query;
			let formatKey = Object.keys(query).find(key => key === "format");
			if (!formatKey) {
				return extension;
			}
			extension = query[formatKey];
			query.name = "large";
			transformSrc = parsedUrl.uri
			let queryString = "?";
			let queries = []
			Object.keys(query).reduce((arr, key) => {
				arr.push(`${key}=${query[key]}`);
				return arr
			}, queries);
			queryString += queries.join("&")
			transformSrc += queryString;
		}
		return {extension, transformSrc};
	}

	/**
	 *
	 * @param {string} url
	 * @returns {{query: {}, uri: string}}
	 */
	function parseURL(url) {
		const returner = {
			uri: ""
			, query: null
		}
		try {

			const urlObj = new URL(url);
			const uri = urlObj.origin + urlObj.pathname;
			const queryParams = new URLSearchParams(urlObj.search);

			const query = {};
			for (const [key, value] of queryParams.entries()) {
				query[key] = value;
			}
			returner.uri = uri;
			returner.query = Object.keys(query).length ? query : null;
		} catch (e) {
			console.log(url);
		}
		return returner;
	}

	function filterImageExtensions(str = "") {
		let checkStr = str;
		if (~str.indexOf("?")) {
			checkStr = str.split("?")[0]
		}
		return imageExtensions.includes(checkStr) ? checkStr : false;
	}

	function bindProtocol(src = "") {
		if (src.match(/^\/\//)) {
			return window.location.protocol + src;
		}
		return src;
	}

	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.hasOwnProperty("captureImgList") && message.captureImgList) {
			const imgPathObject = extractImageSources();

			let imageList = new Set();
			Object.keys(imgPathObject).forEach(key => {
				imageList = new Set([...imageList, ...imgPathObject[key]])
			})
			sendResponse({imgPathList: Array.from(imageList)})
		}
		return true;
	})

})()
/******/ })()
;
//# sourceMappingURL=content.js.map