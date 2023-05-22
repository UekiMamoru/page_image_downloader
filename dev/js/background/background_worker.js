const IMAGE_PATTERN_KEY = "ipk";

const DEF_IMAGE_PATTERN_LIST = [
	{name: "デフォルト", format: "image{{index}}", hash: "デフォルト:image{{index}}", active: true}
];

async function sendMessageToActiveTab(message) {
	return new Promise(resolve => {

		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			const activeTab = tabs[0];
			if (activeTab) {
				chrome.tabs.sendMessage(activeTab.id, message).then(
					resolve
				);
			}
		});
	})
}

// 例として、何らかのイベントが発生した際にメッセージを送信することを想定
chrome.runtime.onInstalled.addListener(() => {
	const message = {
		type: 'hello',
		payload: 'Hello from background worker!'
	};

	sendMessageToActiveTab(message);
});


// contentScript.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.hasOwnProperty("captureImg") && message.captureImg) {
		sendMessageToActiveTab({captureImgList: true})
			.then(result => {
				let imgPathList = result.imgPathList ? result.imgPathList : [];
				sendResponse(imgPathList)
			})
	} else if (message.hasOwnProperty("userData") && message.userData) {
		if (message.type === "set") {

			chrome.storage.local.set({}, () => {
			})
		} else if (message.type === "get") {
			let list = [message.key]
			chrome.storage.local.get(list, (result) => {
				sendResponse(result[message.key]);
			})

		}
	} else if (message.hasOwnProperty("resizeSize") && message.resizeSize) {
		if (message.type === "set") {
			chrome.storage.local.set({resizeSize: message.size}, () => {
			})
		} else if (message.type === "get") {
			let list = ["resizeSize"]
			chrome.storage.local.get(list, (result) => {
				let resizeSize = result["resizeSize"]
				if (!resizeSize) {
					resizeSize = {width: 120, height: 90}
				}
				sendResponse(resizeSize);
			})
		}

	} else if (message.hasOwnProperty("fileFormats")) {
		editFileFormat(message, sender, sendResponse)
	}
	return true;
});

function editFileFormat(message, sender, sendResponse) {
	let type = message.type;

	if (type === "get") {
		let list = [IMAGE_PATTERN_KEY]
		chrome.storage.local.get(list, (result) => {
			let data = result[IMAGE_PATTERN_KEY]
			sendResponse(data)
		})

	} else if (type === "update") {
		chrome.storage.local.set({[IMAGE_PATTERN_KEY]: message.data}, () => {
			sendResponse(message.data)
		})
	} else if (type === "add") {

		let list = [IMAGE_PATTERN_KEY]
		chrome.storage.local.get(list, (result) => {
			let data = result[IMAGE_PATTERN_KEY]
			data.push(message.data);
			chrome.storage.local.set({[IMAGE_PATTERN_KEY]: data}, () => {
				sendResponse(data)
			})
		})
	} else if (type === "delete") {

		// let list = [IMAGE_PATTERN_KEY]
		// chrome.storage.local.get(list, (result) => {
		// 	let data = result[IMAGE_PATTERN_KEY]
		// 	datadata.push(message.data);
		// 	chrome.storage.local.set({[IMAGE_PATTERN_KEY]: data}, () => {
		// 		sendResponse(data)
		// 	})
		// })
	}
}

// インストール時にファイルフォーマットの設定デフォルトデータ投入
// 起動時、アップデート時にファイルフォーマットのデフォルト設定データが無かった場合、デフォルトデータを挿入する処理
//
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === "install") {
		// ここでインストール時の処理を行います。
		initImageNamePattern()
	} else if (details.reason === "update") {
		// ここでアップデート時の処理を行います。
		let list = [IMAGE_PATTERN_KEY]
		chrome.storage.local.get(list, (result) => {
			let data = result[IMAGE_PATTERN_KEY]
			if (!data) {
				initImageNamePattern()
			}
		})
	}
});

function initImageNamePattern() {
	chrome.storage.local.set({[IMAGE_PATTERN_KEY]: DEF_IMAGE_PATTERN_LIST}, () => {
	})
}