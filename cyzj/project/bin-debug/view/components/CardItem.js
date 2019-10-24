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
var CardItem = (function (_super) {
    __extends(CardItem, _super);
    function CardItem() {
        var _this = _super.call(this) || this;
        _this.isLock = true;
        _this.isOwn = true;
        _this.titleStr = ["魂士解锁", "魂师解锁", "大魂师解锁", "魂王解锁", "魂皇解锁", "魂宗解锁", "魂尊解锁", "魂圣解锁", "魂帝解锁"];
        _this.skinName = "CardItemSkin";
        return _this;
    }
    CardItem.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    CardItem.prototype.onTouchTap = function (evt) {
        if (this.isLock) {
            UserTips.inst().showTips("未满足解锁条件");
            return;
        }
        // if(this.isOwn){
        // 	UserTips.inst().showTips("碎片不足");
        // 	return;
        // }
        //开启boss战斗
        GameConfig.fight_state = "boss";
        if (this.data.role == "card_10002_png")
            GameConfig.gq = 0;
        else if (this.data.role == "card_10004_png")
            GameConfig.gq = 1;
        else if (this.data.role == "card_10005_png")
            GameConfig.gq = 2;
        else if (this.data.role == "card_10003_png")
            GameConfig.gq = 3;
        ViewManager.inst().open(GameView);
    };
    CardItem.prototype.dataChanged = function () {
        this.refreshItemData(this.data);
    };
    /**itemdata 刷新 */
    CardItem.prototype.refreshItemData = function (data) {
        this.lockNum.text = data.ownNum + "/" + data.totalNum;
        this.roleImg.source = data.role;
        this.nameLab.text = data.nameStr;
        this.lockImg.visible = true;
        if (data.ownNum >= data.totalNum) {
            this.lockNum.visible = false;
            this.img.visible = false;
            this.isOwn = true;
        }
        else {
            this.lockNum.visible = true;
            this.img.visible = true;
            this.isOwn = false;
        }
        this.refreshLock();
    };
    CardItem.prototype.refreshLock = function () {
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_LEVEL);
        var ifexist = false;
        var roleData = GameApp.roleData;
        for (var key in roleData) {
            if (roleData[key].level >= this.data.lockLevel) {
                ifexist = true;
                break;
            }
        }
        // let level:number = levelstr?parseInt(levelstr):1;
        if (ifexist) {
            this.lockImg.visible = false;
            this.isLock = false;
        }
        else {
            this.lockImg.visible = true;
            this.isLock = true;
            this.nameLab.text = this.titleStr[this.data.lockLevel - 1];
        }
    };
    CardItem.prototype.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return CardItem;
}(eui.ItemRenderer));
__reflect(CardItem.prototype, "CardItem");
//# sourceMappingURL=CardItem.js.map