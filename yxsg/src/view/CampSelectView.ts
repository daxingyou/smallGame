/**
 * 国家选择界面
 */
class CampSelectView extends BaseEuiView{

	// private militaryGroup:eui.Group;

	// private wisdomGroup:eui.Group;

	// private defenseGroup:eui.Group;
	
	// private infoLab:eui.Label;

	private curSelectIndex:number = 0;

	private camp_0:eui.Group;
	private camp_1:eui.Group;
	private camp_2:eui.Group;
	private startBtn:eui.Group;

	private roleImg:eui.Image;
	private block_1:eui.Image;
	private block_2:eui.Image;
	private block_3:eui.Image;

	private font_1:eui.Image;
	private font_2:eui.Image;
	private font_3:eui.Image;

	private wordLab:eui.Label;
	private wordstr:string = "时下世间，正值三国混战，百姓流离，乱世动荡中，各方势力皆广招天下英才，钻研战阵技能，以便在谋夺天下中占得先机。乱世英豪，群英荟萃，请英雄选择一方势力进行效忠！"
	private wordGroup:eui.Group;
	private startGameBtn:eui.Image;
	private rect1:eui.Rect
	public constructor() {
		super();
	}
	public open(...param):void{
		this.refreshShow();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.addTouchEvent(this.startBtn,this.onstart,true);
		// this.typerEffect(this.wordLab,this.wordstr,200,()=>{
		// 	this.touchEnabled = true;

		// },this);
		this.wordGroup.alpha = 0;
		egret.Tween.get(this.wordGroup).to({alpha:1},1000,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.wordGroup);
			this.addTouchEvent(this.startGameBtn,this.onCloseStory,true);
		},this)
	}
	private onCloseStory():void{
		this.removeTouchEvent(this.startGameBtn,this.onCloseStory);
		egret.Tween.get(this.wordGroup).to({alpha:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.wordGroup);
			this.wordGroup.visible = false;
			this.rect1.visible = false;
			egret.Tween.get(this.roleImg).to({bottom:60},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.roleImg);
			},this)
		},this)
	}
    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */    
    private typerEffect(obj,content:string = "",interval:number = 200,backFun:Function = null,thisArg):void{
        var strArr:Array<any> = content.split("");
        var len:number = strArr.length;
        for (let i = 0; i < len; i++){
            let timeout;
            timeout = egret.setTimeout(function () { 
                obj.appendText(strArr[i]);
                if ((Number(i) >= len - 1) && (backFun != null)) {
                    backFun.call(thisArg);
                }
            }, this, interval*i);              
        }
    }
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
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
				egret.localStorage.setItem(LocalStorageEnum.CAMP,this.curSelectIndex.toString())
				ViewManager.ins<ViewManager>().close(CampSelectView);
				ViewManager.ins<ViewManager>().open(GameMainView);
				break;
		}
	}
	private onstart():void{}
	private refreshShow():void{
		if(this.curSelectIndex == 0){
			this.block_1.source = "block_1_focus_png";
			this.block_2.source = "block_2_normal_png";
			this.block_3.source = "block_3_normal_png"
		}else if(this.curSelectIndex == 1){
			this.block_1.source = "block_1_normal_png";
			this.block_2.source = "block_2_focus_png";
			this.block_3.source = "block_3_normal_png"
		}else if(this.curSelectIndex == 2){
			this.block_1.source = "block_1_normal_png";
			this.block_2.source = "block_2_normal_png";
			this.block_3.source = "block_3_focus_png"
		}
		// let cfg:{info:string,star_military:number,star_wisdom:number,star_defense:number} = CampCfg.campCfg[this.curSelectIndex];
		// this.infoLab.text = cfg.info;
		// this.refreshStar(cfg.star_military,this.militaryGroup);
		// this.refreshStar(cfg.star_wisdom,this.wisdomGroup);
		// this.refreshStar(cfg.star_defense,this.defenseGroup);
	}
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
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.removeTouchEvent(this.startBtn,this.onstart);
	}
}
ViewManager.ins<ViewManager>().reg(CampSelectView,LayerManager.UI_Main);