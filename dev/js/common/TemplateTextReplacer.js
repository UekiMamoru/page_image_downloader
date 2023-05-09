import { format, formatDistance, formatRelative, subDays } from 'date-fns';

export class TemplateTextReplacer {

	/**
	 *
	 * @returns {[{name: string, format: string, key: string}]}
	 * @constructor
	 */
	static get DATE_FORMAT (){
		return [
			{key:"{{yyyy}}",name:"年4桁",format:"yyyy"}
			,{key:"{{yy}}",name:"年2桁",format:"yy"}
			,{key:"{{MM}}",name:"月",format:"MM"}
			,{key:"{{dd}}",name:"日",format:"dd"}
			,{key:"{{HH}}",name:"時間(24)",format:"HH"}
			,{key:"{{mm}}",name:"分",format:"mm"}
			,{key:"{{ss}}",name:"秒",format:"ss"}
		];
	}

	/**
	 *
	 * @returns {[{name: string, format: string, key: string}]}
	 * @constructor
	 */
	static get INDEX_FORMAT(){
		return [
			{key:"{{index}}",name:"連番",format:"index"}
		];
	}

	constructor(targetDate = new Date()) {
		/**
		 *
		 * @type {Date}
		 * @private
		 */
		this._date = targetDate;
	}

	replaceDate(text){
		let formatList = TemplateTextReplacer.DATE_FORMAT;
		let replacedText = text
		formatList.forEach(pattern=>{
			let dateString = format(this._date,pattern.format)
			replacedText = replacedText.replaceAll(pattern.key,dateString);
		})
		return replacedText;
	}
	replaceIndex(text , idx){
		let formatList = TemplateTextReplacer.INDEX_FORMAT
		let replacedText = text;

		formatList.forEach(pattern=>{
			replacedText = replacedText.replaceAll(pattern.key,idx)
		})
		return replacedText;
	}
}