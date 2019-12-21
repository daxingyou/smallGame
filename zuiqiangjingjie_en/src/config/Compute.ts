/** Computing class */
class Compute
{
    public static _instance:Compute;//Single case

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

    /** Calculation_sprite1Be relative to_sprite2Direction */
    public Direction( _sprite1 , _sprite2 ):number
    {
        var _x = _sprite1.x - _sprite2.x;
        var _y = _sprite1.y - _sprite2.y;
        var _r = Math.atan2( _x , -_y ) * 180 / Math.PI;
        return _r;
    }

    /** Calculate twospriteStraight line distance between */
    public Distance( _sprite1 , _sprite2 ):number
    {
        var _x = _sprite1.x - _sprite2.x;
        var _y = _sprite1.y - _sprite2.y;
        var _distance = Math.sqrt( _x * _x + _y * _y );
        return _distance;
    }

    /** Get parameters on link */
    public GetUrlByParamName(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var URL =  decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if(r!=null){
            //decodeURI() Function pair encodeURI() Function encoded URI Decode
            return  decodeURI(r[2]);
        };
        return null;
    }
    
     /** Background screen adaptation , Incoming picture screen size，Vertical screen， 0：Vertical screen 1 ：Horizontal screen */
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

    /** Button press effect */
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

    /** Gray tone */
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

    /**Create an animation */
    public createAni( _name:string , _dh:string ):egret.MovieClip
    {
        var data = RES.getRes( _name + "_json" );
        var txtr = RES.getRes( _name + "_png" );
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc1 = new egret.MovieClip( mcFactory.generateMovieClipData( _dh ) );
        return mc1;
    }

    /** Store data */
    public setLocalData( _key:string , _data:string ):void
    {
        egret.localStorage.setItem( _key , _data );
    }

    /** Remove data */
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

    /** Delete data */
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