(() => {
	const imageExtensions = ['png', 'jpg', 'jpeg'];//, 'gif', 'webp'];
	function extractImageSources() {
		const imageSources = {};

		// Initialize imageSources object
		for (const ext of imageExtensions) {
			imageSources[ext] = new Set();
		}

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
				const extension =filterImageExtensions(lazyLoadSrc.split('.').pop().toLowerCase());
				if (extension) {
					imageSources[extension].add(bindProtocol(lazyLoadSrc));
				}
			}
		}

		return imageSources;
	}

	function filterImageExtensions(str = ""){
		let checkStr = str;
		if(~str.indexOf("?")){
			checkStr = str.split("?")[0]
		}
		return imageExtensions.includes(checkStr)?checkStr:false;
	}

	function bindProtocol(src = ""){
		if(src.match(/^\/\//)){
			return  window.location.protocol+src;
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
			sendResponse({imgPathList:Array.from(imageList)})
		}
		return true;
	})

})()