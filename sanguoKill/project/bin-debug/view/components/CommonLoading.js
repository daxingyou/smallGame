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
var CommonLoading = (function (_super) {
    __extends(CommonLoading, _super);
    function CommonLoading() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    CommonLoading.inst = function () {
        if (!this._instance) {
            this._instance = new CommonLoading();
        }
        return this._instance;
    };
    CommonLoading.prototype.createView = function () {
        var rect = new eui.Rect();
        this.addChild(rect);
        rect.left = rect.bottom = rect.top = rect.right = 0;
        this.tipsTxt = new eui.Label();
        this.addChild(this.tipsTxt);
        this.tipsTxt.size = 30;
        this.tipsTxt.fontFamily = "yt";
        this.tipsTxt.textColor = 0xE0861F;
        this.tipsTxt.horizontalCenter = 0;
        this.tipsTxt.verticalCenter = 0;
        this.loadingGroup = new eui.Group();
        this.addChild(this.loadingGroup);
        this.loadingGroup.horizontalCenter = 0;
        this.loadingGroup.bottom = 100;
        var img = new eui.Image();
        this.loadingGroup.addChild(img);
        img.source = "loading_btm_png";
        this.loadingTxt = new eui.Label();
        this.loadingGroup.addChild(this.loadingTxt);
        this.loadingTxt.size = 30;
        this.loadingTxt.fontFamily = "yt";
        this.loadingTxt.text = "Loading";
        this.loadingTxt.horizontalCenter = 0;
        this.loadingTxt.verticalCenter = 0;
        this.alpha = 0;
    };
    CommonLoading.prototype.show = function (tips, cb, arg) {
        var _this = this;
        StageUtils.inst().getStage().addChild(this);
        egret.Tween.get(this).to({ alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
            if (cb && arg) {
                cb.call(arg);
            }
        }, this);
        this.tipsTxt.text = tips ? tips : "";
        var index = 0;
        var self = this;
        if (!tips) {
            this.loadingGroup.bottom = (StageUtils.inst().getHeight() >> 1) - (this.loadingGroup.height >> 1);
            var timeout_1 = setTimeout(function () {
                clearTimeout(timeout_1);
                self.hide();
                // MessageManager.inst().dispatch(CustomEvt.COMMONRESEND);
            }, 1000);
        }
        else {
            this.loadingGroup.bottom = 100;
        }
        this.interval = setInterval(function () {
            index += 1;
            var str = index == 1 ? "." : (index == 2) ? ".." : "...";
            self.loadingTxt.text = "Loading" + str;
            if (index >= 3) {
                index = 0;
            }
        }, 300);
    };
    CommonLoading.prototype.hide = function () {
        var _this = this;
        egret.Tween.get(this).to({ alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            if (_this.interval) {
                clearInterval(_this.interval);
            }
            if (_this.parent) {
                _this.parent.removeChild(_this);
            }
        }, this);
    };
    CommonLoading.prototype.onProgress = function (current, total) {
        if (current >= total) {
            var self_1 = this;
            var timeout_2 = setTimeout(function () {
                clearTimeout(timeout_2);
                self_1.hide();
                MessageManager.inst().dispatch(CustomEvt.COMMONRESEND);
            }, 3000);
        }
        // this._loadHorse.x = this.progressMask.width;
    };
    return CommonLoading;
}(eui.UILayer));
__reflect(CommonLoading.prototype, "CommonLoading", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=CommonLoading.js.map