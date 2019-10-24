class RoleInfoPopUp extends BaseEuiView{

	private content:eui.Group;
	private returnBtn:eui.Image;
	private levelIcon:eui.Image;
	private role1:eui.Image;
	private role2:eui.Image;
	private role3:eui.Image;
	private role4:eui.Image;
	private role5:eui.Image;
	private selectIndex:number = 0;
	private nameLab:eui.Label;
	// private levelLab:eui.Label;
	private roleModel:eui.Image;
	private select:eui.Image;
	private changeBtn:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.content.scaleX = this.content.scaleY = 0;
		this.content.alpha = 0;
		egret.Tween.get(this.content).to({scaleX:0.8,scaleY:0.8,alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)

		// let index:number = 1;
		let value:number = GameApp.roleData[0].level;
		// if(value >= 1 && value <= 10){index = 1}
		// if(value >= 11 && value <= 20){index = 2}
		// if(value >= 21 && value <= 30){index = 3}
		// if(value >= 31 && value <= 40){index = 4}
		// if(value >= 41 && value <= 50){index = 5}
		// if(value >= 51 && value <= 60){index = 6}
		// if(value >= 61 && value <= 70){index = 7}
		// if(value >= 71 && value <= 80){index = 8}
		// if(value >= 81 && value <= 90){index = 9}
		this.levelIcon.source = `levelicon_${value}_png`;
		// this.levelLab.text = "Lv."+value;
		let roleVo:RoleInfoVo[] = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA));
		for(let key in roleVo){
			if(!roleVo[key].isUnlock){
				this["role"+(parseInt(key)+1)].touchEnabled = false;
				GlobalFun.filterToGrey(this["role"+(parseInt(key)+1)]);
			}
		}
		this.refreshPageInfo();
		this.addTouchEvent(this.returnBtn,this.onClose,true);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
		this.addTouchEvent(this.changeBtn,this.onChange,true);
	}
	private onChange():void{
		GameApp.roleDataIndex = this.selectIndex;
	}
	private onTouch(evt:egret.TouchEvent):void{
		switch(evt.target){
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
	}
	private refreshPageInfo():void{
		let roleVos:RoleInfoVo[] = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA));
		let itemVo:RoleInfoVo = roleVos[this.selectIndex];

		// let index:number = 1;
		let value:number = GameApp.roleData[this.selectIndex].level;
		// if(value >= 1 && value <= 10){index = 1}
		// if(value >= 11 && value <= 20){index = 2}
		// if(value >= 21 && value <= 30){index = 3}
		// if(value >= 31 && value <= 40){index = 4}
		// if(value >= 41 && value <= 50){index = 5}
		// if(value >= 51 && value <= 60){index = 6}
		// if(value >= 61 && value <= 70){index = 7}
		// if(value >= 71 && value <= 80){index = 8}
		// if(value >= 81 && value <= 90){index = 9}
		this.levelIcon.source = `levelicon_${value}_png`;
		// this.levelLab.text = "Lv."+value;

		this.nameLab.text = itemVo.name;
		this.roleModel.source = itemVo.roleModel;
		this.select.x = this["role"+(this.selectIndex+1)].x - 4;
		this.select.y = this["role"+(this.selectIndex+1)].y - 4;
	}
	private onClose():void{
		egret.Tween.get(this.content).to({scaleX:0,scaleY:0,alpha:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(RoleInfoPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onClose);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
		this.removeTouchEvent(this.changeBtn,this.onChange);
	}
}
ViewManager.inst().reg(RoleInfoPopUp,LayerManager.UI_Pop);