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
var MonsterEntity = (function (_super) {
    __extends(MonsterEntity, _super);
    function MonsterEntity() {
        var _this = _super.call(this) || this;
        _this.curState = ActionState.STAND;
        _this.bossIds = [84012, 84010, 84009, 10026, 10054, 84004, 10115, 84001];
        /**攻击状态 */
        _this.atkState = false;
        _this.type = 0;
        return _this;
    }
    MonsterEntity.prototype.setSoldierData = function (camp, monsterRes, attr, time, scale) {
        if (monsterRes === void 0) { monsterRes = ""; }
        this._camp = camp;
        if (scale) {
            this._scale = scale;
        }
        if (monsterRes) {
            this._res = "" + MONSTER + monsterRes;
        }
        else {
            //不传的话 进入的就是boss 。随机显示模型
            var index = (Math.random() * this.bossIds.length) >> 0;
            GameApp.bossId = this.bossIds[index];
            this._res = MONSTER + "monster" + this.bossIds[index];
        }
        var bodyres = this._res + "_" + this.dic + this.curState;
        this._mc = new MovieClip();
        this.addChild(this._mc);
        this._mc.playFile(bodyres, -1);
        this.monsterAttr = attr;
        this.soldierAttr = attr;
        this._hp = this._thp = this.monsterAttr.hp;
        this.progressGroup = new eui.Group();
        this.progressGroup.width = 80;
        this.addChild(this.progressGroup);
        this.progressGroup.anchorOffsetX = 40;
        // this.progressGroup.x = -40;
        this.progressGroup.y = -110;
        // let barRes:number = 0xfc3434;
        // let barimg:egret.Shape = new egret.Shape();
        // barimg.graphics.beginFill(barRes,1);
        // barimg.graphics.drawRect(0,0,90,8);
        // this._barImg = barimg;
        // barimg.graphics.endFill();
        // this.progressGroup.addChild(barimg);
        if (monsterRes) {
            var hpbarimg = new eui.Image();
            hpbarimg.source = "entity_hp_bg_png";
            this.progressGroup.addChild(hpbarimg);
            hpbarimg.y = -15;
            var hpimg = new eui.Image();
            hpimg.source = "entity_hp_bar_png";
            this.progressGroup.addChild(hpimg);
            this._barImg = hpimg;
            hpimg.y = -15;
        }
        if (time) {
            this.energyBar = new egret.Shape();
            this.energyBar.graphics.beginFill(0xE5AB2B);
            this.energyBar.graphics.drawRect(0, 0, 90, 5);
            this.energyBar.graphics.endFill();
            this.progressGroup.addChild(this.energyBar);
            this.energyBar.y = this._barImg.y + 10;
            var count_1 = 0;
            var self_1 = this;
            this.interval = setInterval(function () {
                count_1 += 1;
                var percent = (time - (count_1 * 1000)) / time;
                self_1.energyBar.graphics.clear();
                self_1.energyBar.graphics.beginFill(0xE5AB2B, 1);
                self_1.energyBar.graphics.drawRect(0, 0, percent * 90, 5);
                self_1.energyBar.graphics.endFill();
                if (count_1 * 1000 >= time) {
                    clearInterval(self_1.interval);
                    self_1.reduceHp(self_1._hp);
                }
            }, 1000);
        }
        this._watcher = eui.Binding.bindHandler(this, ["_hp"], this.onHpChange, this);
    };
    /**更新怪物坐标各自占有值 */
    MonsterEntity.prototype.refreshPos = function (gx, gy) {
        if (gx != this.gx || gy != this.gy) {
            // GameMap.AstarNode.setWalkable(this.gx,this.gy,true);
            this.gx = gx;
            this.gy = gy;
            // GameMap.AstarNode.setWalkable(gx,gy,false);
        }
    };
    /**执行前往目标附近位置 */
    MonsterEntity.prototype.execMoveAction = function (xy, cb, thisarg, isquick) {
        var _this = this;
        if (isquick === void 0) { isquick = true; }
        if (xy) {
            this.curState = ActionState.RUN;
            this.changeMonsterAction("", new egret.Point(xy.x, xy.y));
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(xy.x, xy.y);
            var distance = Math.sqrt(Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2));
            var time = distance / this.monsterAttr.spd;
            egret.Tween.get(this).to({ x: xy.x, y: xy.y }, time * 1000).call(function () {
                egret.Tween.removeTweens(_this);
                if (_this._mc) {
                    _this.curState = ActionState.STAND;
                    _this.changeMonsterAction();
                    if (cb && thisarg) {
                        cb.call(thisarg);
                    }
                }
            });
        }
        else {
            if (this && this._atkTar && !this._atkTar.isDead) {
                if (this.curState != ActionState.RUN) {
                    this.curState = ActionState.RUN;
                    this.changeMonsterAction();
                }
                var startP = new egret.Point(this.x, this.y);
                var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
                var distance = Math.sqrt(Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2));
                egret.Tween.removeTweens(this);
                var time = distance / this.monsterAttr.spd;
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
    /**获取到目标位置的距离 是否达到攻击距离 */
    MonsterEntity.prototype.isInAtkDis = function () {
        if (this && this._atkTar && !this._atkTar.isDead) {
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
            var distance = Math.sqrt(Math.pow(endP.x - startP.x, 2) + Math.pow(endP.y - startP.y, 2));
            return Math.abs(distance) <= this.monsterAttr.atkDis;
        }
    };
    /**执行攻击动作 */
    MonsterEntity.prototype.execAtkAction = function () {
        // if(GameApp.battleState == false){return}
        if ((!this.atkState)) {
            if (this.curState != ActionState.ATTACK) {
                this.curState = ActionState.ATTACK;
                egret.Tween.removeTweens(this);
                // if(this._atkTar && !this._atkTar.isDead){
                // 	let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
                // 	this.calculEntityDic(angle);
                // }
                // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
                // this._mc.playFile(this._res,1,null,false,this._dic.toString());
                this.changeMonsterAction();
                this.atkState = true;
                var self_2 = this;
                var timeout_1 = setTimeout(function () {
                    clearTimeout(timeout_1);
                    if (self_2 && self_2._mc) {
                        self_2.curState = ActionState.STAND;
                        // self._res = `${EFFECT}${self.soldierAttr.model}_${self.curState}`;
                        // self._mc.playFile(self._res,-1,null,false,self._dic.toString());
                        self_2.changeMonsterAction();
                    }
                    if (self_2 && self_2._atkTar) {
                        var index = (Math.random() * 15 + 5) >> 0;
                        var direct = ((Math.random() * 100) >> 0) >= 10 ? -1 : 1;
                        var atk = self_2.monsterAttr.atk + direct * index;
                        // if(GameApp.curBattleLevel == 1 && self.camp == -1){
                        // 	atk = 30;
                        // }
                        // if(self.soldierAttr.atktype == 2){
                        // 	let effectmc:MovieClip = new MovieClip();
                        // 	self.parent.addChild(effectmc);
                        // 	effectmc.playFile(`${EFFECT}skill/boom`,1,null,true);
                        // 	effectmc.x = self._atkTar.x;
                        // 	effectmc.y = self._atkTar.y;
                        // }
                        self_2._atkTar.reduceHp(atk);
                        // let dmg:eui.BitmapLabel = new eui.BitmapLabel();
                        // dmg.scaleX = dmg.scaleY = 0.7;
                        // dmg.font = "dmg_fnt";
                        // if(self._atkTar.scaleX == -1){
                        // 	dmg.scaleX = -0.7;
                        // }
                        // self._atkTar.addChild(dmg);
                        // dmg.text = "-"+atk;
                        // dmg.x = 0;
                        // dmg.y = -100 + ((Math.random()*20)>>0);
                        var skillEff = new MovieClip();
                        self_2._atkTar.addChild(skillEff);
                        skillEff.x = 0;
                        skillEff.y = 50;
                        // if(self._atkTar.scaleX == -1){
                        // 	dmg.scaleX = -1;
                        // }
                        // skillEff.playFile(`${EFFECT}skill5020`,1,null,true)
                        // MessageManager.inst().dispatch(CustomEvt.DMGSHOW);
                        // egret.Tween.get(dmg).to({y:-150},600,egret.Ease.circIn).call(()=>{
                        // 	egret.Tween.removeTweens(dmg);
                        // 	if(dmg && dmg.parent){
                        // 		dmg.parent.removeChild(dmg);
                        // 	}
                        // },this)
                    }
                    var timeout2 = setTimeout(function () {
                        //
                        clearTimeout(timeout2);
                        self_2.atkState = false;
                    }, 900);
                }, 300);
            }
        }
    };
    MonsterEntity.prototype.changeMonsterAction = function (state, tarPoint) {
        if (state === void 0) { state = ""; }
        if (tarPoint === void 0) { tarPoint = null; }
        var dic = this.dic;
        if (tarPoint) {
            var angle = Math.atan2(tarPoint.y - this.y, tarPoint.x - this.x) * 180 / Math.PI;
            this.calculEntityDic(angle);
        }
        else {
            if (this._atkTar && !this._atkTar.isDead) {
                var angle = Math.atan2(this._atkTar.y - this.y, this._atkTar.x - this.x) * 180 / Math.PI;
                this.calculEntityDic(angle);
            }
        }
        if (this.scaleX == -1) {
            this.progressGroup.scaleX = -1;
        }
        else {
            this.progressGroup.scaleX = 1;
        }
        if (!!state) {
            if (this.curState == state && dic == this.dic) {
                return;
            }
            this.curState = state;
        }
        var bodyres = this._res + "_" + this.dic + this.curState;
        this._mc.playFile(bodyres, -1);
    };
    /**锁定目标 */
    MonsterEntity.prototype.lookAt = function (_atkTar, isNew) {
        if (isNew === void 0) { isNew = false; }
        // this.addAttrRestrict();
        if (isNew) {
            this._atkTar = _atkTar;
            return;
        }
        if (!this._atkTar || (this._atkTar && this._atkTar.isDead)) {
            //重新锁定目标
            this._atkTar = _atkTar;
        }
        else {
            return;
        }
    };
    /**解除锁定 */
    MonsterEntity.prototype.unLookAt = function () {
        this._atkTar = null;
    };
    MonsterEntity.prototype.onHpChange = function (value) {
        if (!isNaN(value)) {
            var percent = value / this._thp;
            if (this._barImg) {
                this._barImg.width = percent * 90;
            }
        }
        this.atkState = true;
        if (!this.timeout) {
            var self_3 = this;
            this.timeout = setTimeout(function () {
                self_3.atkState = false;
                clearTimeout(self_3.timeout);
                self_3.timeout = null;
            }, 3000);
        }
    };
    Object.defineProperty(MonsterEntity.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    MonsterEntity.prototype.dispose = function () {
        // ObjectPool.push(this);
        this.curState = ActionState.DEAD;
        this.changeMonsterAction();
        // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
        // this._mc.playFile(this._res,1,null,true,this._dic.toString());
        if (this._watcher) {
            this._watcher.unwatch();
        }
        var self = this;
        MapView.inst().refreshMonItem(this, true);
        if (this.interval) {
            clearInterval(this.interval);
        }
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
        }, 400);
    };
    Object.defineProperty(MonsterEntity.prototype, "hp", {
        set: function (value) {
            this._hp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterEntity.prototype, "thp", {
        set: function (value) {
            this._thp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterEntity.prototype, "atkTar", {
        get: function () {
            return this._atkTar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterEntity.prototype, "buffAtk", {
        set: function (value) {
            this.buffAttack = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterEntity.prototype, "buffHP", {
        set: function (value) {
            this.buffHp = value;
        },
        enumerable: true,
        configurable: true
    });
    return MonsterEntity;
}(BaseEntity));
__reflect(MonsterEntity.prototype, "MonsterEntity");
//# sourceMappingURL=MonsterEntity.js.map