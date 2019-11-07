class CardItem extends eui.ItemRenderer{

	private cardImg:eui.Image;
	private nameLab:eui.Label;
	private levelLab:eui.Label;
	// private progressLab:eui.Label;
	// private cardMask:eui.Rect;
	// private cardProBar:eui.Image;
	public m_angle:number;
	public cardVo:CardVo;
	private cardGroup:eui.Group;
	public attr:string = "";
	public index:number;
	public constructor() {
		super();
		this.skinName = "CardItemSkin";
	}
	public initData(data:CardVo,scale:number,isNoData:boolean = false):void{
		this.touchChildren = false;
		this.touchEnabled = true;
		if(!data){
			this.cardImg.source = `noCard_png`;
			this.nameLab.text = "";
			this.levelLab.text = "";
			return;
		}
		let eff:MovieClip = new MovieClip();
		this.addChild(eff);
		eff.playFile(`${EFFECT}star`,-1);
		eff.width = this.width;
		eff.height = this.height;
		eff.x = 70;
		eff.y = 50

		let eff2:MovieClip = new MovieClip();
		this.addChild(eff2);
		eff2.playFile(`${EFFECT}star`,-1);
		eff2.width = this.width;
		eff2.height = this.height;
		eff2.x = 70;
		eff2.y = 400;

		let eff3:MovieClip = new MovieClip();
		this.addChild(eff3);
		eff3.playFile(`${EFFECT}star`,-1);
		eff3.width = this.width;
		eff3.height = this.height;
		eff3.x = 70;
		eff3.y = 200;
		// this.cardProBar.mask = this.cardMask;
		// this.cardMask.width = 0;
		let cardData:CardVo = data;
		this.cardVo = cardData;
		this.scaleX = this.scaleY = scale;
		if(data.ifUnlock){
			this.cardImg.source = `card_${cardData.cardId}_${cardData.quality}_png`;
			// let qualityMc:MovieClip = new MovieClip();
			// this.cardGroup.addChild(qualityMc);
			// qualityMc.touchEnabled = false;
			// qualityMc.scaleY = 1.3;
			// qualityMc.scaleX = 1.5;
			// qualityMc.x = (this.cardGroup.width>>1) ;
			// qualityMc.y = (this.cardGroup.height>>1) - 20;
			// qualityMc.playFile(`${EFFECT}quality_${data.quality}`,-1);
			GlobalFun.clearFilters(this.cardImg);
		}else{
			// this.cardImg.source = `card_${cardData.cardId}_grey_png`;
			GlobalFun.filterToGrey(this.cardImg);
		}
		
		this.nameLab.text = cardData.name;
		this.nameLab.textColor = cardData.qualityColor;
		if(scale == 0.25){
			this.levelLab.scaleX = this.levelLab.scaleY = 3
		}
		this.levelLab.text = "数量:"+cardData.ownNum.toString();
		// this.progressLab.text = cardData.ownNum + "/" + 5;
		// this.cardMask.width = cardData.ownNum/(5)*177;
	}
	protected dataChanged():void{
		this.initData(this.data,0.25);
	}
}