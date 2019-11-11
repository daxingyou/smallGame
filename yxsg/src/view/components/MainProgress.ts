class MainProgress extends eui.Component{

	private progressGroup:eui.Group;

	private exp_bar:eui.Image;

	private progressLab:eui.Label;
	public constructor() {
		super();
		this.skinName = "MainProgressSkin";
		this.initialize();
	}
	private initialize():void{
		let curExp:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_EXP);
		if(curExp){
			GameApp.ins<GameApp>().curExp = parseInt(curExp);
		}
		let totalExp:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_MAIN_EXP);
		if(totalExp){
			GameApp.ins<GameApp>().curLevelMaxExp = parseInt(totalExp);
		}
	}
	protected childrenCreated():void{
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["curExp"],this.onExpChange,this);
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["curLevelMaxExp"],this.onExpChange,this);
	}
	private onExpChange(value):void{
		this.progressLab.text = `${GameApp.ins<GameApp>().curExp}/${GameApp.ins<GameApp>().curLevelMaxExp}`;
		this.exp_bar.width = GameApp.ins<GameApp>().curExp / GameApp.ins<GameApp>().curLevelMaxExp * StageUtils.ins<StageUtils>().getWidth() ;
	}
}