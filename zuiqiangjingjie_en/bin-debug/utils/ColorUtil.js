var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Color related processing tools
 */
var ColorUtil = (function () {
    function ColorUtil() {
    }
    // public static 
    /**
     * Merge color values
     */
    ColorUtil.mergeARGB = function ($a, $r, $g, $b) {
        return ($a << 24) | ($r << 16) | ($g << 8) | $b;
    };
    /**
     * Get the color value of a single channel
     * @param $argb Color value
     * @param $channel Color channel constant to get
     */
    ColorUtil.getChannel = function ($argb, $channel) {
        switch ($channel) {
            case this.ALPHA:
                return ($argb >> 24) & 0xff;
            case this.RED:
                return ($argb >> 16) & 0xff;
            case this.GREEN:
                return ($argb >> 8) & 0xff;
            case this.BLUE:
                return $argb & 0xff;
        }
        return 0;
    };
    /**
     * Color value representation conversionnumberturnString
     * @param $number Need to be convertednumbervalue
     * @param $prefix String prefix
     */
    ColorUtil.numberToString = function ($number, $prefix) {
        if ($prefix === void 0) { $prefix = "#"; }
        return $prefix + $number.toString(16);
    };
    ColorUtil.ALPHA = 0xf3311e00;
    ColorUtil.RED = 0xf3311e;
    ColorUtil.GREEN = 0x35e62d;
    ColorUtil.BLUE = 0x0000FF;
    ColorUtil.NORMAL_COLOR = 0xD1C28F;
    ColorUtil.RED_COLOR_N = 0xF3311E;
    ColorUtil.GREEN_COLOR_N = 0x35E62D;
    ColorUtil.GRAY_COLOR2 = 0x838383;
    ColorUtil.WHITE_COLOR2 = 0xD1C28F;
    ColorUtil.WHITE_COLOR = "#D1C28F";
    ColorUtil.RED_COLOR = "#F3311E";
    ColorUtil.GREEN_COLOR = "#35E62D";
    ColorUtil.GRAY_COLOR = "#8B898B";
    ColorUtil.COLOR_STR = ["white", "green", "purple", "orange", "red", "golden"];
    ColorUtil.ROLENAME_COLOR_YELLOW = 0xFFCE0B;
    ColorUtil.ROLENAME_COLOR_GREEN = 0x35E62D;
    ColorUtil.ROLENAME_COLOR_NORMAL = 0x35E62D;
    ColorUtil.JUEWEI_COLOR = [
        "#e2dfd4",
        "#35e62d",
        "#81adff",
        "#e27dff",
        "#ff9649",
        "#fc5959",
        "#ffd93f",
        "#ffff00"
    ];
    return ColorUtil;
}());
__reflect(ColorUtil.prototype, "ColorUtil");
//# sourceMappingURL=ColorUtil.js.map