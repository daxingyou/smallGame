/**
 * 太学
 */
class StudyPopUp extends BaseEuiView{

	private content:eui.Group;

	private active_1:eui.Image;
	private active_2:eui.Image;
	private active_3:eui.Image;
	private levelLab:eui.Label;
	private nameLab:eui.Label;
	private descLab:eui.Label;

	private attr_1:eui.Label;
	private attr_2:eui.Label;
	private attr_3:eui.Label;
	private cost_1:eui.Label;
	private cost_2:eui.Label;
	private cost_3:eui.Label;
	private upgrade_1:eui.Image;
	private upgrade_2:eui.Image;
	private upgrade_3:eui.Image;
	private icon:eui.Image;
	private returnBtn:eui.Image;

	private icon1:eui.Image;
	private icon2:eui.Image;
	private icon3:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		let leve1str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
		let leve2str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
		let leve3str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
		if(!leve1str){
			egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF1_LEVEL,"0");
		}
		if(!leve2str){
			egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF2_LEVEL,"0");
		}
		if(!leve3str){
			egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF3_LEVEL,"0");
		}
		
		this.refreshActiveIcon();
		this.addTouchEvent(this.upgrade_1,this.onUpgrade,true);
		this.addTouchEvent(this.upgrade_2,this.onUpgrade,true);
		this.addTouchEvent(this.upgrade_3,this.onUpgrade,true);
		this.addTouchEvent(this.returnBtn,this.onReturn,true)
	}
	private onUpgrade(evt:egret.TouchEvent):void{
		let boo:boolean = this.judgeIfUpgrade();
		if(boo){
			
			let bookIcon:eui.Image = new eui.Image();
			this.content.addChild(bookIcon);
			if(evt.target == this.upgrade_1){
				bookIcon.source = "active_1_png";
				bookIcon.x = this.icon1.x;
				bookIcon.y = this.icon1.y;
				this.slideToActive(bookIcon,this.active_1);
				let leve1str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
				egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF1_LEVEL,(parseInt(leve1str)+1).toString());
			}else if(evt.target == this.upgrade_2){
				bookIcon.source = "active_2_png";
				bookIcon.x = this.icon2.x;
				bookIcon.y = this.icon2.y;
				this.slideToActive(bookIcon,this.active_2);
				let leve2str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
				egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF2_LEVEL,(parseInt(leve2str)+1).toString());
			}else{
				bookIcon.source = "active_3_png";
				bookIcon.x = this.icon3.x;
				bookIcon.y = this.icon3.y;
				this.slideToActive(bookIcon,this.active_3);
				let leve3str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
				egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF3_LEVEL,(parseInt(leve3str)+1).toString());
			}
			this.refreshActiveIcon();
		}
	}
	private slideToActive(display:egret.DisplayObject,tar:egret.DisplayObject):void{
		egret.Tween.get(display).to({scaleX:1.5,scaleY:1.5},800,egret.Ease.circOut).wait(200).to({x:tar.x,y:tar.y,alpha:0,scaleX:0,scaleY:0},1000,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(display);
			if(display && display.parent){
				display.parent.removeChild(display);
			}
		},this)
	}
	private judgeIfUpgrade():boolean{
		let min:number = this.getMinLevel(0) + 1;
		let cost:number = min*300;
		let roleGold:number = GameApp.ins<GameApp>().gold;
		let boo:boolean = roleGold >=cost;
		if(boo == false){
			UserTips.ins<UserTips>().showTips("元宝不足,可通过<font color=0x00ff00>【扫荡】【征收】</font>获得")
		}else{
			GameApp.ins<GameApp>().gold -= cost;
			let min:number = this.getMinLevel(0);
			GameApp.ins<GameApp>().rolePower += 200*(min+1); 
		}
		return boo;
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(StudyPopUp);
		},this)
	}
	private refreshActiveIcon():void{
		let leve1str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
		let leve2str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
		let leve3str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
		let min:number = this.getMinLevel(0);
		let max:number = this.getMinLevel(1);
		if(min >= 3){
			this.upgrade_1.visible = this.upgrade_2.visible = this.upgrade_3.visible = false;
		}else{
			if(min == parseInt(leve1str) && min == parseInt(leve2str) && min == parseInt(leve3str)){
				GlobalFun.filterToGrey(this.active_1);
				GlobalFun.filterToGrey(this.active_2);
				GlobalFun.filterToGrey(this.active_3);
				this.upgrade_1.visible = this.upgrade_2.visible = this.upgrade_3.visible = true;
				if(min == 0){
					this.icon.source = "icon_1_png";
				}else{
					this.icon.source = `icon_${min+1}_png`;
				}
			}else{
				if(min == parseInt(leve1str)){
					GlobalFun.filterToGrey(this.active_1);
					this.upgrade_1.visible = true;
				}
				if(max == parseInt(leve1str)){
					GlobalFun.clearFilters(this.active_1);
					this.upgrade_1.visible = false;
				}
				if(min == parseInt(leve2str)){
					GlobalFun.filterToGrey(this.active_2);
					this.upgrade_2.visible = true;
				}
				if(max == parseInt(leve2str)){
					GlobalFun.clearFilters(this.active_2);
					this.upgrade_2.visible = false;
				}
				if(min == parseInt(leve3str)){
					GlobalFun.filterToGrey(this.active_3);
					this.upgrade_3.visible = true;
				}
				if(max == parseInt(leve3str)){
					GlobalFun.clearFilters(this.active_3);
					this.upgrade_3.visible = false;
				}
				this.icon.source = `icon_${min+1}_png`;
			}
		}
		
		this.levelLab.text = min.toString();
		let campstr:string = egret.localStorage.getItem(LocalStorageEnum.CAMP);
		let buffName:string = CampCfg.campCfg[parseInt(campstr)].buffName;
		this.nameLab.text = buffName;
		let attrArr:string[] = [];
		if(parseInt(campstr) == 0){
			attrArr = ["军事+","智谋+","防御+"];
		}else if(parseInt(campstr) == 1){
			attrArr = ["智谋+","防御+","军事+"];
		}else if(parseInt(campstr) == 2){
			attrArr = ["防御+","军事+","智谋+"];
		}
		this.attr_1.text = attrArr[0] +((min+1)*300).toString();
		this.attr_2.text = attrArr[1] +((min+1)*150).toString();
		this.attr_3.text = attrArr[2] +((min+1)*70).toString();
		this.cost_1.text = ((min+1)*375).toString();
		this.cost_2.text = ((min+1)*235).toString();
		this.cost_3.text = ((min+1)*165).toString();
		// this.attr_1.text = this.attr_2.text = this.attr_3.text = attrstr+((min+1)*10).toString();
		// this.cost_1.text = this.cost_2.text = this.cost_3.text = ((min+1)*300).toString();
		this.descLab.text = CampCfg.campCfg[parseInt(campstr)].buffDesc + (min+1)*20+"点";
	}
	/**
	 * param 1
	 */
	private getMinLevel(param):number{
		let value:number = 0;
		let leve1str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
		let leve2str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
		let leve3str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
		if(param == 0){
			value = Math.min(parseInt(leve1str),parseInt(leve2str),parseInt(leve3str));
		}else{
			value = Math.max(parseInt(leve1str),parseInt(leve2str),parseInt(leve3str));
		}
		return value
	}
	public close():void{
		this.removeTouchEvent(this.upgrade_1,this.onUpgrade);
		this.removeTouchEvent(this.upgrade_2,this.onUpgrade);
		this.removeTouchEvent(this.upgrade_3,this.onUpgrade);
		this.removeTouchEvent(this.returnBtn,this.onReturn)
	}
}
ViewManager.ins<ViewManager>().reg(StudyPopUp,LayerManager.UI_Pop);