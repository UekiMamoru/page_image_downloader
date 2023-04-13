async function resizeImage(imageURL, newWidth, newHeight) {
	return new Promise(async (resolve) => {
		const img = new Image();
		img.src = imageURL;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = newWidth;
			canvas.height = newHeight;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, newWidth, newHeight);

			canvas.toBlob(blob => {
				resolve(URL.createObjectURL(blob));
			}, 'image/png');
		};
	});
}