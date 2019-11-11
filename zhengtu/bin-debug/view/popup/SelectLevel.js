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
var SelectLevel = (function (_super) {
    __extends(SelectLevel, _super);
    function SelectLevel() {
        var _this = _super.call(this) || this;
        _this._level = 1;
        return _this;
    }
    SelectLevel.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            if (GameApp.guilding) {
                if (GameApp.waitStepId) {
                    ViewManager.inst().open(GuideView);
                    GameApp.guildView = ViewManager.inst().getView(GuideView);
                    GameApp.guildView.nextStep({ id: GameApp.waitStepId, comObj: _this.levelGroup1, width: 62, height: 92 });
                }
            }
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
        if (levelstr) {
            this._level = parseInt(levelstr);
        }
        else {
            egret.localStorage.setItem(LocalStorageEnum.LEVEL, "1");
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        var otherGeneralstr = egret.localStorage.getItem(LocalStorageEnum.OTHER_GENERAL);
        this.otherGeneralArr = JSON.parse(otherGeneralstr);
        this.refreshLevelPage();
        MessageManager.inst().addListener(CustomEvt.GUIDE_SELECT_LEVEL, this.onSelectLevel, this);
        this.addTouchEvent(this.leftArrow, this.onLeftArrow, true);
    };
    SelectLevel.prototype.onLeftArrow = function () {
        UserTips.inst().showTips("暂未开启");
        return;
    };
    SelectLevel.prototype.onSelectLevel = function () {
        this.onReturn();
        ViewManager.inst().open(BattleView, [{ level: 1, state: -1 }]);
        if (GameApp.guilding) {
            GlobalFun.guideToNext();
        }
    };
    SelectLevel.prototype.onTouchTap = function (evt) {
        var target = evt.target;
        var namestr = evt.target.name;
        if (namestr && namestr.indexOf("levelGroup") != -1) {
            //当前点击的是关卡
            var level = parseInt(namestr.split("levelGroup")[1]);
            if (level > this._level) {
                UserTips.inst().showTips("请先通关上一关卡");
                return;
            }
            this.onReturn();
            ViewManager.inst().open(BattleView, [{ level: level }]);
        }
    };
    SelectLevel.prototype.refreshLevelPage = function () {
        for (var i = 0; i < 9; i++) {
            var levelLab = this["levelGroup" + (i + 1)].getChildByName("levelName");
            ;
            if (levelLab) {
                levelLab.textColor = 0xF2D72B;
            }
            var icon = this["levelGroup" + (i + 1)].getChildByName("icon");
            var curHeroAttr = this.otherGeneralArr[i];
            if (icon) {
                icon.source = "level_icon_" + curHeroAttr.index + "_png";
            }
            if ((i + 1) > this._level) {
                //未解锁关卡
                GlobalFun.filterToGrey(this["levelGroup" + (i + 1)]);
            }
            else if ((i + 1) < this._level) {
                //已通关关卡
                // let icon:eui.Image = this["levelGroup"+(i+1)].getChildByName("icon");
                // if(icon){icon.visible = false;}
            }
            else {
                //当前所在的关卡
                var mc = new MovieClip();
                mc.playFile(EFFECT + "battle", -1);
                this.content.addChild(mc);
                mc.x = this["levelGroup" + (i + 1)].x + (this["levelGroup" + (i + 1)].width >> 1);
                mc.y = this["levelGroup" + (i + 1)].y;
            }
        }
    };
    SelectLevel.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(SelectLevel);
        }, this);
    };
    SelectLevel.prototype.close = function () {
        this.removeTouchEvent(this.leftArrow, this.onLeftArrow);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return SelectLevel;
}(BaseEuiView));
__reflect(SelectLevel.prototype, "SelectLevel");
ViewManager.inst().reg(SelectLevel, LayerManager.UI_Pop);
//# sourceMappingURL=SelectLevel.js.map