var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BattleView = (function (_super) {
    __extends(BattleView, _super);
    function BattleView() {
        var _this = _super.call(this) || this;
        _this._singleFrame = 33.3;
        _this._curTime = 0;
        _this.actionExecStandTime = 1000;
        _this._entitys = [];
        _this._ownEntitys = [];
        _this._levelEntitys = [];
        /**当前战斗波数 */
        _this._winCount = 0;
        /**我拥有的将领数据 */
        _this.generalAttrs = [];
        _this.ownGeneralAttrs = [];
        /**当前关卡拥有的将领数据 */
        _this.levelOwnGeneralAttrs = [];
        //列
        _this._col = 5;
        //行
        _this._row = 2;
        _this.walkedboo = false;
        return _this;
    }
    BattleView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._level = param[0].level;
        GameApp.curBattleLevel = this._level;
        this.battleNameLab.text = LevelCfg.levelCfg[this._level - 1].levelName;
        this._state = param[0].state;
        if (param[0].state == 1) {
            this.battleNameLab.text = "剿匪";
        }
        else if (param[0].state == 2) {
            this.battleNameLab.text = "狩猎";
        }
        this.createEntity();
        var bgstr = this._level <= 3 ? "level_map_1_png" : this._level <= 6 ? "level_map_2_png" : "level_map_3_png";
        this.bg.source = bgstr;
        // let skill3:eui.Image = this.skillGroup.getChildByName("100002") as eui.Image;
        // this.guideObj = skill3;
        // this.guideObj.name="100002"
        // let p:egret.Point = this.skillGroup.localToGlobal(skill3.x - 20,skill3.y);
        // if(GameApp.guilding){
        // 	GlobalFun.guideToNext();
        // }
        // if(GameApp.guilding){
        // 	this.returnBtn.visible = false;
        // 	let mc:MovieClip = new MovieClip();
        // 	mc.playFile(`${EFFECT}fingerClick`,-1);
        // 	this.skillGroup.addChild(mc);
        // 	mc.x = skill3.x + (skill3.width>>1);
        // 	mc.y = skill3.y + (skill3.height>>1);
        // 	this.fingerMc = mc;
        // }
        this.skillGroup.x = (StageUtils.inst().getWidth() - this.skillGroup.width) >> 1;
        this.skillGroup.y = StageUtils.inst().getHeight() - this.skillGroup.height;
        this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillTouch, this);
        for (var i = 0; i < this.skillGroup.numChildren; i++) {
            var skillId = parseInt(this.skillGroup.$children[i].name);
            var isOpen = GlobalFun.isOpenSkill(skillId);
            if (!isOpen) {
                GlobalFun.filterToGrey(this.skillGroup.$children[i]);
            }
        }
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        GameApp.battleEnd = false;
        MessageManager.inst().addListener(CustomEvt.GUIDE_USE_SKILL, this.onUseSkill, this);
        // MessageManager.inst().addListener(CustomEvt.BATTLE_RESET,this.initialize,this);
        // MessageManager.inst().addListener(CustomEvt.BATTLE_END,this.onBattleEnd,this);
    };
    BattleView.prototype.onUseSkill = function () {
        this.onSkillTouch({ target: this.guideObj });
        GlobalFun.guideToNext();
    };
    // private onBattleEnd():void{
    // 	for(let key in this.generalAttrs){
    // 		this.generalAttrs[key].curExp += (Math.random()*10)>>0
    // 	}
    // 	egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL,JSON.stringify({attr:this.generalAttrs}));
    // }
    // private initialize():void{
    // 	this.curOwnBatGeneral = null;
    // 	this.curLevelBatGeneral = null;
    // 	this._ownEntitys = [];
    // 	this._levelEntitys = [];
    // 	for(let i:number = 0;i<this._entitys.length;i++){
    // 		if(this._entitys[i] && this._entitys[i].parent){
    // 			this._entitys[i].parent.removeChild(this._entitys[i]);
    // 		}
    // 	}
    // 	this._entitys = []
    // 	this._batCount = 1;
    // 	this.ownGeneralAttrs = [];
    // 	this.levelOwnGeneralAttrs = [];
    // 	this.generalAttrs = [];
    // 	let len:number = this.skillGroup.$children.length;
    // 	for(let j:number = 0;j<len;j++){
    // 		let item:any = this.skillGroup.getChildAt(j);
    // 		if(item && item.name){
    // 			GlobalFun.clearFilters(item);
    // 			item.touchEnabled = true;
    // 		}
    // 	}
    // 	//重置进度的显示
    // 	//、
    // 	this.createEntity();
    // }
    BattleView.prototype.onReturn = function () {
        GameApp.battleEnd = true;
        ViewManager.inst().close(BattleView);
    };
    BattleView.prototype.onSkillTouch = function (evt) {
        if (this.walkedboo) {
            UserTips.inst().showTips("未进入战斗场景");
            return;
        }
        if (GameApp.guilding) {
            if (this.fingerMc && this.fingerMc.parent) {
                this.fingerMc.parent.removeChild(this.fingerMc);
            }
        }
        var namestr = evt.target.name;
        if (namestr) {
            if (!GlobalFun.isOpenSkill(parseInt(namestr))) {
                UserTips.inst().showTips("当前技能未开启");
                return;
            }
            var fontImg_1 = new eui.Image();
            fontImg_1.source = "f_" + namestr + "_png";
            this.addChild(fontImg_1);
            fontImg_1.horizontalCenter = 0;
            fontImg_1.top = 100;
            fontImg_1.alpha = 0;
            fontImg_1.scaleX = fontImg_1.scaleY = 5;
            egret.Tween.get(fontImg_1).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).wait(300).call(function () {
                egret.Tween.removeTweens(fontImg_1);
                if (fontImg_1 && fontImg_1.parent) {
                    fontImg_1.parent.removeChild(fontImg_1);
                }
            }, this);
            GlobalFun.filterToGrey(evt.target);
            evt.target.touchEnabled = false;
            GlobalFun.createSkillEff(1, parseInt(namestr), this, 2, null);
            var levelstr = egret.localStorage.getItem("skill_" + namestr);
            var skillCfg = this.getSkillCfg(parseInt(namestr));
            var damageNum = skillCfg.damage;
            var damage_1 = skillCfg.dmgHp;
            if (levelstr) {
                damageNum = parseInt(levelstr) * damageNum;
                damage_1 = parseInt(levelstr) * damage_1;
            }
            if (this._levelEntitys) {
                var self_1 = this;
                var _loop_1 = function (i) {
                    var timeout = setTimeout(function () {
                        clearTimeout(timeout);
                        if (GameApp.battleEnd) {
                            return;
                        }
                        var index = (Math.random() * self_1._levelEntitys.length) >> 0;
                        var item = self_1._levelEntitys[index];
                        if (item) {
                            item.reduceHp(damage_1);
                            if (item.isDead) {
                                for (var j = 0; j < self_1._entitys.length; j++) {
                                    if (self_1._entitys[j] == item) {
                                        self_1._entitys.splice(j, 1);
                                        break;
                                    }
                                }
                                item.dispose();
                                self_1._levelEntitys.splice(index, 1);
                                if (self_1._levelEntitys.length <= 0) {
                                    egret.Tween.removeAllTweens();
                                    //当前使用技能使敌方全部死亡
                                    //创建下一波敌方矩阵
                                    this.createGeneral(-1);
                                    //走入场景开始战斗
                                    this.walkToScene();
                                }
                            }
                        }
                    }, 100);
                };
                for (var i = 0; i < damageNum; i++) {
                    _loop_1(i);
                }
            }
        }
    };
    BattleView.prototype.getSkillCfg = function (skillId) {
        for (var key in SkillCfg.skillCfg) {
            if (SkillCfg.skillCfg[key].skillId == skillId) {
                return SkillCfg.skillCfg[key];
            }
        }
    };
    BattleView.prototype.createEntity = function () {
        // let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL)
        // if(!levelstr){
        // 	this._level = 1;
        // 	egret.localStorage.setItem(LocalStorageEnum.LEVEL,"1");
        // }else{
        // 	this._level = parseInt(levelstr);
        // }
        var ownGenerals = egret.localStorage.getItem(LocalStorageEnum.OWN_GENERAL);
        this.ownGeneralAttrs = JSON.parse(ownGenerals).attr;
        this.generalAttrs = JSON.parse(ownGenerals).attr;
        this.levelOwnGeneralAttrs = [LevelCfg.levelCfg[this._level - 1]];
        if (this._state == 1) {
            this.levelOwnGeneralAttrs[0].name = "大当家";
        }
        else if (this._state == 2) {
            this.levelOwnGeneralAttrs[0].name = "狼王";
            this.levelOwnGeneralAttrs[0].hp = 5000;
            this.levelOwnGeneralAttrs[0].atk = 500;
        }
        var namtstr = LevelCfg.levelCfg[this._level - 1].general;
        namtstr = "";
        var nameArr = namtstr.split("_");
        //生成附属将领数据
        if (namtstr && namtstr != "") {
            for (var i = 0; i < nameArr.length; i++) {
                var cfg = {
                    name: nameArr[i],
                    hp: this.levelOwnGeneralAttrs[0].hp * 0.8,
                    atk: this.levelOwnGeneralAttrs[0].hp * 0.8,
                    capacity: this.levelOwnGeneralAttrs[0].capacity,
                    type: (Math.random() * 3) >> 0,
                    level: this.levelOwnGeneralAttrs[0].level
                };
                if (this._state == 1) {
                    cfg.name = i == 0 ? "二当家" : "三当家";
                }
                this.levelOwnGeneralAttrs.push(cfg);
            }
        }
        //生成关卡进度头像数据
        for (var i = 0; i < this.levelOwnGeneralAttrs.length; i++) {
            var img = new eui.Image();
            this.levelGeneralGroup.addChild(img);
            img.source = "progress_head_" + i + "_png";
            if (this._state == 1) {
                img.source = "shanzei_" + (i + 1) + "_png";
            }
            else if (this._state == 2) {
                img.source = "boss_png";
            }
            img.width = 50;
            img.height = 58;
            img.x = 20 + i * (img.width + 15);
            img.y = 16;
            img.name = (i + 1).toString();
            var nameLab = new eui.Label();
            this.levelGeneralGroup.addChild(nameLab);
            nameLab.fontFamily = "yt";
            nameLab.textColor = 0xfc3434;
            nameLab.size = 12;
            nameLab.text = this.levelOwnGeneralAttrs[i].name;
            nameLab.x = img.x + (img.width >> 1) - (nameLab.width >> 1);
            nameLab.y = img.y + img.height - nameLab.height - 2;
        }
        this.levelGeneralGroup.width = this.levelOwnGeneralAttrs.length * 50 + 30;
        this.topBg.width = this.levelGeneralGroup.width + 50;
        //创建己方
        this.createGeneral(1);
        //创建敌方
        this.createGeneral(-1);
        this.walkToScene();
        // egret.startTick(this.actionExec,this);
    };
    /**整齐的走入战斗场景 */
    BattleView.prototype.walkToScene = function () {
        var _this = this;
        var offestX = (StageUtils.inst().getWidth() >> 1);
        var index = 0;
        var actionBoo = false;
        for (var i = 0; i < this._ownEntitys.length; i++) {
            var sitem = this._ownEntitys[i];
            var tx = this._ownEntitys[i].x + offestX;
            var ty = this._ownEntitys[i].y;
            sitem.execMoveAction({ x: tx, y: ty }, function () {
                index += 1;
                if (index >= _this._ownEntitys.length) {
                    if (!actionBoo) {
                        actionBoo = true;
                        egret.startTick(_this.actionExec, _this);
                    }
                }
            }, this, false);
        }
        var index2 = 0;
        var offestX2 = (StageUtils.inst().getWidth() >> 1);
        for (var j = 0; j < this._levelEntitys.length; j++) {
            var sitem = this._levelEntitys[j];
            var tx = this._levelEntitys[j].x - offestX2;
            var ty = this._levelEntitys[j].y;
            sitem.execMoveAction({ x: tx, y: ty }, function () {
                index2 += 1;
                if (index2 >= _this._levelEntitys.length) {
                    if (!actionBoo) {
                        actionBoo = true;
                        egret.startTick(_this.actionExec, _this);
                    }
                }
            }, this, false);
        }
    };
    /**重新创建单个将领 */
    BattleView.prototype.createGeneral = function (camp) {
        this._row = 2;
        if (camp == 1) {
            //己方
            var owngen = ObjectPool.pop("SoldierEntity");
            owngen.attrCfg = this.ownGeneralAttrs.shift();
            this.curOwnBatGeneral = owngen;
            owngen.general = true;
            owngen.setSoldierData(1, "own_general", SoldierType.QI);
            this.addChild(owngen);
            owngen.x = -100;
            owngen.y = (StageUtils.inst().getHeight() >> 1);
            this._ownEntitys.push(owngen);
            this._entitys.push(owngen);
            this.createSoldierGroup(1, owngen.attrCfg.level, owngen.attrCfg.type, { x: owngen.x, y: owngen.y }, owngen.attrCfg.curCapacity);
            this.initSolderRect(1);
        }
        else {
            //创建敌方
            var levelGen = ObjectPool.pop("SoldierEntity");
            levelGen.attrCfg = this.levelOwnGeneralAttrs.shift();
            levelGen.general = true;
            var str = "general_1";
            if (this._state == 2) {
                str = "boss";
                levelGen.attrCfg.atk = 500;
                levelGen.attrCfg.hp = 1000000;
            }
            levelGen.setSoldierData(-1, str, SoldierType.SHIELD, this._state);
            this.addChild(levelGen);
            levelGen.x = (StageUtils.inst().getWidth()) + 100;
            levelGen.y = (StageUtils.inst().getHeight() >> 1);
            this._levelEntitys.push(levelGen);
            this._entitys.push(levelGen);
            this.createSoldierGroup(-1, levelGen.attrCfg.level - 1, levelGen.attrCfg.type, { x: levelGen.x, y: levelGen.y });
        }
        this.dealLayerRelation();
    };
    //创建士兵矩阵
    BattleView.prototype.createSoldierGroup = function (camp, level, type, xy, curCapacity) {
        var restr = camp == 1 ? "soldier_" : "enemy_";
        if (camp == 1) {
            //已方 。因为兵的数量不确定 。所以不能矩阵排列
            for (var i = 0; i < curCapacity; i++) {
                var soldier = ObjectPool.pop("SoldierEntity");
                soldier.setSoldierData(camp, "" + restr + type, type);
                this.addChild(soldier);
                this._ownEntitys.push(soldier);
                this._entitys.push(soldier);
            }
        }
        else {
            if (this._state == 2) {
                return;
            }
            this._row += level;
            var offsetx = 50;
            for (var i = 0; i < this._row; i++) {
                for (var j = 0; j < this._col; j++) {
                    var soldier = ObjectPool.pop("SoldierEntity");
                    var soldierstr = "" + restr + type;
                    if (this._state == 1) {
                        soldierstr = "shanzei";
                        type = SoldierType.SHIELD;
                    }
                    soldier.setSoldierData(camp, soldierstr, type);
                    this.addChild(soldier);
                    if (camp == -1) {
                        soldier.x = xy.x + 20 + i * (soldier.w >> 1) + offsetx;
                        soldier.y = xy.y - 100 + j * (soldier.h >> 1);
                        this._levelEntitys.push(soldier);
                    }
                    // else{
                    // 	soldier.x = xy.x -120 - (i+1)*50 - i*(soldier.w >>1) + offsetx;
                    // 	soldier.y = xy.y  + j*(soldier.h>>1);
                    // 	this._ownEntitys.push(soldier);
                    // }
                    // offsetx += (soldier.w >>1);
                    this._entitys.push(soldier);
                }
            }
        }
        // if(camp == -1){
        // this._row -= 1;
        // }
    };
    /**动作执行 */
    BattleView.prototype.actionExec = function (timespan) {
        this._curTime += this._singleFrame;
        if (this._curTime >= this.actionExecStandTime) {
            this._curTime = 0;
            this.action(1);
            this.action(-1);
        }
        return false;
    };
    BattleView.prototype.action = function (camp) {
        var ownEntitys = camp == 1 ? this._ownEntitys : this._levelEntitys;
        var levelEntitys = camp == 1 ? this._levelEntitys : this._ownEntitys;
        for (var i = 0; i < ownEntitys.length; i++) {
            var item = ownEntitys[i];
            if (item.isDead) {
                for (var j = 0; j < this._entitys.length; j++) {
                    if (this._entitys[j] == item) {
                        this._entitys.splice(j, 1);
                        break;
                    }
                }
                item.dispose();
                // if(camp == 1){
                // 	this._ownEntitys.splice(i,1);
                // }else{
                // 	this._levelEntitys.splice(i,1);
                // }
                ownEntitys.splice(i, 1);
                // ownEntitys.splice(i,1);
                i -= 1;
                continue;
            }
            else {
                var index = (Math.random() * levelEntitys.length) >> 0;
                var atkItem = void 0;
                atkItem = this.getNearByEntity(item, levelEntitys);
                if (item.general) {
                    if (levelEntitys[0] && levelEntitys[0].general) {
                        atkItem = levelEntitys[0];
                    }
                }
                item.lookAt(atkItem);
                if (item.isInAtkDis()) {
                    //在攻击距离
                    item.execAtkAction();
                }
                else {
                    if (this.checkFrontBlock(camp, item, ownEntitys)) {
                        var dicObj = this.checkYBlock(item, ownEntitys);
                        if (dicObj.dit) {
                            //存在可以移动的身位
                            var offradom = (Math.random() * 50) >> 0;
                            if (item.y + offradom >= StageUtils.inst().getHeight()) {
                                offradom = StageUtils.inst().getHeight() - 20;
                            }
                            if (item.y - offradom <= 50) {
                                offradom = 50;
                            }
                            var offest = dicObj.dit == 1 ? item.y + offradom : item.y - offradom;
                            item.execYmoveAction(dicObj.dit, offest);
                        }
                        else {
                            //y轴不可以移动 等待状态
                            item.waitMoveAction();
                        }
                    }
                    else {
                        item.execMoveAction();
                    }
                }
            }
        }
        this.dealLayerRelation();
        if (!ownEntitys.length || !levelEntitys.length) {
            egret.stopTick(this.actionExec, this);
            for (var i = 0; i < this._entitys.length; i++) {
                this._entitys[i].execStandAction();
            }
            var timeout_1 = egret.setTimeout(function () {
                egret.clearTimeout(timeout_1);
                if (GameApp.battleEnd) {
                    return;
                }
                ;
                egret.Tween.removeAllTweens();
                //以下改变将领所带的兵种的数量数据
                for (var key in this.generalAttrs) {
                    if (this.generalAttrs[key].insId == this.curOwnBatGeneral.attrCfg.insId) {
                        this.generalAttrs[key].curCapacity = this._ownEntitys.length ? this._ownEntitys[0].general ? this._ownEntitys.length - 1 : this._ownEntitys.length : 0;
                        var remainValue = (this.curOwnBatGeneral.attrCfg.capacity - this.generalAttrs[key].curCapacity);
                        if (remainValue <= 0) {
                            remainValue = 0;
                        }
                        // GameApp.inst()["soldier_"+this.curOwnBatGeneral.attrCfg.type] -= remainValue;
                        break;
                    }
                }
                if (this._ownEntitys.length) {
                    //胜利
                    this._winCount += 1;
                    this.battleWin();
                }
                else {
                    this.battleFail();
                }
            }, this, 600);
        }
    };
    /**当前战斗波次获得胜利 */
    BattleView.prototype.battleWin = function () {
        var _this = this;
        var headImg = this.levelGeneralGroup.getChildByName(this._winCount.toString());
        var failIcon = new eui.Image();
        this.levelGeneralGroup.addChild(failIcon);
        failIcon.source = "battle_fail_icon_png";
        failIcon.x = headImg.x + headImg.width - failIcon.width - 2;
        failIcon.y = 10;
        if (!this.levelOwnGeneralAttrs.length) {
            //关卡战斗胜利
            this.showResult(1);
        }
        else {
            //我方继续前进 。寻找下一波战斗;
            this.walkedboo = true;
            GlobalFun.filterToGrey(this.skillGroup);
            var index_1 = 0;
            for (var i = 0; i < this._ownEntitys.length; i++) {
                var item = this._ownEntitys[i];
                var endP = { x: StageUtils.inst().getWidth() + 70, y: item.y };
                item.execMoveAction(endP, function () {
                    index_1 += 1;
                    if (index_1 >= _this._ownEntitys.length) {
                        _this.walkedboo = false;
                        GlobalFun.clearFilters(_this.skillGroup);
                        //当前已经走完
                        _this.initSolderRect(1);
                        //创建下一波敌方矩阵
                        _this.createGeneral(-1);
                        //走入场景开始战斗
                        _this.walkToScene();
                    }
                }, this);
            }
        }
    };
    /**当前战斗波次获得失败 */
    BattleView.prototype.battleFail = function () {
        var _this = this;
        if (!this.ownGeneralAttrs.length) {
            //关卡战斗失败
            this.showResult(0);
        }
        else {
            var index_2 = 0;
            GlobalFun.filterToGrey(this.skillGroup);
            this.walkedboo = true;
            for (var i = 0; i < this._levelEntitys.length; i++) {
                var item = this._levelEntitys[i];
                var endP = { x: -70, y: item.y };
                item.execMoveAction(endP, function () {
                    index_2 += 1;
                    if (index_2 >= _this._levelEntitys.length) {
                        _this.walkedboo = false;
                        GlobalFun.clearFilters(_this.skillGroup);
                        //敌方阵营走完
                        _this.initSolderRect(-1);
                        //创建下一波我方矩阵
                        _this.createGeneral(1);
                        //走入场景开始战斗
                        _this.walkToScene();
                    }
                }, this);
            }
        }
    };
    /**初始化胜利一方当前的方阵 */
    BattleView.prototype.initSolderRect = function (camp) {
        var x = -100;
        var y = (StageUtils.inst().getHeight() >> 1);
        var entitys = camp == 1 ? this._ownEntitys : this._levelEntitys;
        if (camp == -1) {
            x = StageUtils.inst().getWidth() + 100;
            y = (StageUtils.inst().getHeight() >> 1);
        }
        var row = Math.ceil(entitys.length / this._col);
        if (entitys[0].general) {
            //当前是将领
            row = Math.ceil((entitys.length - 1) / this._col);
            entitys[0].x = x;
            entitys[0].y = y;
            // x-=120;
        }
        if (row <= 1) {
            var offestx = 30;
            for (var k = 0; k < entitys.length; k++) {
                if (entitys[k].general) {
                    continue;
                }
                var soldier = entitys[k];
                if (camp == 1) {
                    soldier.x = x - 100 + offestx;
                    soldier.y = y - 100 + k * (soldier.h >> 1);
                }
                else {
                    soldier.x = x + 100 + offestx;
                    soldier.y = y - 100 + k * (soldier.h >> 1);
                }
                // offestx += (soldier.w >>1);
            }
        }
        else {
            var offestx = 30;
            for (var k = 0; k < row; k++) {
                for (var j = 0; j < this._col; j++) {
                    var index = k * this._col + j + 1;
                    if (!entitys[0].general) {
                        index -= 1;
                    }
                    var soldier = entitys[index];
                    if (soldier) {
                        if (camp == 1) {
                            soldier.x = x - (k + 1) * 150 + k * (soldier.w >> 1) + offestx;
                            soldier.y = y - 100 + j * (soldier.h >> 1);
                        }
                        else {
                            soldier.x = x + (k + 1) * 150 + k * (soldier.w >> 1) + offestx;
                            soldier.y = y - 100 + j * (soldier.h >> 1);
                        }
                        // offestx += (soldier.w >>1);
                    }
                }
            }
        }
    };
    /**显示结果界面 1成功0失败*/
    BattleView.prototype.showResult = function (flag) {
        GameApp.battleEnd = true;
        var exp = LevelCfg.levelCfg[this._level - 1].exp;
        for (var i = 0; i < this.generalAttrs.length; i++) {
            if (this.generalAttrs[i].level >= 10) {
                continue;
            }
            this.generalAttrs[i].curExp += exp;
            if (this.generalAttrs[i].curExp >= this.generalAttrs[i].exp) {
                this.generalAttrs[i].curExp = this.generalAttrs[i].curExp - this.generalAttrs[i].exp;
                this.generalAttrs[i].exp += 20;
                this.generalAttrs[i].level += 1;
                this.generalAttrs[i].capacity += 5;
                if (i == 0) {
                    MessageManager.inst().dispatch(CustomEvt.UPGRADE, { level: this.generalAttrs[i].level });
                }
            }
        }
        var data = [];
        var awardRole = false;
        var icon = "";
        var name = "";
        if (flag == 1) {
            var passChapterStr = egret.localStorage.getItem(LocalStorageEnum.PASS_CHAPTER);
            var passChapterArr = [];
            if (passChapterStr) {
                passChapterArr = passChapterStr.split("_");
            }
            if (passChapterArr.indexOf(this._level.toString()) == -1) {
                var index = (Math.random() * 100) >> 0;
                var percent = this._level == 1 ? 0 : 96;
                if (index >= percent) {
                    //获得了武将
                    var insId = LevelCfg.levelCfg[this._level - 1].insId;
                    if (!this.isExistGeneral(insId)) {
                        awardRole = true;
                        var generalData = this.getOtherGeneralData(insId);
                        icon = "progress_head_" + generalData.index + "_png";
                        // GameApp.inst()["soldier_"+generalData.type] += 10;
                        name = generalData.name;
                        this.generalAttrs.push(generalData);
                    }
                }
                var level = parseInt(egret.localStorage.getItem(LocalStorageEnum.LEVEL));
                if (level == this._level) {
                    var nextLevel = (level + 1) >= 10 ? level : (level + 1);
                    egret.localStorage.setItem(LocalStorageEnum.LEVEL, nextLevel.toString());
                }
                passChapterStr = passChapterStr ? passChapterStr + "_" + this._level : this._level.toString();
                egret.localStorage.setItem(LocalStorageEnum.PASS_CHAPTER, passChapterStr);
            }
        }
        egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL, JSON.stringify({ attr: this.generalAttrs }));
        ViewManager.inst().open(ResultPopUp, [{ state: flag, awardRole: awardRole, icon: icon, name: name, level: this._level, exp: exp }]);
    };
    /**获取关卡得到的武将数据 */
    BattleView.prototype.getOtherGeneralData = function (insId) {
        var otherGeneralstr = egret.localStorage.getItem(LocalStorageEnum.OTHER_GENERAL);
        var otherGeneralArr = JSON.parse(otherGeneralstr);
        for (var key in otherGeneralArr) {
            if (otherGeneralArr[key].insId == insId) {
                return otherGeneralArr[key];
            }
        }
    };
    /**判断是否已经存在了奖励的武将 */
    BattleView.prototype.isExistGeneral = function (insid) {
        var ownGeneralstr = egret.localStorage.getItem(LocalStorageEnum.OWN_GENERAL);
        var ownGeneralArr = JSON.parse(ownGeneralstr).attr;
        for (var key in ownGeneralArr) {
            if (ownGeneralArr[key].insId == insid) {
                return true;
            }
        }
        return false;
    };
    /**检测y轴是否有阻挡 */
    BattleView.prototype.checkYBlock = function (item, entitys) {
        var obj = { dit: null };
        var y = item.y;
        for (var i = 0; i < entitys.length; i++) {
            var otherItem = entitys[i];
            if (item != otherItem) {
                var oy = otherItem.y;
                if (Math.abs(oy - y) >= 15) {
                    obj.dit = oy > y ? 1 : -1;
                    break;
                }
            }
        }
        return obj;
    };
    /**检测当前单位前方是否有阻挡 */
    BattleView.prototype.checkFrontBlock = function (camp, item, entitys) {
        var boo = false;
        var x = item.x;
        var y = item.y;
        // for(let i:number = 0;i<entitys.length;i++){
        // 	let otherItem:SoldierEntity = entitys[i];
        // 	if(item != otherItem){
        // 		let ox:number = otherItem.x ;
        // 		let oy:number = otherItem.y;
        // 		let dis:number = (item.w>>1) + (otherItem.w>>1) - 70;
        // 		let disy:number = (item.h>>1) + (otherItem.h>>1) - 70;
        // 		if(camp == 1){
        // 			if(ox > x && (ox - x)<= dis && (oy > y && (oy- y)<= disy)){
        // 				boo = true;
        // 				break;
        // 			}
        // 		}else{
        // 			if(ox < x && (x-ox) <= dis && (oy > y && (oy- y)<= disy)){
        // 				boo = true;
        // 				break;
        // 			}
        // 		}
        // 	}
        // }
        return boo;
    };
    /**获取最近攻击单位 */
    BattleView.prototype.getNearByEntity = function (atkEntity, soldiers) {
        var minEntity = soldiers.length > 1 ? soldiers[1] : soldiers[0]; //避免士兵第一个选择就是武将
        if (minEntity) {
            var dis = Math.sqrt(Math.pow(minEntity.x - atkEntity.x, 2) + Math.pow(minEntity.y - atkEntity.y, 2));
            var len = soldiers.length;
            if (len >= 15) {
                len = 15;
            }
            var index = (Math.random() * len) >> 0;
            minEntity = soldiers[index];
            // for(let i:number = 0;i<soldiers.length;i++){
            // 	if(atkEntity.general){
            // 		if(soldiers[i].general){
            // 			minEntity = soldiers[i];
            // 			break;
            // 		}
            // 	}
            // 	if(soldiers[i].general){
            // 		continue;
            // 	}
            // 	let item1:SoldierEntity = soldiers[i];
            // 	let dis2:number = Math.sqrt(Math.pow(item1.x - atkEntity.x,2)+Math.pow(item1.y -atkEntity.y,2));
            // 	if(dis2 <= dis){
            // 		minEntity = item1;
            // 		dis = dis2;
            // 	}
            // }
        }
        return minEntity;
    };
    /**处理层级显示关系 */
    BattleView.prototype.dealLayerRelation = function () {
        this._entitys.sort(this.sortFun);
        for (var i = 0; i < this._entitys.length; i++) {
            this.setChildIndex(this._entitys[i], 3 + i);
        }
    };
    BattleView.prototype.sortFun = function (param1, param2) {
        var s1y = param1.y;
        var s2y = param2.y;
        if (s1y > s2y) {
            return 1;
        }
        else if (s1y < s2y) {
            return -1;
        }
        else {
            return 0;
        }
    };
    BattleView.prototype.close = function () {
        this.skillGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkillTouch, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_USE_SKILL, this.onUseSkill, this);
        egret.stopTick(this.actionExec, this);
        // MessageManager.inst().removeListener(CustomEvt.BATTLE_RESET,this.initialize,this);
        // MessageManager.inst().removeListener(CustomEvt.BATTLE_END,this.onBattleEnd,this);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.curOwnBatGeneral = null;
        this.curLevelBatGeneral = null;
        this._ownEntitys = [];
        this._levelEntitys = [];
        for (var i = 0; i < this._entitys.length; i++) {
            if (this._entitys[i] && this._entitys[i].parent) {
                this._entitys[i].parent.removeChild(this._entitys[i]);
            }
        }
        this._entitys = [];
        this._winCount = 0;
        this.ownGeneralAttrs = [];
        this.levelOwnGeneralAttrs = [];
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
ViewManager.inst().reg(BattleView, LayerManager.UI_Main);
//# sourceMappingURL=BattleView.js.map