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
	public constructor() {
		super();
	}
	public open(...param):void{
        this.shopGroup.verticalCenter = -600
        egret.Tween.get(this.shopGroup).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
            egret.Tween.removeTweens(this.shopGroup);
        },this)
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.shopGroup["autoSize"]();
        this.dataList = new eui.ArrayCollection();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        MessageManager.inst().addListener(CustomEvt.SHOP_INTRODUCE,this.showIntroduce,this)
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
        this.dataList.source = ShopCfg.cfgs;
        this.list.dataProvider = this.dataList;
        this.list.validateNow();
        this.list.scrollV=0;
    }
    public touchTapHandler(e:egret.TouchEvent)
    {
        switch(e.target)
        {
            case this.return_btn:
            egret.Tween.get(this.shopGroup).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
                egret.Tween.removeTweens(this.shopGroup);
                ViewManager.inst().close(ShopView);
            },this)
            break;
        }
    }
	public close():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        MessageManager.inst().removeListener(CustomEvt.SHOP_INTRODUCE,this.showIntroduce,this)
	}
}
ViewManager.inst().reg(ShopView,LayerManager.UI_Pop);