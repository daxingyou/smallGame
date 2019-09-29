class CardEntity extends egret.Sprite{
	private _attr:CardAttr;
	private atrEntity:CardEntity;
	public constructor() {
		super();
	}
	private initialize():void{
		this.touchEnabled = true;
		this.touchChildren = false;

		let circle:eui.Image = new eui.Image();
		if(this.attr.camp == 1){
			circle.source = "own_circle_png";
			circle.x = 5;
		}else{
			circle.source = "enemy_circle_png";
			circle.x = 10;
		}
		this.addChild(circle);

		circle.y = 15;

		let card:eui.Image = new eui.Image();
		this.addChild(card);
		if(this.attr.camp == 1){
			card.source = `player_${this.attr.type}_png`;
		}else{
			card.source = `enemy_${this.attr.type}_png`;
		}
		card.anchorOffsetX = card.anchorOffsetY = 50;
		card.x = card.y = 50;
		card.scaleX = card.scaleY = 0.8;
		// card.x  = 18;
		// card.y = 10;
		let typeImg:eui.Image = new eui.Image();
		if(this.attr.camp == 1){
			typeImg.source = `o_${this.attr.type}_png`;
		}else{
			typeImg.source = `e_${this.attr.type}_png`;
		}
		this.addChild(typeImg);
		
		typeImg.x = 100 - 24;
		typeImg.y = 100 - 24;
	} 
	/**刷新属性 */
	public refreshAttr(key:string,value:any):void{
		if(this._attr[key]){
			this._attr[key] = value;
		}
	}
	/**获取属性值 */
	public get attr():CardAttr{
		return this._attr;
	}
	/**设置属性值 */
	public set attr(value:CardAttr){
		this._attr = value;
		this.initialize();
	}
}
interface CardAttr{
	/**阵营 1为己方 。0为敌方 */
	camp:number;
	/**属性 值 。相克关系*/
	type:number;
	/**卡牌资源值 */
	res:string;
	/**x*/
	x:number;
	/**y */
	y:number
}
enum AttrEnum{
	S = 0,
	A,
	B,
	C,
	D,
	E,
	F
}