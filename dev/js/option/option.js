import {TemplateTextReplacer} from "../common/TemplateTextReplacer";
import {InputInsertTemplateText} from "../common/InputInsertTemplateText";

(()=>{
	let templateTextToDateReplacer = new TemplateTextReplacer();
	let formats  =TemplateTextReplacer.DATE_FORMAT;
	let formatInsertTarget = document.querySelector("#dateFormatList");
	let formatsHtmlStr = "";
	formats.forEach(formatData=>{
		formatsHtmlStr+=createFormatElementString(formatData);
	})
	formatInsertTarget.innerHTML = formatsHtmlStr;
	let indexFormats = TemplateTextReplacer.INDEX_FORMAT;
	let indexFormatInsertTarget = document.querySelector("#indexFormatList");
	let indexFormatHtmlStr = "";
	indexFormats.forEach(formatData=>{
		indexFormatHtmlStr+=createFormatElementString(formatData)
	})
	indexFormatInsertTarget.innerHTML = indexFormatHtmlStr;
	let newFormatField = document.querySelector("#newFormatText");
	let inputInsertTemplateText = new InputInsertTemplateText();
	document.body.addEventListener("click",(ev)=>{
		let formatBtn = ev.target.closest(".formats_item");
		if(formatBtn){
			let formatKey = formatBtn.getAttribute("data-format");
			inputInsertTemplateText.insert(newFormatField,formatKey);
		}
	})
	function createFormatElementString(formatData ={key:"",name:"",format:""}){
		return `<div class="formats_item" data-format="${formatData.key}"><span class="format_name">${formatData.name}</span></div>`;
	}
})()