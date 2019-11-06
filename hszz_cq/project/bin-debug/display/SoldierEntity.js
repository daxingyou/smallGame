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
        _this.qualityRes = [{ body: "body002", weapon: "weapon104" }, { body: "body102", weapon: "weapon105" }, { body: "body307", weapon: "weapon106" }, { body: "body308", weapon: "weapon104" }];
        _this.initRes = { body: "body001", weapon: "weapon100" };
        _this.frameRate = 0;
        _this.isActive = false;
        //克制攻击力
        _this.restriceAtk = 0;
        return _this;
    }
    SoldierEntity.prototype.initialize = function () {
    };
    SoldierEntity.prototype.setSoldierData = function (camp, res, weaponRes) {
        this._camp = camp;
        this.camp = camp;
        this._direc = this._camp == 1 ? 1 : -1;
        this._res = res;
        // let bodyres:string = `${BODY}${res}_${this.dic}${this.curState}`
        this._weaponRes = weaponRes;
        // let weapon:string = `${WEAPON}${weaponRes}_${this.dic}${this.curState}`
        this._mc = new MovieClip();
        this.addChild(this._mc);
        // this._mc.playFile(bodyres,-1);
        this._hp = this._thp = this.soldierAttr.hp;
        this._weaponMc = new MovieClip();
        this.addChild(this._weaponMc);
        // this._weaponMc.playFile(weapon,-1)
        this.progressGroup = new eui.Group();
        this.progressGroup.width = 80;
        this.addChild(this.progressGroup);
        this.progressGroup.anchorOffsetX = 40;
        // this.progressGroup.x = -40;
        this.progressGroup.y = -110;
        // let levelLab:eui.Label = new eui.Label();
        // this.progressGroup.addChild(levelLab);
        // levelLab.fontFamily = "yt";
        // levelLab.size = 20;
        // levelLab.text = this.soldierAttr.level .toString()+"级";
        // levelLab.horizontalCenter = 0;
        // levelLab.top = -23;
        var hpbarimg = new eui.Image();
        hpbarimg.source = "entity_hp_bg_png";
        this.progressGroup.addChild(hpbarimg);
        hpbarimg.y = -15;
        var hpimg = new eui.Image();
        hpimg.source = "entity_hp_bar_png";
        this.progressGroup.addChild(hpimg);
        this._barimg = hpimg;
        hpimg.y = -15;
        var mpbarimg = new eui.Image();
        mpbarimg.source = "entity_hp_bg_png";
        this.progressGroup.addChild(mpbarimg);
        mpbarimg.y = -7;
        var mpimg = new eui.Image();
        mpimg.source = "entity_mp_bar_png";
        this.progressGroup.addChild(mpimg);
        this._mpbarimg = mpimg;
        mpimg.y = -7;
        var nameLab = new eui.Label;
        nameLab.text = GameApp.roleName;
        this.progressGroup.addChild(nameLab);
        nameLab.y = -40;
        nameLab.horizontalCenter = 0;
        nameLab.size = 20;
        nameLab.stroke = 1;
        nameLab.strokeColor = 0x000000;
        nameLab.fontFamily = "ht";
        this.buffIcon = new eui.Image();
        this.progressGroup.addChild(this.buffIcon);
        this.buffIcon.source = "effect_0_png";
        this.buffIcon.anchorOffsetX = 73 >> 1;
        this.buffIcon.anchorOffsetY = 51 >> 1;
        this.buffIcon.y = -70;
        this.buffIcon.horizontalCenter = 0;
        this.buffEffect = new MovieClip();
        this.buffEffect.playFile(EFFECT + "circle", -1);
        this.progressGroup.addChild(this.buffEffect);
        // this.buffEffect.x = this.buffIcon.x;
        this.buffEffect.y = this.buffIcon.y;
        this.buffEffect.x = this.progressGroup.width >> 1;
        this.changeRoleAction();
        // let barRes:number = camp == 1?0x00ff00:0xfc3434;
        // let barimg:egret.Shape = new egret.Shape();
        // barimg.graphics.beginFill(barRes,1);
        // barimg.graphics.drawRect(0,0,90,8);
        // barimg.graphics.endFill();
        // this._barimg = barimg;
        // this.progressGroup.addChild(barimg);
        this._watcher = eui.Binding.bindHandler(this, ["_hp"], this.onHpChange, this);
    };
    SoldierEntity.prototype.refreshEquip = function (cardvo) {
        var obj = this.qualityRes[cardvo.quality - 1];
        this._res = obj.body;
        this._weaponRes = obj.weapon;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        var buffmc = new MovieClip();
        this.addChild(buffmc);
        // buffmc.x = this.width>>1;
        // buffmc.y = this.height;
        buffmc.playFile(EFFECT + "equip", 1, null, true);
        var self = this;
        this.timeout = setTimeout(function () {
            clearTimeout(self.timeout);
            self._res = self.initRes.body;
            self._weaponRes = self.initRes.weapon;
            UserTips.inst().showTips("卡牌持续时间结束");
        }, cardvo.buffTime);
    };
    SoldierEntity.prototype.addHp = function (value) {
        var hp = this._hp;
        hp += value;
        if (hp >= this._thp) {
            hp = this._thp;
        }
        this._hp = hp;
        var buffmc = new MovieClip();
        this.addChild(buffmc);
        // buffmc.x = this.x;
        // buffmc.y = this.y;
        buffmc.playFile(EFFECT + "upstate", 3, null, true);
    };
    SoldierEntity.prototype.onHpChange = function (value) {
        if (!isNaN(value)) {
            var percent = value / this._thp;
            MessageManager.inst().dispatch(CustomEvt.DMGSHOW);
            if (this._barimg) {
                this._barimg.width = percent * 90;
            }
        }
    };
    /**人物等级提升刷新属性 */
    SoldierEntity.prototype.refreshAttr = function () {
        this.soldierAttr.hp += 1500;
        this._hp = this._thp = this.soldierAttr.hp;
        this.soldierAttr.level = GameApp.level;
        this.soldierAttr.atk = 500 * GameApp.level + ((Math.random() * 100) >> 0);
    };
    SoldierEntity.prototype.changeWeaponBuff = function (type, isActive) {
        this.isActive = isActive;
        if (type == 0) {
            //提高了暴击伤害;
            if (isActive) {
                this.buffIcon.visible = true;
                UserTips.inst().showTips("\u6FC0\u6D3B\u6B66\u5668\u66B4\u51FB\u5200-<font color=0x00ff00>\u66B4\u51FB\u4F24\u5BB3\u63D0\u9AD8</font>");
            }
            else {
                this._crit = 0.4;
                UserTips.inst().showTips("当前武器未解锁");
                this.buffIcon.visible = false;
                this.buffEffect.visible = false;
            }
            this.buffAttack = 0;
            this.frameRate = 0;
        }
        else if (type == 1) {
            //攻击伤害提高
            this._crit = 0.4;
            this.frameRate = 0;
            if (isActive) {
                this.buffIcon.visible = true;
                UserTips.inst().showTips("\u6FC0\u6D3B\u6B66\u5668\u7834\u7532\u7BAD-<font color=0x00ff00>\u4EBA\u7269\u653B\u51FB\u529B\u63D0\u9AD8</font>");
            }
            else {
                this.buffAttack = 0;
                UserTips.inst().showTips("当前武器未解锁");
                this.buffIcon.visible = false;
                this.buffEffect.visible = false;
            }
        }
        else {
            //攻击速度提高
            this._crit = 0.4;
            this.buffAttack = 0;
            if (isActive) {
                UserTips.inst().showTips("\u6FC0\u6D3B\u6B66\u5668\u95EA\u7535\u67AA-<font color=0x00ff00>\u4EBA\u7269\u653B\u901F\u63D0\u9AD8</font>");
                this.buffIcon.visible = true;
            }
            else {
                this.frameRate = null;
                UserTips.inst().showTips("当前武器未解锁");
                this.buffIcon.visible = false;
                this.buffEffect.visible = false;
            }
        }
        this.buffIcon.source = "effect_" + type + "_png";
    };
    SoldierEntity.prototype.changeRoleAction = function (state, tarPoint) {
        if (state === void 0) { state = ""; }
        if (tarPoint === void 0) { tarPoint = null; }
        var dic = this.dic;
        if (tarPoint) {
            var angle = Math.atan2(tarPoint.y - this.y, tarPoint.x - this.x) * 180 / Math.PI;
            this.calculEntityDic(angle);
        }
        else {
            if (this.atkTar && !this.atkTar.isDead) {
                var angle = Math.atan2(this.atkTar.y - this.y, this.atkTar.x - this.x) * 180 / Math.PI;
                this.calculEntityDic(angle);
            }
        }
        if (this.scaleX == -1) {
            this.progressGroup.scaleX = -1;
        }
        else {
            this.progressGroup.scaleX = 1;
        }
        // if(this._atkTar && !this._atkTar.isDead){
        // 	let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
        // 	this.calculEntityDic(angle);
        // }
        if (!!state) {
            if (this.curState == state && dic == this.dic) {
                return;
            }
            this.curState = state;
        }
        var bodyres = "" + BODY + this._res + "_" + GameApp.sex + "_" + this.dic + this.curState;
        var weapon = "" + WEAPON + this._weaponRes + "_" + GameApp.sex + "_" + this.dic + this.curState;
        if (this._mc && this._weaponMc) {
            var frameRate = (this.curState == ActionState.ATTACK ? this.frameRate ? this.frameRate : null : 15);
            this._mc.playFile(bodyres, -1, null, null, "", null, frameRate);
            this._weaponMc.playFile(weapon, -1, null, null, null, null, frameRate);
        }
    };
    /**执行攻击动作 */
    SoldierEntity.prototype.execAtkAction = function () {
        // if(GameApp.battleState == false){return}
        if ((this.isInAtkDis() || this.isInAtk) && (!this.atkState)) {
            if (this.curState != ActionState.ATTACK) {
                var time_1 = 700;
                if (this.frameRate) {
                    time_1 = 200;
                }
                this.curState = ActionState.ATTACK;
                egret.Tween.removeTweens(this);
                // if(this._atkTar && !this._atkTar.isDead){
                // 	let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
                // 	this.calculEntityDic(angle);
                // }
                // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
                // this._mc.playFile(this._res,1,null,false,this._dic.toString());
                this.changeRoleAction();
                this.atkState = true;
                var self_1 = this;
                var timeout_1 = setTimeout(function () {
                    clearTimeout(timeout_1);
                    if (self_1 && self_1._mc) {
                        self_1.curState = ActionState.STAND;
                        // self._res = `${EFFECT}${self.soldierAttr.model}_${self.curState}`;
                        // self._mc.playFile(self._res,-1,null,false,self._dic.toString());
                        self_1.changeRoleAction();
                    }
                    if (self_1 && self_1._atkTar) {
                        var index = (Math.random() * 15 + 5) >> 0;
                        var direct = ((Math.random() * 100) >> 0) >= 50 ? -1 : 1;
                        var atk = self_1.soldierAttr.atk - self_1.restriceAtk + direct * index;
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
                        var critIndex = (Math.random() * 100) >> 0;
                        var value = null;
                        if (critIndex >= 60) {
                            value = ((atk * self_1._crit) >> 0);
                        }
                        self_1._atkTar.reduceHp(atk + self_1.buffAttack, value);
                        var skillEff = new MovieClip();
                        self_1._atkTar.addChild(skillEff);
                        skillEff.x = 0;
                        skillEff.y = -30;
                        skillEff.playFile(EFFECT + "skill404", 1, null, true);
                    }
                    var timeout2 = setTimeout(function () {
                        //
                        clearTimeout(timeout2);
                        self_1.atkState = false;
                    }, time_1);
                }, 300);
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
    /**执行前往目标附近位置 */
    SoldierEntity.prototype.execMoveAction = function (xy, cb, thisarg, isquick) {
        var _this = this;
        if (isquick === void 0) { isquick = true; }
        this.atkState = false;
        if (xy) {
            // let angle:number = Math.atan2(xy.y - this.y,xy.x-this.x)*180/Math.PI;
            // this.calculEntityDic(angle)
            this.curState = ActionState.RUN;
            // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
            // this._mc.playFile(this._res,-1,null,false,this._dic.toString());
            this.changeRoleAction();
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
                    // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
                    // this._mc.playFile(this._res,-1,null,false,this._dic.toString());
                    _this.changeRoleAction();
                    if (cb && thisarg) {
                        cb.call(thisarg);
                    }
                }
            });
        }
        else {
            if (this && this._atkTar && !this._atkTar.isDead) {
                // let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
                // this.calculEntityDic(angle);
                if (this.curState != ActionState.RUN) {
                    this.curState = ActionState.RUN;
                    // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
                    // this._mc.playFile(this._res,-1,null,false,this._dic.toString());
                    this.changeRoleAction();
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
    // /**执行站立状态 */
    // public execStandAction():void{
    // 	this.atkState = false;
    // 	this.curState = ActionState.STAND;
    // 	this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
    // 	this._mc.playFile(this._res,-1,null,false,this._dic.toString());
    // }
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
        if (!this._atkTar || (this._atkTar && this._atkTar.isDead)) {
            //重新锁定目标
            this._atkTar = _atkTar;
            if (this.isActive) {
                if (this._atkTar && this._atkTar.type == GameApp.weapon) {
                    if (GameApp.weapon == 0) {
                        this._crit = 1;
                    }
                    else if (GameApp.weapon == 1) {
                        this.buffAttack = this.soldierAttr.atk;
                    }
                    else {
                        this.frameRate = 24;
                    }
                    this.buffEffect.visible = true;
                }
                else {
                    this._crit = 0.4;
                    this.buffAttack = 0;
                    this.frameRate = null;
                    this.buffEffect.visible = false;
                }
            }
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
        this.changeRoleAction();
        // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
        // this._mc.playFile(this._res,1,null,true,this._dic.toString());
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