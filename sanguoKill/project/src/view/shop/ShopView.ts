class ShopView extends BaseEuiView
{
	private weapon_btn:eui.Button;
	private protection_btn:eui.Button;
	private prop_btn:eui.Button;
	private itemAny:any[] = [];
	private shopitem:ShopItem[] = [];
	private item_group:eui.Group;
	private item_id:number = 0;
	private left_btn:eui.Button;
	private right_btn:eui.Button;
	private close_btn:eui.Button;
	private tab:number = 1;/**页数 */
	private goldLab:eui.Label;
	private watcher:eui.Watcher;
	private guideGroup:eui.Group;
	private content:eui.Group;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		this.init();
		this.addTouchEvent(this.weapon_btn, this.touchWeapon);
		this.addTouchEvent(this.protection_btn, this.touchProtection);
		this.addTouchEvent(this.prop_btn, this.touchProp);
		this.addTouchEvent(this.left_btn, this.touchLeft);
		this.addTouchEvent(this.right_btn, this.touchRight);
		this.addTouchEvent(this.close_btn, this.onclose);
		this.goldLab.text = GameApp.inst().gold.toString();
		this.watcher = eui.Binding.bindProperty(GameApp.inst(),["gold"],this.goldLab,"text");
		this.content.x = (StageUtils.inst().getWidth()>>1) - 765/2;
		this.content.y = (StageUtils.inst().getHeight()>>1) - 455/2;
		if(GameApp.guilding){
			if(GameApp.guideView){
				GameApp.guideView.nextStep({id:"1_3",comObj:this.guideGroup,width:98,height:184})
			}
		}
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_SHOP_ITEM,this.onClickItem,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_SHOP_CLOSE,this.onShopClose,this);
	}
	private onShopClose():void{
		ViewManager.inst().close(ShopView);
		ViewManager.inst().open(MenuView);
	}
	public refreshPage():void{
		if(GameApp.guilding){
			if(GameApp.guideView){
				GameApp.guideView.nextStep({id:"1_5",comObj:this.close_btn,width:43,height:46},-90)
			}
		}
	}
	private onClickItem():void{
		let item:ShopItem = this.shopitem[0];
		item.touchTap();
	}
	private onclose():void{
		ViewManager.inst().close(ShopView);
	}
	public close():void
	{
		if(this.watcher){this.watcher.unwatch()};
		this.removeTouchEvent(this.weapon_btn, this.touchWeapon);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_SHOP_ITEM,this.onClickItem,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_SHOP_CLOSE,this.onShopClose,this);
		this.removeTouchEvent(this.protection_btn, this.touchProtection);
		this.removeTouchEvent(this.prop_btn, this.touchProp);
		this.removeTouchEvent(this.left_btn, this.touchLeft);
		this.removeTouchEvent(this.right_btn, this.touchRight);
		this.removeTouchEvent(this.close_btn, this.onclose);
	}
	private init()
	{
		this.item_id = 0;
		for(let i = 0; i < 2; i++)
		{
			for(let j = 0; j < 5; j++)
			{
				this.shopitem[this.item_id] = new ShopItem();
				this.shopitem[this.item_id].x = 6 + j * 111;
				this.shopitem[this.item_id].y = 2 + i * 185;
				this.item_group.addChild(this.shopitem[this.item_id]);
				this.item_id++;
			}
		}
		this.touchWeapon();
	}
	private touchLeft()
	{
		this.left_btn.visible = false;
		this.right_btn.visible = true;
		for(let j = 0; j < this.shopitem.length; j++)
		{
			this.shopitem[j].visible = true;
		}
		for(let i = 0; i < 10; i++)
		{
			this.shopitem[i].setData(this.itemAny[i]);
		}
	}
	private touchRight()
	{
		this.left_btn.visible = true;
		this.right_btn.visible = false;
		var id = 0;
		for(let i = 10; i < this.itemAny.length; i++)
		{
			this.shopitem[id].setData(this.itemAny[i]);
			id++;
		}
		for(let j = id; j < this.shopitem.length; j++)
		{
			this.shopitem[j].visible = false;
		}
	}
	private touchWeapon()
	{
		this.itemAny = [];
		for(let i = 0; i < ItemCfg.itemCfg.length; i++)
		{
			if(ItemCfg.itemCfg[i].type == ItemType.weapon || ItemCfg.itemCfg[i].type == ItemType.weapon_ma)
			{
				this.itemAny.push(ItemCfg.itemCfg[i]);
			}
		}
		this.sorting();
	}
	private touchProtection()
	{
		this.itemAny = [];
		for(let i = 0; i < ItemCfg.itemCfg.length; i++)
		{
			if(ItemCfg.itemCfg[i].type == ItemType.protection || ItemCfg.itemCfg[i].type == ItemType.protection_ma)
			{
				this.itemAny.push(ItemCfg.itemCfg[i]);
			}
		}
		this.sorting();
	}
	private touchProp()
	{
		this.itemAny = [];
		for(let i = 0; i < ItemCfg.itemCfg.length; i++)
		{
			if(ItemCfg.itemCfg[i].type == ItemType.prop)
			{
				this.itemAny.push(ItemCfg.itemCfg[i]);
			}
		}
		this.sorting();
	}
	private sorting()
	{
		for(let j = 0; j < this.shopitem.length; j++)
		{
			this.shopitem[j].visible = true;
		}
		
		var length = this.itemAny.length;
		if(length <= 10)
		{
			this.left_btn.visible = false;
			this.right_btn.visible = false;
		}else 
		{
			this.left_btn.visible = false;
			this.right_btn.visible = true;
		}
		if(length>=10)
		{
			for(let i = 0; i < 10; i++)
			{
				this.shopitem[i].setData(this.itemAny[i]);
			}
		}
	}
}
ViewManager.inst().reg(ShopView,LayerManager.UI_Main);