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
var PubPopUp = (function (_super) {
    __extends(PubPopUp, _super);
    function PubPopUp() {
        return _super.call(this) || this;
    }
    PubPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = PubItem;
        this.scroller.viewport = this.list;
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        var campstr = egret.localStorage.getItem(LocalStorageEnum.CAMP);
        var skillCfgs = SkillCfg.skillCfg[parseInt(campstr)];
        //默认选择第一个
        this.selectindex = 0;
        this.skillCfgs = skillCfgs;
        // this.refreshshow();
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        var data = [];
        for (var i = 0; i < skillCfgs.length; i++) {
            var obj = {
                cost: skillCfgs[i].lockCost,
                skillName: skillCfgs[i].skillName,
                res: skillCfgs[i].roleSkill,
                skillId: skillCfgs[i].skillId,
                attr: skillCfgs[i].attr
            };
            data.push(obj);
        }
        this.list.dataProvider = this.arrayCollect;
        this.arrayCollect.source = data;
    };
    // private onTouchTap(evt:egret.TouchEvent):void{
    // 	switch(evt.target){
    // 		case this.general_1:
    // 			this.selectindex = 0;
    // 			this.refreshshow();
    // 			break;
    // 		case this.general_2:
    // 			this.selectindex = 1;
    // 			this.refreshshow();
    // 			break;
    // 		case this.general_3:
    // 			this.selectindex = 2;
    // 			this.refreshshow();
    // 			break;
    // 		case this.getBtn:
    // 			let cost:number = this.skillCfgs[this.selectindex].lockCost;
    // 			if(GameApp.ins<GameApp>().role_gold < cost){
    // 				UserTips.ins<UserTips>().showTips(`元宝不足,可通过<font color=0x00ff00>【扫荡】【征收】</font>获得`);
    // 				return;
    // 			}
    // 			GameApp.ins<GameApp>().gold -= cost;
    // 			let generalInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
    // 			let skillId:number = this.skillCfgs[this.selectindex].skillId;
    // 			if(generalInfoStr){
    // 				let arr:string[] = generalInfoStr.split("_");
    // 				GameApp.ownGeneralNum = arr.length + 2;
    // 				let str:string = generalInfoStr + "_" + skillId;
    // 				egret.localStorage.setItem(LocalStorageEnum.GENERAL_GET,str)
    // 			}else{
    // 				GameApp.ownGeneralNum = 2;
    // 				egret.localStorage.setItem(LocalStorageEnum.GENERAL_GET,skillId.toString())
    // 			}
    // 			this.refreshshow();
    // 			break;
    // 	}
    // }
    // private refreshshow():void{
    // 	this.attrLab.text = this.skillCfgs[this.selectindex].attr;
    // 	this.costLab.text = this.skillCfgs[this.selectindex].lockCost;
    // 	this.nameLab.text = this.skillCfgs[this.selectindex].roleName;
    // 	let generalInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
    // 	if(generalInfoStr){
    // 		let skillId:string = this.skillCfgs[this.selectindex].skillId.toString();
    // 		let arr:string[] = generalInfoStr.split("_");
    // 		this.getBtn.visible = !(!!~arr.indexOf(skillId))
    // 	}
    // }
    PubPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(PubPopUp);
        }, this);
    };
    PubPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    };
    return PubPopUp;
}(BaseEuiView));
__reflect(PubPopUp.prototype, "PubPopUp");
ViewManager.ins().reg(PubPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=PubPopUp.js.map