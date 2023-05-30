import {TemplateTextReplacer} from "../common/TemplateTextReplacer";
import {InputInsertTemplateText} from "../common/InputInsertTemplateText";

(() => {
	const MAX_TEMPLATE_SIZE = 5;
	const ERROR_PERFECT_MATCH_REG_EXPS =
		[/^COM0$/i, /^COM1$/i, /^COM2$/i, /^COM3$/i, /^COM4$/i, /^COM5$/i, /^COM6$/i, /^COM7$/i, /^COM8$/i, /^COM9$/i, /^LPT0$/i, /^LPT1$/i, /^LPT2$/i, /^LPT3$/i, /^LPT4$/i, /^LPT5$/i, /^LPT6$/i, /^LPT7$/i, /^LPT8$/i, /^LPT9$/i, /^CON$/i, /^PRN$/i, /^AUX$/i, /^NUL$/i, /^CLOCK\$$/i];
	const ERROR_SYMBOLS = ["\\", "/", ":", "*", "?", '"', ">", "<", "|"];
	let templateTextToDateReplacer = new TemplateTextReplacer();
	let formats = TemplateTextReplacer.DATE_FORMAT;
	let tempFormatObjects = []
	let formatInsertTarget = document.querySelector("#dateFormatList");
	let formatsHtmlStr = "";
	formats.forEach(formatData => {
		formatsHtmlStr += createFormatElementString(formatData);
	})
	formatInsertTarget.innerHTML = formatsHtmlStr;
	let indexFormats = TemplateTextReplacer.INDEX_FORMAT;
	let indexFormatInsertTarget = document.querySelector("#indexFormatList");
	let indexFormatHtmlStr = "";
	indexFormats.forEach(formatData => {
		indexFormatHtmlStr += createFormatElementString(formatData)
	})
	indexFormatInsertTarget.innerHTML = indexFormatHtmlStr;
	let newFormatField = document.querySelector("#newFormatText");
	let inputInsertTemplateText = new InputInsertTemplateText();
	document.body.addEventListener("click", (ev) => {
		let formatBtn = ev.target.closest(".formats_item");
		if (formatBtn) {
			let formatKey = formatBtn.getAttribute("data-format");
			inputInsertTemplateText.insert(newFormatField, formatKey);
		}
	})

	const addFormat = document.getElementById("addFormat");
	addFormat.addEventListener("click", () => {

		if (tempFormatObjects.length >= MAX_TEMPLATE_SIZE) {
			alert(`${MAX_TEMPLATE_SIZE}件までしか登録できません。`);
			return;
		}
		// 入力されたフォーマットを保存
		let format =
			createFormatObject(
				document.getElementById("newFormatName")
				, document.getElementById("newFormatText"));
		if (format) {
			addFormatData(format).then(() => {
				createRegisterFormatList(tempFormatObjects);
				alert("登録しました。")
				document.getElementById("newFormatName").value = ""
				document.getElementById("newFormatText").value = ""

			})
		}
	})


	document.body.addEventListener("click", (ev) => {
		let target = ev.target.closest(".update")
		if (target) {
			// 入力されたフォーマットで保存
			let index = Number.parseInt(target.getAttribute("data-idx"));
			if (index === null) return;
			let parent = target.closest(".dataRow");
			if (!parent) return;
			let format = createFormatObject(
				parent.querySelector(".name"),
				parent.querySelector(".format"),
				parent.querySelector(".isActivePattern")
			)
			if (format) {
				updateFormatData(format, index).then(() => {
					createRegisterFormatList(tempFormatObjects);
				});
			}
		}
	})

	document.body.addEventListener("click", (ev) => {

		let target = ev.target.closest(".delete")
		if (target) {
			// 入力されたフォーマットで保存
			let index = Number.parseInt(target.getAttribute("data-idx"));
			if (index === null) return;
			if (confirm("完全に削除してよろしいですか？")) {
				deleteFormatData(index).then(() => {
					createRegisterFormatList(tempFormatObjects);
				});
			}
		}
	})

	sendFormatData("get").then(list => {
		tempFormatObjects = list
		createRegisterFormatList(tempFormatObjects);
	})


	function createFormatObject(nameNode, dataNode, activeNode) {

		let format = {name: "", format: "", hash: "", active: false};
		format.name = nameNode.value;
		format.format = dataNode.value;
		// フォーマット名がなければエラー
		if (!format.name) {
			alert("登録する名称を入力してください。");
			return;
		}
		// フォーマットが無ければエラー
		if (!format.format) {
			alert("登録するフォーマットを入力してください。");
			return;
		}
		// フォーマットに禁止文字があるか
		if (checkErrorWord(format.format)) {
			alert(`フォーマット「${format.format}」では登録できません。`);
			return;
			;
		}
		format.format = replaceSymbols(format.format);
		// クリーンナップ後、フォーマットが無くなってしまったらエラー
		if (!format.format) {
			alert("登録禁止文字だけで登録しようとしています。フォーマットを見直してください。");
			return;
		}
		// 登録
		format.hash = createHash(format.name, format.format);
		if (activeNode) {
			format.active = activeNode.checked;
		}
		return format;
	}

	function createHash(name, val) {
		return `${name}:${val}`;
	}

	function checkErrorWord(str) {
		let isError = ERROR_PERFECT_MATCH_REG_EXPS.find(reg => reg.test(str))
		return isError;
	}


	async function sendFormatData(type = "get", data = []) {
		let result = await chrome.runtime.sendMessage({fileFormats: true, type, data});
		return result;
	}

	function replaceSymbols(str) {
		let temp = str;
		ERROR_SYMBOLS.forEach(symb => {
			temp = temp.replaceAll(symb, "");
		})
		return temp;
	}

	async function addFormatData(formatObject) {
		let list = await sendFormatData("add", formatObject);
		updateTmpFormatData(list);
		return;
	}

	async function updateFormatData(formatObject, index) {
		// 登録する情報と更新する情報が現在保持している情報と相違していた場合はエラーとする
		// 別タブの更新など

		let formatObjects = await sendFormatData("get")
		// ハッシュが違えばエラー
		if (formatObjects[index].hash !== tempFormatObjects[index].hash) {
			alert("更新しようとした情報が一致しませんでした。ページを更新してください。")
			return;
		}
		// アクティブだけは引き継ぐ
		formatObject.active = formatObjects[index].active;
		formatObjects[index] = formatObject
		// ハッシュが同じ名なので更新
		let list = await sendFormatData("update", formatObjects);
		updateTmpFormatData(list);
		return;
	}

	async function deleteFormatData(index) {
		// 一度フォーマットを取得する
		// フォーマットを取得したうえで、当該フォーマットが存在しなかった場合は他の画面で消しちゃってるのでエラーにして、
		// 再描画する
		let formatObjects = await sendFormatData("get")
		// ハッシュが違えばエラー
		if (formatObjects[index].hash !== tempFormatObjects[index].hash) {
			alert("削除しようとした情報が一致しませんでした。ページを更新してください。")
			return;
		}
		formatObjects.splice(index, 1);
		// ハッシュが同じ名なので更新
		let list = await sendFormatData("update", formatObjects);
		updateTmpFormatData(list);
		return;
	}


	function updateTmpFormatData(list) {
		tempFormatObjects = list;
	}

	function createFormatElementString(formatData = {key: "", name: "", format: ""}) {
		return `<div class="formats_item" data-format="${formatData.key}"><span class="format_name">${formatData.name}</span></div>`;
	}

	function createRegisterFormatList(formatDataList = []) {
		let insertTarget = document.getElementById("formatField").querySelector("tbody");
		clearFormatList();
		let insertHTMLStr = "";
		formatDataList.forEach((format, index) => {
			insertHTMLStr += createRegisterFormatElementString(format, index);
		})
		insertTarget.innerHTML = insertHTMLStr
	}

	function clearFormatList() {
		document.getElementById("formatField").querySelector("tbody").innerHTML = ""
	}

	function createRegisterFormatElementString(formatData = {name: "", active: false, format: ""}, index = 0) {
		return `
		
        <tr class="dataRow">
<!--            <td><label><input data-idx="${index}" class="isActivePattern" type="radio" name="useFormat" ${formatData.active ? "checked" : ""}></label></td>-->
            <td>${index + 1}.</td>
            <td><label><input type="text" class="name" data-name="" value="${formatData.name}"></label></td>
            <td><label><input type="text" class="format" value="${formatData.format}"></label></td>
            <td><div class="update" data-idx="${index}">更新</div></td>
            <td><div class="delete" data-idx="${index}">削除</div></td>
        </tr>
		
		`
	}
})()