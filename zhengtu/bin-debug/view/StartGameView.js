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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        return _super.call(this) || this;
    }
    StartGameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // 吕布赵云 放商城 。id 100010 100011
        this.addTouchEvent(this.startGameBtn, this.onEnterGame, true);
        var heroAttrs = HeroAttrCfg.attrCfg;
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        for (var i = 0; i < heroAttrs.length; i++) {
            var item = heroAttrs[i];
            if (item.insId == 100010 || item.insId == 100011) {
                continue;
            }
            ;
            var attrItem = new HeroCardItem(item);
            this.heroGroup.addChild(attrItem);
            // attrItem.anchorOffsetX = attrItem.width>>1;
            // attrItem.anchorOffsetY = attrItem.height>>1;
            attrItem.x = (attrItem.width + 10) * i;
            // this.setScale(attrItem,attrItem.x);
        }
        this.tweenMove();
        this.heroGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onCardSelectBegin, this);
        this.heroGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onCardSelectEnd, this);
        this.heroGroup.touchEnabled = true;
    };
    /**卡牌选择 */
    StartGameView.prototype.onCardSelectBegin = function (evt) {
        var item = evt.target;
        if (item && item instanceof HeroCardItem) {
            this.touchItem = item;
            egret.Tween.removeAllTweens();
        }
    };
    StartGameView.prototype.onCardSelectEnd = function (evt) {
        var item = evt.target;
        if (this.curSelectCard) {
            this.curSelectCard.focus = false;
        }
        if (item && item instanceof HeroCardItem && this.touchItem == item) {
            for (var i = 0; i < this.heroGroup.numChildren; i++) {
                this.heroGroup.$children[i].x = (this.heroGroup.$children[i].width + 10) * i;
            }
            this.curSelectCard = item;
            item.focus = true;
            console.log("改变选择状态");
        }
    };
    /**卡牌移动 */
    StartGameView.prototype.tweenMove = function (offestX) {
        var len = this.heroGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var item = this.heroGroup.getChildAt(i);
            item.touchEnabled = true;
            this.tweenItem(item, offestX);
        }
    };
    StartGameView.prototype.tweenItem = function (item, offestX) {
        var _this = this;
        var tx = -item.width - 10;
        if (offestX) {
            tx = item.x + offestX;
        }
        var time = Math.abs(tx - item.x) / 50;
        var len = this.heroGroup.numChildren;
        egret.Tween.get(item, { loop: true }).to({ x: tx }, time * 1000).call(function () {
            egret.Tween.removeTweens(item);
            if (!offestX) {
                var lastItem = _this.heroGroup.getChildAt(len - 1);
                item.x = lastItem.x + lastItem.width + 10;
                _this.heroGroup.setChildIndex(item, len);
                _this.tweenItem(item);
            }
        }, this);
    };
    // /**设置缩放值 */
    // private setScale(attrItem:HeroCardItem,posx:number):void{
    // 	let distance:number = posx - (this.heroGroup.width>>1);
    // 	if(Math.abs(distance) <= (attrItem.width>>1)){
    // 		attrItem.scaleX = attrItem.scaleY = 1;
    // 	}
    // 	let percent:number = (Math.abs(distance)/attrItem.width);
    // 	attrItem.scaleX = attrItem.scaleY = 1-percent*0.15;
    // }
    StartGameView.prototype.onEnterGame = function (evt) {
        if (!this.curSelectCard) {
            UserTips.inst().showTips("请先选择武将");
            return;
        }
        egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL, JSON.stringify({ "attr": [this.curSelectCard.attr] }));
        // GameApp.inst()["soldier_"+this.curSelectCard.attr.type] = 10;
        var heroCfg = HeroAttrCfg.attrCfg;
        var len = heroCfg.length;
        var heroattrs = [];
        var shopattrs = [];
        for (var i = 0; i < len; i++) {
            // let item:HeroCardItem = this.heroGroup.getChildAt(i) as HeroCardItem;
            var itemCfg = heroCfg[i];
            if (itemCfg.insId == 100010 || itemCfg.insId == 100011) {
                shopattrs.push(itemCfg);
            }
            else if (this.curSelectCard.attr.insId != itemCfg.insId) {
                heroattrs.push(itemCfg);
            }
            // if(item. != this.curSelectCard){
            // 	heroattrs.push(item.attr);
            // }
        }
        egret.localStorage.setItem(LocalStorageEnum.SHOP_GENERAL, JSON.stringify(shopattrs));
        egret.localStorage.setItem(LocalStorageEnum.OTHER_GENERAL, JSON.stringify(heroattrs));
        ViewManager.inst().open(GameMainView);
        ViewManager.inst().close(StartGameView);
        //进入游戏--主城
        egret.localStorage.setItem(LocalStorageEnum.IS_FIRST_ENTER, "1");
    };
    StartGameView.prototype.close = function () {
        this.heroGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCardSelectBegin, this);
        this.heroGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCardSelectEnd, this);
        this.removeTouchEvent(this.startGameBtn, this.onEnterGame);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.inst().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map