function extractImageSources() {
	const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
	const imageSources = {};

	// Initialize imageSources object
	for (const ext of imageExtensions) {
		imageSources[ext] = new Set();
	}

	// imgタグの画像
	const imgElements = document.getElementsByTagName('img');
	for (const imgElement of imgElements) {
		const src = imgElement.src;
		const extension = src.split('.').pop().toLowerCase();
		if (imageExtensions.includes(extension)) {
			imageSources[extension].add(src);
		}
	}

	// pictureタグ内のsourceタグの画像
	const sourceElements = document.getElementsByTagName('source');
	for (const sourceElement of sourceElements) {
		const srcset = sourceElement.getAttribute('srcset');
		if (srcset) {
			const sources = srcset.split(',').map(src => src.trim().split(' ')[0]);
			sources.forEach(src => {
				const extension = src.split('.').pop().toLowerCase();
				if (imageExtensions.includes(extension)) {
					imageSources[extension].add(src);
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
				const extension = src.split('.').pop().toLowerCase();
				if (imageExtensions.includes(extension)) {
					imageSources[extension].add(src);
				}
			}
		}
	}

	// レイジーロードの画像
	for (const imgElement of imgElements) {
		const lazyLoadSrc = imgElement.dataset.src || imgElement.getAttribute('data-src');
		if (lazyLoadSrc) {
			const extension = lazyLoadSrc.split('.').pop().toLowerCase();
			if (imageExtensions.includes(extension)) {
				imageSources[extension].add(lazyLoadSrc);
			}
		}
	}

	return imageSources;
}

// const imageSources = extractImageSources();
// console.log('Image sources:', imageSources);
