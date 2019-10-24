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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super.call(this) || this;
        _this.maxExp = 0;
        _this.shopOpen = false;
        _this.fightingOpen = false;
        _this.treasureOpen = false;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.maxExp = GameApp.level * 500;
        this.expBar.mask = this.expMask;
        this.expMask.width = 0;
        this.addTouchEvent(this.helpBtn, this.onHelp, true);
        this.addTouchEvent(this.addBtn, this.onOperRecharge, true);
        this.navGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = CardItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.refreshUnlockCardList();
        eui.Binding.bindProperty(GameApp, ["medal"], this.medalLab, "text");
        eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
        eui.Binding.bindHandler(GameApp, ["exp"], this.onExpChange, this);
        eui.Binding.bindHandler(GameApp, ["level"], this.onLevelChange, this);
        this.refreshLockCardList();
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.cardGroup.mask = this.cardMask;
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCardItemTap, this);
        MessageManager.inst().addListener("CardDataRefresh", this.onCardDataRefresh, this);
        var lightMc = new MovieClip();
        lightMc.playFile(EFFECT + "light", -1);
        this.addChild(lightMc);
        lightMc.x = StageUtils.inst().getWidth() >> 1;
        lightMc.y = this.cardGroup.y + this.cardGroup.height + 200;
    };
    GameMainView.prototype.onCardDataRefresh = function () {
        this.refreshLockCardList();
        this.refreshUnlockCardList();
    };
    GameMainView.prototype.onCardItemTap = function (evt) {
        if (evt.target instanceof CardItem) {
            var cardVo = evt.target.cardVo;
            //打开卡牌详情界面 。cardVo为当前卡牌的数据
            // ViewManager.inst().open()
            ViewManager.inst().open(CultivateView, [{ id: cardVo.id }]);
        }
    };
    GameMainView.prototype.onBegin = function (evt) {
        if (!this.beginPoint) {
            this.beginPoint = new egret.Point();
            this.beginPoint.x = evt.stageX;
            this.beginPoint.y = evt.stageY;
        }
    };
    GameMainView.prototype.onTouchMove = function (evt) {
        if (this.beginPoint) {
            var offx = evt.stageX - this.beginPoint.x;
            // this.beginPoint.x = evt.stageX;
            // this.beginPoint.y = evt.stageY;
            var direct = 0;
            if (Math.abs(offx) >= 5) {
                direct = offx > 0 ? 1 : -1;
                var firstItem = this.cardGroup.$children[0];
                var lastItem = this.cardGroup.$children[this.cardGroup.numChildren - 1];
                if (direct > 0 && firstItem.x >= 0 && firstItem.y <= 50) {
                    return;
                }
                else if (direct < 0 && lastItem.x <= this.cardGroup.width * 0.8 && lastItem.y <= 50) {
                    return;
                }
                for (var i = 0; i < this.cardGroup.numChildren; i++) {
                    var item = this.cardGroup.getChildAt(i);
                    var angle = item.m_angle;
                    angle += direct * 1;
                    item.m_angle = angle;
                    item.rotation += direct * 0.4;
                    item.x = 450 + Math.cos(angle * Math.PI / 180) * 900;
                    item.y = 300 + Math.sin(angle * Math.PI / 180) * 300;
                }
            }
        }
    };
    GameMainView.prototype.onEnd = function () {
        if (this.beginPoint) {
            this.beginPoint = null;
        }
    };
    /**刷新未解锁卡牌列表 */
    GameMainView.prototype.refreshUnlockCardList = function () {
        this.arrayCollect.source = GameApp.unlocks;
        this.list.dataProviderRefreshed();
    };
    /**刷新解锁列表 */
    GameMainView.prototype.refreshLockCardList = function () {
        var ownCardlistVo = GameApp.locks;
        this.cardGroup.removeChildren();
        var num = -35;
        var angle = 235;
        for (var key in ownCardlistVo) {
            var carditem = new CardItem();
            carditem.initData(ownCardlistVo[key], 1);
            this.cardGroup.addChild(carditem);
            // carditem.anchorOffsetY = carditem.height;
            carditem.m_angle = angle;
            carditem.x = 450 + Math.cos(angle * Math.PI / 180) * 900;
            carditem.y = 300 + Math.sin(angle * Math.PI / 180) * 300;
            angle += 14;
            carditem.rotation = -12;
            carditem.rotation += parseInt(key) * 6;
            // let x:number = -10 + parseInt(key)*155; 
            // if(carditem.rotation >= 0){
            // 	num += 8;
            // }
            // let y:number = 77+ parseInt(key)*(num);
            // carditem.x = x;
            // carditem.y = y;
        }
    };
    GameMainView.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.shopBtn:
                console.log("打开了商城界面");
                if (this.shopOpen)
                    return;
                this.closeView();
                ViewManager.inst().open(ShopView);
                this.shopOpen = true;
                break;
            case this.boxBtn:
                console.log("打开了宝箱界面");
                if (this.treasureOpen)
                    return;
                this.closeView();
                ViewManager.inst().open(TreasureBox);
                this.treasureOpen = true;
                break;
            case this.backBtn:
                console.log("返回了主界面");
                break;
            case this.cardBtn:
                console.log("打开了卡牌界面");
                this.closeView();
                break;
            case this.battleBtn:
                this.closeView();
                ViewManager.inst().open(HighLadderView);
                // console.log("打开了对战界面")
                // if(this.fightingOpen)
                // 	return;
                // ViewManager.inst().open(FightingView);
                // this.fightingOpen = true;
                break;
        }
    };
    GameMainView.prototype.closeView = function () {
        this.fightingOpen = false;
        this.treasureOpen = false;
        this.shopOpen = false;
        ViewManager.inst().close(FightingView);
        ViewManager.inst().close(TreasureBox);
        ViewManager.inst().close(HelpView);
        ViewManager.inst().close(HighLadderView);
        ViewManager.inst().close(ShopView);
    };
    GameMainView.prototype.onOperRecharge = function () {
        console.log("打开了内购充值界面");
    };
    GameMainView.prototype.onHelp = function () {
        console.log("打开了帮助界面");
        this.closeView();
        ViewManager.inst().open(HelpView);
    };
    GameMainView.prototype.onExpChange = function () {
        if (GameApp.exp >= this.maxExp) {
            var remainexp = GameApp.exp - this.maxExp;
            GameApp.level += 1;
            GameApp.exp = remainexp;
            this.maxExp = GameApp.level * 500;
        }
        this.progressLab.text = GameApp.exp + "/" + this.maxExp;
        this.expMask.width = GameApp.exp / this.maxExp * 232;
    };
    GameMainView.prototype.onLevelChange = function () {
        this.levelLab.text = GameApp.level + "级";
    };
    GameMainView.prototype.close = function () {
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.inst().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map