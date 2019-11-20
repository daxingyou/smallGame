class Bullet extends egret.Sprite {
    private img: egret.Bitmap;
    private _id:number = 0;
    private _img:string;
    private pos = {
        x:0,
        y:0
    }

    private lastPos = {
        x:0,
        y:0
    }

    public constructor( my_x:number, my_y:number , x:number , y:number , id:number , _img:string) {
        super();
        this.pos.x = x;
        this.pos.y = y;
        this.x = my_x;
        this.y = my_y;
        this.lastPos.x = my_x;
        this.lastPos.y = my_y;
        this._id = id;
        this._img = _img;
        this.init();
        this.addEventListener( egret.Event.ENTER_FRAME , this.update , this );
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
    }
    private gameStart()
	{
        this.addEventListener( egret.Event.ENTER_FRAME , this.update , this );
		egret.Tween.resumeTweens(this.img);
        egret.Tween.resumeTweens(this);
	}
	private gamePause()
	{
        this.removeEventListener( egret.Event.ENTER_FRAME , this.update , this );
		egret.Tween.pauseTweens(this.img);
        egret.Tween.pauseTweens(this);
	}
    add_view_handler():void {
        
    }

    private init():void {
        this.img = new egret.Bitmap();
        this.img.texture = RES.getRes( this._img );
        this.img.anchorOffsetX = this.width/2;
        this.img.anchorOffsetY = this.width/2;
        this.img.rotation = 60;
        this.addChild( this.img );

        if( this._id == 3 ) {
            this.img.texture = RES.getRes( "game_stone_png" );
            this.img.anchorOffsetX = this.width/2;
            this.img.anchorOffsetY = this.width/2;
        }

        var t = Math.floor( Math.random()*300 );

        egret.Tween.get( this )
        .to( { x:this.pos.x , y:this.pos.y } , 700 + t )
        .call( this.removeMyself );

        egret.Tween.get( this.img )
        // .to( { y:-100 , rotation:90 } , 500 , egret.Ease.sineOut )
        // .to( { y:0 , rotation:120 } , 500 , egret.Ease.sineIn )
        .to( { y:-150 } , 350 + t/2 , egret.Ease.sineOut )
        .to( { y:0 } ,  350 + t/2 , egret.Ease.sineIn );
        this.visible = false;
    }

    private update():void {
        this.img.rotation = Compute.instance.Direction( { x:this.x , y:this.y + this.img.y } , this.lastPos );
        this.lastPos.x = this.x;
        this.lastPos.y = this.y + this.img.y;
        this.visible = true;
    }

    private removeMyself():void {
        // Message.instance.send( MsgCMD.EXPLODE , this );
        if( this.parent && this.parent.contains( this ) ){
            this.parent.removeChild( this );
        }
    }
}