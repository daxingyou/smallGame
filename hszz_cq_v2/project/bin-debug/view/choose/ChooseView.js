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
var ChooseView = (function (_super) {
    __extends(ChooseView, _super);
    function ChooseView() {
        var _this = _super.call(this) || this;
        _this.names = ["糖果仙女", "电力猫咪", "蜡笔小没良心", "马尾姑娘", "叮当不响", "╭⌒浮生若夢", "姐很高，也很傲", "秋心飘雪", "勿忘心安.", "手心里的回忆", "相见泪染妆",
            "嘴角、一丝笑", "剩夏光年", "旧约i", "萌小姐i", "梦中的梦", "风吹辫辫飘", "半度微风", "和你遇见", "独遗酒盏", "扬州灯火", "仙气胶囊", "寻菡", "零落", "薇糖", "梦之", "清秀姑娘",
            "白凝", "从蓉", "丹琴", "万物生长", "醉笙情"];
        _this.sex = 1;
        return _this;
    }
    ChooseView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this, this.touchTap);
    };
    ChooseView.prototype.close = function () {
        this.removeTouchEvent(this, this.touchTap);
    };
    ChooseView.prototype.init = function () {
        egret.Tween.get(this.role_effect, { loop: true })
            .to({ scaleX: 1.02, scaleY: 1.02, alpha: 0 }, 1500);
    };
    ChooseView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.man:
                this.effect.y = this.man.y;
                this.role_img.source = "man_role_png";
                this.role_effect.source = "man_role_png";
                egret.localStorage.setItem(LocalStorageEnum.ROLE_SEX, "0");
                this.sex = 0;
                break;
            case this.woman:
                this.effect.y = this.woman.y;
                this.role_img.source = "woman_role_png";
                this.role_effect.source = "woman_role_png";
                egret.localStorage.setItem(LocalStorageEnum.ROLE_SEX, "1");
                this.sex = 1;
                break;
            case this.touzi_btn:
                this.role_name.text = this.names[Math.floor(Math.random() * this.names.length)];
                egret.localStorage.setItem(LocalStorageEnum.ROLE_NAME, this.role_name.text);
                break;
            case this.start_btn:
                if (this.role_name.text == "") {
                    UserTips.inst().showTips("名字不能为空！");
                }
                else {
                    GameApp.roleName = this.role_name.text;
                    GameApp.sex = this.sex;
                    ViewManager.inst().open(GameMainView);
                    ViewManager.inst().close(ChooseView);
                }
                break;
        }
    };
    return ChooseView;
}(BaseEuiView));
__reflect(ChooseView.prototype, "ChooseView");
ViewManager.inst().reg(ChooseView, LayerManager.UI_Main);
//# sourceMappingURL=ChooseView.js.map