var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 14/12/18.
 * String manipulation tool class
 */
var StringUtils = (function () {
    function StringUtils() {
    }
    /**
     * Remove space before and after
     * @param str
     * @returns {string}
     */
    StringUtils.trimSpace = function (str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    /**
     * Get string length，Chinese is2
     * @param str
     */
    StringUtils.getStringLength = function (str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    };
    /**
     * Determine whether a string contains Chinese
     * @param str
     * @returns {boolean}
     */
    StringUtils.isChinese = function (str) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if (!reg.test(str)) {
            return true;
        }
        return false;
    };
    /**
     * Get byte length of string
     * A Chinese calculation2Two bytes
     * @param str
     * @return
     */
    StringUtils.strByteLen = function (str) {
        var byteLen = 0;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            byteLen += str.charCodeAt(i) >= 0x7F ? 2 : 1;
        }
        return byteLen;
    };
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
    StringUtils.complementByChar = function (str, length, char, ignoreHtml) {
        if (char === void 0) { char = " "; }
        if (ignoreHtml === void 0) { ignoreHtml = true; }
        var byteLen = this.strByteLen(ignoreHtml ? str.replace(StringUtils.HTML, "") : str);
        return str + this.repeatStr(char, length - byteLen);
    };
    /**
     * Duplicate specified stringcountsecond
     * @param str
     * @param count
     * @return
     *
     */
    StringUtils.repeatStr = function (str, count) {
        var s = "";
        for (var i = 0; i < count; i++) {
            s += str;
        }
        return s;
    };
    /**
     * Add color to text
     * */
    StringUtils.addColor = function (content, color) {
        var colorStr;
        if (typeof (color) == "string")
            colorStr = String(color);
        else if (typeof (color) == "number")
            colorStr = Number(color).toString(10);
        return "<font color=\"" + colorStr + "\">" + content + "</font>";
    };
    /**
     * This function hasn't been changed,To replaceaddColor
     *
     */
    StringUtils.addColor1 = function (content, color) {
        var obj = new Object;
        obj["style"] = new Object;
        obj["text"] = content;
        obj["textColor"] = Number(color).toString(16);
        return obj;
    };
    StringUtils.substitute = function (str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var reg = RegExpUtil.REPLACE_STRING;
        var replaceReg = str.match(reg);
        if (replaceReg && replaceReg.length) {
            var len = replaceReg.length;
            for (var t_i = 0; t_i < len; t_i++) {
                str = str.replace(replaceReg[t_i], rest[t_i]);
            }
        }
        return str;
    };
    /**
     * Match replacement string
     * @param String to match replacement
     * @param Matching string
     * @param String to replace with
     * **/
    StringUtils.replaceStr = function (src, tar, des) {
        if (src.indexOf(tar) == -1)
            return src;
        var list = src.split(tar);
        return list[0] + des + list[1];
    };
    /**
     * Match replacement color string
     * @param String to match replacement
     * @param Need to match target color
     * @return Replaced string
     * **/
    StringUtils.replaceStrColor = function (src, color) {
        // src = "0x102030asdas0xff1536tttt0xff15370x888888aabb0x789456";//test
        var tci = src.indexOf("0x");
        var tci2 = tci;
        var arghr2 = "";
        var arghr3 = "";
        while (tci2 != -1) {
            arghr2 = src.substring(tci, tci + 8);
            src = src.replace(arghr2, color);
            tci += 8;
            arghr3 = src.substring(tci);
            tci2 = arghr3.indexOf("0x");
            tci = tci + tci2;
        }
        return src;
    };
    /**
     * String matching splicing
     * @param String to be spliced
     * @param Match item
     * @returns {string}
     */
    StringUtils.replace = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < args.length; i++) {
            str = str.replace("%s", args[i] + "");
        }
        return str;
    };
    /**
     * Specify a string based on a regular match Returns an array of all data in a string
     * @param String to get number
     * @param Regular expression rules(Default value)
     * **/
    StringUtils.getStrByRegExp = function (src, reg) {
        if (reg === void 0) { reg = /\d+/g; }
        var newStrlist = [];
        var newStr = src.replace(reg, function () {
            //Generated internally when a method is called this and arguments
            // debug.log("arguments[0] = "+arguments[0]);//Matching string value
            // debug.log("arguments[1] = "+arguments[1]);//String index
            // debug.log("arguments[2] = "+arguments[2]);//Original string
            //After finding numbers，You can do other things with numbers
            newStrlist.push(arguments[0]);
            if (typeof arguments[0] == "number")
                return arguments[0].toString();
            else
                return arguments[0];
        });
        // debug.log("newStrlist = "+newStrlist);
        return newStrlist;
    };
    StringUtils.ChineseToNumber = function (chnStr) {
        var rtn = 0;
        var section = 0;
        var number = 0;
        var secUnit = false;
        var str = chnStr.split('');
        for (var i = 0; i < str.length; i++) {
            var num = StringUtils.chnNumCharCN[str[i]];
            if (typeof num !== 'undefined') {
                number = num;
                if (i === str.length - 1) {
                    section += number;
                }
            }
            else {
                var unit = StringUtils.chnNameValueCN[str[i]].value;
                secUnit = StringUtils.chnNameValueCN[str[i]].secUnit;
                if (secUnit) {
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                }
                else {
                    section += (number * unit);
                }
                number = 0;
            }
        }
        return rtn + section;
    };
    StringUtils.NumberToChinese = function (num) {
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;
        var chnNumChar = StringUtils.chnNumChar;
        var chnUnitSection = StringUtils.chnUnitSection;
        if (num === 0) {
            return chnNumChar[0];
        }
        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
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
    };
    //Less than 10000 units
    StringUtils.SectionToChinese = function (section) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        var chnNumChar = StringUtils.chnNumChar;
        var chnUnitChar = StringUtils.chnUnitChar;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }
            else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    };
    StringUtils.HTML = /<[^>]+>/g;
    /**
     * Chinese to digital
     * Example:
     * StringUtils.ChineseToNumber(three hundred and forty-three) = 343 (number）
     * */
    StringUtils.chnNumCharCN = {
        "Zero": 0,
        "One": 1,
        "Two": 2,
        "Three": 3,
        "Four": 4,
        "Five": 5,
        "Six": 6,
        "Seven": 7,
        "Eight": 8,
        "Nine": 9
    };
    StringUtils.chnNameValueCN = {
        "Ten": { value: 10, secUnit: false },
        "hundred": { value: 100, secUnit: false },
        "thousand": { value: 1000, secUnit: false },
        "ten thousand": { value: 10000, secUnit: true },
        "Billion": { value: 100000000, secUnit: true }
    };
    /**
     * Digital to Chinese
     * Example:
     * StringUtils.NumberToChinese(325) = "three hundred and twenty-five" (string）
     * */
    StringUtils.chnNumChar = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    StringUtils.chnUnitSection = ["", "ten thousand", "Billion", "Trillions", "Billion"];
    StringUtils.chnUnitChar = ["", "Ten", "hundred", "thousand"];
    return StringUtils;
}());
__reflect(StringUtils.prototype, "StringUtils");
//# sourceMappingURL=StringUtils.js.map