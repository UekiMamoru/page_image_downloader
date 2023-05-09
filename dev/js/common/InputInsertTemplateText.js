
export class InputInsertTemplateText{
	insert(insertInputElement,insertText = ""){
		let val = insertInputElement.value
		let pos = insertInputElement.selectionStart
		if(pos === null)return ;
		let newVal = val.substring(0,pos)+insertText+val.substring(pos);
		insertInputElement.value = newVal;
	}

}