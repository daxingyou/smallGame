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
        _this.time_num = 300;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        this.roleInfoData = [];
        this.expBar.mask = this.expMask;
        this.expMask.width = 0;
        this.roleMode["autoSize"]();
        this.level_group["autoSize"]();
        this.time_label["autoSize"]();
        this.bossTitle["autoSize"]();
        this.scroller["autoSize"]();
        egret.Tween.get(this).to({ alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
        this.arraycollect = new eui.ArrayCollection();
        this.list.itemRenderer = CardItem;
        this.list.dataProvider = this.arraycollect;
        this.scroller.viewport = this.list;
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        var datastr = egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA);
        if (datastr) {
            this.roleInfoData = JSON.parse(datastr);
        }
        else {
            this.roleInfoData = PartnerCfg.parenerCfg;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_DATA, JSON.stringify(this.roleInfoData));
        }
        var dataArr = [];
        for (var key in this.roleInfoData) {
            if (key == "0") {
                continue;
            }
            var obj = {};
            obj.ownNum = this.roleInfoData[key].o_suipian;
            obj.totalNum = this.roleInfoData[key].t_suipian;
            obj.role = this.roleInfoData[key].cardModel;
            obj.nameStr = this.roleInfoData[key].name;
            obj.lockLevel = this.roleInfoData[key].unlock;
            dataArr.push(obj);
        }
        this.arraycollect.source = dataArr;
        this.maxExp = GameApp.roleData[GameApp.roleDataIndex].level * 500;
        this.goldWather = eui.Binding.bindProperty(GameApp, ["roleGold"], this.goldLab, "text");
        this.roleDataWatcher = eui.Binding.bindHandler(GameApp, ["roleDataIndex"], this.roleDataChange, this);
        this.levelWatcher = eui.Binding.bindHandler(GameApp, ["roleLevel"], this.levelChange, this);
        // this.expWatcher = eui.Binding.bindHandler(GameApp,["roleExp"],this.expChange,this);
        MessageManager.inst().addListener(CustomEvt.ADD_SHIELD, this.onaddShield, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        MessageManager.inst().addListener("ADVENTURE_OVER", this.closeLevelBtn, this);
        MessageManager.inst().addListener("mainRoleUp", this.onMainRoleUp, this);
        this.btnEffect();
    };
    GameMainView.prototype.onMainRoleUp = function () {
        this.roleInfoData = GameApp.roleData;
        var roleinfovo = this.roleInfoData[GameApp.roleDataIndex];
        this.maxExp = roleinfovo.level * 500;
        this.progressLab.text = roleinfovo.exp + "/" + this.maxExp;
        this.expMask.width = roleinfovo.exp / this.maxExp * 215;
        this.roleDataChange(GameApp.roleDataIndex);
    };
    GameMainView.prototype.btnEffect = function () {
        this.levelBtn.source = "levelBtn_png";
        egret.Tween.get(this.levelBtn, { loop: true })
            .to({ scaleX: 1.1, scaleY: 1.1 }, 600)
            .call(this.createBtnEffect, this)
            .to({ scaleX: 1, scaleY: 1 }, 600)
            .wait(500);
    };
    GameMainView.prototype.createBtnEffect = function () {
        var _this = this;
        var btn = new egret.Bitmap(RES.getRes("levelBtn_png"));
        btn.scaleX = 1.1;
        btn.scaleY = 1.1;
        btn.anchorOffsetX = btn.width / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.x = this.levelBtn.x;
        btn.y = this.levelBtn.y;
        btn.touchEnabled = false;
        this.level_group.addChild(btn);
        egret.Tween.get(btn)
            .to({ scaleX: 1.3, scaleY: 1.3, alpha: 0 }, 600)
            .call(function () {
            _this.level_group.removeChild(btn);
        }, this);
    };
    GameMainView.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.roleHead:
                ViewManager.inst().open(RoleInfoPopUp);
                break;
            case this.addBtn:
                ViewManager.inst().open(RechargePopUp);
                break;
            case this.signBtn:
                ViewManager.inst().open(SignPopUp);
                break;
            case this.shopBtn:
                ViewManager.inst().open(ShopPopUp);
                break;
            case this.bagBtn:
                ViewManager.inst().open(BagPopUp);
                break;
            case this.syntheBtn:
                ViewManager.inst().open(HCPopUp);
                break;
            case this.soulBtn:
                ViewManager.inst().open(SoulPopUp);
                break;
            case this.levelBtn:
                if (this.time_group.visible) {
                    if (GameApp.roleGold >= 500) {
                        GameApp.roleGold -= 500;
                        this.time_group.visible = false;
                        this.time_num--;
                        this.time_label.text = this.time_num + " s";
                        clearInterval(this.timeinterval);
                        this.btnEffect();
                        return;
                    }
                    else {
                        UserTips.inst().showTips("金币不足！");
                        return;
                    }
                }
                if (!this.time_group.visible) {
                    egret.Tween.removeTweens(this.levelBtn);
                    this.time_num = 300;
                    GameConfig.fight_state = "adventure";
                    ViewManager.inst().open(AdventureView);
                }
                break;
        }
    };
    GameMainView.prototype.closeLevelBtn = function () {
        var _this = this;
        this.time_group.visible = true;
        this.levelBtn.source = "levelBtn_lock_png";
        var self = this;
        this.timeinterval = setInterval(function () {
            self.time_num--;
            self.time_label.text = _this.time_num + " s";
            if (self.time_num <= 0) {
                self.time_group.visible = false;
                self.levelBtn.source = "levelBtn_png";
            }
        }, 1000);
    };
    // private expChange(value:number):void{
    // }
    /**添加碎片 */
    GameMainView.prototype.onaddShield = function (evt) {
        var datastr = egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA);
        this.roleInfoData = JSON.parse(datastr);
        var itemVo = this.roleInfoData[evt.data.index + 1];
        var obj = {};
        obj.ownNum = itemVo.o_suipian;
        obj.totalNum = itemVo.t_suipian;
        obj.role = itemVo.cardModel;
        obj.nameStr = itemVo.name;
        obj.lockLevel = itemVo.unlock;
        // this.arraycollect.source[evt.data.index-1] = obj
        var cardItem = this.list.getChildAt(evt.data.index);
        cardItem.refreshItemData(obj);
        // this.list.dataProviderRefreshed();
    };
    GameMainView.prototype.levelChange = function (value) {
        this.maxExp = value * 500;
        for (var i = 0; i < this.list.$children.length; i++) {
            this.list.$children[i].refreshLock();
        }
    };
    GameMainView.prototype.roleDataChange = function (index) {
        var roleData = this.roleInfoData[index];
        // this.levelLab.text = "Lv."+roleData.level;
        var value = roleData.level;
        // let levelIndex:number = 1;
        // if(roleData.level >= 1 && value <= 10){levelIndex = 1}
        // if(value >= 11 && value <= 20){levelIndex = 2}
        // if(value >= 21 && value <= 30){levelIndex = 3}
        // if(value >= 31 && value <= 40){levelIndex = 4}
        // if(value >= 41 && value <= 50){levelIndex = 5}
        // if(value >= 51 && value <= 60){levelIndex = 6}
        // if(value >= 61 && value <= 70){levelIndex = 7}
        // if(value >= 71 && value <= 80){levelIndex = 8}
        // if(value >= 81 && value <= 90){levelIndex = 9}
        this.levelIcon.source = "levelicon_" + value + "_png";
        this.nameLab.text = roleData.name;
        this.roleHead.source = roleData.icon;
        this.roleMode.source = roleData.roleModel;
    };
    GameMainView.prototype.close = function () {
        if (this.goldWather) {
            this.goldWather.unwatch();
        }
        if (this.roleDataWatcher) {
            this.roleDataWatcher.unwatch();
        }
        if (this.expWatcher) {
            this.expWatcher.unwatch();
        }
        if (this.levelWatcher) {
            this.levelWatcher.unwatch();
        }
        MessageManager.inst().removeListener(CustomEvt.ADD_SHIELD, this.onaddShield, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.inst().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map