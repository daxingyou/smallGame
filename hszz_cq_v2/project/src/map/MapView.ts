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
    private initia:boolean = false;
    private hero:SoldierEntity;
    private levelMonIds:number[] = [10002,10003,10004,10005,10006,10007,10008,10022,10027,10031];
    private typeindexs:number[] = [0,2,1,2,1,0,1,2,1,0]
    public monsters:MonsterEntity[]= [];
    public roles:any[] = [];
    public drops:DropEntity[] = [];
    public constructor() {
        super();
    }
    public static inst():MapView{
		let _inst:MapView = super.single<MapView>();
		return _inst
	}
    /**清除地图单位 */
    public clearMapUnit():void{
        for(let key in this.monsters){
            if(this.monsters[key] && this.monsters[key].parent){
                this.monsters[key].parent.removeChild(this.monsters[key])
            }
        }
        this.monsters = [];
        for(let key in this.roles){
            if(this.roles[key] && this.roles[key].parent){
                this.roles[key].parent.removeChild(this.roles[key])
            }
        }
        this.roles = [];
        for(let key in this.drops){
            if(this.drops[key] && this.drops[key].parent){
                this.drops[key].parent.removeChild(this.drops[key])
            }
        }
        this.drops = [];
        if(this._mapImage && this._mapImage.parent){
            this._mapImage.parent.removeChild(this._mapImage);
            this._mapImage = null;
        }
        this._itemLayer.removeChildren();
        this.initia = false;
        if(this.hero && this.hero.parent){
            this.hero.parent.removeChild(this.hero);
        }
        LayerManager.MAP_LAYER.removeChildren();
        this._path = [];
        this.mapClick = false;
        this.moveEnd = true;
        if(this.timeout){
            clearTimeout(this.timeout);
        }
        LayerManager.MAP_LAYER.x = 0;
        LayerManager.MAP_LAYER.y = 0;
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
        let hero:SoldierEntity = new SoldierEntity();
        let vo:RoleVo = {level:1,atkDis:140,spd:50,atk:500 + ((Math.random()*100)>>0),hp:3000,mp:1000}
        hero.soldierAttr = vo;
        hero.setSoldierData(1,"body001","weapon100");
        LayerManager.MAP_LAYER.addChild(hero);
        this.roles.push(hero);

        let birthGrids:{row:number,col:number}[] = GameMap.roleBirthGrid;
        let index:number = (Math.random()*birthGrids.length)>>0;
        let birthXY:{row:number,col:number} = birthGrids[index];
        let xy:XY = GameMap.grid2Point(birthXY.col,birthXY.row);
        hero.x = xy.x;
        hero.y = xy.y;
        
        this.startRoleClickMove(hero);
        this.refreshMapPos();
        //------------------
    }
    /**初始化 关卡怪物 */
    public initLevelMonster():void{
      
    //    GameApp.monsterRes = bodyres;
       let num:number = 10;
       for(let i:number = 0;i<num;i++){
           this.initBoss();
       }
    }
    public initBossMon():void{
         this.initBoss("boss");
    }
    /**移除item
     * 
     * @item 移除的monster
     * @leveladd 是否在移除后 一段时间后 添加一个
     */
    public refreshMonItem(item:MonsterEntity,leveladd:boolean = false):void{
        for(let i:number = 0;i<this.monsters.length;i++){
            if(this.monsters[i] == item){
                let self = this;

                if(GameApp.fuben == "fuben"){
                    //掉落物
                    let drops:CardVo[] = GlobalFun.dropItems();
                    let xy:XY[] = [{x:item.x,y:item.y},{x:item.x - 50,y:item.y - 50},{x:item.x + 50,y:item.y - 50}];
                    let mainRole:SoldierEntity = this.roles[0];
                    for(let i:number = 0;i<drops.length;i++){
                        let dropItem:DropEntity = new DropEntity(drops[i],xy[i]);
                        this.drops.push(dropItem);
                        LayerManager.MAP_LAYER.addChildAt(dropItem,1);
                        let cardData:CardVo = GlobalFun.getCardDataFromId(drops[i].id);
                        let vo:CardVo = cardData?cardData:drops[i];
                        vo.ownNum += 1;
                        GlobalFun.refreshCardData(vo);
                        let timeout = setTimeout(function() {
                            clearTimeout(timeout);
                            if(dropItem && dropItem.parent && (!GameApp.gameEnd && GameApp.fuben == "fuben")){
                                egret.Tween.get(dropItem).to({x:mainRole.x,y:mainRole.y,alpha:0,scaleX:0,scaleY:0},300).call(()=>{
                                    egret.Tween.removeTweens(dropItem);
                                    if(dropItem && dropItem.parent){
                                        dropItem.parent.removeChild(dropItem);
                                    }
                                    
                                },this)
                            }
                            
                        }, 1500);
                    }
                    if(leveladd && (!GameApp.gameEnd  && GameApp.fuben == "fuben")){
                        //关卡循环添加怪物
                        let timeout2 = setTimeout(function() {
                            clearTimeout(timeout2)
                            if(!GameApp.gameEnd && GameApp.fuben == "fuben"){
                                self.initBoss();
                            }
                        }, 3000);
                    }
                }else{
                    MessageManager.inst().dispatch(CustomEvt.GAMEEND,{end:"gameend"})
                }
                this.monsters.splice(i,1);
                break;
            }
        }
    }
    /**初始化boss关卡 */
    private initBoss(bossMon?:string):void{
        if(GameApp.gameEnd){return}
        let bossindex:number = (Math.random()*this.levelMonIds.length)>>0;
	    let res = `monster${this.levelMonIds[bossindex]}`;
        let boss:MonsterEntity = new MonsterEntity();
        
       
        if(!bossMon){
            let vo:RoleVo = {level:1,atkDis:64,spd:50,atk:GameApp.level*30 + ((Math.random()*30)>>0),hp:GameApp.level*700}
            let typeindex:number = this.typeindexs[bossindex]
            boss.type = typeindex;
            boss.setSoldierData(-1,res,vo);
        }else{
            let vo:RoleVo = {level:1,atkDis:64,spd:50,atk:GameApp.level*100 + ((Math.random()*30)>>0),hp:GameApp.level*10000}
            let typeindex:number = (Math.random()*3)>>0;
            boss.type = typeindex;
            GameApp.bossType = typeindex;
            boss.setSoldierData(-1,"",vo);
            boss.scaleX = boss.scaleY = 1.5;
        }
        LayerManager.MAP_LAYER.addChild(boss);
        let birthGrids:{row:number,col:number}[] = GameMap.monsterGrid;
        let index:number = (Math.random()*birthGrids.length)>>0;
        let birthXY:{row:number,col:number} = birthGrids[index];
        let xy:XY = GameMap.grid2Point(birthXY.col,birthXY.row);
        boss.x = xy.x;
        boss.y = xy.y;
        boss.gx = birthXY.col;
        boss.gy = birthXY.row;
        this.monsters.push(boss);
        // GameMap.AstarNode.setWalkable(birthXY.col,birthXY.row,false);
    }
    /**刷新地图位置 */
    private refreshMapPos():void{
        LayerManager.MAP_LAYER.x = - this.hero.x + (StageUtils.inst().getWidth()>>1); 
        LayerManager.MAP_LAYER.y = - this.hero.y + (StageUtils.inst().getHeight()>>1);
        this.judageMapImgX();
        this.judageMapImgY();
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
    public mapClick:boolean = false;
    private timeout;
    /**地图点击操作 */
    private onMapTouch(evt:egret.TouchEvent):void{
         let pxy:egret.Point = LayerManager.MAP_LAYER.globalToLocal(evt.stageX,evt.stageY);
         
         if(this.timeout){clearTimeout(this.timeout),this.timeout = null}
         this.execMoveAction(pxy,true)
    }
    public execMoveAction(pxy:XY,effect?:boolean):void{
        let gxy:XY = GameMap.point2Grid(pxy.x,pxy.y);
        let _path = this.findPath(gxy.x,gxy.y);
        if(_path){
            this._path = _path;
            if(effect){
                let clickMc:MovieClip = new MovieClip();
                clickMc.touchEnabled = false;
                this.mapClick = true;
                LayerManager.MAP_LAYER.addChild(clickMc);
                clickMc.playFile(`${EFFECT}click`,1,null,true);
                clickMc.x = pxy.x;
                clickMc.y = pxy.y;
            }
        }else{
            this.mapClick = false;
            return;
        }
        if(this._path && this._path.length){
            //去掉第一个格子 。这个格子与人物在一个格子
            this._path.shift();
            if(this._path.length && this.moveEnd){
                egret.Tween.removeTweens(this.hero);
                this.execMove(this._path.shift());
            }
        }
    }
    //移动速度
    private speed:number = 260;
    //当前格子是否移动完毕
    public moveEnd:boolean = true;
    /**执行移动主逻辑 */
    private execMove(node:any):void{
        let gx:number = node.x;
        let gy:number = node.y;
        this.moveEnd = false;
        let point:XY = GameMap.grid2Point(gx,gy);
        let _offestX:number = this.hero.x;
        let _offestY:number = this.hero.y;
        this.hero.changeRoleAction(ActionState.RUN,new egret.Point(point.x,point.y));
        let dis:number = egret.Point.distance(new egret.Point(point.x,point.y),new egret.Point(this.hero.x,this.hero.y));
        let time:number = dis/this.speed
        egret.Tween.get(this.hero,{loop:false,onChange:()=>{
            if(!this.juageIfInXBorder()){
                let xx = this.hero.x - _offestX;
                // LayerManager.MAP_LAYER.x -= xx;
                // _offestX = this.hero.x;
                this.refreshMapPos()
            }
            this.judageMapImgX();
            if(!this.juageIfInYBorder()){
                let yy = this.hero.y - _offestY;
                // LayerManager.MAP_LAYER.y -= yy;
                // _offestY = this.hero.y;
                this.refreshMapPos();
            } 
            this.judageMapImgY();
        },onChangeObj:this}).to({x:point.x,y:point.y},time*1000).call(()=>{
            egret.Tween.removeTweens(this.hero);
            this.moveEnd = true;
            if(this._path && this._path.length){
                this.execMove(this._path.shift())
            }else{
                this.hero.changeRoleAction(ActionState.STAND);
                if(this.mapClick){
                    let self = this;
                    self.timeout = setTimeout(function() {
                        clearTimeout(self.timeout);
                        self.mapClick = false;
                    }, 2000);
                }
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

