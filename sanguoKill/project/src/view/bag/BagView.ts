class BagView extends BaseEuiView
{
	private list:eui.List;
	private up_bag:eui.Button;
	private close_btn:eui.Button;
	private zhuangbei:any;
	private goldLab:eui.Label;
	private watcher:eui.Watcher;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		GlobalFun.getBagList();
		// egret.localStorage.clear();
		this.init();
		this.addTouchEvent(this.up_bag, this.touchUp);
		this.addTouchEvent(this.close_btn, this.close);

		MessageManager.inst().addListener("ZHUANG_BEI_OVER", this.zhuangbeiover, this);

		MessageManager.inst().addListener("SHENG_JI_BAG", this.shengji, this);

		MessageManager.inst().addListener("HUAN_ZHUANG", this.huangzhuang, this);

		MessageManager.inst().addListener("BAG_UPDATE", this.bagUpdate, this);
	}
	private bagUpdate()
	{
		for(let i=0;i< ItemCfg.bagCfg.length;i++){
			var tem:any;
			for(let j=i+1;j< ItemCfg.bagCfg.length;j++){
				if(ItemCfg.bagCfg[i] == null && ItemCfg.bagCfg[j] != null)
				{
					tem = ItemCfg.bagCfg[j];
					ItemCfg.bagCfg[j] = ItemCfg.bagCfg[i]
					ItemCfg.bagCfg[i] = tem;
				}
			}
		}
		this.list.dataProvider = new eui.ArrayCollection(ItemCfg.bagCfg);
	}
	private zhuangbeiover(evt:CustomEvt)
	{
		ItemCfg.bagCfg[ItemCfg.bagCfg.indexOf(this.zhuangbei)] = evt.data;
		this.zhuangbei = null;
		MessageManager.inst().dispatch("BAG_UPDATE");
	}
	private shengji()
	{
		for(let i = 0; i < 5; i++)
		{
			ItemCfg.bagCfg.push(null);
		}
		this.list.dataProvider = new eui.ArrayCollection(ItemCfg.bagCfg);
	}
	private init()
	{
		this.goldLab.text = GameApp.inst().gold.toString();
		this.watcher = eui.Binding.bindProperty(GameApp.inst(),["gold"],this.goldLab,"text");

		this.list.itemRenderer = BagItem_bg;
		this.list.dataProvider = new eui.ArrayCollection(ItemCfg.bagCfg);
	}
	private huangzhuang(evt:CustomEvt)
	{
		this.zhuangbei = evt.data;
	}
	private touchUp()
	{
		ViewManager.inst().open(BagUp);
	}
	public close():void
	{
		GlobalFun.setBagList();
		if(this.watcher){this.watcher.unwatch()};
		MessageManager.inst().removeListener("ZHUANG_BEI_OVER", this.zhuangbeiover, this);
		MessageManager.inst().removeListener("SHENG_JI_BAG", this.shengji, this);
		MessageManager.inst().removeListener("HUAN_ZHUANG", this.huangzhuang, this);
		MessageManager.inst().removeListener("BAG_UPDATE", this.bagUpdate, this);
		ViewManager.inst().close(BagView);
	}
}
ViewManager.inst().reg(BagView,LayerManager.UI_Pop);