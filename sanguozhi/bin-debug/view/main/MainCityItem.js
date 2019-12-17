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
var MainCityItem = (function (_super) {
    __extends(MainCityItem, _super);
    function MainCityItem(id) {
        var _this = _super.call(this) || this;
        _this._id = 0;
        _this.touchChildren = false;
        _this.touchEnabled = true;
        _this.skinName = "MainCityItemSkin";
        _this._id = id;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add_view_handler, _this);
        _this.hideEnemyGroup();
        return _this;
    }
    MainCityItem.prototype.showEnemyGroup = function () {
        this._ifhasEnemy = true;
        this.enemyGroup.visible = true;
        egret.Tween.get(this.enemyIcon, { loop: true }).to({ y: this.enemyIcon.y - 10 }, 1500).to({ y: this.enemyIcon.y }, 1500);
    };
    MainCityItem.prototype.hideEnemyGroup = function () {
        this._ifhasEnemy = false;
        this.enemyGroup.visible = false;
        egret.Tween.removeTweens(this.enemyIcon);
    };
    MainCityItem.prototype.add_view_handler = function () {
        this.init();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.add_view_handler, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    MainCityItem.prototype.remove_view_handler = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    MainCityItem.prototype.init = function () {
        var _this = this;
        this.qimc = new MovieClip();
        this.addChild(this.qimc);
        this.qimc.playFile(EFFECT + "flag", -1);
        this.qimc.scaleX = this.qimc.scaleY = 0.6;
        this.qimc.x = 92;
        this.qimc.y = 86;
        this.name_label.text = "" + NameList.inst().city_name[this._id];
        this.icon_img.source = "main_city_" + this._id + "_png";
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.icon_img.y + this.icon_img.height / 2;
        var cityInfo = GlobalFun.getCityInfo(this._id + 1);
        this.qimc.visible = cityInfo.isMain;
        this.qimc.alpha = 0;
        egret.Tween.get(this.qimc).to({ alpha: 1 }, 1000).call(function () {
            egret.Tween.removeTweens(_this.qimc);
        }, this);
    };
    MainCityItem.prototype.showBattleIcon = function () {
        var cityInfo = GlobalFun.getCityInfo(this._id + 1);
        if (!cityInfo.isMain) {
            this.battleIcon.visible = true;
            GlobalFun.lighting(this.battleIcon);
            egret.Tween.get(this.battleIcon, { loop: true }).to({ rotation: this.battleIcon.rotation - 5 }, 50).to({ rotation: this.battleIcon.rotation + 5 }, 50).to({ rotation: this.battleIcon.rotation - 5 }, 50).to({ rotation: this.battleIcon.rotation + 5 }, 50).wait(800);
        }
    };
    Object.defineProperty(MainCityItem.prototype, "cityId", {
        get: function () {
            return this._id + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainCityItem.prototype, "ifHasEnemy", {
        get: function () {
            return this._ifhasEnemy;
        },
        enumerable: true,
        configurable: true
    });
    MainCityItem.prototype.hideBattleIcon = function () {
        this.battleIcon.visible = false;
        GlobalFun.clearFilters(this.battleIcon);
        egret.Tween.removeTweens(this.battleIcon);
    };
    MainCityItem.prototype.touchTapHandler = function () {
    };
    return MainCityItem;
}(BaseView));
__reflect(MainCityItem.prototype, "MainCityItem");
//# sourceMappingURL=MainCityItem.js.map