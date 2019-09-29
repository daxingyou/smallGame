class SkillEffShow extends BaseEuiView{
	private imgArr:eui.Image[] = [];
	public constructor() {
		super();
	}
	public open(...param):void{
		for(let i:number = 0;i<20;i++){
			let img:eui.Image = new eui.Image();
			img.source = "effline_png"
			this.addChild(img);
			img.x = -(Math.random()*100 + 500);
			img.alpha = Math.random();
			img.y = Math.random()*StageUtils.inst().getHeight();
			this.imgArr.push(img);
			let tx:number = StageUtils.inst().getWidth()+Math.random()*200;
			let rx:number = -(Math.random()*100 + 200);
			let time:number = (Math.random()*1000+600)>>0;
			egret.Tween.get(img,{loop:true}).to({x:tx},time).call(()=>{img.alpha = 1},this).to({x:rx},time);
		}
		
		let roleImg:eui.Image = new eui.Image();
		roleImg.source = param[0].icon;
		// roleImg.source = "role_eff_1_png";
		this.addChild(roleImg);
		roleImg.bottom = 0;
		roleImg.left = -530;


		let icon:eui.Image = new eui.Image();
		icon.source = `${SKILL_EFF_ICON}${param[0].pic}.png`;
		this.addChild(icon);
		icon.verticalCenter = 0;
		icon.right = 200;
		icon.alpha = 0;
		icon.scaleX = icon.scaleY = 5;

		egret.Tween.get(roleImg).to({left:20},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(roleImg);
			egret.Tween.get(icon).to({alpha:0.8,scaleX:2,scaleY:2},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(icon);
				let timeout = setTimeout(function() {
					clearTimeout(timeout);
					ViewManager.inst().close(SkillEffShow);
				}, 600);
			},this)
		},this)
	}
	public close():void{
		for(let i:number = 0;i<this.imgArr.length;i++){
			egret.Tween.removeTweens(this.imgArr[i]);
		}
		this.imgArr = [];
	}
}
ViewManager.inst().reg(SkillEffShow,LayerManager.UI_Pop)