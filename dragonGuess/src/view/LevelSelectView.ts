class LevelSelectView extends BaseEuiView{

	private title:eui.Label;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;

	private levelIconCfg:{} = {}
	private _level:number = 0;
	private param:any[]
	public constructor() {
		super();
	}
	public open(...param):void{
		this.showClose(LevelSelectView);
		this.param = param;
		this.levelIconCfg = {1:3,2:5,3:7};
		let dataPro:any[] = [];
		let level:number = param[0].level;
		this._level = level;
		let num:number = this.levelIconCfg[level];
		// levelCfg_1 ---  {levelCfg:[1_1_0,1_2_0]} 大关_小关_是否通关
		let levelCfgStr = egret.localStorage.getItem('levelCfg'+param[0].level);
		
		let levelCfgObj:string[];
		if(levelCfgStr){
			levelCfgObj = JSON.parse(levelCfgStr).levelCfg;
			levelCfgObj.forEach((item,index)=>{
				let arr = item.split("_");
				let obj = {}
				obj["img"] = "lev_icon_"+arr[1]+"_png";
				obj["start"] = arr[2];
				dataPro.push(obj);
			},this)
		}else{
			//没有本地存储值
			let levelCfgs = [];
			for(let i:number = 0;i<num;i++){
				let obj = {};
				obj["img"] = "lev_icon_"+(i+1)+"_png";
				let str:string = level+"_"+(i+1)+"_"+(level == 1?(i==0?1:0): 0);
				levelCfgs.push(str);
				obj["start"] = (level == 1?(i==0?1:0): 0);
				dataPro.push(obj);
			}
			egret.localStorage.setItem('levelCfg'+param[0].level,JSON.stringify({levelCfg:levelCfgs}))
		}
		
		this.title.text = param[0].title;
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = LevelSelectItem;
		this.arrayCollect.source = dataPro;
		this.list.dataProvider = this.arrayCollect;

		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let item:LevelSelectItem = this.list.getChildAt(evt.itemIndex) as LevelSelectItem;
		if(item.isClick){
			ViewManager.ins<ViewManager>().open(PlayFunView,[{level:this._level,index:item.itemIndex,fbName:this.title.text}],true);
		}
	}
	/**刷新页面 */
	public refreshPage(...param):void{
		if(!param || (param && param.length == 0)){
			param = this.param;
		}
		let dataPro:any[] = [];
		let level:number = GameData.level;
		this._level = level;
		let num:number = this.levelIconCfg[level];
		// levelCfg_1 ---  {levelCfg:[1_1_0,1_2_0]} 大关_小关_是否通关
		let levelCfgStr = egret.localStorage.getItem('levelCfg'+this._level);
		
		let levelCfgObj:string[];
		if(levelCfgStr){
			levelCfgObj = JSON.parse(levelCfgStr).levelCfg;
			levelCfgObj.forEach((item,index)=>{
				let arr = item.split("_");
				let obj = {}
				obj["img"] = "lev_icon_"+arr[1]+"_png";
				obj["start"] = arr[2];
				dataPro.push(obj);
			},this)
		}else{
			//没有本地存储值
			let levelCfgs = [];
			for(let i:number = 0;i<num;i++){
				let obj = {};
				obj["img"] = "lev_icon_"+(i+1)+"_png";
				let str:string = level+"_"+(i+1)+"_"+(level == 1?(i==0?1:0): 0);
				levelCfgs.push(str);
				obj["start"] = (level == 1?(i==0?1:0): 0);
				dataPro.push(obj);
			}
			egret.localStorage.setItem('levelCfg'+this._level,JSON.stringify({levelCfg:levelCfgs}))
		}
		
		this.title.text = param[0].title;
		this.arrayCollect.source = dataPro;
		this.list.dataProviderRefreshed();
	}
	public close():void{
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.ins<ViewManager>().reg(LevelSelectView,LayerManager.UI_Main);