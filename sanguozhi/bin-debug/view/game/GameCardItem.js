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
var GameCardItem = (function (_super) {
    __extends(GameCardItem, _super);
    function GameCardItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameCardItemSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchTap, _this);
        return _this;
    }
    GameCardItem.prototype.dataChanged = function () {
        this.icon_img.source = "doubtful_" + this.data.insId + "_png";
        this.quality_img.source = "quality_" + this.data.quality + "_png";
        if (this.data.type == CardType.soldier) {
            this.num_label.text = this.data.ownNum;
            this.num_label.visible = true;
        }
        for (var i = 0; i < 3; i++) {
            if (GameApp.ownSolderis[i].generalId == this.data.insId) {
                this.shang.visible = true;
            }
        }
    };
    GameCardItem.prototype.touchBegin = function (evt) {
        for (var i = 0; i < 3; i++) {
            if (GameApp.ownSolderis[i].generalId == this.data.insId) {
                UserTips.inst().showTips("不可重复上阵");
                return;
            }
        }
        if (this.data.type == CardType.general) {
            if (GameCfg.gameStart) {
                UserTips.inst().showTips("对战进行中无法选择武将！");
                return;
            }
            MessageManager.inst().dispatch(LocalStorageEnum.DOUBTFUL_MOVE_ROLE, { card: this.data.insId, x: evt.stageX, y: evt.stageY });
        }
        else if (this.data.type == CardType.soldier) {
            // MessageManager.inst().dispatch(CustomEvt.SHOP_INTRODUCE,this.data);
            // UserTips.inst().showTips("无法使用！");
            MessageManager.inst().dispatch(LocalStorageEnum.DOUBTFUL_MOVE_SOLDIER, { data: this.data, evt: evt });
        }
    };
    GameCardItem.prototype.touchTap = function () {
        if (this.data.type == CardType.build || this.data.type == CardType.prop || this.data.type == CardType.skill || this.data.type == CardType.special_skill) {
            console.log(this.data);
            var obj = [];
            obj.push(this.data);
            ViewManager.inst().open(IntroduceView, obj);
        }
    };
    return GameCardItem;
}(eui.ItemRenderer));
__reflect(GameCardItem.prototype, "GameCardItem");
//# sourceMappingURL=GameCardItem.js.map