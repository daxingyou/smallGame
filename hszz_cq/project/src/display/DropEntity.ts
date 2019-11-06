class DropEntity extends eui.Component{

	private _vo:CardVo;
	private _pos:XY;
	private cardGroup:eui.Group;
	public constructor(dropData:CardVo,pos:XY) {
		super();
		this._vo = dropData;
		this._pos = pos;
		this.open(dropData);
	}
	public open(vo:CardVo):void{
		this.cardGroup = new eui.Group();
		this.addChild(this.cardGroup);

		let item:CardItem = new CardItem();
		item.initData(vo,0.1);
		this.cardGroup.addChild(item);
		let startEff:MovieClip = new MovieClip();
		this.cardGroup.addChild(startEff);
		startEff.playFile(`${EFFECT}start`,-1);
		startEff.x = (item.width*0.2)>>1;
		startEff.y = (item.height*0.2)>>1;

		this.cardGroup.visible = false;
		this.cardGroup.x = this._pos.x;
		this.cardGroup.y = this._pos.y;

		if(vo.quality <= 2){
			this.showWay1();
			UserTips.inst().showTips(`获得卡牌<font color=${vo.qualityColor}>[${vo.name}]<font>`)
		}else{
			this.showWay2();
			UserTips.inst().showTips(`恭喜您，掉落高级卡牌<font color=${vo.qualityColor}>[${vo.name}]</font>`)
		}
	}	
	private showWay1():void{
		let dropMc:MovieClip = new MovieClip();
		this.addChild(dropMc);
		dropMc.playFile(`${EFFECT}trans`,-1);
		dropMc.x = this._pos.x + 20;
		dropMc.y = this._pos.y - 200;
		egret.Tween.get(dropMc).to({y:this._pos.y + 50},200).call(()=>{
			egret.Tween.removeTweens(dropMc);
			dropMc.parent.removeChild(dropMc);
			this.cardGroup.visible = true;
		},this)
	}
	private showWay2():void{
		let boomMc:MovieClip = new MovieClip();
		this.addChild(boomMc);
		boomMc.x = this._pos.x + 20;
		boomMc.y = this._pos.y + 50;
		boomMc.playFile(`${EFFECT}boomeff`,1,null,true);
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			self.cardGroup.visible = true;
			let boomfireMc:MovieClip = new MovieClip();
			self.addChild(boomfireMc);
			boomfireMc.x = self._pos.x;
			boomfireMc.y = self._pos.y;
			boomfireMc.playFile(`${EFFECT}boomeff2`,2,null,true);
		}, 700);
	}
	public get cardVo():CardVo{
		return this._vo;
	}
	public close():void{
	
	}
}