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
    public monsters:any[]= [];
    public roles:any[] = [];

    private monsterCreateTime:number = 30000;
    private createInterval;
    private createInterval2;
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

        for(let i:number = 0;i<this.downTimes.length;i++){
            clearTimeout(this.downTimes[i]);
        }
        this.downTimes = [];
        for(let i:number = 0;i<this.uptimes.length;i++){
            clearTimeout(this.uptimes[i]);
        }
        this.uptimes = [];

        for(let i:number = 0;i<this.downTimes2.length;i++){
            clearTimeout(this.downTimes2[i]);
        }
        this.downTimes2 = [];
        // if(this._mapImage && this._mapImage.parent){
        //     this._mapImage.parent.removeChild(this._mapImage);
        //     this._mapImage = null;
        // }
        // this._itemLayer.removeChildren();
        // this.initia = false;
        if(this.hero && this.hero.parent){
            this.hero.parent.removeChild(this.hero);
        }
        // LayerManager.MAP_LAYER.removeChildren();
        this._path = [];
        this.mapClick = false;
        this.moveEnd = true;
        if(this.timeout){
            clearTimeout(this.timeout);
        }

        if(this.createInterval){
            clearInterval(this.createInterval);
        }
        if(this.createInterval2){
            clearInterval(this.createInterval2);
        }
        // LayerManager.MAP_LAYER.x = 0;
        // LayerManager.MAP_LAYER.y = 0;
    }
    /**
     * 地图初始化
     * drawGrid 是否绘制测试格子
     */
    public initMap(drawGrid?:boolean): void {
        if(!this.initia){
            this.initia = true;
            this._mapImage = new MapViewBg();
            LayerManager.MAP_LAYER.addChild(this._mapImage);

            this._itemLayer = new egret.DisplayObjectContainer();
            LayerManager.MAP_LAYER.addChild(this._itemLayer);
        }
       
        
        if(drawGrid){this.drawTestGrid()}
        
        this.initMainRole();

        this.initBuilding();
        
        //------------------
    }
    public loopInitLevelMonster():void{
        this.initLevelMonster();
        
        let self = this;
        this.createInterval = setInterval(()=>{
            self.initLevelMonster();
        },this.monsterCreateTime)
    }
    public loopInitOwnSoldier():void{
        this.initOwnSoldier();
        let self = this;
        this.createInterval2 = setInterval(()=>{
            self.initOwnSoldier();
        },this.monsterCreateTime)
    }
    /**初始化主角色 */
    public initMainRole():void{
        let birthGrids:{row:number,col:number} = GameMap.roleBirthGrid[0];
        // let index:number = (Math.random()*birthGrids.length)>>0;
        let birthXY:{row:number,col:number} = birthGrids;
        let xy:XY = GameMap.grid2Point(birthXY.col,birthXY.row);

        let mainrolemc:MovieClip = new MovieClip();
        LayerManager.MAP_LAYER.addChildAt(mainrolemc,1);
        mainrolemc.x = xy.x;
        mainrolemc.y = xy.y;
        mainrolemc.playFile(`${EFFECT}rebirth`,-1,null,true);

        let hero:SoldierEntity = new SoldierEntity();
        let vo:RoleVo = {level:GameApp.level,atkDis:500,viewdis:500,spd:50,atk:100 + ((Math.random()*100)>>0) + GameApp.level*50,hp:3000+GameApp.level*200,mp:1000}
        hero.general = true;
        this.hero = hero;
        hero.soldierAttr = vo;
        hero.alpha = 0
        hero.setSoldierData(1,"general");
        hero.updateEquip();
        LayerManager.MAP_LAYER.addChild(hero);
        this.roles.unshift(hero);
        egret.Tween.get(mainrolemc).to({alpha:0},1000).call(()=>{
            egret.Tween.removeTweens(mainrolemc);
            mainrolemc.parent.removeChild(mainrolemc)
        },this)
        egret.Tween.get(hero).to({alpha:1},1000).call(()=>{
            egret.Tween.removeTweens(hero);
            this.startRoleClickMove();
        },this)
        hero.x = xy.x;
        hero.y = xy.y;
        // let stageP:egret.Point = hero.parent.localToGlobal(hero.x,hero.y);
        MessageManager.inst().dispatch("syncRolepos",{x:hero.x,y:hero.y});
        this.refreshMapPos();
        
    }
    /**销毁主人物功能 */
    public destoryMainRole():void{
        this.hero = null;
       
        LayerManager.MAP_LAYER.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMapTouch,this);
    }
    private downTimes:any[] = [];
    private uptimes:any[] = [];
    /**初始化 关卡怪物 */
    public initLevelMonster():void{
      
    //    GameApp.monsterRes = bodyres;
       let num:number = 6;
       let self = this;
       let upBuild:BuildingEntity;
       let downBuild:BuildingEntity;
       for(let i:number = 0;i<this.monsters.length;i++){
           if(this.monsters[i] instanceof BuildingEntity){
               if(this.monsters[i].pos == 0){
                   upBuild = this.monsters[i];
               }else if(this.monsters[i].pos == 1){
                   downBuild = this.monsters[i];
               }
           }
       }
       if(!upBuild && !downBuild && this.createInterval){
           clearInterval(this.createInterval);
       }
       this.uptimes = [];
       if(upBuild){
           
           for(let i:number = 0;i<num;i++){
                let timeout = setTimeout(function() {
                    clearTimeout(timeout)
                    if(!upBuild){
                        if(self.createInterval){clearInterval(self.createInterval)}
                        return;
                    }
                    let index:number = self.uptimes.indexOf(timeout);
                    if(index != -1){
                        self.uptimes.splice(index,1);
                    }
                    self.initBoss(i<=4?10002:10006,0,i<=4?"enemy":"enemy_car");
                }, i*2000);
                this.uptimes.push(timeout);
            }
       }else{
           for(let i:number = 0;i<this.uptimes.length;i++){
               clearTimeout(this.uptimes[i]);
           }
           this.uptimes = [];
       }
       this.downTimes = [];
       if(downBuild){
           for(let i:number = 0;i<num;i++){
                let timeout = setTimeout(function() {
                    clearTimeout(timeout);
                    if(!downBuild){
                        if(self.createInterval){clearInterval(self.createInterval)}
                        return;
                    }
                    let index:number = self.downTimes.indexOf(timeout);
                    if(index != -1){
                        self.downTimes.splice(index,1);
                    }
                    self.initBoss(i<=4?10002:10006,1,i<=4?"enemy":"enemy_car");
                }, i*2000);
                this.downTimes.push(timeout);
            }
       }else{
           for(let i:number = 0;i<this.downTimes.length;i++){
               clearTimeout(this.downTimes[i]);
           }
           this.downTimes = [];
       }       
       
    }
    private downTimes2:any[] = [];
    /**初始化我方士兵 */
    private initOwnSoldier():void{
        let num:number = 6;
        let self = this;
        let mainBuild:BuildingEntity;
        for(let i:number = 0;i<this.roles.length;i++){
            if(this.roles[i] instanceof BuildingEntity){
                if(this.roles[i].type == 1){
                    mainBuild = this.roles[i];
                    break;
                }
            }
        }
        if(!mainBuild){
            clearInterval(this.createInterval2);
        }
        this.downTimes2 = [];
       
        if(mainBuild){
            for(let j:number = 0;j<2;j++){
                for(let i:number = 0;i<num;i++){
                    let timeout = setTimeout(function() {
                        clearTimeout(timeout);
                        let index:number = self.downTimes2.indexOf(timeout);
                        if(index != -1){
                            self.downTimes2.splice(index,1);
                        }
                        self.initBoss(i<=4?10002:10006,j,i<=4?"owner":"owner_car",1);
                    }, i*2000);
                    this.downTimes2.push(timeout);
                }
            }
            
        }else{
            for(let i:number = 0;i<this.downTimes2.length;i++){
                clearTimeout(this.downTimes2[i]);
            }
            this.downTimes2 = [];
        }
    }
    /**初始化建筑 */
    private initBuilding():void{
        //初始化怪物建筑
        let buildRes:string[] = ["enemy_tower_png","enemy_tower_png","enemy_city_png","enemy_city_png"];
        let enemyPos:XY[] = [{x:24,y:5},{x:27,y:18},{x:35,y:8},{x:39,y:18}]

        let ownBuildRes:string[] = ["own_tower_png","own_tower_png","own_city_png"];
        let ownPos:XY[] = [{x:10,y:7},{x:6,y:20},{x:6,y:11}]
        for(let i:number = 0;i<2;i++){
            //0是主动攻击的塔 1是兵营城池不会主动攻击
            for(let j:number = 0;j<2;j++){
                let buildEntity:BuildingEntity = new BuildingEntity();
                LayerManager.MAP_LAYER.addChild(buildEntity);
                this.monsters.push(buildEntity);
                let vo:RoleVo = {type:j,level:GameApp.chapterLevel,atkDis:300,spd:0,atk:GameApp.chapterLevel*120 + ((Math.random()*20)>>0),hp:GameApp.chapterLevel*6000,viewdis:300};
                if(i == 1){
                    //0是上边的兵营 。1是下边的兵营
                    buildEntity.pos = j
                }
                buildEntity.setSoldierData(-1,buildRes.shift(),vo);
                let grid:XY = enemyPos.shift();
                let pointXY:XY = GameMap.grid2Point(grid.x,grid.y);
                buildEntity.anchorOffsetX = buildEntity.width>>1;
                buildEntity.anchorOffsetY = buildEntity.height>>1;
                buildEntity.x = pointXY.x;
                buildEntity.y = pointXY.y;
                let area:XY[] = buildEntity.area
                for(let i:number = 0;i<area.length;i++){
                    let xy:XY = area[i]
                    GameMap.AstarNode.setWalkable(xy.x,xy.y,false);
                }
            }
        }

        for(let j:number = 0;j<3;j++){
            let buildEntity:BuildingEntity = new BuildingEntity();
            LayerManager.MAP_LAYER.addChild(buildEntity);
            this.roles.push(buildEntity);
            let typeindex:number = j >= 2?1:0;
            let vo:RoleVo = {type:typeindex,level:GameApp.level,atkDis:300,spd:0,atk:GameApp.level*120 + ((Math.random()*20)>>0),hp:GameApp.level*4000,viewdis:300};
            buildEntity.setSoldierData(1,ownBuildRes.shift(),vo,null,0.8);
            let grid:XY = ownPos.shift();
            let pointXY:XY = GameMap.grid2Point(grid.x,grid.y);
            buildEntity.x = pointXY.x;
            buildEntity.y = j >= 2?pointXY.y + 30:pointXY.y - 50;
            buildEntity.anchorOffsetX = buildEntity.width>>1;
            buildEntity.anchorOffsetY = buildEntity.height>>1;
            if(j>=2){
                buildEntity.x = pointXY.x + 50;
                buildEntity.anchorOffsetX = buildEntity.width;
            }
            let area:XY[] = buildEntity.area
            for(let i:number = 0;i<area.length;i++){
                let xy:XY = area[i]
                GameMap.AstarNode.setWalkable(xy.x,xy.y,false);
            }
         }
        
    }
    // public initBossMon():void{
    //      this.initBoss("boss");
    // }
    /**移除item
     * 
     * @item 移除的monster
     * @leveladd 是否在移除后 一段时间后 添加一个
     */
    public refreshMonItem(item:MonsterEntity|BuildingEntity,leveladd:boolean = false):void{
        for(let i:number = 0;i<this.monsters.length;i++){
            if(this.monsters[i] == item){
                this.monsters.splice(i,1);
                break;
            }
        }
    }
    /**移除召唤 */
    public refreshRoleItem(item:any):void{
        for(let i:number = 0;i<this.roles.length;i++){
            if(this.roles[i] == item){
                this.roles.splice(i,1);
                break;
            }
        }
    }
    private isChangeRoute():XY{
        let xy:XY;
        //城池
        let upBuild:BuildingEntity;
        let downBuild:BuildingEntity;
        //箭塔
        let upArrow:BuildingEntity;
        let downArrow:BuildingEntity;
        for(let i:number = 0;i<this.monsters.length;i++){
            if(this.monsters[i] instanceof BuildingEntity){
                if(this.monsters[i].pos == 0){
                    upBuild = this.monsters[i];
                }else if(this.monsters[i].pos == 1){
                    downBuild = this.monsters[i];
                }

                if(this.monsters[i].type == 0 && (isNaN(this.monsters[i].pos))){
                    upArrow = this.monsters[i];
                }else if(this.monsters[i].type == 1 && (isNaN(this.monsters[i].pos))){
                    downArrow = this.monsters[i];
                }
            }
        }
        if(!upBuild && !upArrow){
            //改为下面的目标
            xy = {x:37,y:20};
        }
        if(!downBuild && !downArrow){
            //改为上面的目标
            xy = {x:31,y:8}
        }

        return xy;
    }
    /**刷新我方单位的对地方塔楼的目标点 */
    public changeRoleTower():void{
        let xy:XY = this.isChangeRoute();
        if(xy){
            for(let i:number = 0;i<this.roles.length;i++){
                if(this.roles[i] instanceof MonsterEntity){
                    //当前是我的士兵；
                    
                    (this.roles[i] as MonsterEntity).towerPoint = xy;
                    (this.roles[i] as MonsterEntity).route = [];
                }
            }
        }
    }
    /**初始化boss关卡 */
    private initBoss(id:number,gindex:number,_res:string,camp:number = -1):void{
        if(GameApp.gameEnd){return}
	    let res = _res;
        let boss:MonsterEntity = new MonsterEntity();;
        let vo:RoleVo;
        if(camp == -1){
            vo = {level:1,viewdis:150,atkDis:100,spd:50,atk:GameApp.chapterLevel*120 + ((Math.random()*30)>>0),hp:GameApp.chapterLevel*600}
            if(id == 10006){vo.viewdis = 150,vo.atkDis = 100,vo.atk=GameApp.chapterLevel*260 + ((Math.random()*30)>>0),vo.hp = GameApp.chapterLevel*1200}
        }else{
            vo = {level:1,viewdis:150,atkDis:150,spd:50,atk:80 + ((Math.random()*30)>>0),hp:300}
            if(id == 10006){vo.viewdis = 150,vo.atkDis = 150,vo.atk=120 + ((Math.random()*30)>>0),vo.hp = 800}
        }
        // boss.type = id;
        LayerManager.MAP_LAYER.addChild(boss);
        boss.setSoldierData(camp,res,vo,null);
        if(camp == -1){
            let birthGrids:{row:number,col:number}[] = GameMap.monsterGrid;
            let birthXY:{row:number,col:number} = birthGrids[gindex];
            let xy:XY = GameMap.grid2Point(birthXY.col,birthXY.row);
            boss.x = xy.x;
            boss.y = xy.y;
            MessageManager.inst().dispatch("syncMonpos",{x:xy.x,y:xy.y,inst:boss.hashCode,oper:2,camp:camp});
        }else{
            boss.soldierAttr = vo;
            
            let xy:XY = gindex == 0?{x:7,y:10}:{x:5,y:15};
            let point:XY = GameMap.grid2Point(xy.x,xy.y);
            boss.x = point.x;
            boss.y = point.y;
            boss.towerPoint = gindex == 0?{x:31,y:8}:{x:37,y:20};
            let newxy:XY = this.isChangeRoute();
            if(newxy){
                boss.towerPoint = newxy;
            }
            MessageManager.inst().dispatch("syncMonpos",{x:point.x,y:point.y,inst:boss.hashCode,oper:2,camp:camp});
        }
        // boss.gx = birthXY.col;
        // boss.gy = birthXY.row;
        if(camp == -1){
             this.monsters.push(boss);
        }else{
             this.roles.push(boss);
        }
       
        // GameMap.AstarNode.setWalkable(birthXY.col,birthXY.row,false);
    }
    /**刷新地图位置 */
    public refreshMapPos(xy?:XY):void{
        let xx:number;
        let yy:number;
        if(!xy){
            xx = this.hero.x;
            yy = this.hero.y;
        }else{
            xx = xy.x;
            yy = xy.y;
        }
        LayerManager.MAP_LAYER.x = - xx + (StageUtils.inst().getWidth()>>1); 
        LayerManager.MAP_LAYER.y = - yy + (StageUtils.inst().getHeight()>>1);
        this.judageMapImgX();
        this.judageMapImgY();
    }
    /**
     * 开启人物点击地图层移动操作
     * param：roleEntity 需要点击操作的主人物实体对象
     */
    public startRoleClickMove():void{
        // this.hero = roleEntity;
       
        LayerManager.MAP_LAYER.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMapTouch,this);
    }
    private _path:any[];
    public mapClick:boolean = false;
    private timeout;
    /**地图点击操作 */
    private onMapTouch(evt:egret.TouchEvent):void{
         if((evt.target instanceof MonsterEntity && evt.target.camp == -1) || (evt.target instanceof BuildingEntity && evt.target.camp == -1)){
             /**切换选中目标 */
             let mainRole:SoldierEntity = this.roles[0];
             if(mainRole && mainRole.general){
                 if(mainRole.atkTar && mainRole.atkTar){
                    mainRole.atkTar.hideSelect();
                 }
                 mainRole.unLookAt();
                 mainRole.lookAt(evt.target);
                 let dis:number = egret.Point.distance(new egret.Point(mainRole.x,mainRole.y),new egret.Point(evt.target.x,evt.target.y));
                 if(dis > mainRole.soldierAttr.atkDis){
                     UserTips.inst().showTips("距离目标太远")
                 }
                 evt.target.showSelect();
                 return;
             }
         }
         let pxy:egret.Point = LayerManager.MAP_LAYER.globalToLocal(evt.stageX,evt.stageY);
         
         if(this.timeout){clearTimeout(this.timeout),this.timeout = null}
         this.execMoveAction(pxy,true)
    }
    public execMoveAction(pxy:XY,effect?:boolean):void{
        let gxy:XY = GameMap.point2Grid(pxy.x,pxy.y);
        let _path = this.findPath(this.hero.x,this.hero.y,gxy.x,gxy.y);
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
            MessageManager.inst().dispatch("syncRolepos",{x:point.x,y:point.y});
            egret.Tween.removeTweens(this.hero);
            this.moveEnd = true;
            if(this._path && this._path.length){
                this.execMove(this._path.shift())
            }else{
                this.hero.changeRoleAction(ActionState.STAND);
                if(this.mapClick){
                    let self = this;
                    self.mapClick = false;
                    // self.timeout = setTimeout(function() {
                    //     clearTimeout(self.timeout);
                    //     self.mapClick = false;
                    // }, 1000);
                }
            }
        })
    }
    /**找寻路径 */
    public findPath(sx:number,sy:number,ex:number,ey:number):any[]{
		GameMap.AstarNode.setEndNode(ex,ey);

		let pxy:XY = GameMap.point2Grid(sx ,sy);
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
                let rect: egret.Shape = new egret.Shape();
                rect.graphics.clear();
                rect.graphics.lineStyle(0.1);
                
                if (!GameMap.walkable(i, j)){
                    rect.graphics.beginFill(0xff0000, 0.3);
                }else{
                    rect.graphics.beginFill(0xffffff,0.3);
                }
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
        LayerManager.MAP_LAYER.addChild(this._shapeContainer);
    }
}