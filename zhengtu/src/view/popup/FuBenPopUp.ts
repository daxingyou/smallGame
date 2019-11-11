class FuBenPopUp extends BaseEuiView{

	private returnBtn:eui.Image;
	private rolemc:MovieClip;
	private beginPoint:egret.Point;
	private items:eui.Image[];
	private openGroup:eui.Group;
	private percentLab:eui.Label;
	private progressBar:eui.Image;
	private progressMask:eui.Image;
	private boxs:eui.Image[];
	public constructor() {
		super();
	}
	public open(...param):void{
		this.items = [];
		this.boxs = [];
		this.progressBar.mask = this.progressMask;
		for(let i:number = 0;i<20;i++){
			let index:number = (Math.random()*25) >> 0;
			let res:string = index <= 5?"item_good_icon_png":index <= 10?"item_woods_icon_png":index<=15?"item_gem_icon_png":index <=20?"item_gold_icon_png":"item_box_png";
			if(i <= 7){
				res = "item_box_png";
			}
			let img:eui.Image = new eui.Image();
			img.touchEnabled = false;
			img.source = res;
			img.name = index <= 5?"粮草":index <= 10?"木材":index<=15?"生铁":index<=20?"黄金":"宝箱";
			this.addChild(img);
			img.x = 50 + (Math.random()*(StageUtils.inst().getWidth() - 100))>>0;
			img.y = 150 + (Math.random()*(StageUtils.inst().getHeight() - 200))>>0;
			if(i<=7 || img.name == "宝箱"){
				img.name = "宝箱"
				this.boxs.push(img);
			}else{
				this.items.push(img);
			}
		}
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.rolemc = new MovieClip();
		this.addChild(this.rolemc);
		this.rolemc.playFile(`${EFFECT}role_stand`,-1,null,false,"4");
		this.rolemc.scaleX = this.rolemc.scaleY = 0.6;
		this.rolemc.x = StageUtils.inst().getWidth()>>1;
		this.rolemc.y = StageUtils.inst().getHeight()>>1;
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		this.setChildIndex(this.openGroup,this.getChildIndex(this.rolemc)+1)
		this.setChildIndex(this.returnBtn,this.getChildIndex(this.openGroup)+1);
		this.beginPoint = new egret.Point();
	}	
	private onEnd(evt:egret.TouchEvent):void{
		this.beginPoint.x = this.rolemc.x;
		this.beginPoint.y = this.rolemc.y;
		let angle:number = Math.atan2(evt.localY - this.beginPoint.y,evt.localX - this.beginPoint.x);
		let dic:number = this.calculEntityDic(angle*180/Math.PI);
		let dis:number = egret.Point.distance(this.beginPoint,new egret.Point(evt.localX,evt.localY));
		let speed:number = dis/100;
		this.rolemc.playFile(`${EFFECT}role_move`,-1,null,false,dic.toString());
		egret.Tween.removeTweens(this.rolemc);
		egret.Tween.get(this.rolemc,{loop:false,onChange:()=>{
			if(this.rolemc.x >= StageUtils.inst().getWidth() - 50){
				this.rolemc.x = StageUtils.inst().getWidth() - 50;
			}
			if(this.rolemc.y >= StageUtils.inst().getHeight() - 50){
				this.rolemc.y = StageUtils.inst().getHeight() - 50;
			}
			if(this.rolemc.x <= 50){
				this.rolemc.x = 50;
			}
			if(this.rolemc.y <= 50){
				this.rolemc.y = 50;
			}
			this.hitItem();
			this.hitBox();
		},onChangeObj:this}).to({x:evt.localX,y:evt.localY},speed*1000).call(()=>{
			egret.Tween.removeTweens(this.rolemc);
			this.rolemc.playFile(`${EFFECT}role_stand`,-1,null,false,dic.toString());
		},this)
	}
	private curOpen:eui.Image;
	private hitBox():void{
		if(this.curOpen){
			let dis:number = egret.Point.distance(new egret.Point(this.rolemc.x,this.rolemc.y),new egret.Point(this.curOpen.x,this.curOpen.y));
			if(dis > 50){
				this.curOpen = null;
			}else{
				return;
			}
		}
		for(let i:number = 0;i<this.boxs.length;i++){
			if(!this.boxs[i]){continue}
			let dis:number = egret.Point.distance(new egret.Point(this.rolemc.x,this.rolemc.y),new egret.Point(this.boxs[i].x,this.boxs[i].y));
			if(Math.abs(dis) <= 50){
				this.curOpen = this.boxs[i];
				if(!this.openGroup.visible){
					this.showProgressGroup(this.boxs[i],i,(item,index)=>{
						if(item && item.parent){
							item.parent.removeChild(item);
							this.boxs[index] = null;
						}
					});
				}
				break;
			}else{
				this.openGroup.visible = false;
				egret.Tween.removeTweens(this.progressMask);
			}
		}
	}
	private showProgressGroup(item,i,cb:(item,index)=>void):void{
		this.openGroup.visible = true;
		this.progressMask.width = 0;
		this.percentLab.text = "0%";
		egret.Tween.get(this.progressMask,{loop:false,onChange:()=>{
			let percent:number = ((this.progressMask.width/200)*100)>>0
			if(percent >= 100){
				percent = 100;
			}
			this.percentLab.text = percent+"%";
		},onChangeObj:this}).to({width:200},2000).call(()=>{
			cb(item,i);
			egret.Tween.removeTweens(this.progressMask);
			this.openGroup.visible = false;
			let index:number = (Math.random()*100)>>0;
			let num:number = (Math.random()*6+2)>>0;
			if(index <= 25){
				UserTips.inst().showTips("获得木材x"+num);
				GameApp.inst().wood += num;
			}else if(index <= 25){
				UserTips.inst().showTips("获得粮草x"+num);
				GameApp.inst().good += num;
			}else if(index <= 75){
				UserTips.inst().showTips("获得生铁x"+num);
				GameApp.inst().fe += num;
			}else{
				UserTips.inst().showTips("获得黄金x"+num);
				GameApp.inst().gold += num;
			}
		},this)
	}
	private hitItem():void{
		for(let i:number = 0;i<this.items.length;i++){
			if(!this.items[i]){
				continue;
			}
			let dis:number = egret.Point.distance(new egret.Point(this.rolemc.x,this.rolemc.y),new egret.Point(this.items[i].x,this.items[i].y));
			if(Math.abs(dis) <= 80){
				let item = this.items[i];
				let num:number = (Math.random()*6+2)>>0
				UserTips.inst().showTips("获得"+item.name+"x"+num);
				if(item.name == "粮草"){
					GameApp.inst().good += num;
				}else if(item.name == "木材"){
					GameApp.inst().wood += num;
				}else if(item.name == "生铁"){
					GameApp.inst().fe += num;
				}else if(item.name == "黄金"){
					GameApp.inst().gold += num;
				}
				if(item && item.parent){
					item.parent.removeChild(item);
					this.items.splice(i,1);
					i-=1;
				}
			}
		}
	}
	/**获取当前方向 */
	private calculEntityDic(angle:number):number{
		if(angle >= -20 && angle <= 20){
			this.rolemc.scaleX = 0.6;
			return 2;
		}else if(angle < -20 && angle >= -70){
			this.rolemc.scaleX = 0.6;
			return 1;
		}else if(angle < -70 && angle > -110){
			this.rolemc.scaleX = 0.6;
			return 0;
		}else if(angle >20 && angle <= 70){
			this.rolemc.scaleX = 0.6;
			return 3
		}else if(angle >70&& angle<=110){
			this.rolemc.scaleX = 0.6;
			return 4
		}else if(angle > 110 && angle <= 160){
			this.rolemc.scaleX = -0.6;
			return 3
		}else if((angle > 160 && angle <= 180) || (angle <= -160 && angle >= -180)){
			this.rolemc.scaleX = -0.6;
			return 2
		}else if(angle >-160 && angle <= -110){
			this.rolemc.scaleX = -0.6;
			return 1;
		}
	}
	private onReturn():void{
		ViewManager.inst().close(FuBenPopUp);
		ViewManager.inst().open(GameMainView);
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
	}
}
ViewManager.inst().reg(FuBenPopUp,LayerManager.UI_Main);