class BeginView extends BaseEuiView{
    private beginView_bg:eui.Image;
    private beginView_btn1:eui.Image;
    private beginView_login:eui.Image;
    private beginView_name:eui.Image;
    private canvas:any;
    private static touch_X:number;
    private static touch_Y:number;
    public constructor() {
		super();
	}
	public open(...param):void{
        if (!egret.Capabilities.isMobile) {
            //分别监听外层容器的 MouseEvent
            this.beginView_btn1.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
            this.beginView_btn1.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
            this.beginView_btn1.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
            this.beginView_btn1.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        }else
        {
            this.beginView_btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseOver, this);
            this.beginView_btn1.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseOut, this);
        }
		this.beginView_name.visible=false;
        this.beginView_btn1.visible=false;
        this.beginView_login.visible=false;
        egret.setTimeout(this.onMove,this,1000);
        this.beginView_btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
	}
    private onMove()
    {
        this.beginView_name.visible=true;
        this.beginView_name.scaleX=1.5;
        this.beginView_name.scaleY=1.5;
        egret.Tween.get(this.beginView_name).to({scaleX:1,scaleY:1},200).call(function(){
            this.beginView_btn1.visible=true;
            this.beginView_login.visible=true;
        },this);
        
    }
    private onRollOver(e: egret.TouchEvent): void {
        // console.log("roll over " + e.target.name + "  " + e.bubbles);
    }
    private onRollOut(e: egret.TouchEvent): void {
        // console.log("roll out " + e.target.name + "  " + e.bubbles);
    }
    private onMouseOver(e: egret.TouchEvent): void {
        // console.log("mouse over " + e.target.name + "  " + e.bubbles);
        this.beginView_btn1.source=RES.getRes("beginView_btn2_png");
    }
    private onMouseOut(e: egret.TouchEvent): void {
        // console.log("mouse out " + e.target.name + "  " + e.bubbles);
        this.beginView_btn1.source=RES.getRes("beginView_btn1_png");
    }
    /**响应Touch*/
    private touchHandler(evt:egret.TouchEvent):void{
        if(evt.type==egret.TouchEvent.TOUCH_TAP)
        {
            switch(evt.target)
            {
                case this.beginView_btn1:
                CommonLoading.inst().show(null,()=>{
                    ViewManager.inst().open(SelectFightView);
                    if (egret.Capabilities.isMobile)
                    {
                        if(!GameApp.show_video)
                        {
                            GameApp.show_video=true;
                            //Main.play();
                        }
                        
                    }
                    
                    ViewManager.inst().close(BeginView);
                },this)
                break;
            }
        }
    }
	public close():void{
		this.beginView_btn1.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        this.beginView_btn1.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this.beginView_btn1.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.beginView_btn1.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.beginView_btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        
	}
}
ViewManager.inst().reg(BeginView,LayerManager.UI_Main);