var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SkillEffShow = (function (_super) {
    __extends(SkillEffShow, _super);
    function SkillEffShow() {
        var _this = _super.call(this) || this;
        _this.imgArr = [];
        return _this;
    }
    SkillEffShow.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var _loop_1 = function (i) {
            var img = new eui.Image();
            img.source = "effline_png";
            this_1.addChild(img);
            img.x = -(Math.random() * 100 + 500);
            img.alpha = Math.random();
            img.y = Math.random() * StageUtils.inst().getHeight();
            this_1.imgArr.push(img);
            var tx = StageUtils.inst().getWidth() + Math.random() * 200;
            var rx = -(Math.random() * 100 + 200);
            var time = (Math.random() * 1000 + 600) >> 0;
            egret.Tween.get(img, { loop: true }).to({ x: tx }, time).call(function () { img.alpha = 1; }, this_1).to({ x: rx }, time);
        };
        var this_1 = this;
        for (var i = 0; i < 20; i++) {
            _loop_1(i);
        }
        var roleImg = new eui.Image();
        roleImg.source = param[0].icon;
        // roleImg.source = "role_eff_1_png";
        this.addChild(roleImg);
        roleImg.bottom = 0;
        roleImg.left = -530;
        var icon = new eui.Image();
        icon.source = "" + SKILL_EFF_ICON + param[0].pic + ".png";
        this.addChild(icon);
        icon.verticalCenter = 0;
        icon.right = 200;
        icon.alpha = 0;
        icon.scaleX = icon.scaleY = 5;
        egret.Tween.get(roleImg).to({ left: 20 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(roleImg);
            egret.Tween.get(icon).to({ alpha: 0.8, scaleX: 2, scaleY: 2 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(icon);
                var timeout = setTimeout(function () {
                    clearTimeout(timeout);
                    ViewManager.inst().close(SkillEffShow);
                }, 600);
            }, _this);
        }, this);
    };
    SkillEffShow.prototype.close = function () {
        for (var i = 0; i < this.imgArr.length; i++) {
            egret.Tween.removeTweens(this.imgArr[i]);
        }
        this.imgArr = [];
    };
    return SkillEffShow;
}(BaseEuiView));
__reflect(SkillEffShow.prototype, "SkillEffShow");
ViewManager.inst().reg(SkillEffShow, LayerManager.UI_Pop);
//# sourceMappingURL=SkillEffShow.js.map