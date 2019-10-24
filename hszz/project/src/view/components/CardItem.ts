class CardItem extends eui.ItemRenderer{

	private cardImg:eui.Image;
	private nameLab:eui.Label;
	private levelLab:eui.Label;
	private progressLab:eui.Label;
	private cardMask:eui.Rect;
	private cardProBar:eui.Image;
	public m_angle:number;
	public cardVo:CardVo;
	public constructor() {
		super();
		this.skinName = "CardItemSkin";
	}
	public initData(data:CardVo,scale:number):void{
		this.touchChildren = false;
		this.touchEnabled = true;
		this.cardProBar.mask = this.cardMask;
		this.cardMask.width = 0;
		let cardData:CardVo = data;
		this.cardVo = cardData;
		this.scaleX = this.scaleY = scale;
		if(data.ifUnlock){
			this.cardImg.source = `card_${cardData.id}_png`;
		}else{
			this.cardImg.source = `card_${cardData.id}_grey_png`;
		}
		
		this.nameLab.text = cardData.name;
		this.nameLab.textColor = cardData.qualityColor;
		this.levelLab.text = cardData.level.toString();
		this.progressLab.text = cardData.ownNum + "/" + cardData.level*100;
		this.cardMask.width = cardData.ownNum/(cardData.level*100)*177;
	}
	protected dataChanged():void{
		this.initData(this.data,0.6);
	}
}