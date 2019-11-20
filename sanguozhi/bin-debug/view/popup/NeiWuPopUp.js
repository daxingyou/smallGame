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
var NeiWuPopUp = (function (_super) {
    __extends(NeiWuPopUp, _super);
    function NeiWuPopUp() {
        var _this = _super.call(this) || this;
        _this.items = [];
        _this.word1 = [];
        _this.word2 = [];
        _this.storyStep = 1;
        _this.singleDis = 0;
        _this.anwserState = false;
        return _this;
    }
    NeiWuPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.neiwuGroup["autoSize"]();
        this.neiwuGroup.verticalCenter = -600;
        egret.Tween.get(this.neiwuGroup).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.neiwuGroup);
        }, this);
        MessageManager.inst().addListener("SELECT_SURE", this.onSelectSure, this);
        MessageManager.inst().addListener("SELECT_CANCLE", this.onSeleceCancle, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        var cdTimestring = egret.localStorage.getItem(LocalStorageEnum.NEIWU_CD_TIME);
        if (!cdTimestring || (cdTimestring && parseInt(cdTimestring) <= new Date().getTime())) {
            //当前不存在内务 或者内务冷区已经结束
            egret.localStorage.setItem(LocalStorageEnum.NEIWU_CD_TIME, "");
            this.showPageNormal();
            this.showStory();
        }
        else {
            this.timer.start();
            this.showPageCd();
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    NeiWuPopUp.prototype.onTouchTap = function () {
        if (this.storyStep == 5) {
            return;
        }
        this.showItem();
    };
    NeiWuPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.neiwuGroup).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.neiwuGroup);
            ViewManager.inst().close(NeiWuPopUp);
        }, this);
    };
    NeiWuPopUp.prototype.showPageCd = function () {
        this.storyStep = 5;
        this.noneGroup.visible = true;
    };
    NeiWuPopUp.prototype.showPageNormal = function () {
        this.storyStep = 1;
        this.noneGroup.visible = false;
    };
    NeiWuPopUp.prototype.onTimer = function () {
        var endTime = egret.localStorage.getItem(LocalStorageEnum.NEIWU_CD_TIME);
        if (endTime && parseInt(endTime) > new Date().getTime()) {
            var offValue = parseInt(endTime) - new Date().getTime();
            var timestr = DateUtils.getFormatBySecond(offValue / 1000, DateUtils.TIME_FORMAT_3);
            //显示到文本上
            this.timeLab.text = timestr;
        }
        else {
            this.timer.stop();
            egret.localStorage.setItem(LocalStorageEnum.NEIWU_CD_TIME, "");
            this.showPageNormal();
            this.showStory();
        }
    };
    NeiWuPopUp.prototype.onSelectSure = function () {
        this.judageReward(this.option[1]);
    };
    NeiWuPopUp.prototype.onSeleceCancle = function () {
        this.judageReward(this.option[2]);
    };
    NeiWuPopUp.prototype.judageReward = function (option) {
        var _this = this;
        var countstr = egret.localStorage.getItem(LocalStorageEnum.NEYWU_COUNT);
        if (!countstr) {
            egret.localStorage.setItem(LocalStorageEnum.NEYWU_COUNT, "1");
        }
        else {
            egret.localStorage.setItem(LocalStorageEnum.NEYWU_COUNT, (parseInt(countstr) + 1).toString());
        }
        if (option) {
            //当前选项有值
            for (var key in option) {
                if (key == "goods") {
                    GameApp.goods += option.goods;
                    UserTips.inst().showTips("获得粮草x" + option.goods);
                }
                else if (key == "medal") {
                    GameApp.medal += option.medal;
                    UserTips.inst().showTips("获得勋章x" + option.medal);
                }
                else if (key == "general") {
                    var generalCards = GlobalFun.getCardsFromType(CardType.general, true);
                    for (var i = 0; i < generalCards.length; i++) {
                        if (generalCards[i].insId == 10000 || generalCards[i].insId == 10001 || generalCards[i].insId == 10002) {
                            //排除3个优质武将
                            generalCards.splice(i, 1);
                            i -= 1;
                        }
                    }
                    var rewardGeneral = generalCards[((Math.random() * generalCards.length) >> 0)];
                    var ownNumInfo = GlobalFun.getCardDataFromId(rewardGeneral.insId, ["ownNum"]);
                    GlobalFun.refreshCardData(rewardGeneral.insId, { ownNum: ownNumInfo.ownNum + 1 });
                    UserTips.inst().showTips("\u83B7\u5F97\u6B66\u5C06" + rewardGeneral.name + "x1");
                }
            }
        }
        var _loop_1 = function (i) {
            var curItem = this_1.items[i];
            if (curItem) {
                egret.Tween.get(curItem).to({ alpha: 0 }, 600).call(function () {
                    egret.Tween.removeTweens(curItem);
                    // curItem.parent.removeChild(curItem);
                    if (i >= _this.items.length - 1) {
                        _this.items = [];
                        var self_1 = _this;
                        var timeout_1 = setTimeout(function () {
                            clearTimeout(timeout_1);
                            var countstr = egret.localStorage.getItem(LocalStorageEnum.NEYWU_COUNT);
                            if (!countstr || (countstr && parseInt(countstr) < 3)) {
                                //当前次数还可以处理内务
                                this.storyStep = 1;
                                self_1.showStory();
                            }
                            else {
                                //当前处理的内务已经大于等于3次
                                var cdTime = new Date().getTime() + 10 * 60 * 1000;
                                egret.localStorage.setItem(LocalStorageEnum.NEIWU_CD_TIME, cdTime.toString());
                                self_1.showPageCd();
                                self_1.timer.start();
                                MessageManager.inst().dispatch(CustomEvt.NEIWU_CD);
                            }
                        }, 300);
                    }
                }, this_1);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.items.length; i++) {
            _loop_1(i);
        }
    };
    /**显示故事 */
    NeiWuPopUp.prototype.showStory = function () {
        this.anwserState = false;
        this.singleDis = 0;
        this.storyStep = 1;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] && this.items[i].parent) {
                this.items[i].dispose();
                this.items[i].parent.removeChild(this.items[i]);
            }
        }
        this.items = [];
        this.word1 = [];
        this.word2 = [];
        var storycfgs = NeiwuCfg.cfgs;
        var cfg = storycfgs[((Math.random() * storycfgs.length) >> 0)];
        // let word1:string[] = [];
        this.word1 = this.word1.concat(cfg.word1);
        // let word2:string[] = [];
        this.word2 = this.word2.concat(cfg.word2);
        this.head1 = cfg.head1;
        this.head2 = cfg.head2;
        this.name1 = cfg.name1;
        this.name2 = cfg.name2;
        this.tip = cfg.tip;
        this.option = cfg.option;
        this.showItem();
    };
    NeiWuPopUp.prototype.showItem = function () {
        var _this = this;
        if (this.anwserState) {
            return;
        }
        if (this.storyStep == 1 || this.storyStep == 3) {
            var firstWord = this.word1.shift();
            if (firstWord) {
                if (this.storyStep == 3) {
                    this.singleDis += 100;
                }
                this.storyStep += 1;
                var firstItem = new NeiWuStoryItem();
                this.storyGroup.addChild(firstItem);
                firstItem.alpha = 0;
                firstItem.initData({ skinState: "left", head: this.head1, story: firstWord, name: this.name1 });
                firstItem.left = 20;
                this.items.push(firstItem);
                // this.singleDis += 100;
                firstItem.top = this.singleDis;
                if (!this.word1.length && !this.word2.length) {
                    this.storyStep = -1;
                }
                egret.Tween.get(firstItem).to({ alpha: 1 }, 800).call(function () {
                    egret.Tween.removeTweens(_this);
                }, this);
            }
            else {
                //-1显示操作
                this.storyStep = -1;
            }
        }
        else if (this.storyStep == 2) {
            var secordWord = this.word2.shift();
            if (secordWord) {
                this.storyStep += 1;
                this.singleDis += 100;
                var secondItem_1 = new NeiWuStoryItem();
                this.storyGroup.addChild(secondItem_1);
                secondItem_1.alpha = 0;
                this.items.push(secondItem_1);
                secondItem_1.initData({ skinState: "right", head: this.head2, story: secordWord, name: this.name2 });
                secondItem_1.right = 20;
                secondItem_1.top = this.singleDis;
                if (!this.word1.length && !this.word2.length) {
                    this.storyStep = -1;
                }
                egret.Tween.get(secondItem_1).to({ alpha: 1 }, 800).call(function () {
                    egret.Tween.removeTweens(secondItem_1);
                }, this);
            }
            else {
                //-1显示操作
                this.storyStep = -1;
                // this.showItem(word1,word2,head1,head2);
            }
        }
        else if (this.storyStep == -1) {
            this.showOption();
        }
    };
    /**显示选择操作 */
    NeiWuPopUp.prototype.showOption = function () {
        this.storyStep = -2;
        this.anwserState = true;
        var item = new NeiWuStoryItem();
        item.name = "judge";
        this.storyGroup.addChild(item);
        item.initData({ skinState: "center", head: "neiwu_head_2_png", story: this.tip });
        this.items.push(item);
        item.horizontalCenter = 0;
        item.alpha = 0;
        this.singleDis += 140;
        item.top = this.singleDis;
        egret.Tween.get(item).to({ alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(item);
        }, this);
    };
    NeiWuPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        MessageManager.inst().removeListener("SELECT_SURE", this.onSelectSure, this);
        MessageManager.inst().removeListener("SELECT_CANCLE", this.onSeleceCancle, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return NeiWuPopUp;
}(BaseEuiView));
__reflect(NeiWuPopUp.prototype, "NeiWuPopUp");
ViewManager.inst().reg(NeiWuPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=NeiWuPopUp.js.map