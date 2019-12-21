class IntroduceView extends BaseEuiView{
	public close_img:eui.Image;
    public jieshao_label:eui.Label;
    public hp_label:eui.Label;
    public atk_label:eui.Label;
    public buffDesc_label:eui.Label; 
    public data:any;
    public card_group:eui.Group;
    private jieshao_group:eui.Group;
    public buffDesc_group:eui.Group;
    public person_img:eui.Image;
    private quality:eui.Image;
    private infoGroup:eui.Group;
	public constructor() {
		super();
	}
    public initData(data,isshow:boolean = true):void{
            // if(data.type == CardType.skill || data.type == CardType.special_skill || data.type == CardType.prop){
                
            // }else{
            //     this.quality.visible = false;
            // }
            // this.quality.visible = true;
            // this.quality.source = `quality_${data.quality}_png`;
        }
    public setData()
    {   
        if(this.data["type"] == CardType.general)
        {
            this.jieshao_group.y = 134.5
            this.buffDesc_label.text = this.data["buffDesc"];
            this.buffDesc_group.visible = true;
        }else
        {
            this.jieshao_group.y = 100.5;
            this.buffDesc_group.visible = false;
        }
        if(this.data["hp"]==0||this.data["atk"]==0 || this.data["type"] == CardType.skill || this.data["type"] == CardType.special_skill || this.data["type"] == CardType.prop ||
           this.data["type"] == CardType.build)
        {
            this.hp_label.text="无";
            this.atk_label.text="无";
        }else
        {
            this.hp_label.text=this.data["hp"];
            this.atk_label.text=this.data["atk"];
        }

        if(this.data["insId"] == 100105 || this.data["insId"] == 100106 || this.data["insId"] == 100107)
        {
            this.hp_label.text=this.data["hp"];
            this.atk_label.text=this.data["atk"];
        }
        
        // this.jieshao_label.text=this.data["jieshao"];
        this.jieshao_label.textFlow=new egret.HtmlTextParser().parse(this.data["jieshao"]);
        this.person_img.source=this.data["cardModel"];
        this.initData(this.data);
        //let card = new CardItem( this.data["type"] , this.data["insId"] );
        //this.card_group.addChild( card );
    }
	public open(...param):void{
        this.infoGroup["autoSize"]();
        this.data=param[0];
        this.setData();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
	}
    
    public touchTapHandler(e:egret.TouchEvent)
    {
        switch(e.target)
        {
            case this.close_img:
            ViewManager.inst().close(IntroduceView);
            break;
        }
    }
	public close():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
	}
}
ViewManager.inst().reg(IntroduceView,LayerManager.TIPS_LAYER);