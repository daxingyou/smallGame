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
var FuBenPopUp = (function (_super) {
    __extends(FuBenPopUp, _super);
    function FuBenPopUp() {
        return _super.call(this) || this;
    }
    FuBenPopUp.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.items = [];
        this.boxs = [];
        this.progressBar.mask = this.progressMask;
        for (var i = 0; i < 20; i++) {
            var index = (Math.random() * 25) >> 0;
            var res = index <= 5 ? "item_good_icon_png" : index <= 10 ? "item_woods_icon_png" : index <= 15 ? "item_gem_icon_png" : index <= 20 ? "item_gold_icon_png" : "item_box_png";
            if (i <= 7) {
                res = "item_box_png";
            }
            var img = new eui.Image();
            img.touchEnabled = false;
            img.source = res;
            img.name = index <= 5 ? "粮草" : index <= 10 ? "木材" : index <= 15 ? "生铁" : index <= 20 ? "黄金" : "宝箱";
            this.addChild(img);
            img.x = 50 + (Math.random() * (StageUtils.inst().getWidth() - 100)) >> 0;
            img.y = 150 + (Math.random() * (StageUtils.inst().getHeight() - 200)) >> 0;
            if (i <= 7 || img.name == "宝箱") {
                img.name = "宝箱";
                this.boxs.push(img);
            }
            else {
                this.items.push(img);
            }
        }
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.rolemc = new MovieClip();
        this.addChild(this.rolemc);
        this.rolemc.playFile(EFFECT + "role_stand", -1, null, false, "4");
        this.rolemc.scaleX = this.rolemc.scaleY = 0.6;
        this.rolemc.x = StageUtils.inst().getWidth() >> 1;
        this.rolemc.y = StageUtils.inst().getHeight() >> 1;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.setChildIndex(this.openGroup, this.getChildIndex(this.rolemc) + 1);
        this.setChildIndex(this.returnBtn, this.getChildIndex(this.openGroup) + 1);
        this.beginPoint = new egret.Point();
    };
    FuBenPopUp.prototype.onEnd = function (evt) {
        var _this = this;
        this.beginPoint.x = this.rolemc.x;
        this.beginPoint.y = this.rolemc.y;
        var angle = Math.atan2(evt.localY - this.beginPoint.y, evt.localX - this.beginPoint.x);
        var dic = this.calculEntityDic(angle * 180 / Math.PI);
        var dis = egret.Point.distance(this.beginPoint, new egret.Point(evt.localX, evt.localY));
        var speed = dis / 100;
        this.rolemc.playFile(EFFECT + "role_move", -1, null, false, dic.toString());
        egret.Tween.removeTweens(this.rolemc);
        egret.Tween.get(this.rolemc, { loop: false, onChange: function () {
                if (_this.rolemc.x >= StageUtils.inst().getWidth() - 50) {
                    _this.rolemc.x = StageUtils.inst().getWidth() - 50;
                }
                if (_this.rolemc.y >= StageUtils.inst().getHeight() - 50) {
                    _this.rolemc.y = StageUtils.inst().getHeight() - 50;
                }
                if (_this.rolemc.x <= 50) {
                    _this.rolemc.x = 50;
                }
                if (_this.rolemc.y <= 50) {
                    _this.rolemc.y = 50;
                }
                _this.hitItem();
                _this.hitBox();
            }, onChangeObj: this }).to({ x: evt.localX, y: evt.localY }, speed * 1000).call(function () {
            egret.Tween.removeTweens(_this.rolemc);
            _this.rolemc.playFile(EFFECT + "role_stand", -1, null, false, dic.toString());
        }, this);
    };
    FuBenPopUp.prototype.hitBox = function () {
        var _this = this;
        if (this.curOpen) {
            var dis = egret.Point.distance(new egret.Point(this.rolemc.x, this.rolemc.y), new egret.Point(this.curOpen.x, this.curOpen.y));
            if (dis > 50) {
                this.curOpen = null;
            }
            else {
                return;
            }
        }
        for (var i = 0; i < this.boxs.length; i++) {
            if (!this.boxs[i]) {
                continue;
            }
            var dis = egret.Point.distance(new egret.Point(this.rolemc.x, this.rolemc.y), new egret.Point(this.boxs[i].x, this.boxs[i].y));
            if (Math.abs(dis) <= 50) {
                this.curOpen = this.boxs[i];
                if (!this.openGroup.visible) {
                    this.showProgressGroup(this.boxs[i], i, function (item, index) {
                        if (item && item.parent) {
                            item.parent.removeChild(item);
                            _this.boxs[index] = null;
                        }
                    });
                }
                break;
            }
            else {
                this.openGroup.visible = false;
                egret.Tween.removeTweens(this.progressMask);
            }
        }
    };
    FuBenPopUp.prototype.showProgressGroup = function (item, i, cb) {
        var _this = this;
        this.openGroup.visible = true;
        this.progressMask.width = 0;
        this.percentLab.text = "0%";
        egret.Tween.get(this.progressMask, { loop: false, onChange: function () {
                var percent = ((_this.progressMask.width / 200) * 100) >> 0;
                if (percent >= 100) {
                    percent = 100;
                }
                _this.percentLab.text = percent + "%";
            }, onChangeObj: this }).to({ width: 200 }, 2000).call(function () {
            cb(item, i);
            egret.Tween.removeTweens(_this.progressMask);
            _this.openGroup.visible = false;
            var index = (Math.random() * 100) >> 0;
            var num = (Math.random() * 6 + 2) >> 0;
            if (index <= 25) {
                UserTips.inst().showTips("获得木材x" + num);
                GameApp.inst().wood += num;
            }
            else if (index <= 25) {
                UserTips.inst().showTips("获得粮草x" + num);
                GameApp.inst().good += num;
            }
            else if (index <= 75) {
                UserTips.inst().showTips("获得生铁x" + num);
                GameApp.inst().fe += num;
            }
            else {
                UserTips.inst().showTips("获得黄金x" + num);
                GameApp.inst().gold += num;
            }
        }, this);
    };
    FuBenPopUp.prototype.hitItem = function () {
        for (var i = 0; i < this.items.length; i++) {
            if (!this.items[i]) {
                continue;
            }
            var dis = egret.Point.distance(new egret.Point(this.rolemc.x, this.rolemc.y), new egret.Point(this.items[i].x, this.items[i].y));
            if (Math.abs(dis) <= 80) {
                var item = this.items[i];
                var num = (Math.random() * 6 + 2) >> 0;
                UserTips.inst().showTips("获得" + item.name + "x" + num);
                if (item.name == "粮草") {
                    GameApp.inst().good += num;
                }
                else if (item.name == "木材") {
                    GameApp.inst().wood += num;
                }
                else if (item.name == "生铁") {
                    GameApp.inst().fe += num;
                }
                else if (item.name == "黄金") {
                    GameApp.inst().gold += num;
                }
                if (item && item.parent) {
                    item.parent.removeChild(item);
                    this.items.splice(i, 1);
                    i -= 1;
                }
            }
        }
    };
    /**获取当前方向 */
    FuBenPopUp.prototype.calculEntityDic = function (angle) {
        if (angle >= -20 && angle <= 20) {
            this.rolemc.scaleX = 0.6;
            return 2;
        }
        else if (angle < -20 && angle >= -70) {
            this.rolemc.scaleX = 0.6;
            return 1;
        }
        else if (angle < -70 && angle > -110) {
            this.rolemc.scaleX = 0.6;
            return 0;
        }
        else if (angle > 20 && angle <= 70) {
            this.rolemc.scaleX = 0.6;
            return 3;
        }
        else if (angle > 70 && angle <= 110) {
            this.rolemc.scaleX = 0.6;
            return 4;
        }
        else if (angle > 110 && angle <= 160) {
            this.rolemc.scaleX = -0.6;
            return 3;
        }
        else if ((angle > 160 && angle <= 180) || (angle <= -160 && angle >= -180)) {
            this.rolemc.scaleX = -0.6;
            return 2;
        }
        else if (angle > -160 && angle <= -110) {
            this.rolemc.scaleX = -0.6;
            return 1;
        }
    };
    FuBenPopUp.prototype.onReturn = function () {
        ViewManager.inst().close(FuBenPopUp);
        ViewManager.inst().open(GameMainView);
    };
    FuBenPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
    };
    return FuBenPopUp;
}(BaseEuiView));
__reflect(FuBenPopUp.prototype, "FuBenPopUp");
ViewManager.inst().reg(FuBenPopUp, LayerManager.UI_Main);
//# sourceMappingURL=FuBenPopUp.js.map