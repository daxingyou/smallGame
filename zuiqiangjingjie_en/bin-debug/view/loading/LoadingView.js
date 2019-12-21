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
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super.call(this) || this;
        _this.talk_str = [
            "Strategic adviser：Now the world is in chaos，Three countries jostle each other，There is no one's heart to fight for the world？",
            "Principal：discretion in speech！Easier said than done，Pity me, young general！",
            "Strategic adviser：If the Lord really has such ambition，Just clear it up，The king to be sent to a suitable place as a foundation，Quietly recruiting，When the time is right, we can succeed。",
            "Principal：You can have a good choice？",
            "Strategic adviser：Look at the Lord please.。。"
        ];
        _this.talk_num = 0;
        _this.talk_state = 0;
        _this.country_id = 0;
        _this.timeOut_arr = [];
        _this.skinName = "LoadingViewSkin";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add_view_handler, _this);
        return _this;
    }
    LoadingView.prototype.add_view_handler = function () {
        this.init();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.add_view_handler, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.talk_group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    LoadingView.prototype.remove_view_handler = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.talk_group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    LoadingView.prototype.init = function () {
        var scale = this.stage.stageWidth / 1334;
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.country_group.scaleX = this.country_group.scaleY = scale;
        this.talk_group.scaleX = this.talk_group.scaleY = scale;
        for (var i = 0; i < 3; i++) {
            this["country_" + i].scaleX = this["country_" + i].scaleY = 0;
            egret.Tween.get(this["country_" + i])
                .wait(200 * i + 1000)
                .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.backOut);
        }
        egret.Tween.get(this.talk_group)
            .wait(2400)
            .to({ alpha: 1 }, 600);
        egret.Tween.get(this)
            .wait(3000)
            .call(function () {
            this.talk();
        });
    };
    LoadingView.prototype.touchTapHandler = function (e) {
        if (this.talk_group.alpha < 1)
            return;
        if (this.talk_num >= 5) {
            LoadingUI.inst().hide();
            ViewManager.inst().open(StartGameView);
        }
        this.talk();
    };
    LoadingView.prototype.talk = function () {
        switch (this.talk_state) {
            case 0:
                this.zhugong_img.visible = false;
                this.moushi_img.visible = true;
                this.talk_state = 1;
                break;
            case 1:
                this.zhugong_img.visible = true;
                this.moushi_img.visible = false;
                this.talk_state = 0;
                break;
        }
        this.typerEffect(this.talk_label, this.talk_str[this.talk_num], 50);
        this.talk_num++;
    };
    /**
    * Typewriter effect
    * obj           Text object
    * content       Written words
    * interval      Typing interval Millisecond
    */
    LoadingView.prototype.typerEffect = function (obj, content, interval, backFun) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        if (backFun === void 0) { backFun = null; }
        for (var i_1 = 0; i_1 < this.timeOut_arr.length; i_1++) {
            egret.clearTimeout(this.timeOut_arr[i_1]);
        }
        var strArr = content.split("");
        obj.text = "";
        var len = strArr.length;
        for (var i = 0; i < len; i++) {
            var timeOut = egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
                if ((Number(this) >= len - 1) && (backFun != null)) {
                    backFun();
                }
            }, i, interval * i);
            this.timeOut_arr.push(timeOut);
        }
    };
    return LoadingView;
}(eui.Component));
__reflect(LoadingView.prototype, "LoadingView");
ViewManager.inst().reg(LoadingView, LayerManager.UI_Main);
//# sourceMappingURL=LoadingView.js.map