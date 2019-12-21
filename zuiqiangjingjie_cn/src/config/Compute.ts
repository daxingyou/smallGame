/** 计算类 */
class Compute
{
    public static _instance:Compute;//单例

    public constructor()
    {

    }

    public static get instance():Compute
    {
        if( this._instance == null )
        {
            this._instance = new Compute();
        }
        return  this._instance;
    }

    /** 计算_sprite1相对于_sprite2所在的方向 */
    public Direction( _sprite1 , _sprite2 ):number
    {
        var _x = _sprite1.x - _sprite2.x;
        var _y = _sprite1.y - _sprite2.y;
        var _r = Math.atan2( _x , -_y ) * 180 / Math.PI;
        return _r;
    }

    /** 计算两个sprite之间的直线距离 */
    public Distance( _sprite1 , _sprite2 ):number
    {
        var _x = _sprite1.x - _sprite2.x;
        var _y = _sprite1.y - _sprite2.y;
        var _distance = Math.sqrt( _x * _x + _y * _y );
        return _distance;
    }

    /** 获取链接上的参数 */
    public GetUrlByParamName(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var URL =  decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if(r!=null){
            //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
            return  decodeURI(r[2]);
        };
        return null;
    }
    
     /** 背景屏幕适配 , 传入图片屏幕尺寸，横竖屏， 0：竖屏 1 ：横屏 */
    public bgAdapter( img:any , stage , n:number ):void
    {
        switch( n )
        {
            case 0:
                if( stage.stageHeight > 1334 )
                {
                    var bl = stage.stageHeight/img.height;
                    img.y = 0;
                    img.height = stage.stageHeight;
                    img.width *= bl;
                    img.x = -(img.width/2 - stage.stageWidth/2)
                }else
                {
                    img.x = 0;
                    var bl = stage.stageWidth/img.width;
                    img.width = stage.stageWidth;
                    img.y = stage.stageHeight/2 - img.height/2;
                    img.height *= bl;
                }
                break;
            case 1:
                if( stage.stageWidth > 1334 )
                {
                    var bl = stage.stageWidth/img.width;
                    img.x = 0;
                    img.width = stage.stageWidth;
                    img.height *= bl;
                    img.y = -(img.height/2 - stage.stageHeight/2)
                }else
                {
                    img.y = 0;
                    var bl = stage.stageHeight/img.height;
                    img.height = stage.stageHeight;
                    img.x = stage.stageWidth/2 - img.width/2;
                    img.width *= bl;
                }
                break;
        }    
    }

    /** 按钮按下效果 */
    public buttonClick( _btn , _fun:Function , _this ):void
    {
        egret.Tween.get( _btn )
        .to( { scaleX:0.7 , scaleY:0.7 } , 80 )
        .to( { scaleX:1.2 , scaleY:1.2 } , 100 )
        .to( { scaleX:1 , scaleY:1 } , 20 )
        
        egret.Tween.get( _this )
        .wait( 250 )
        .call( _fun );
    }

    /** 灰色色调 */
    public setGray():any
    {
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return colorFlilter;
    }

    /**创建一个动画 */
    public createAni( _name:string , _dh:string ):egret.MovieClip
    {
        var data = RES.getRes( _name + "_json" );
        var txtr = RES.getRes( _name + "_png" );
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc1 = new egret.MovieClip( mcFactory.generateMovieClipData( _dh ) );
        return mc1;
    }

    /** 存入数据 */
    public setLocalData( _key:string , _data:string ):void
    {
        egret.localStorage.setItem( _key , _data );
    }

    /** 取出数据 */
    public getLocalData( _key:string ):string
    {
        var data:string = "" ;
        if( !egret.localStorage.getItem( _key ) )
        {
            data = null;
        }else
        {
            data = egret.localStorage.getItem( _key );
        }
        return data;
    }

    /** 删除数据 */
    public removeLocalDate( _key:string ):void
    {
        if( !egret.localStorage.getItem( _key ) )
        {
            
        }else
        {
            egret.localStorage.removeItem( _key );
        }
    }

}