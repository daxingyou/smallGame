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
/**
 * 国家选择界面
 */
var CampSelectView = (function (_super) {
    __extends(CampSelectView, _super);
    function CampSelectView() {
        var _this = _super.call(this) || this;
        // private militaryGroup:eui.Group;
        // private wisdomGroup:eui.Group;
        // private defenseGroup:eui.Group;
        // private infoLab:eui.Label;
        _this.curSelectIndex = 0;
        _this.wordstr = "时下世间，正值三国混战，百姓流离，乱世动荡中，各方势力皆广招天下英才，钻研战阵技能，以便在谋夺天下中占得先机。乱世英豪，群英荟萃，请英雄选择一方势力进行效忠！";
        return _this;
    }
    CampSelectView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.refreshShow();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addTouchEvent(this.startBtn, this.onstart, true);
        // this.typerEffect(this.wordLab,this.wordstr,200,()=>{
        // 	this.touchEnabled = true;
        // },this);
        this.wordGroup.alpha = 0;
        egret.Tween.get(this.wordGroup).to({ alpha: 1 }, 1000, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.wordGroup);
            _this.addTouchEvent(_this.startGameBtn, _this.onCloseStory, true);
        }, this);
    };
    CampSelectView.prototype.onCloseStory = function () {
        var _this = this;
        this.removeTouchEvent(this.startGameBtn, this.onCloseStory);
        egret.Tween.get(this.wordGroup).to({ alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.wordGroup);
            _this.wordGroup.visible = false;
            _this.rect1.visible = false;
            egret.Tween.get(_this.roleImg).to({ bottom: 60 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(_this.roleImg);
            }, _this);
        }, this);
    };
    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    CampSelectView.prototype.typerEffect = function (obj, content, interval, backFun, thisArg) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        if (backFun === void 0) { backFun = null; }
        var strArr = content.split("");
        var len = strArr.length;
        var _loop_1 = function (i) {
            var timeout = void 0;
            timeout = egret.setTimeout(function () {
                obj.appendText(strArr[i]);
                if ((Number(i) >= len - 1) && (backFun != null)) {
                    backFun.call(thisArg);
                }
            }, this_1, interval * i);
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
    };
    CampSelectView.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.block_1:
            case this.font_1:
                this.curSelectIndex = 0;
                this.roleImg.source = "camp_1_role_png";
                this.refreshShow();
                break;
            case this.block_2:
            case this.font_2:
                this.curSelectIndex = 1;
                this.roleImg.source = "camp_2_role_png";
                this.refreshShow();
                break;
            case this.block_3:
            case this.font_3:
                this.curSelectIndex = 2;
                this.roleImg.source = "camp_3_role_png";
                this.refreshShow();
                break;
            case this.startBtn:
                egret.localStorage.setItem(LocalStorageEnum.CAMP, this.curSelectIndex.toString());
                ViewManager.ins().close(CampSelectView);
                ViewManager.ins().open(GameMainView);
                break;
        }
    };
    CampSelectView.prototype.onstart = function () { };
    CampSelectView.prototype.refreshShow = function () {
        if (this.curSelectIndex == 0) {
            this.block_1.source = "block_1_focus_png";
            this.block_2.source = "block_2_normal_png";
            this.block_3.source = "block_3_normal_png";
        }
        else if (this.curSelectIndex == 1) {
            this.block_1.source = "block_1_normal_png";
            this.block_2.source = "block_2_focus_png";
            this.block_3.source = "block_3_normal_png";
        }
        else if (this.curSelectIndex == 2) {
            this.block_1.source = "block_1_normal_png";
            this.block_2.source = "block_2_normal_png";
            this.block_3.source = "block_3_focus_png";
        }
        // let cfg:{info:string,star_military:number,star_wisdom:number,star_defense:number} = CampCfg.campCfg[this.curSelectIndex];
        // this.infoLab.text = cfg.info;
        // this.refreshStar(cfg.star_military,this.militaryGroup);
        // this.refreshStar(cfg.star_wisdom,this.wisdomGroup);
        // this.refreshStar(cfg.star_defense,this.defenseGroup);
    };
    // private refreshStar(starNum:number,group:eui.Group):void{
    // 	let len:number = group.$children.length;
    // 	for(let j:number =0;j<len;j++){
    // 		let rect:eui.Rect = group.getChildAt(j) as eui.Rect;
    // 		rect.fillColor = 0x1F4EAD;
    // 	}
    // 	for(let i:number = 0;i<starNum;i++){
    // 		let rect:eui.Rect = group.getChildAt(i) as eui.Rect;
    // 		rect.fillColor = 0xE5920D;
    // 	}
    // }
    CampSelectView.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeTouchEvent(this.startBtn, this.onstart);
    };
    return CampSelectView;
}(BaseEuiView));
__reflect(CampSelectView.prototype, "CampSelectView");
ViewManager.ins().reg(CampSelectView, LayerManager.UI_Main);
//# sourceMappingURL=CampSelectView.js.map