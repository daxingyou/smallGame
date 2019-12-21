/**
 * Game map
 * 
 * eg ： Initialize map module 。Need to callinitMap; Other method selective calls
 * 
 * function:  initMap Initialize map 
 * 
 * function1 ：resetMapviewPort；Reset map layer location 。Default to00spot
 * 
 * function2 : startRoleClickMove Turn on character click map move operation
 */
class MapView extends BaseClass {
    /**Map background */
    private _mapImage: MapViewBg;
    ///////////////////////////////Object level////////////////////////////////////
    /**Building object layer */
    private _itemLayer: egret.DisplayObjectContainer;
    private _shapeContainer:egret.DisplayObjectContainer;
    private _offestX:number;
    private _offestY:number;
    private initia:boolean = false;
    private hero:egret.DisplayObject;
    public constructor() {
        super();
    }
    public static inst():MapView{
		let _inst:MapView = super.single<MapView>();
		return _inst
	}
    /**
     * Map initialization
     * drawGrid Whether to draw test grid
     */
    public initMap(drawGrid?:boolean): void {
        if(this.initia){return}
        this.initia = true;
        this._mapImage = new MapViewBg();
        LayerManager.MAP_LAYER.addChild(this._mapImage);

        this._itemLayer = new egret.DisplayObjectContainer();
        LayerManager.MAP_LAYER.addChild(this._itemLayer);
        if(drawGrid){this.drawTestGrid()}
        
        /**test */
        let hero:egret.Shape = new egret.Shape();
        hero.graphics.beginFill(0xff0000);
        hero.graphics.drawRect(0,0,50,50);
        hero.anchorOffsetX = hero.anchorOffsetY = 25;
        hero.graphics.endFill();
        LayerManager.MAP_LAYER.addChild(hero);
        hero.x = hero.y = 200;
        this.startRoleClickMove(hero);
        //------------------
    }
    /**
     * Turn on character click map layer move operation
     * param：roleEntity Main character entity object to be clicked
     */
    public startRoleClickMove(roleEntity):void{
        this.hero = roleEntity;
        LayerManager.MAP_LAYER.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMapTouch,this);
    }
    private _path:any[];
    /**Map click operation */
    private onMapTouch(evt:egret.TouchEvent):void{
        let pxy:egret.Point = LayerManager.MAP_LAYER.globalToLocal(evt.stageX,evt.stageY);
         
        let gxy:XY = GameMap.point2Grid(pxy.x,pxy.y);
        let _path = this.findPath(gxy.x,gxy.y);
        if(_path){
            this._path = _path;
        }else{
            return;
        }
        if(this._path && this._path.length){
            //Remove the first grid 。This grid is in the same grid with the characters
            this._path.shift();
            if(this._path.length){
                egret.Tween.removeTweens(this.hero);
                this.execMove(this._path.shift());
            }
        }
    }
    //Moving speed
    private speed:number = 200;
    /**Execute move master logic */
    private execMove(node:any):void{
        let gx:number = node.x;
        let gy:number = node.y;
        let point:XY = GameMap.grid2Point(gx,gy);
        let _offestX:number = this.hero.x;
        let _offestY:number = this.hero.y;
        egret.Tween.get(this.hero,{loop:false,onChange:()=>{
            if(!this.juageIfInXBorder()){
                let xx = this.hero.x - _offestX;
                LayerManager.MAP_LAYER.x -= xx;
                _offestX = this.hero.x;
            }
            this.judageMapImgX();
            if(!this.juageIfInYBorder()){
                let yy = this.hero.y - _offestY;
                LayerManager.MAP_LAYER.y -= yy;
                _offestY = this.hero.y;
            } 
            this.judageMapImgY();
        },onChangeObj:this}).to({x:point.x,y:point.y},this.speed).call(()=>{
            egret.Tween.removeTweens(this.hero);
            if(this._path && this._path.length){
                this.execMove(this._path.shift())
            }
        })
    }
    /**Finding path */
    private findPath(ex:number,ey:number):any[]{
		GameMap.AstarNode.setEndNode(ex,ey);

		let pxy:XY = GameMap.point2Grid(this.hero.x ,this.hero.y);
		GameMap.AstarNode.setStartNode(pxy.x, pxy.y);

		var aStar:astar.AStar = new astar.AStar();
		if(aStar.findPath(GameMap.AstarNode))
		{
			let _path = aStar.path;
			return _path
		}
		return null;
	}
    /**Initialize map layer location */
    public resetMapviewPort():void{
        LayerManager.MAP_LAYER.y = 0;
        LayerManager.MAP_LAYER.x = 0;
    }
    //Determine whether theXboundary
    private juageIfInXBorder():boolean{
        return (this.hero.x <= StageUtils.inst().getWidth()>>1) || (this.hero.x >= (GameMap.MAX_WIDTH - (StageUtils.inst().getWidth()>>1)))
    }
    //Determine whether theXboundary
    private juageIfInYBorder():boolean{
        return (this.hero.y <= StageUtils.inst().getHeight()>>1) || (this.hero.y >= (GameMap.MAX_HEIGHT - (StageUtils.inst().getHeight()>>1)))
    }
    //Judgement mapxBoundary movement processing
    private judageMapImgX():void{
        // LayerManager.MAP_LAYER.x -= this._offestX;
        if(LayerManager.MAP_LAYER.x < -(GameMap.MAX_WIDTH - StageUtils.inst().getWidth())){
            LayerManager.MAP_LAYER.x  = -(GameMap.MAX_WIDTH - StageUtils.inst().getWidth());
        }
        if(LayerManager.MAP_LAYER.x > 0){
            LayerManager.MAP_LAYER.x = 0;
        }
    }
    //Judgement mapyBoundary movement processing
    private judageMapImgY():void{
        // LayerManager.MAP_LAYER.y -= this._offestY;
        if(LayerManager.MAP_LAYER.y < -(GameMap.MAX_HEIGHT - StageUtils.inst().getHeight())){
            LayerManager.MAP_LAYER.y = -(GameMap.MAX_HEIGHT - StageUtils.inst().getHeight());
        }
        if(LayerManager.MAP_LAYER.y > 0){
           LayerManager.MAP_LAYER.y = 0;
        }
        
    }
    /**
     * Draw map node
     */
    private drawTestGrid():void{
       
        this._shapeContainer = new egret.DisplayObjectContainer();
        this._shapeContainer.cacheAsBitmap = true;
        this._shapeContainer.touchEnabled = false;
        this._shapeContainer.touchChildren = false;
        
        let maxX: number = GameMap.COL;
        let maxY: number = GameMap.ROW;
        for (let i: number = 0; i < maxY; i++) {
            for (let j: number = 0; j < maxX; j++) {
                if (!GameMap.walkable(i, j)){
                    let rect: egret.Shape = new egret.Shape();
                    rect.graphics.clear();
                    rect.graphics.lineStyle(0.1);
                    rect.graphics.beginFill(0xff0000, 0.3);
                    rect.graphics.drawRect(j * GameMap.CELL_SIZE, i * GameMap.CELL_SIZE, GameMap.CELL_SIZE, GameMap.CELL_SIZE);
                    rect.graphics.endFill();

                    let text: eui.Label = new eui.Label();
                    text.size = 12;
                    text.text = `${j},${i}`;
                    text.x = j * GameMap.CELL_SIZE;
                    text.y = i * GameMap.CELL_SIZE;
                    this._shapeContainer.addChild(rect)
                    this._shapeContainer.addChild(text);
                }
            }
        }
        LayerManager.MAP_LAYER.addChild(this._shapeContainer);
    }
}

