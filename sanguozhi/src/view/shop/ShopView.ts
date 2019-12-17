/**
 * 商城 syy
 */
class ShopView extends BaseEuiView{
	public scroller:eui.Scroller;
    /**
     * list 列表
     */
    public list:eui.List;
    public dataList: eui.ArrayCollection;
    public return_btn:eui.Button;
    private shopGroup:eui.Group;
    private route:string
	public constructor() {
		super();
	}
	public open(...param):void{
        if(param[0]){
            if(param[0].route){
                this.route = param[0].route;
            }
        }
        this.shopGroup["autoSize"]();
        this.shopGroup.verticalCenter = -700
        egret.Tween.get(this.shopGroup).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
            egret.Tween.removeTweens(this.shopGroup);
        },this)
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.dataList = new eui.ArrayCollection();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        MessageManager.inst().addListener(CustomEvt.SHOP_INTRODUCE,this.showIntroduce,this);
        MessageManager.inst().addListener( CustomEvt.UPDATE_SHOP , this.updateShopHandler , this );
        this.setList();
	}
    /**
     * 
     * 显示介绍信息
     * @param data 信息数据(object)
     */
    public showIntroduce(data:any)
    {
        console.log(data);
        let obj:any[]=[];
        obj.push(data.data);
        ViewManager.inst().open(IntroduceView,obj);
    }
    /**
     * 设置list数据
     */
    public setList()
    {
        this.list.itemRenderer = ShopItem;
        let shopData = ShopCfg.cfgs;
        let generalstr:string = egret.localStorage.getItem(LocalStorageEnum.GENERALId);
        if(generalstr){
            let arr:number[] = JSON.parse(generalstr);
            for(let i:number = 0;i<arr.length;i++){

                for(let j:number = 0;j<shopData.length;j++){
                    if(shopData[j].insId == arr[i]){
                        shopData.splice(j,1);
                        break;
                    }
                }
            }
        }
        this.dataList.source = shopData
        this.list.dataProvider = this.dataList;
        this.list.validateNow();
        this.list.scrollV=0;
    }
    public touchTapHandler(e:egret.TouchEvent)
    {
        switch(e.target)
        {
            case this.return_btn:
            egret.Tween.get(this.shopGroup).to({verticalCenter:-700},600,egret.Ease.circOut).call(()=>{
                egret.Tween.removeTweens(this.shopGroup);
                ViewManager.inst().close(ShopView);
            },this)
            break;
        }
    }
    private updateShopHandler():void {
        this.dataList.source = ShopCfg.cfgs;
    }
	public close():void{
        if(this.route){
            MessageManager.inst().dispatch(LocalStorageEnum.GAME_START, this);
            this.route = null;
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        MessageManager.inst().removeListener(CustomEvt.SHOP_INTRODUCE,this.showIntroduce,this)
        MessageManager.inst().removeListener( CustomEvt.UPDATE_SHOP , this.updateShopHandler , this );
	}
}
ViewManager.inst().reg(ShopView,LayerManager.UI_Pop);