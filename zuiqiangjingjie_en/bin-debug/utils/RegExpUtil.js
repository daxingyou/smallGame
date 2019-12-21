var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Regularity used in the game
 * @author WynnLam
 *
 */
var RegExpUtil = (function () {
    function RegExpUtil() {
    }
    //Newline character\r
    RegExpUtil.LINE_BREAK = /\r+/g;
    //White space characters and“\”Regular number
    RegExpUtil.BLANK_REG = /[\s\\]/g;
    //8positionARGBcolour
    RegExpUtil.ARGB_COLOR = /[a-fA-F0-9]{8}/;
    //htmlregular
    RegExpUtil.HTML = /<[^>]+>/g;
    //Regular expressions without spaces
    RegExpUtil.DELETE_SPACE = /\s/g; //Remove space characters
    RegExpUtil.REPLACE_STRING = /%s/g; //Remove space characters
    RegExpUtil.NumericExp = /^\d+$/;
    RegExpUtil.NonNumericExp = /\D/;
    RegExpUtil.ActorNameExp = /^([\u4e00-\u9fa5]?\w?[^>|!@#$%&*\^\?]){1,48}$/;
    return RegExpUtil;
}());
__reflect(RegExpUtil.prototype, "RegExpUtil");
//# sourceMappingURL=RegExpUtil.js.map