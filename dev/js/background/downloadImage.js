function downloadImage(blobURL, filename) {
	chrome.downloads.download({
		url: blobURL,
		filename: filename,
		saveAs: true
	}, function (downloadId) {
		if (chrome.runtime.lastError) {
			console.error(chrome.runtime.lastError);
		} else {
			console.log('Download started with ID: ', downloadId);
		}
	});
}
