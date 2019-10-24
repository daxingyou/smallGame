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
var RoleInfoPopUp = (function (_super) {
    __extends(RoleInfoPopUp, _super);
    function RoleInfoPopUp() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        return _this;
    }
    RoleInfoPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.content.scaleX = this.content.scaleY = 0;
        this.content.alpha = 0;
        egret.Tween.get(this.content).to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        // let index:number = 1;
        var value = GameApp.roleData[0].level;
        // if(value >= 1 && value <= 10){index = 1}
        // if(value >= 11 && value <= 20){index = 2}
        // if(value >= 21 && value <= 30){index = 3}
        // if(value >= 31 && value <= 40){index = 4}
        // if(value >= 41 && value <= 50){index = 5}
        // if(value >= 51 && value <= 60){index = 6}
        // if(value >= 61 && value <= 70){index = 7}
        // if(value >= 71 && value <= 80){index = 8}
        // if(value >= 81 && value <= 90){index = 9}
        this.levelIcon.source = "levelicon_" + value + "_png";
        // this.levelLab.text = "Lv."+value;
        var roleVo = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA));
        for (var key in roleVo) {
            if (!roleVo[key].isUnlock) {
                this["role" + (parseInt(key) + 1)].touchEnabled = false;
                GlobalFun.filterToGrey(this["role" + (parseInt(key) + 1)]);
            }
        }
        this.refreshPageInfo();
        this.addTouchEvent(this.returnBtn, this.onClose, true);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addTouchEvent(this.changeBtn, this.onChange, true);
    };
    RoleInfoPopUp.prototype.onChange = function () {
        GameApp.roleDataIndex = this.selectIndex;
    };
    RoleInfoPopUp.prototype.onTouch = function (evt) {
        switch (evt.target) {
            case this.role1:
                this.selectIndex = 0;
                this.refreshPageInfo();
                break;
            case this.role2:
                this.selectIndex = 1;
                this.refreshPageInfo();
                break;
            case this.role3:
                this.selectIndex = 2;
                this.refreshPageInfo();
                break;
            case this.role4:
                this.selectIndex = 3;
                this.refreshPageInfo();
                break;
            case this.role5:
                this.selectIndex = 4;
                this.refreshPageInfo();
                break;
        }
    };
    RoleInfoPopUp.prototype.refreshPageInfo = function () {
        var roleVos = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA));
        var itemVo = roleVos[this.selectIndex];
        // let index:number = 1;
        var value = GameApp.roleData[this.selectIndex].level;
        // if(value >= 1 && value <= 10){index = 1}
        // if(value >= 11 && value <= 20){index = 2}
        // if(value >= 21 && value <= 30){index = 3}
        // if(value >= 31 && value <= 40){index = 4}
        // if(value >= 41 && value <= 50){index = 5}
        // if(value >= 51 && value <= 60){index = 6}
        // if(value >= 61 && value <= 70){index = 7}
        // if(value >= 71 && value <= 80){index = 8}
        // if(value >= 81 && value <= 90){index = 9}
        this.levelIcon.source = "levelicon_" + value + "_png";
        // this.levelLab.text = "Lv."+value;
        this.nameLab.text = itemVo.name;
        this.roleModel.source = itemVo.roleModel;
        this.select.x = this["role" + (this.selectIndex + 1)].x - 4;
        this.select.y = this["role" + (this.selectIndex + 1)].y - 4;
    };
    RoleInfoPopUp.prototype.onClose = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(RoleInfoPopUp);
        }, this);
    };
    RoleInfoPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onClose);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.removeTouchEvent(this.changeBtn, this.onChange);
    };
    return RoleInfoPopUp;
}(BaseEuiView));
__reflect(RoleInfoPopUp.prototype, "RoleInfoPopUp");
ViewManager.inst().reg(RoleInfoPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=RoleInfoPopUp.js.map