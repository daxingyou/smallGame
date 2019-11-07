class BossHpCom extends eui.Component{

	private monHead:eui.Image;
	private levelLab:eui.Label;
	private hpBar:eui.Image;
	private hpBar2:eui.Image;
	private curHp:number;
	private totalHp:number;
	private progressLab:eui.Label;
	private nameLab:eui.Label;
	private names:any = {84001:"祖玛教主",84004:"赤月恶魔",84009:"深渊魔君",84010:"诡眼魔君",10026:"吸血魔君",10054:"烛龙魔君",84012:"魔化蝠王",10115:"远古魔王"}
	private effectIcon:eui.Image;
	private watcher:eui.Watcher;
	public constructor() {
		super();
		this.skinName = "BossHpComSkin";
	}
	public initData(id:number,level:number,hp:number):void{
		this.monHead.source = `monhead${id}_png`;
		this.levelLab.text = level.toString();
		this.curHp = this.totalHp = hp;
		this.progressLab.text = this.curHp+"/"+this.totalHp;
		this.nameLab.text = this.names[id];
		this.watcher = eui.Binding.bindHandler(GameApp,["weapon"],this.onWeaponChange,this);
		this.effectIcon.source = "effect_"+GameApp.bossType+"_png";
		this.effectIcon.visible = false;
	}
	private onWeaponChange():void{
		if(GameApp.weapon == GameApp.bossType){
			//激活武器效果
			this.effectIcon.visible = true;
		}else{
			this.effectIcon.visible = false;
		}
	}
	public reduceHp(dmg?:number):void{
		egret.Tween.removeTweens(this.hpBar);
		egret.Tween.removeTweens(this.hpBar2);
		this.hpBar.width = this.curHp/this.totalHp*372;
		this.hpBar2.width = this.curHp/this.totalHp*372;
		this.curHp -= dmg?dmg:this.curHp;
		if(this.curHp <= 0){
			this.curHp = 0;
		}
		this.progressLab.text = this.curHp+"/"+this.totalHp;
		let perw:number = this.curHp/this.totalHp*372;
		egret.Tween.get(this.hpBar).to({width:perw},300).call(()=>{
			egret.Tween.removeTweens(this.hpBar);
			egret.Tween.get(this.hpBar2).to({width:perw},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.hpBar2);
			},this)
		},this)
	}
}