class LoadingView extends eui.Component {
	private country_group: eui.Group;
    private zhugong_img: eui.Rect;
    private moushi_img: eui.Rect;
    private talk_label: eui.Label;
    private talk_group: eui.Group;

    private talk_str: string[]=[
        "谋士：如今天下大乱，三国相互倾轧，主公难度就没有一争天下之心？",
        "主公：慎言！谈何容易，怜我兵少将寡啊！",
        "谋士：主公如真有此雄心，只要上面疏通一下，准王调遣至一合适之地作为根基，悄然招兵买马，待时机成熟定可举事成功。",
        "主公：卿可有良选之地？",
        "谋士：主公请看。。"
    ]

    private talk_num: number = 0;
    private talk_state: number = 0;
	private country_id: number = 0;
	
	public constructor() {
		super();
        this.skinName = `LoadingViewSkin`;
        this.addEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
	}

    private add_view_handler():void {
		this.init();
        this.removeEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.talk_group.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
    }

    private remove_view_handler():void {
        this.removeEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.talk_group.removeEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
        
    }

	private init():void {
        let scale = this.stage.stageWidth / 1334;
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.country_group.scaleX = this.country_group.scaleY = scale;
        this.talk_group.scaleX = this.talk_group.scaleY = scale;
		for( let i = 0 ; i < 3 ; i ++ ) {
			this[ `country_${i}` ].scaleX = this[ `country_${i}` ].scaleY = 0;
			egret.Tween.get( this[ `country_${i}` ] )
			.wait( 200 * i + 1000 )
			.to( { scaleX:1 , scaleY:1 } , 1000 , egret.Ease.backOut );
		}
        egret.Tween.get( this.talk_group )
        .wait( 2400 )
        .to( { alpha:1 } , 600 );
        egret.Tween.get( this )
        .wait( 3000 )
        .call( function(){
            this.talk();
        } );
        
	}

	private touchTapHandler( e:egret.TouchEvent ):void {
        if( this.talk_group.alpha < 1 ) return;
        if( this.talk_num >= 5 ) {
            LoadingUI.inst().hide();
            ViewManager.inst().open( StartGameView );
        }
        this.talk();
	}

    private talk():void {
        switch( this.talk_state ) {
            case 0:
                this.zhugong_img.visible = false;
                this.moushi_img.visible = true;
                this.talk_state = 1;
                break;
            case 1:
                this.zhugong_img.visible = true;
                this.moushi_img.visible = false;
                this.talk_state = 0;
                break;
        }
        this.typerEffect( this.talk_label , this.talk_str[this.talk_num] , 50 );
        this.talk_num ++;
    }

    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */    
    private typerEffect(obj,content:string = "",interval:number = 200,backFun:Function = null):void{
        for( let i = 0 ; i < this.timeOut_arr.length ; i ++ ) {
            egret.clearTimeout( this.timeOut_arr[i] );
        }
        var strArr:Array<any> = content.split("");
        obj.text = ``;
        var len:number = strArr.length;
        for (var i = 0; i < len; i++){
            let timeOut = egret.setTimeout(function () {              
                obj.appendText(strArr[Number(this)]);
                if ((Number(this) >= len - 1) && (backFun != null)) {
                    backFun();
                }
            }, i, interval*i);    
            this.timeOut_arr.push( timeOut );          
        }
    }

    private timeOut_arr = [];
}
ViewManager.inst().reg( LoadingView , LayerManager.UI_Main );