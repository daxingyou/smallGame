class StartGameView extends BaseEuiView {
	private gold_label: eui.Label;
	private goods_label: eui.Label;
	private medal_label: eui.Label;
	private soldier_label: eui.Label;
	private main_city_label: eui.Label;
	
	private random_btn: eui.Button;
	private name_input: eui.TextInput;

	private start_btn: eui.Button;

	private info_group: eui.Group;
	private map_group: eui.Group;
	private tip_group: eui.Group;
	private touch_map:eui.Group;
	private group:eui.Group;

	private city_pos = [
		{ x:1083 , y:707 },
		{ x:709 , y:752 },
		{ x:605 , y:535 },
		{ x:775 , y:336 },
		{ x:1039 , y:390 },
		{ x:970 , y:153 },
		{ x:715 , y:3 },
		{ x:489 , y:39 },
		{ x:421 , y:244 },
		{ x:341 , y:467 },
		{ x:309 , y:647 },
		{ x:108 , y:336 },
		{ x:10 , y:0 },
	];

	private select_id: number = -1;

	private zhugong_img: eui.Image;
    private moushi_img: eui.Image;
	private moushi_di:eui.Image;
	private zhugong_di: eui.Image;
	private mask_img:eui.Image;
	private zhugong_label: eui.Label;
	private moushi_label: eui.Label;
    private talk_label: eui.Label;
    // private talk_group: eui.Group;
	private talk_bg: eui.Image;
	// private tipFont:eui.Image;
	private touchBool:boolean = false;
    private talk_str: string[]=[
        "如今天下大乱，三国相互倾轧，主公难道就没有一争天下之心？",
        "慎言！谈何容易，怜我兵少将寡啊！",
        "主公如真有此雄心，只要上面疏通一下，准王调遣至一合适之地作为根基，悄然招兵买马，待时机成熟定可举事成功。",
        "卿可有良选之地？",
        "主公请看。。"
    ]

    private talk_num: number = 0;
    private talk_state: number = 0;
	private ox:number = 0;
	private oy:number = 0;
	private nx:number = 0;
	private ny:number = 0;

	// private clickRect:eui.Rect;
	private info_num = [];
	
	public constructor() {
		super();
	}
	public open(...param):void {
		this.init();
		this.addTouchEvent( this.random_btn , this.touchTapHandler , true );
		this.addTouchEvent( this.start_btn , this.touchTapHandler , true );
		// this.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
        MessageManager.inst().addListener( CustomEvt.SELECT_MAIN_CITY , this.selectCityHandler , this );
		// this.clickRect.addEventListener( egret.TouchEvent.TOUCH_TAP , this.talkTouchTap , this );
		this.touch_map.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mapMove, this);
		this.touch_map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mapBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.mapEnd, this);
	}
	public close():void {
		this.removeTouchEvent( this.random_btn , this.touchTapHandler );
		this.removeTouchEvent( this.start_btn , this.touchTapHandler );
        MessageManager.inst().removeListener( CustomEvt.SELECT_MAIN_CITY , this.selectCityHandler , this );
		// this.talk_group.removeEventListener( egret.TouchEvent.TOUCH_TAP , this.talkTouchTap , this );
		this.touch_map.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mapMove, this);
		this.touch_map.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mapBegin, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mapEnd, this);
		
	}
	private mapMove(evt:egret.TouchEvent)
	{
		let precentw:number = StageUtils.inst().getWidth()/1334;
        let precenth:number = StageUtils.inst().getHeight()/750;
		let cx:number = 0;
		let cy:number = 0;
		this.nx = evt.stageX;
		this.ny = evt.stageY;
		cx = this.nx - this.ox;
		cy = this.ny - this.oy;
		this.map_group.x += cx;
		this.map_group.y += cy;

		if(this.map_group.x >= 0)
		{
			this.map_group.x = 0;
		}else if(this.map_group.x <= (this.touch_map.width*precentw - this.map_group.width*precentw) + 20)
		{
			this.map_group.x = (this.touch_map.width - this.map_group.width)*precentw + 20;
		}

		if(this.map_group.y >= 0)
		{
			this.map_group.y = 0;
		}else if(this.map_group.y <= (this.touch_map.height*precenth- this.map_group.height*precenth))
		{
			this.map_group.y = (this.touch_map.height*precenth - this.map_group.height*precenth);
		}

		this.ox = this.nx;
		this.oy = this.ny;
	}
	private mapBegin(evt:egret.TouchEvent)
	{
		this.ox = this.nx = evt.stageX;
		this.oy = this.ny = evt.stageY;
	}
	private mapEnd()
	{
		this.ox = this.nx = 0;
		this.oy = this.ny = 0;
	}

	private init():void {
		let precentw:number = StageUtils.inst().getWidth()/1334;
		let precenth:number = StageUtils.inst().getHeight()/750;
		this.group.scaleX = precentw;
		this.group.scaleY = precenth;
		this.group.x*=precentw;
		this.group.y*=precenth;
		// this.group["autoSize"]();
		
		this.map_group.x = (this.touch_map.width - this.map_group.width)*precentw + 20;
		this.map_group.y = (this.touch_map.height - this.map_group.height)*precenth;

		for( let i = 0 ; i < 13 ; i ++ ) {
			let info = {
				goods:980 + ((Math.random()*20)>>0),
				medal:1,
				soldier_1:180 + ((Math.random()*20)>>0),
				soldier_2:380 + ((Math.random()*20)>>0),
				soldier_3:80 + ((Math.random()*20)>>0),
			}
			this.info_num.push( info );
		}
		this.adapter();
		this.gold_label.text = `${GameApp.gold}`;
		// this.goods_label.text = `${GameApp.goods}`;
		// this.medal_label.text = `${GameApp.medal}`;
		// let soldier_num = GameApp.soldier1Num + GameApp.soldier2Num + GameApp.soldier3Num;
		// this.soldier_label.text = `${soldier_num}`;
		this.name_input.text = NameList.inst().randomName();
		this.cityItemInit();


		this.info_group.right = -400;
        let scale = this.stage.stageWidth / 1334;
		// this.talk_group.scaleX = this.talk_group.scaleY = scale;
        // egret.Tween.get( this.talk_group )
        // .to( { alpha:1 } , 600 )
        // .call( function(){
        //     this.talk();
        // } , this );
		this.touch_map.mask = this.mask_img;
		egret.Tween.get( this.tip_group )
			.wait( 200 )
			.to( { alpha:1 } , 1000 )
			.wait( 1500 )
			.to( { alpha:0 } , 500 )
			.to( { visible:false } );
		egret.Tween.get(this.info_group).wait( 200 ).to({right:30},600,egret.Ease.backOut).call(()=>{
			egret.Tween.removeTweens(this.info_group);
		},this)
	}

	private selectInfo():void {
		this.goods_label.text = `${this.info_num[this.select_id].goods}`;
		this.medal_label.text = `${this.info_num[this.select_id].medal}`;
		let soldier_num = this.info_num[this.select_id].soldier_1 + this.info_num[this.select_id].soldier_2 + this.info_num[this.select_id].soldier_3;
		this.soldier_label.text = `${soldier_num}`;
		GameApp.exp = soldier_num;
	}

	private touchTapHandler( e:egret.TouchEvent ):void {
		// console.log(e.stageX - this.map_group.x , e.stageY - this.map_group.y);
		
		switch( e.target ) {
			case this.random_btn:
				SoundManager.inst().playEffect(`${MUSIC}collect.mp3`)
				this.name_input.text = NameList.inst().randomName();
				break;
			case this.start_btn:
				SoundManager.inst().playEffect(`${MUSIC}collect.mp3`)
				if( this.select_id != -1 ) {
					if( this.name_input.text.length < 2 || this.name_input.text.length > 10  ) {
						UserTips.inst().showTips( "名字长度不符！名称长度应为2-10个字符" );
					} else {
						GameApp.goods = this.info_num[this.select_id].goods;
						GameApp.medal = this.info_num[this.select_id].medal;
						GameApp.soldier1Num = this.info_num[this.select_id].soldier_1;
						GameApp.soldier2Num = this.info_num[this.select_id].soldier_2;
						GameApp.soldier3Num = this.info_num[this.select_id].soldier_3;
						GlobalFun.changeName( this.name_input.text );
						if(Main.DUBUGGER){
							Main.txt.text += this.select_id.toString();
						}
						GlobalFun.changeCityInfo( this.select_id + 1 , { isMain:true ,isOwn:true,isOnly:true} );
						ViewManager.inst().close( StartGameView );
						ViewManager.inst().open( GameMainView );
					}
				} else {
					UserTips.inst().showTips( "请先选择城市！" );
				}
				break;
		}
	}

	private talkTouchTap():void {
		// if( this.talk_group.alpha < 1 ) return;
        // if( this.talk_num >= 5 ) {
		// 	egret.Tween.get( this.talk_group )
		// 	.to( { alpha:0 } , 800 )
		// 	.to( { visible:false } );
		// 	egret.Tween.get( this.tip_group )
		// 	.wait( 850 )
		// 	.to( { alpha:1 } , 1000 )
		// 	.wait( 1500 )
		// 	.to( { alpha:0 } , 500 )
		// 	.to( { visible:false } );
		// 	this.clickRect.visible = false;
		// 	this.clickRect.touchEnabled = false;
		// 	egret.Tween.get(this.info_group).wait( 1850 ).to({right:30},600,egret.Ease.backOut).call(()=>{
		// 		egret.Tween.removeTweens(this.info_group);
		// 	},this)
		// 	// egret.Tween.get(this.tipFont).wait(1850).to({alpha:1},600).call(()=>{
		// 	// 	egret.Tween.removeTweens(this.tipFont);
		// 	// },this)
        // }else{
		// 	this.talk();
		// }
		
        
	}

	private cityItemInit():void {
		for( let i = 0 ; i < 13 ; i ++ ) {
			let item = new StartCityItem( i );
			item.x = this.city_pos[i].x + 80;
			item.y = this.city_pos[i].y;
			item.scaleX = item.scaleY = 2;
			this.map_group.addChild( item );
			item.alpha = 0;
			
			egret.Tween.get(item).to({alpha:1,y:this.city_pos[i].y + 80,scaleX:1,scaleY:1},100*(i+1),egret.Ease.backOut).call(()=>{
				egret.Tween.removeTweens(item);
			},this)
		}
	}

	private selectCityHandler( e:CustomEvt ):void {
		this.select_id = e.data;
		this.selectInfo();
		this.main_city_label.text = `${NameList.inst().city_name[this.select_id]}`;
	}

	// private talk():void {
    //     switch( this.talk_state ) {
    //         case 1:
    //             this.zhugong_img.visible = false;
    //             this.moushi_img.visible = true;
	// 			this.zhugong_label.visible = false;
    //             this.moushi_label.visible = true;
	// 			this.moushi_di.visible = true;
	// 			this.zhugong_di.visible = false;
    //             this.talk_state = 0;
	// 			this.talk_bg.x = this.talk_group.width - this.talk_bg.width;
	// 			this.talk_bg.source = `start_talk_bg_0_png`;
	// 			this.talk_label.x = 756;
    //             break;
    //         case 0:
    //             this.zhugong_img.visible = true;
    //             this.moushi_img.visible = false;
    //             this.zhugong_label.visible = true;
    //             this.moushi_label.visible = false;
	// 			this.moushi_di.visible = false;
	// 			this.zhugong_di.visible = true;
    //             this.talk_state = 1;
	// 			this.talk_bg.x = 38;
	// 			this.talk_bg.source = `start_talk_bg_1_png`
	// 			this.talk_label.x = 231;
    //             break;
    //     }
    //     this.typerEffect( this.talk_label , this.talk_str[this.talk_num] , 50 );
    //     this.talk_num ++;
    // }

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

	private adapter():void {
		let scale = this.stage.stageWidth / 1334;
		this.info_group.scaleX = this.info_group.scaleY = scale;
		// this.map_group.scaleX = this.map_group.scaleY = scale;
		// this.tipFont.scaleX = this.tipFont.scaleY = scale;
	}
}
ViewManager.inst().reg( StartGameView , LayerManager.UI_Main );