/**
 * Created by yangsong on 14/12/18.
 * String manipulation tool class
 */
class StringUtils {

	private static HTML: RegExp = /<[^>]+>/g;

	/**
	 * Remove space before and after
	 * @param str
	 * @returns {string}
	 */
	public static trimSpace(str: string): string {
		return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
	}

	/**
	 * Get string length，Chinese is2
	 * @param str
	 */
	public static getStringLength(str: string): number {
		let strArr = str.split("");
		let length = 0;
		for (let i = 0; i < strArr.length; i++) {
			let s = strArr[i];
			if (this.isChinese(s)) {
				length += 2;
			} else {
				length += 1;
			}
		}
		return length;
	}

	/**
	 * Determine whether a string contains Chinese
	 * @param str
	 * @returns {boolean}
	 */
	public static isChinese(str: string): boolean {
		let reg = /^[\u4E00-\u9FA5]+$/;
		if (!reg.test(str)) {
			return true;
		}
		return false;
	}


	/**
	 * Get byte length of string
	 * A Chinese calculation2Two bytes
	 * @param str
	 * @return
	 */
	public static strByteLen(str: string): number {
		let byteLen: number = 0;
		let strLen: number = str.length;
		for (let i: number = 0; i < strLen; i++) {
			byteLen += str.charCodeAt(i) >= 0x7F ? 2 : 1;
		}
		return byteLen;
	}

	/**
	 * Complement string
	 * Because byte length is used here（A Chinese calculation2Byte）
	 * So the specified length refers to the byte length，The characters to be filled are calculated by one byte
	 * If the filled characters are in Chinese, the result will be incorrect，But there's no detection of padding here
	 * @param str Source string
	 * @param length Specified byte length
	 * @param char Padded characters
	 * @param ignoreHtml Is it ignored?HTMLCode，Default istrue
	 * @return
	 *
	 */
	public static complementByChar(str: string, length: number, char: string = " ", ignoreHtml: boolean = true): string {
		let byteLen: number = this.strByteLen(ignoreHtml ? str.replace(StringUtils.HTML, "") : str);
		return str + this.repeatStr(char, length - byteLen);
	}

	/**
	 * Duplicate specified stringcountsecond
	 * @param str
	 * @param count
	 * @return
	 *
	 */
	public static repeatStr(str: string, count: number): string {
		let s: string = "";
		for (let i: number = 0; i < count; i++) {
			s += str;
		}
		return s;
	}

	/**
	 * Add color to text
	 * */
	public static addColor(content: string, color: any): string {
		let colorStr: string;
		if (typeof (color) == "string")
			colorStr = String(color)
		else if (typeof (color) == "number")
			colorStr = Number(color).toString(10);
		return `<font color=\"${colorStr}\">${content}</font>`;
	}
	/**
	 * This function hasn't been changed,To replaceaddColor
	 * 
	 */
	public static addColor1(content: string, color: any): Object {
		let obj: Object = new Object;
		obj["style"] = new Object;
		obj["text"] = content;
		obj["textColor"] = Number(color).toString(16);

		return obj;
	}

	public static substitute(str: string, ...rest): string {
		let reg: RegExp = RegExpUtil.REPLACE_STRING;
		let replaceReg: any[] = str.match(reg);
		if (replaceReg && replaceReg.length) {
			let len: number = replaceReg.length;
			for (let t_i: number = 0; t_i < len; t_i++) {
				str = str.replace(replaceReg[t_i], rest[t_i]);
			}
		}
		return str;
	}

	/**
	 * Match replacement string
	 * @param String to match replacement
	 * @param Matching string
	 * @param String to replace with
	 * **/
	public static replaceStr(src:string,tar:string,des:string){
		if( src.indexOf(tar) == -1 )
			return src;

		let list = src.split(tar);
		return list[0] + des + list[1];
	}

	/**
	 * Match replacement color string
	 * @param String to match replacement
	 * @param Need to match target color
	 * @return Replaced string
	 * **/
	public static replaceStrColor(src:string,color:string):string{
		// src = "0x102030asdas0xff1536tttt0xff15370x888888aabb0x789456";//test
		let tci = src.indexOf("0x");
		let tci2 = tci;
		let arghr2 = "";
		let arghr3 = "";
		while( tci2 != -1 ){
			arghr2 = src.substring(tci,tci+8);
			src = src.replace(arghr2,color);
			tci += 8;
			arghr3 = src.substring(tci);
			tci2 = arghr3.indexOf("0x");
			tci = tci+tci2;
		}
		return src;
	}

