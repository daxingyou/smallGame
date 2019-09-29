/**
 * 游戏地图
 * 
 * eg ： 初始化地图模块 。需要调用initMap; 其他方法选择性调用
 * 
 * function:  initMap 初始化地图 
 * 
 * function1 ：resetMapviewPort；重置地图层位置 。默认到00点
 * 
 * function2 : startRoleClickMove 开启人物点击地图移动操作
 */
class MapView extends BaseClass {
    /**地图背景 */
    private _mapImage: MapViewBg;
    ///////////////////////////////对象层////////////////////////////////////
    /**建筑物对象层 */
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
     * 地图初始化
     * drawGrid 是否绘制测试格子
     */
    public initMap(drawGrid?:boolean): void {
        if(this.initia){return}
        this.initia = true;
        this._mapImage = new MapViewBg();
        LayerManager.MAP_LAYER.addChild(this._mapImage);

        this._itemLayer = new egret.DisplayObjectContainer();
        LayerManager.MAP_LAYER.addChild(this._itemLayer);
        if(drawGrid){this.drawTestGrid()}
        
        /**测试 */
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
     * 开启人物点击地图层移动操作
     * param：roleEntity 需要点击操作的主人物实体对象
     */
    public startRoleClickMove(roleEntity):void{
        this.hero = roleEntity;
        LayerManager.MAP_LAYER.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMapTouch,this);
    }
    private _path:any[];
    /**地图点击操作 */
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
            //去掉第一个格子 。这个格子与人物在一个格子
            this._path.shift();
            if(this._path.length){
                egret.Tween.removeTweens(this.hero);
                this.execMove(this._path.shift());
            }
        }
    }
    //移动速度
    private speed:number = 200;
    /**执行移动主逻辑 */
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
    /**找寻路径 */
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
    /**初始化地图层位置 */
    public resetMapviewPort():void{
        LayerManager.MAP_LAYER.y = 0;
        LayerManager.MAP_LAYER.x = 0;
    }
    //判断是否在X边界
    private juageIfInXBorder():boolean{
        return (this.hero.x <= StageUtils.inst().getWidth()>>1) || (this.hero.x >= (GameMap.MAX_WIDTH - (StageUtils.inst().getWidth()>>1)))
    }
    //判断是否在X边界
    private juageIfInYBorder():boolean{
        return (this.hero.y <= StageUtils.inst().getHeight()>>1) || (this.hero.y >= (GameMap.MAX_HEIGHT - (StageUtils.inst().getHeight()>>1)))
    }
    //判断地图x边界移动处理
    private judageMapImgX():void{
        // LayerManager.MAP_LAYER.x -= this._offestX;
        if(LayerManager.MAP_LAYER.x < -(GameMap.MAX_WIDTH - StageUtils.inst().getWidth())){
            LayerManager.MAP_LAYER.x  = -(GameMap.MAX_WIDTH - StageUtils.inst().getWidth());
        }
        if(LayerManager.MAP_LAYER.x > 0){
            LayerManager.MAP_LAYER.x = 0;
        }
    }
    //判断地图y边界移动处理
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
     * 绘制地图节点
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

