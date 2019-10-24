/** 序列帧动画 */
class BaseAni extends egret.Sprite
{
    private mc1;

    public constructor(_name:string,_dh:string)
    {
        super();

        var data = RES.getRes( _name + "_json" );
        var txtr = RES.getRes( _name + "_png" );
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.mc1 = new egret.MovieClip( mcFactory.generateMovieClipData( _dh ) );
        this.addChild( this.mc1 );
    }

    /** 播放动画 */
    public playAni( _name:string , _cs:number ):void
    {
        this.mc1.gotoAndPlay( _name , _cs );
    }
    /** 停止播放动画 */
    public stopAni(_name:string):void
    {
        this.mc1.gotoAndStop( _name );
    }
    /** 暂停播放动画 */
    public pauseAni()
    {
        this.mc1.stop(this);
    }
    /** 暂停播放动画 */
    public continueAni()
    {
        this.mc1.play(this);
    }
    /**获取动画 */
    public get mc()
    {
        return this.mc1;
    }
}