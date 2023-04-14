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
	}
	return true;
});

