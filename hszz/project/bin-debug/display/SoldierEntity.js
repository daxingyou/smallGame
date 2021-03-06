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
var SoldierEntity = (function (_super) {
    __extends(SoldierEntity, _super);
    function SoldierEntity() {
        var _this = _super.call(this) || this;
        //移动速度 s为单位 。 v*t = d 
        _this.curState = ActionState.STAND;
        _this.ObjectPoolKey = "SoldierEntity";
        _this.general = false;
        _this.camp = 1;
        _this.atkState = false;
        _this.isInAtk = false;
        //克制攻击力
        _this.restriceAtk = 0;
        return _this;
    }
    ;
    SoldierEntity.prototype.initialize = function () {
    };
    SoldierEntity.prototype.setSoldierData = function (camp, res, id) {
        this._camp = camp;
        this.camp = camp;
        this.soldierAttr = GlobalFun.getCardDataFromId(id);
        this.scaleX = this.scaleY = 0.7;
        // if(res == "shanzei"){
        // 	this.scaleX = this.scaleY = 0.8;
        // }
        if (this.general) {
            //当前是将领 基础属性增加
            this.soldierAttr.hp = this.soldierAttr.hp;
            this.soldierAttr.atk = this.soldierAttr.atk;
        }
        this._typeId = id;
        // if(this._typeId == SoldierType.QI && !this.general){
        // 	this.scaleX = this.scaleY = 0.5;
        // }
        // if(_state == 2){
        // 	//打bioss
        // 	this.scaleX = this.scaleY = 1;
        // }
        this.hp = this.thp = this.soldierAttr.hp;
        // this.w = this.soldierAttr.w;
        // this.h = this.soldierAttr.h;
        this._direc = this._camp == 1 ? 1 : -1;
        this._res = "" + EFFECT + res + "_" + this.curState;
        // if(_state == 2){
        // 	//打boss
        // 	this._res = `${EFFECT}${res}`
        // }
        this._mc = new MovieClip();
        // let scale:number = 0.7
        // if(id == SoldierType.SOLDIER_QI){
        // 	scale = 0.5;
        // }
        // let scale = id == SoldierType.SOLDIER_QI?0.5:0.7;
        // if(id ==-1){scale =1}
        // this.scaleX = this._mc.scaleY = scale;
        // if(id != -1){
        // 	this.scaleX *=this._direc;
        // }
        this.addChild(this._mc);
        this._mc.playFile(this._res, -1, null, false, this._dic.toString());
        this.progressGroup = new eui.Group();
        this.progressGroup.width = 80;
        // this.progressGroup.scaleX = this.progressGroup.scaleY = 0.6;
        this.addChild(this.progressGroup);
        this.progressGroup.x = -40;
        this.progressGroup.y = -110;
        // let hpBg:eui.Image = new eui.Image();
        // hpBg.source = "hp_progress_bg_png";
        // this.progressGroup.addChild(hpBg);
        // if(this.general){
        // 	this.progressGroup.y =-150;
        // 	this.progressGroup.x = -10;
        // }else{
        // 	this.progressGroup.visible = false;
        // }
        // if(this.general){
        // let nametxt:eui.Label = new eui.Label;
        // this.progressGroup.addChild(nametxt);
        // nametxt.textColor = this.camp == 1?0xf7f7f7:0xfc3434;
        // nametxt.fontFamily = "yt";
        // nametxt.size = 12;
        // nametxt.text = this.attrCfg.name;
        // nametxt.left = 70;
        // nametxt.top = 6;
        var levelLab = new eui.Label();
        this.progressGroup.addChild(levelLab);
        levelLab.fontFamily = "yt";
        levelLab.size = 20;
        levelLab.text = this.soldierAttr.level.toString() + "级";
        levelLab.horizontalCenter = 0;
        levelLab.top = -23;
        // }
        var barRes = camp == 1 ? 0x00ff00 : 0xfc3434;
        var barimg = new egret.Shape();
        barimg.graphics.beginFill(barRes, 1);
        barimg.graphics.drawRect(0, 0, 80, 10);
        barimg.graphics.endFill();
        this._barimg = barimg;
        this.progressGroup.addChild(barimg);
        // this.soldierCampImg = new eui.Image();
        // this.progressGroup.addChild(this.soldierCampImg);
        // this.soldierCampImg.source = `type_${this._typeId}_png`;
        // this.soldierCampImg.left = 40;
        // this.soldierCampImg.top = 3;
        //测试代码
        // if(camp != 1 && this.general){
        // 	this.progressGroup.x = 0;
        // }
        //------
        this._watcher = eui.Binding.bindHandler(this, ["_hp"], this.onHpChange, this);
    };
    SoldierEntity.prototype.onHpChange = function (value) {
        if (!isNaN(value)) {
            var percent = value / this._thp;
            if (this._barimg) {
                this._barimg.graphics.clear();
                var barRes = this.camp == 1 ? 0x00ff00 : 0xfc3434;
                this._barimg.graphics.beginFill(barRes, 1);
                this._barimg.graphics.drawRect(0, 0, percent * 80, 10);
                this._barimg.graphics.endFill();
            }
        }
    };
    /**执行攻击动作 */
    SoldierEntity.prototype.execAtkAction = function () {
        // if(GameApp.battleState == false){return}
        if (this.isInAtkDis() || this.isInAtk) {
            if (this.curState != ActionState.ATTACK) {
                this.curState = ActionState.ATTACK;
                egret.Tween.removeTweens(this);
                if (this._atkTar && !this._atkTar.isDead) {
                    var angle = Math.atan2(this._atkTar.y - this.y, this._atkTar.x - this.x) * 180 / Math.PI;
                    this.calculEntityDic(angle);
                }
                this._res = "" + EFFECT + this.soldierAttr.model + "_" + this.curState;
                this._mc.playFile(this._res, 1, null, false, this._dic.toString());
                this.atkState = true;
                var self_1 = this;
                var timeout_1 = setTimeout(function () {
                    clearTimeout(timeout_1);
                    if (self_1 && self_1._mc) {
                        self_1.curState = ActionState.STAND;
                        self_1._res = "" + EFFECT + self_1.soldierAttr.model + "_" + self_1.curState;
                        self_1._mc.playFile(self_1._res, -1, null, false, self_1._dic.toString());
                    }
                    if (self_1 && self_1._atkTar) {
                        var index = (Math.random() * 15 + 5) >> 0;
                        var direct = ((Math.random() * 100) >> 0) >= 50 ? -1 : 1;
                        var atk = self_1.soldierAttr.atk - self_1.restriceAtk + direct * index;
                        // if(GameApp.curBattleLevel == 1 && self.camp == -1){
                        // 	atk = 30;
                        // }
                        if (self_1.soldierAttr.atktype == 2) {
                            var effectmc = new MovieClip();
                            self_1.parent.addChild(effectmc);
                            effectmc.playFile(EFFECT + "skill/boom", 1, null, true);
                            effectmc.x = self_1._atkTar.x;
                            effectmc.y = self_1._atkTar.y;
                        }
                        self_1._atkTar.reduceHp(atk);
                    }
                    else {
                        //直接攻击国王塔
                        MessageManager.inst().dispatch(CustomEvt.REDUCE_HP, { hp: self_1.soldierAttr.atk, camp: self_1.camp });
                        if (self_1.soldierAttr.atktype == 2) {
                            var effectmc = new MovieClip();
                            self_1.parent.addChild(effectmc);
                            effectmc.playFile(EFFECT + "skill/boom", 1, null, true);
                            effectmc.x = self_1.x;
                            if (self_1.camp == 1) {
                                effectmc.y = self_1.y - self_1.soldierAttr.atkDis;
                            }
                            else {
                                effectmc.y = self_1.y + self_1.soldierAttr.atkDis;
                            }
                        }
                    }
                }, 700);
            }
        }
    };
    SoldierEntity.prototype.createArrow = function () {
        var img = new eui.Image();
        img.source = "arrow_png";
        this.parent.addChild(img);
        img.anchorOffsetX = 20;
        img.scaleX = -this.camp;
        var angle = Math.atan2(this.atkTar.y - this.y, this.atkTar.x - this.x) * 180 / Math.PI;
        img.rotation = angle;
        img.x = this.x;
        img.y = this.y - (this.h >> 1);
        egret.Tween.get(img).to({ x: this._atkTar.x, y: this._atkTar.y }, 400).call(function () {
            egret.Tween.removeTweens(img);
            img.parent.removeChild(img);
        }, this);
    };
    /**等待移动状态 */
    SoldierEntity.prototype.waitMoveAction = function () {
        this.atkState = false;
        if (this.curState != ActionState.RUN) {
            this.curState = ActionState.RUN;
            this._res = "" + EFFECT + this.soldierAttr.model + "_" + this.curState;
            this._mc.playFile(this._res, -1, null, false, this._dic.toString());
        }
        egret.Tween.removeTweens(this);
    };
    /**执行y轴一个身位的移动 */
    SoldierEntity.prototype.execYmoveAction = function (dit, dis) {
        egret.Tween.removeTweens(this);
        if (this.curState != ActionState.RUN) {
            this.curState = ActionState.RUN;
            this._res = "" + EFFECT + this.soldierAttr.model + "_" + this.curState;
            this._mc.playFile(this._res, -1, null, false, this._dic.toString());
        }
        egret.Tween.get(this).to({ y: dis }, 600).call(function () {
            // egret.Tween.removeTweens(this);
        });
    };
    /**执行前往目标附近位置 */
    SoldierEntity.prototype.execMoveAction = function (xy, cb, thisarg, isquick) {
        var _this = this;
        if (isquick === void 0) { isquick = true; }
        this.atkState = false;
        if (xy) {
            var angle = Math.atan2(xy.y - this.y, xy.x - this.x) * 180 / Math.PI;
            this.calculEntityDic(angle);
            this.curState = ActionState.RUN;
            this._res = "" + EFFECT + this.soldierAttr.model + "_" + this.curState;
            this._mc.playFile(this._res, -1, null, false, this._dic.toString());
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(xy.x, xy.y);
            var distance = Math.sqrt(Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2));
            var time = distance / this.soldierAttr.spd;
            // let useTime:number = time*1000;
            // if(!this.general && isquick){
            // 	useTime = time*500;
            // }
            egret.Tween.get(this).to({ x: xy.x, y: xy.y }, time * 1000).call(function () {
                egret.Tween.removeTweens(_this);
                if (_this._mc) {
                    _this.curState = ActionState.STAND;
                    _this._res = "" + EFFECT + _this.soldierAttr.model + "_" + _this.curState;
                    _this._mc.playFile(_this._res, -1, null, false, _this._dic.toString());
                    if (cb && thisarg) {
                        cb.call(thisarg);
                    }
                }
            });
        }
        else {
            if (this && this._atkTar && !this._atkTar.isDead) {
                var angle = Math.atan2(this._atkTar.y - this.y, this._atkTar.x - this.x) * 180 / Math.PI;
                this.calculEntityDic(angle);
                if (this.curState != ActionState.RUN) {
                    this.curState = ActionState.RUN;
                    this._res = "" + EFFECT + this.soldierAttr.model + "_" + this.curState;
                    this._mc.playFile(this._res, -1, null, false, this._dic.toString());
                }
                var startP = new egret.Point(this.x, this.y);
                var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
                var distance = Math.sqrt(Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2));
                egret.Tween.removeTweens(this);
                var time = distance / this.soldierAttr.spd;
                egret.Tween.get(this, { loop: false, onChange: function () {
                        if (_this.isInAtkDis()) {
                            egret.Tween.removeTweens(_this);
                        }
                    }, onChangeObj: this }).to({ x: this._atkTar.x, y: this._atkTar.y }, time * 1000).call(function () {
                    egret.Tween.removeTweens(_this);
                });
            }
        }
    };
    /**执行站立状态 */
    SoldierEntity.prototype.execStandAction = function () {
        this.atkState = false;
        this.curState = ActionState.STAND;
        this._res = "" + EFFECT + this.soldierAttr.model + "_" + this.curState;
        this._mc.playFile(this._res, -1, null, false, this._dic.toString());
    };
    /**获取到目标位置的距离 是否达到攻击距离 */
    SoldierEntity.prototype.isInAtkDis = function () {
        // if(!this._atkTar){
        // 	return this.isInAtk;
        // }
        if (this && this._atkTar && !this._atkTar.isDead) {
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
            var distance = Math.sqrt(Math.pow(endP.x - startP.x, 2) + Math.pow(endP.y - startP.y, 2));
            return Math.abs(distance) <= this.soldierAttr.atkDis;
        }
    };
    /**锁定目标 */
    SoldierEntity.prototype.lookAt = function (_atkTar, isNew) {
        if (isNew === void 0) { isNew = false; }
        // this.addAttrRestrict();
        if (isNew) {
            this._atkTar = _atkTar;
            return;
        }
        if (!this._atkTar || (this._atkTar && this._atkTar._isDead)) {
            //重新锁定目标
            this._atkTar = _atkTar;
        }
        else {
            return;
        }
    };
    /**解除锁定 */
    SoldierEntity.prototype.unLookAt = function () {
        this._atkTar = null;
    };
    Object.defineProperty(SoldierEntity.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    SoldierEntity.prototype.dispose = function () {
        // ObjectPool.push(this);
        this.curState = ActionState.DEAD;
        this._res = "" + EFFECT + this.soldierAttr.model + "_" + this.curState;
        this._mc.playFile(this._res, 1, null, true, this._dic.toString());
        if (this._watcher) {
            this._watcher.unwatch();
        }
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self._atkTar = null;
            if (self && self._mc) {
                self.removeChild(self._mc);
                self._mc = null;
            }
            if (self && self.parent) {
                self.parent.removeChild(self);
            }
        }, 600);
    };
    Object.defineProperty(SoldierEntity.prototype, "hp", {
        // private addAttrRestrict():void{
        // 	if(!this._atkTar){return}
        // 	if(this._typeId == SoldierType.ARROW){
        // 		//当前我是弓箭手 克制盾 被克制骑兵
        // 		if(this._atkTar._typeId == SoldierType.QI){
        // 			this.restriceAtk = 50;
        // 		}else if(this._atkTar._typeId == SoldierType.SHIELD){
        // 			this.restriceAtk = -50;
        // 		}else{
        // 			this.restriceAtk = 0;
        // 		}
        // 	}else if(this._typeId == SoldierType.QI){
        // 		//当前我是骑兵
        // 		if(this._atkTar._typeId == SoldierType.ARROW){
        // 			this.restriceAtk = -50;
        // 		}else if(this._atkTar._typeId == SoldierType.SHIELD){
        // 			this.restriceAtk = 50;
        // 		}else{
        // 			this.restriceAtk = 0;
        // 		}
        // 	}else if(this._typeId == SoldierType.SHIELD){
        // 		if(this._atkTar._typeId == SoldierType.ARROW){
        // 			this.restriceAtk = 50;
        // 		}else if(this._atkTar._typeId == SoldierType.QI){
        // 			this.restriceAtk = -50;
        // 		}else{
        // 			this.restriceAtk = 0;
        // 		}
        // 	}
        // }
        set: function (value) {
            this._hp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "thp", {
        set: function (value) {
            this._thp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "atkTar", {
        get: function () {
            return this._atkTar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "buffAtk", {
        set: function (value) {
            this.buffAttack = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "buffHP", {
        set: function (value) {
            this.buffHp = value;
        },
        enumerable: true,
        configurable: true
    });
    return SoldierEntity;
}(BaseEntity));
__reflect(SoldierEntity.prototype, "SoldierEntity");
//# sourceMappingURL=SoldierEntity.js.map