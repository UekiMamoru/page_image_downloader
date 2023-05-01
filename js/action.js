(() => {

	let imageArray = [];
	let imgBuff = {}
	const MODE_SINGLE = "single", MODE_MULTIPLE = "multiple"
	let mode = MODE_SINGLE;
	const modeBtns = document.querySelectorAll(".mode");
	const modeParent = document.getElementById("modeParent")
	const imageCountElement = document.getElementById('image-count');
	const nextButton = document.getElementById('nextButton');
	const heightInput = document.getElementById('height');
	const widthInput = document.getElementById('width');
	const changeSize = document.getElementById('changeSize');
	const folder = document.getElementById('folder');
	const file = document.getElementById('file');
	let currentIndex = 0;
	const imagesField = document.getElementById('imagesField');
	const maxButton = document.getElementById('maxButton')
	const multipleDLBtnWrap = document.querySelector(".fixFooter .eventBtnWrap");
	const multipleDLBtnDef = multipleDLBtnWrap.querySelector(".def")
	const multipleDLBtnResize = multipleDLBtnWrap.querySelector(".resize")
	multipleDLBtnDef.addEventListener("click", () => {
		if (confirm("選択画像を[ 元サイズ ]で一括ダウンロードしてよろしいですか？")) {
			let imageGroups = imagesField.querySelectorAll(".image-group");
			imageGroups.forEach((elem, index) => {
				if (elem.classList.contains("selected")) {
					originalDownload(imgBuff[elem.getAttribute("data-img")], index)
				}
			})
		}
	})
	multipleDLBtnResize.addEventListener("click", () => {
		if (confirm("選択画像を[ 指定サイズ ]でリサイズして一括ダウンロードしてよろしいですか？")) {
			let imageGroups = imagesField.querySelectorAll(".image-group");
			imageGroups.forEach((elem, index) => {
				if (elem.classList.contains("selected")) {

					resizeDownload(imgBuff[elem.getAttribute("data-img")], index)
				}
			})
		}
	})
	imageCountElement.textContent = `現在取得中...`;
	maxButton.addEventListener("click", () => {
		loadImages(currentIndex, imageArray.length - 1)

	})
	changeSize.addEventListener("click", () => {
		imagesField.innerHTML = ""
		currentIndex = 0;
		loadImages(currentIndex, 10)
	})
	modeBtns.forEach((modeElm) => {
		modeElm.addEventListener("click", (ev) => {
			//　現在のアクティブなら何もしない
			if (ev.target.getAttribute("data-mode") === modeParent.getAttribute("data-mode")) {
				return
			}
			// 異なったら変更
			mode = ev.target.getAttribute("data-mode");
			modeParent.setAttribute("data-mode", mode);
		})
	})
	chrome.runtime.sendMessage({resizeSize: true, type: "get"})
		.then(size => {
			let width = size.width;
			let height = size.height;
			widthInput.value = parseInt(width);
			heightInput.value = parseInt(height);

			heightInput.addEventListener("change", () => {
				let inputHeight = parseInt(heightInput.value)
				if (inputHeight && inputHeight > 0) {
					size.height = inputHeight;
					chrome.runtime.sendMessage({resizeSize: true, type: "set", size})
				}

			})
			widthInput.addEventListener("change", () => {
				let inputWidth = parseInt(widthInput.value)
				if (inputWidth && inputWidth > 0) {
					size.width = inputWidth;
					chrome.runtime.sendMessage({resizeSize: true, type: "set", size})
				}

			})
		})

	chrome.runtime.sendMessage({captureImg: true})
		.then(result => {
			imageArray = result;
			imagesField.innerHTML = ""
			imageCountElement.textContent = `開いているページで取得できた画像は${imageArray.length}件です。`;


			loadImages(currentIndex, 10);
		}).catch(result => {
		imageCountElement.textContent = `取得中に失敗しました`;

	})
	nextButton.addEventListener('click', () => {
		loadImages(currentIndex, 10);
	});


	function loadImage(src) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.src = src;
			img.onload = () => resolve(img);
			img.onerror = reject;
		});
	}

	function createImageGroup(src, index) {
		const wrapper = document.createElement('div');
		wrapper.classList.add('image-group');

		const canvas = document.createElement('canvas');
		const headerWrap = document.createElement('div');
		headerWrap.classList.add('image-group_header')
		const canvasWarp = document.createElement('div');
		const multipleActiveImg = document.createElement("img");
		multipleActiveImg.setAttribute("data-mode", "multiple");
		multipleActiveImg.src = `${chrome.runtime.getURL("img/check.png")}`
		multipleActiveImg.classList.add("multipleActiveImg")

		canvasWarp.appendChild(multipleActiveImg);
		canvasWarp.classList.add("canvas-wrap");
		const link = document.createElement('a');
		link.href = src;
		link.target = '_blank';
		link.textContent = '元画像を表示';

		const originalSizeEvBtn = document.createElement("div");
		originalSizeEvBtn.textContent = `元画像DL`;
		const customSizeEvBtn = document.createElement("div");
		customSizeEvBtn.textContent = `リサイズDL`;
		const singleEventBtnsWrap = document.createElement("div");
		singleEventBtnsWrap.appendChild(originalSizeEvBtn);
		singleEventBtnsWrap.appendChild(customSizeEvBtn);
		singleEventBtnsWrap.classList.add("eventBtnWrap")
		singleEventBtnsWrap.classList.add("modeBtns")
		singleEventBtnsWrap.setAttribute("data-mode", "single");
		const multipleText = document.createElement("div");
		multipleText.textContent = `画像クリックで選択`;
		const multipleEventBtnsWrap = document.createElement("div");
		multipleEventBtnsWrap.appendChild(multipleText);
		multipleEventBtnsWrap.classList.add("multipleTxt");
		multipleEventBtnsWrap.setAttribute("data-mode", "multiple")
		multipleEventBtnsWrap.classList.add("modeBtns")


		const imgIndex = document.createElement('span');
		imgIndex.textContent = `${index + 1}.`
		headerWrap.appendChild(imgIndex);
		headerWrap.appendChild(link)
		wrapper.appendChild(headerWrap)
		canvasWarp.appendChild(canvas)
		wrapper.appendChild(canvasWarp);
		const optionWrap = document.createElement("div");
		const sizeWrap = document.createElement('div');
		sizeWrap.classList.add("informationTableWrapper")
		optionWrap.classList.add("option-field");
		wrapper.appendChild(optionWrap)
		optionWrap.appendChild(singleEventBtnsWrap);
		optionWrap.appendChild(multipleEventBtnsWrap);
		optionWrap.appendChild(sizeWrap);
		sizeWrap.innerHTML = informationTableHTMLStr("-", "-", "-")
		loadImage(src).then(img => {
			fetch(src).then(res => res.blob()).then(blob => sizeWrap.innerHTML =
				informationTableHTMLStr(img.height, img.width, blob.size));
			wrapper.setAttribute("data-img", src);
			imgBuff[src] = img;
			const aspectRatio = img.width / img.height;
			const height = 90;// parseInt(heightInput.value, 10);
			const width = 120;//parseInt(widthInput.value, 10);
			const scale = Math.min(width / img.width, height / img.height);

			canvas.width = img.width * scale;
			canvas.height = img.height * scale;

			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			customSizeEvBtn.addEventListener('click', () => {
				resizeDownload(img, index)
			});
			originalSizeEvBtn.addEventListener('click', () => {
				originalDownload(img, index)
			});

			canvasWarp.addEventListener("click", (ev) => {
				if (mode !== MODE_MULTIPLE) {
					return
				}
				let imgg = canvasWarp.closest(".image-group")
				if (imgg.classList.contains("selected")) {
					imgg.classList.remove("selected")
				} else {
					imgg.classList.add("selected")
				}
			})
		});

		return wrapper;
	}

	function resizeDownload(img, index) {
		const canvas = document.createElement('canvas');
		const height = parseInt(heightInput.value, 10);
		const width = parseInt(widthInput.value, 10);
		const scale = Math.min(width / img.width, height / img.height);

		canvas.width = img.width * scale;
		canvas.height = img.height * scale;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		const dataURL = canvas.toDataURL('image/png');
		downloadImage(dataURL, `${folder.value ? folder.value + "/" : ""}${file.value ? file.value : "image"}` + (index + 1) + ".png")


	}

	function originalDownload(img, index) {
		const canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		const dataURL = canvas.toDataURL('image/png');
		downloadImage(dataURL, `${folder.value ? folder.value + "/" : ""}${file.value ? file.value : "image"}` + (index + 1) + ".png")
	}

	function informationTableHTMLStr(height, width, byte) {
		return `<table class="informationTable">
					<thead></thead>
					<tbody>
						<tr><th>縦</th><td>${height}px</td><th>横</th><td>${width}px</td></tr>
						<tr><th colspan="2">容量</th><td colspan="2">${byte}Byte</td></tr>	
					</tbody></table>`
	}

	function downloadImage(blobURL, filename) {
		chrome.downloads.download({
			url: blobURL,
			filename: filename,
			// saveAs: true
		}, function (downloadId) {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
			} else {
				console.log('Download started with ID: ', downloadId);
			}
		});
	}


	function loadImages(start, count) {
		const endIndex = Math.min(start + count, imageArray.length);

		for (let i = start; i < endIndex; i++) {
			const imageGroup = createImageGroup(imageArray[i], i);
			imagesField.appendChild(imageGroup);
		}

		currentIndex = endIndex;
		nextButton.textContent = `次の${Math.min(10, imageArray.length - endIndex)}件を表示`;

		if (currentIndex >= imageArray.length) {
			nextButton.style.display = 'none';
			maxButton.style.display = 'none';
		}
	}
})()