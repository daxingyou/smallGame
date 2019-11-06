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
        _this.curIndex = 0;
        _this.noCard = false;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // this.postion["autoSize"]();
        this.maxExp = GameApp.level * 500;
        this.expBar.mask = this.expMask;
        this.expMask.width = 0;
        this.addTouchEvent(this.helpBtn, this.onHelp, true);
        // this.addTouchEvent(this.addBtn,this.onOperRecharge,true);
        this.addTouchEvent(this.rechargeBtn, this.onOperRecharge, true);
        this.addTouchEvent(this.boxBtn, this.noOperBox, true);
        this.navGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.headImg.source = "head_" + GameApp.sex + "_png";
        this.nameLab.text = GameApp.roleName;
        // this.arrayCollect = new eui.ArrayCollection();
        // this.list.itemRenderer = CardItem;
        // this.list.dataProvider = this.arrayCollect;
        // this.scroller.viewport = this.list;
        // this.scroller.horizontalScrollBar.autoVisibility = false;
        // this.scroller.horizontalScrollBar.visible = false;
        // this.refreshUnlockCardList();
        this.watcher1 = eui.Binding.bindProperty(GameApp, ["medal"], this.medalLab, "text");
        this.watcher2 = eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
        this.watcher3 = eui.Binding.bindHandler(GameApp, ["exp"], this.onExpChange, this);
        this.watcher4 = eui.Binding.bindHandler(GameApp, ["level"], this.onLevelChange, this);
        this.refreshLockCardList();
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        // this.cardGroup.mask = this.cardMask;
        // this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCardItemTap,this);
        MessageManager.inst().addListener("CardDataRefresh", this.refreshLockCardList, this);
        var cdstr = egret.localStorage.getItem(LocalStorageEnum.CDTIME);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        if (!cdstr) {
            GlobalFun.clearFilters(this.bossBtn);
            this.timeLab.text = "";
            this.timeLab.visible = false;
        }
        else {
            var offValue = parseInt(cdstr) - new Date().getTime();
            if (offValue <= 0) {
                //当前已经结束冷却;
                GlobalFun.clearFilters(this.bossBtn);
                this.timeLab.text = "";
                this.timeLab.visible = false;
            }
            else {
                this.curCdtime = parseInt(cdstr);
                GlobalFun.filterToGrey(this.bossBtn);
                this.timeLab.visible = true;
                this.timeLab.text = "冷却中:" + DateUtils.getFormatBySecond(offValue / 1000, DateUtils.TIME_FORMAT_3);
                this.timer.start();
            }
        }
        // let lightMc:MovieClip = new MovieClip();
        // lightMc.playFile(`${EFFECT}light`,-1);
        // this.addChild(lightMc);
        // lightMc.x = this.postion.x;
        // lightMc.y = this.postion.y;
        // this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onUnlockItem,this);
    };
    GameMainView.prototype.onTimer = function (evt) {
        var offValue = this.curCdtime - new Date().getTime();
        if (offValue <= 0) {
            //当前已经结束冷却;
            GlobalFun.clearFilters(this.bossBtn);
            this.timeLab.text = "";
            this.timeLab.visible = false;
            this.timer.stop();
            this.curCdtime = null;
        }
        else {
            this.timeLab.text = "冷却中:" + DateUtils.getFormatBySecond(offValue / 1000, DateUtils.TIME_FORMAT_3);
        }
    };
    GameMainView.prototype.onBegin = function (evt) {
        if (!this.beginPoint && !this.noCard) {
            this.beginPoint = new egret.Point();
            this.beginPoint.x = evt.stageX;
            this.beginPoint.y = evt.stageY;
        }
        this.curClickItem = evt.target;
    };
    GameMainView.prototype.onTouchMove = function (evt) {
        if (this.beginPoint && !this.noCard) {
            this.moveBoo = true;
            var offx = evt.stageX - this.beginPoint.x;
            var direct = 1;
            var scale = 1;
            if (offx > 0) {
                //鼠标向右移动 
                direct = 5;
                scale = 1;
            }
            else if (offx < 0) {
                //鼠标向左移动
                direct = -5;
                scale = -1;
            }
            if (Math.abs(offx) >= 5) {
                for (var i = 0; i < this.cardGroup.numChildren; i++) {
                    var item = this.cardGroup.getChildAt(i);
                    item.x += direct;
                    // if(item.x >= this.cardGroup.width){item.x = this.cardGroup.width;}
                    // if(item.x <= 0){item.x = 0}
                    if (item.x > (this.cardGroup.width >> 1)) {
                        item.scaleX += -(scale * 0.01);
                        item.scaleY += -(scale * 0.01);
                        item.alpha += -(scale * 0.02);
                    }
                    else {
                        item.scaleX += (scale * 0.01);
                        item.scaleY += (scale * 0.01);
                        item.alpha += (scale * 0.02);
                    }
                    if (item.scaleX >= 1) {
                        item.scaleX = item.scaleY = 1;
                    }
                    if (item.scaleX <= 0.4) {
                        item.parent.removeChild(item);
                        this.setCardIndex();
                    }
                }
                if (offx > 0) {
                    if (this.firstCard.scaleX >= 0.9) {
                        var index = this.firstCard.index;
                        if (index == 0) {
                            index = GameApp.ownCards.length - 1;
                        }
                        else {
                            index -= 1;
                        }
                        this.firstCard = this.createCard(GameApp.ownCards[index], index, 0.6, { x: (this.cardGroup.width >> 1) - 180 }, 0.2);
                    }
                    this.getLastCard();
                }
                else if (offx < 0) {
                    if (this.lastCard.scaleX >= 0.9) {
                        var index = this.lastCard.index;
                        if (index == GameApp.ownCards.length - 1) {
                            index = 0;
                        }
                        else {
                            index += 1;
                        }
                        this.lastCard = this.createCard(GameApp.ownCards[index], index, 0.6, { x: (this.cardGroup.width >> 1) + 180 }, 0.2);
                    }
                    this.getFirstCard();
                }
                this.showDesc();
                this.setCardIndex();
            }
        }
    };
    GameMainView.prototype.showDesc = function () {
        this.cardName.text = this.centerCard.cardVo.name;
        this.descLab.text = this.centerCard.cardVo.desc;
    };
    GameMainView.prototype.getFirstCard = function () {
        var minC = this.cardGroup.$children[0];
        for (var i = 0; i < this.cardGroup.numChildren; i++) {
            var curItem = this.cardGroup.getChildAt(i);
            if (curItem.x < minC.x && curItem != minC) {
                minC = curItem;
            }
            if (curItem.x <= (this.cardGroup.width >> 1) + 50 && curItem.x >= (this.cardGroup.width >> 1) - 50) {
                this.centerCard = curItem;
            }
        }
        this.firstCard = minC;
    };
    GameMainView.prototype.getLastCard = function () {
        var maxC = this.cardGroup.$children[0];
        for (var i = 0; i < this.cardGroup.numChildren; i++) {
            var curItem = this.cardGroup.getChildAt(i);
            if (curItem.x > maxC.x && curItem != maxC) {
                maxC = curItem;
            }
            if (curItem.x <= (this.cardGroup.width >> 1) + 50 && curItem.x >= (this.cardGroup.width >> 1) - 50) {
                this.centerCard = curItem;
            }
        }
        this.lastCard = maxC;
    };
    GameMainView.prototype.onEnd = function (evt) {
        if (this.beginPoint) {
            this.beginPoint = null;
        }
        if (this.noCard && this.curClickItem && this.curClickItem instanceof CardItem) {
            this.curClickItem = null;
            ViewManager.inst().open(ShopView);
        }
    };
    GameMainView.prototype.refreshLockCardList = function () {
        var ownCardlistVo = GameApp.ownCards;
        this.cardGroup.removeChildren();
        if (!ownCardlistVo.length) {
            //当前没有卡牌
            this.cardName.text = "提示";
            this.descLab.textFlow = new egret.HtmlTextParser().parse("\u5F53\u524D\u672A\u62E5\u6709\u5361\u724C,\u53EF\u901A\u8FC7<font color=0x00ff00>[\u5546\u5E97],[Boss],[\u526F\u672C],[\u5728\u7EBF\u5956\u52B1]</font>\u83B7\u5F97");
            this.noCard = true;
            this.createCard(null, 0, 1, { x: (this.cardGroup.width >> 1) });
        }
        else {
            this.noCard = false;
            var leftIndex = this.curIndex - 1;
            if (leftIndex < 0) {
                leftIndex = ownCardlistVo.length - 1;
            }
            ;
            var rightIndex = this.curIndex + 1;
            if (rightIndex > ownCardlistVo.length - 1) {
                rightIndex = 0;
            }
            this.firstCard = this.createCard(ownCardlistVo[leftIndex], leftIndex, 0.7, { x: (this.cardGroup.width >> 1) - 180 });
            this.lastCard = this.createCard(ownCardlistVo[rightIndex], rightIndex, 0.7, { x: (this.cardGroup.width >> 1) + 180 });
            this.centerCard = this.createCard(ownCardlistVo[this.curIndex], this.curIndex, 1, { x: (this.cardGroup.width >> 1) });
            this.showDesc();
        }
    };
    GameMainView.prototype.createCard = function (cardVo, index, scale, attr, alpha) {
        var curcard = new CardItem();
        this.cardGroup.addChild(curcard);
        curcard.index = index;
        if (!isNaN(alpha)) {
            curcard.alpha = alpha;
        }
        GlobalFun.shadowFilter(curcard);
        curcard.anchorOffsetX = (curcard.width) >> 1;
        curcard.anchorOffsetY = (curcard.height) >> 1;
        curcard.initData(cardVo, scale);
        curcard.verticalCenter = 0;
        curcard.x = attr.x;
        this.setCardIndex();
        return curcard;
    };
    GameMainView.prototype.setCardIndex = function (num) {
        var childrens = this.cardGroup.$children;
        childrens.sort(this.sortfun);
        for (var i = 0; i < childrens.length; i++) {
            // if(childrens[i].x <= (this.cardGroup.width>>1)){
            this.cardGroup.setChildIndex(childrens[i], i);
            // if(childrens[i].x >= (this.cardGroup.width>>1)){
            // 	this.cardGroup.setChildIndex(childrens[i],(childrens.length - i-1));
            // }
            // }
        }
    };
    GameMainView.prototype.sortfun = function (param1, param2) {
        var x1 = param1.scaleX;
        var x2 = param2.scaleY;
        if (x1 > x2) {
            return 1;
        }
        else if (x1 < x2) {
            return -1;
        }
        else {
            return 0;
        }
    };
    GameMainView.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.shopBtn:
                console.log("打开了商城界面");
                if (GameMainView.shopOpen)
                    return;
                this.closeView();
                ViewManager.inst().open(ShopView);
                GameMainView.shopOpen = true;
                break;
            case this.backBtn:
                console.log("返回了主界面");
                break;
            case this.cardBtn:
                console.log("打开了卡牌界面");
                this.closeView();
                ViewManager.inst().open(ArchiveView);
                break;
            case this.battleBtn:
                // if(GameMainView.fightingOpen)
                // 	return;
                ViewManager.inst().open(OutWildBattle, [{ fuben: "fuben" }]);
                GameApp.fuben = "fuben";
                this.closeView();
                ViewManager.inst().close(GameMainView);
                // ViewManager.inst().open(HighLadderView);
                // console.log("打开了对战界面")
                // if(this.fightingOpen)
                // 	return;
                // ViewManager.inst().open(FightingView);
                // GameMainView.fightingOpen = true;
                break;
            case this.bossBtn:
                if (this.curCdtime) {
                    UserTips.inst().showTips("Boss副本冷却中...");
                    return;
                }
                ViewManager.inst().open(OutWildBattle, [{ fuben: "boss" }]);
                GameApp.fuben = "boss";
                this.closeView();
                ViewManager.inst().close(GameMainView);
                break;
        }
    };
    GameMainView.prototype.closeView = function () {
        GameMainView.fightingOpen = false;
        GameMainView.treasureOpen = false;
        GameMainView.shopOpen = false;
        ViewManager.inst().close(FightingView);
        ViewManager.inst().close(TreasureBox);
        ViewManager.inst().close(HelpView);
        ViewManager.inst().close(HighLadderView);
        ViewManager.inst().close(ShopView);
    };
    GameMainView.prototype.noOperBox = function () {
        console.log("打开了宝箱界面");
        if (GameMainView.treasureOpen)
            return;
        this.closeView();
        ViewManager.inst().open(TreasureBox);
        GameMainView.treasureOpen = true;
    };
    GameMainView.prototype.onOperRecharge = function () {
        console.log("打开了内购充值界面");
        ViewManager.inst().open(RechargePop);
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
        // this.progressLab.text = GameApp.exp+"/"+this.maxExp;
        this.expMask.width = GameApp.exp / this.maxExp * 671;
    };
    GameMainView.prototype.onLevelChange = function () {
        this.levelLab.text = "Lv." + GameApp.level;
    };
    GameMainView.prototype.close = function () {
        // this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onUnlockItem,this);
        if (this.watcher1) {
            this.watcher1.unwatch();
        }
        if (this.watcher2) {
            this.watcher2.unwatch();
        }
        if (this.watcher3) {
            this.watcher3.unwatch();
        }
        if (this.watcher4) {
            this.watcher4.unwatch();
        }
        this.removeTouchEvent(this.helpBtn, this.onHelp);
        // this.addTouchEvent(this.addBtn,this.onOperRecharge,true);
        this.removeTouchEvent(this.rechargeBtn, this.onOperRecharge);
        this.navGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
        this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        MessageManager.inst().removeListener("CardDataRefresh", this.refreshLockCardList, this);
    };
    // private cardMask:eui.Image;
    GameMainView.shopOpen = false;
    GameMainView.fightingOpen = false;
    GameMainView.treasureOpen = false;
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.inst().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map