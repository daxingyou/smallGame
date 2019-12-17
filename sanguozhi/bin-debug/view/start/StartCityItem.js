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
var StartCityItem = (function (_super) {
    __extends(StartCityItem, _super);
    function StartCityItem(id) {
        var _this = _super.call(this) || this;
        _this._id = 0;
        _this.skinName = "StartCityItemSkin";
        _this._id = id;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add_view_handler, _this);
        return _this;
    }
    StartCityItem.prototype.add_view_handler = function () {
        this.init();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.add_view_handler, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        MessageManager.inst().addListener(CustomEvt.SELECT_MAIN_CITY, this.selectCityHandler, this);
    };
    StartCityItem.prototype.remove_view_handler = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        MessageManager.inst().removeListener(CustomEvt.SELECT_MAIN_CITY, this.selectCityHandler, this);
    };
    StartCityItem.prototype.init = function () {
        this.name_label.text = "" + NameList.inst().city_name[this._id];
        this.icon_img.source = "main_city_" + this._id + "_png";
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.qimc = new MovieClip();
        this.addChild(this.qimc);
        this.qimc.playFile(EFFECT + "flag", -1);
        this.qimc.scaleX = this.qimc.scaleY = 0.6;
        this.qimc.visible = false;
        this.qimc.x = 92;
        this.qimc.y = 86;
    };
    StartCityItem.prototype.touchTapHandler = function () {
        SoundManager.inst().playEffect(MUSIC + "collect.mp3");
        MessageManager.inst().dispatch(CustomEvt.SELECT_MAIN_CITY, this._id);
    };
    StartCityItem.prototype.selectCityHandler = function (e) {
        if (this._id == e.data) {
            this.icon_img.scaleX = this.icon_img.scaleY = 1.2;
            this.qimc.visible = true;
        }
        else {
            this.icon_img.scaleX = this.icon_img.scaleY = 1;
            this.qimc.visible = false;
        }
    };
    return StartCityItem;
}(BaseView));
__reflect(StartCityItem.prototype, "StartCityItem");
//# sourceMappingURL=StartCityItem.js.map