	/**
	 * String matching splicing
	 * @param String to be spliced
	 * @param Match item
	 * @returns {string}
	 */
	public static replace(str:string,...args: any[]):string {
		for( let i = 0;i < args.length;i++ ){
			str = str.replace("%s",args[i]+"");
		}
		return str;
	}

	/**
	 * Specify a string based on a regular match Returns an array of all data in a string
	 * @param String to get number
	 * @param Regular expression rules(Default value)
	 * **/
	public static getStrByRegExp(src:string,reg:RegExp = /\d+/g):string[]{
		let newStrlist = [];
		let newStr = src.replace(reg, function():string {

			//Generated internally when a method is called this and arguments
			// debug.log("arguments[0] = "+arguments[0]);//Matching string value
			// debug.log("arguments[1] = "+arguments[1]);//String index
			// debug.log("arguments[2] = "+arguments[2]);//Original string

			//After finding numbers，You can do other things with numbers
			newStrlist.push(arguments[0]);
			if( typeof arguments[0] == "number" )//Change the original value
				return arguments[0].toString();
			else
				return arguments[0]
		});

		// debug.log("newStrlist = "+newStrlist);
		return newStrlist
	}

	/**
	 * Chinese to digital
	 * Example:
	 * StringUtils.ChineseToNumber(three hundred and forty-three) = 343 (number）
	 * */
	private static chnNumCharCN = {
		"Zero":0,
		"One":1,
		"Two":2,
		"Three":3,
		"Four":4,
		"Five":5,
		"Six":6,
		"Seven":7,
		"Eight":8,
		"Nine":9
	};
	private static chnNameValueCN = {
		"Ten":{value:10, secUnit:false},
		"hundred":{value:100, secUnit:false},
		"thousand":{value:1000, secUnit:false},
		"ten thousand":{value:10000, secUnit:true},
		"Billion":{value:100000000, secUnit:true}
	}
	public static ChineseToNumber(chnStr:string){
		let rtn = 0;
		let section = 0;
		let number = 0;
		let secUnit = false;
		let str = chnStr.split('');

		for(let i = 0; i < str.length; i++){
			let num = StringUtils.chnNumCharCN[str[i]];
			if(typeof num !== 'undefined'){
				number = num;
				if(i === str.length - 1){
					section += number;
				}
			}else{
				let unit = StringUtils.chnNameValueCN[str[i]].value;
				secUnit = StringUtils.chnNameValueCN[str[i]].secUnit;
				if(secUnit){
					section = (section + number) * unit;
					rtn += section;
					section = 0;
				}else{
					section += (number * unit);
				}
				number = 0;
			}
		}
		return rtn + section;
	}
	/**
	 * Digital to Chinese
	 * Example:
	 * StringUtils.NumberToChinese(325) = "three hundred and twenty-five" (string）
	 * */
	private static chnNumChar = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
	private static chnUnitSection = ["","ten thousand","Billion","Trillions","Billion"];
	private static chnUnitChar = ["","Ten","hundred","thousand"];
	public static NumberToChinese(num:number){
		let unitPos = 0;
		let strIns = '', chnStr = '';
		let needZero = false;
		let chnNumChar = StringUtils.chnNumChar;
		let chnUnitSection = StringUtils.chnUnitSection;
		if(num === 0){
			return chnNumChar[0];
		}

		while(num > 0){
			let section = num % 10000;
			if(needZero){
				chnStr = chnNumChar[0] + chnStr;
			}
			strIns = StringUtils.SectionToChinese(section);
			strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
			chnStr = strIns + chnStr;
			needZero = (section < 1000) && (section > 0);
			num = Math.floor(num / 10000);
			unitPos++;
		}

		return chnStr;
	}
	//Less than 10000 units
	private static SectionToChinese(section:number){
		let strIns = '', chnStr = '';
		let unitPos = 0;
		let zero = true;
		let chnNumChar = StringUtils.chnNumChar;
		let chnUnitChar = StringUtils.chnUnitChar;
		while(section > 0){
			let v = section % 10;
			if(v === 0){
				if(!zero){
					zero = true;
					chnStr = chnNumChar[v] + chnStr;
				}
			}else{
				zero = false;
				strIns = chnNumChar[v];
				strIns += chnUnitChar[unitPos];
				chnStr = strIns + chnStr;
			}
			unitPos++;
			section = Math.floor(section / 10);
		}
		return chnStr;
	}
}