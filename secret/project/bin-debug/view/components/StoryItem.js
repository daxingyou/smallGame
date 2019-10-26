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
var StoryItem = (function (_super) {
    __extends(StoryItem, _super);
    function StoryItem() {
        var _this = _super.call(this) || this;
        _this._islock = false;
        _this.skinName = "StoryItemSkin";
        return _this;
    }
    StoryItem.prototype.dataChanged = function () {
        var data = this.data;
        this.img.source = GameApp.progress == 1 ? data.pic + "_jpg" : "w_" + data.pic + "_jpg";
        this.levelLab.text = "Lv" + data.chapter + "." + data.name;
        var passData = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.PASS))[GameApp.progress];
        if (passData[this.itemIndex + 1]) {
            //当前关存在数值 。说明是已经通关的
            this.passGroup.visible = true;
            this.timeLab.text = DateUtils.getFormatBySecond(passData[this.itemIndex + 1], DateUtils.TIME_FORMAT_10);
        }
        else if (this.itemIndex + 1 == (GameApp.progress == 1 ? GameApp.level : GameApp.womanLevel)) {
            //当前的关卡
            this.curHand.visible = true;
            egret.Tween.get(this.curHand, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        }
        else {
            this._islock = true;
            //未通关的关卡；
            this.unLockGroup.visible = true;
        }
    };
    Object.defineProperty(StoryItem.prototype, "ifLock", {
        get: function () {
            return this._islock;
        },
        enumerable: true,
        configurable: true
    });
    return StoryItem;
}(eui.ItemRenderer));
__reflect(StoryItem.prototype, "StoryItem");
//# sourceMappingURL=StoryItem.js.map