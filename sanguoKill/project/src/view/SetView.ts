class SetView extends BaseEuiView{
    private setViewBg:eui.Image;
    private setView_xian1:eui.Image;
    private setView_xian2:eui.Image;
    private setView_black:eui.Image;
    private setView_btn4:eui.Image;
    private setView_label4:eui.Image;
    private setView_yinliang:eui.Image;
    private setView_lianxian:eui.Image;
    private setView_niu:eui.Image;
    private num1:number;
    private num2:number;
    public constructor() {
		super();
	}
	public open(...param):void{
        
        this.num1=this.setView_lianxian.x;
        this.num2=this.setView_lianxian.x+this.setView_lianxian.width;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
	}
    
    /**响应Touch*/
    private touchHandler(evt:egret.TouchEvent):void{
        if(evt.type==egret.TouchEvent.TOUCH_TAP)
        {
            switch(evt.target)
            {
                case this.setView_label4:
                ViewManager.inst().open(SelectFightView);
                ViewManager.inst().close(SetView);
                break;
                
            }
        }else if(evt.type==egret.TouchEvent.TOUCH_MOVE)
        {
            switch(evt.target)
            {
                case this.setView_niu:
                if((this.num1<=this.setView_niu.x)&&this.setView_niu.x<=this.num2)
                {
                    this.setView_niu.x=evt.stageX;
                }
                else
                {
                    if(this.num1>=this.setView_niu.x)
                    {
                        this.setView_niu.x=this.num1;
                    }else if(this.num2<=this.setView_niu.x)
                    {
                        this.setView_niu.x=this.num2;
                    }
                }
                console.log("aaa");
                break;
                
            }
        }

    }
	public close():void{
		
        
	}
}
ViewManager.inst().reg(SetView,LayerManager.UI_Main);