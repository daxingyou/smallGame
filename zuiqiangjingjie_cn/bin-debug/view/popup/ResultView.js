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
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView() {
        return _super.call(this) || this;
    }
    ResultView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GameCfg.resultBool = true;
        // this.winGroup["autoSize"]();
        this.failGroup["autoSize"]();
        this.skin.currentState = param[0].state;
        if (param[0].cb) {
            this._cb = param[0].cb;
        }
        if (param[0].arg) {
            this._arg = param[0].arg;
        }
        if (param[0].type) {
            this._type = param[0].type;
        }
        if (param[0].state == "win") {
            var percent = StageUtils.inst().getWidth() / 1334;
            // this.winGroup.x = (StageUtils.inst().getWidth() - this.winGroup.width*percent)>>1;
            // this.winGroup.y = (StageUtils.inst().getHeight() - this.winGroup.height*percent)>>1;
            if (!this._type) {
                var marks = GameApp.battleMark.split("_");
                var cityInfo = GlobalFun.getCityInfo(parseInt(marks[0]));
                if (GameApp.levelid >= 4) {
                    GameApp.levelid = 1;
                    GameApp.chapterid += 1;
                }
                else {
                    GameApp.levelid += 1;
                }
                var timespan = parseInt(marks[1]) >= 4 ? new Date().getTime() : 0;
                GlobalFun.changeCityInfo(cityInfo.cityId, { passLevel: parseInt(marks[1]), isMain: parseInt(marks[1]) >= 4, isOwn: parseInt(marks[1]) >= 3, timespan: timespan });
                GameApp.battleMark = null;
            }
            this.battlestate = true;
            var winCount = egret.localStorage.getItem(LocalStorageEnum.WIN_COUNT);
            var count = winCount ? parseInt(winCount) + 1 : 1;
            egret.localStorage.setItem(LocalStorageEnum.WIN_COUNT, count.toString());
            if (count && count >= 1) {
                this.titleImg.source = parseInt(winCount) >= 4 ? "title_4_png" : "title_" + count + "_png";
            }
            else {
                this.titleImg.source = "title_1_png";
            }
            var goodsNum = 150 + ((Math.random() * 30) >> 0);
            var medalNum = 1;
            var expNum = 150 + ((Math.random() * 30) >> 0);
            this.goodsLab.text = "物资x" + goodsNum.toString();
            this.medalLab.text = "勋章x" + medalNum.toString();
            this.soldierLab.text = "经验x" + expNum.toString();
            GameApp.goods += goodsNum;
            GameApp.medal += medalNum;
            for (var i = 1; i <= 3; i++) {
                this["card" + i].visible = false;
            }
            GameApp.exp += expNum;
            // let index:number = ((Math.random()*3 + 1)>>0);
            // GameApp[`soldier${index}Num`] += soldierNum;
            var generals = GameApp.cardInfo;
            var cards = [];
            for (var i = 0; i < generals.length; i++) {
                if (generals[i].type == CardType.general) {
                }
                else {
                    cards.push(this.deepObj(generals[i]));
                }
            }
            var numIndex = ((Math.random() * 3 + 1) >> 0);
            for (var i = 0; i < numIndex; i++) {
                var cardIndex = (Math.random() * cards.length) >> 0;
                var cardAttr = cards[cardIndex];
                if (numIndex == 1) {
                    this.card1.visible = true;
                    this.card1.initData(cardAttr, false);
                }
                else if (numIndex == 2) {
                    this.card1.visible = this.card2.visible = true;
                    !!i ? this.card1.initData(cardAttr, false) : this.card2.initData(cardAttr, false);
                }
                else {
                    this["card" + (i + 1)].visible = true;
                    this["card" + (i + 1)].initData(cardAttr, false);
                }
                if (cardAttr.insId == 10003) {
                    GameApp.intelligence += 1;
                }
                else if (cardAttr.type == CardType.soldier) {
                    if (cardAttr.soldierType == 1 || cardAttr.soldierType == 2) {
                        var ownNum = GlobalFun.getCardDataFromId(cardAttr.insId, ["ownNum"]).ownNum;
                        GlobalFun.refreshCardData(cardAttr.insId, { ownNum: ownNum + 36 });
                    }
                    else {
                        var ownNum = GlobalFun.getCardDataFromId(cardAttr.insId, ["ownNum"]).ownNum;
                        GlobalFun.refreshCardData(cardAttr.insId, { ownNum: ownNum + 24 });
                    }
                }
                else {
                    var ownNum = GlobalFun.getCardDataFromId(cardAttr.insId, ["ownNum"]).ownNum;
                    GlobalFun.refreshCardData(cardAttr.insId, { ownNum: ownNum + 1 });
                }
            }
            // this.generalGroup.mask = this.groupMask;
            // let rotation:number = 0;
            this.tipFont.alpha = 0;
            for (var i = 1; i <= 3; i++) {
                this["group" + i].alpha = 0;
            }
            this.generalGroup.alpha = 0;
            this.titleImg.alpha = 0;
            this.generalGroup.alpha = 0;
            this.titleImg.scaleX = this.titleImg.scaleY = 5;
            this.generalGroup.scaleX = this.generalGroup.scaleY = 5;
            egret.Tween.get(this.generalGroup).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 150, egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(_this.groupMask);
            }, this);
            var self_1 = this;
            var timeout_1 = setTimeout(function () {
                clearTimeout(timeout_1);
                egret.Tween.get(self_1.titleImg).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 150, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(self_1.titleImg);
                    var timeout2 = setTimeout(function () {
                        clearTimeout(timeout2);
                        var _loop_1 = function (i) {
                            self_1["group" + i].scaleX = self_1["group" + i].scaleY = 5;
                            egret.Tween.get(self_1["group" + i]).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 150 + i, egret.Ease.circIn).call(function () {
                                egret.Tween.removeTweens(self_1["group" + i]);
                                egret.Tween.get(self_1.tipFont, { loop: true }).to({ alpha: 1 }, 1200).to({ alpha: 0 }, 1200);
                                self_1.touchChildren = false;
                                self_1.touchEnabled = true;
                                self_1.addEventListener(egret.TouchEvent.TOUCH_TAP, self_1.onReturn, self_1);
                            }, self_1);
                        };
                        for (var i = 1; i <= 3; i++) {
                            _loop_1(i);
                        }
                    }, 300);
                }, self_1);
            }, 300);
        }
        else {
            GameApp.battleMark = null;
            this.battlestate = false;
            egret.localStorage.setItem(LocalStorageEnum.WIN_COUNT, "0");
            this.failGroup.alpha = 0;
            egret.Tween.get(this.failGroup).to({ alpha: 1 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(_this.failGroup);
                _this.addTouchEvent(_this.sureBtn, _this.onReturn, true);
            }, this);
        }
    };
    ResultView.prototype.deepObj = function (param) {
        var obj = {};
        for (var key in param) {
            obj[key] = param[key];
        }
        return obj;
    };
    ResultView.prototype.onReturn = function () {
        var _this = this;
        var group = this.battlestate ? this.winGroup : this.failGroup;
        egret.Tween.get(group).to({ alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(group);
            ViewManager.inst().close(ResultView);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg, _this._type);
            }
        }, this);
    };
    ResultView.prototype.close = function () {
        GameCfg.resultBool = false;
        egret.Tween.removeTweens(this.tipFont);
        this.removeTouchEvent(this.sureBtn, this.onReturn);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
    };
    return ResultView;
}(BaseEuiView));
__reflect(ResultView.prototype, "ResultView");
ViewManager.inst().reg(ResultView, LayerManager.UI_Pop);
//# sourceMappingURL=ResultView.js.map