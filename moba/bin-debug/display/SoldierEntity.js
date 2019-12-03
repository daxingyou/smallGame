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
        _this.route = [];
        _this.moveEnd = true;
        _this.followValue = 0;
        _this.summonCount = 0;
        _this.frameRate = 0;
        _this.critp = 0;
        //克制攻击力
        _this.restriceAtk = 0;
        //连斩数量
        _this.slashNum = 0;
        return _this;
    }
    SoldierEntity.prototype.initialize = function () {
    };
    SoldierEntity.prototype.setSoldierData = function (camp, res) {
        this._camp = camp;
        this.camp = camp;
        this._direc = this._camp == 1 ? 1 : -1;
        this._res = res;
        // let bodyres:string = `${BODY}${res}_${this.dic}${this.curState}`
        // this._weaponRes = weaponRes;
        // let weapon:string = `${WEAPON}${weaponRes}_${this.dic}${this.curState}`
        this._mc = new MovieClip();
        this.addChild(this._mc);
        // this._mc.playFile(bodyres,-1);
        this._hp = this._thp = this.soldierAttr.hp;
        // this._mp = this._tmp = this.soldierAttr.mp;
        // this._weaponMc = new MovieClip();
        // this.addChild(this._weaponMc);
        // this._weaponMc.playFile(weapon,-1)
        this.progressGroup = new eui.Group();
        this.progressGroup.width = 106;
        this.addChild(this.progressGroup);
        this.progressGroup.anchorOffsetX = 53;
        // this.progressGroup.x = -40;
        this.progressGroup.y = -60;
        this.progressGroup.scaleX = this.progressGroup.scaleY = 0.7;
        // let levelLab:eui.Label = new eui.Label();
        // this.progressGroup.addChild(levelLab);
        // levelLab.fontFamily = "yt";
        // levelLab.size = 20;
        // levelLab.text = this.soldierAttr.level .toString()+"级";
        // levelLab.horizontalCenter = 0;
        // levelLab.top = -23;
        var hpbarimg = new eui.Image();
        hpbarimg.source = "own_hp_bg_png";
        this.progressGroup.addChild(hpbarimg);
        hpbarimg.y = -15;
        var hpimg = new eui.Image();
        hpimg.source = "own_hp_bar_png";
        this.progressGroup.addChild(hpimg);
        this._barimg = hpimg;
        hpimg.y = -11;
        hpimg.x = 10;
        // let mpbarimg:eui.Image = new eui.Image();
        // mpbarimg.source = "entity_hp_bg_png";
        // this.progressGroup.addChild(mpbarimg);
        // mpbarimg.y = -7;
        // let mpimg:eui.Image = new eui.Image();
        // mpimg.source = "entity_mp_bar_png";
        // this.progressGroup.addChild(mpimg)
        // this._mpbarimg = mpimg;
        // mpimg.y = -7;
        if (this.general) {
            var nameLab = new eui.Label;
            nameLab.text = "玩家 Lv." + GameApp.level;
            this.progressGroup.addChild(nameLab);
            nameLab.y = -40;
            this.nameLab = nameLab;
            nameLab.horizontalCenter = 0;
            nameLab.size = 24;
            nameLab.stroke = 1;
            nameLab.strokeColor = 0x000000;
            nameLab.fontFamily = "yt";
        }
        // this.buffIcon = new eui.Image();
        // this.progressGroup.addChild(this.buffIcon);
        // this.buffIcon.source = "effect_0_png";
        // this.buffIcon.anchorOffsetX = 73>>1;
        // this.buffIcon.anchorOffsetY = 51>>1;
        // this.buffIcon.y = -70;
        // this.buffIcon.horizontalCenter = 0;
        // this.buffEffect = new MovieClip();
        // this.buffEffect.playFile(`${EFFECT}circle`,-1);
        // this.progressGroup.addChild(this.buffEffect);
        // // this.buffEffect.x = this.buffIcon.x;
        // this.buffEffect.y = this.buffIcon.y;
        // this.buffEffect.x = this.progressGroup.width>>1;
        this.changeRoleAction();
        // let barRes:number = camp == 1?0x00ff00:0xfc3434;
        // let barimg:egret.Shape = new egret.Shape();
        // barimg.graphics.beginFill(barRes,1);
        // barimg.graphics.drawRect(0,0,90,8);
        // barimg.graphics.endFill();
        // this._barimg = barimg;
        // this.progressGroup.addChild(barimg);
        this._watcher = eui.Binding.bindHandler(this, ["_hp"], this.onHpChange, this);
        this.levelWatcher = eui.Binding.bindHandler(GameApp, ['level'], this.onLevelChange, this);
        // this._watcher2 = eui.Binding.bindHandler(this,["_mp"],this.onMpChange,this);
    };
    SoldierEntity.prototype.onLevelChange = function () {
        if (this.nameLab) {
            this.nameLab.text = "玩家 Lv." + GameApp.level;
        }
    };
    /**人物升级 */
    SoldierEntity.prototype.upgrade = function () {
        this.soldierAttr.atk += ((this.soldierAttr.atk * 0.2) >> 0);
        this.soldierAttr.level = GameApp.level;
        this.soldierAttr.hp += ((this.soldierAttr.hp * 0.2) >> 0);
        if (this.general) {
            var upmc = new MovieClip();
            this.addChild(upmc);
            upmc.playFile(EFFECT + "upgrade", 1, null, true);
        }
    };
    // private timeout;
    // public refreshEquip(cardvo:CardVo):void{
    // 	let obj:any = this.qualityRes[cardvo.quality -1];
    // 	this._res = obj.body;
    // 	this._weaponRes = obj.weapon;
    // 	if(this.timeout){
    // 		clearTimeout(this.timeout);
    // 	}
    // 	let buffmc:MovieClip = new MovieClip();
    // 	this.addChild(buffmc);
    // 	// buffmc.x = this.width>>1;
    // 	// buffmc.y = this.height;
    // 	buffmc.playFile(`${EFFECT}equip`,1,null,true);
    // 	let self= this;
    // 	this.timeout = setTimeout(function() {
    // 		clearTimeout(self.timeout);
    // 		self._res = self.initRes.body;
    // 		self._weaponRes = self.initRes.weapon;
    // 		UserTips.inst().showTips("卡牌持续时间结束");
    // 	}, cardvo.buffTime);
    // }
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
            // if(percent <= 0.3){
            // 	MessageManager.inst().dispatch(CustomEvt.DMGSHOW);
            // }else{
            // 	MessageManager.inst().dispatch(CustomEvt.DMGHIDE);
            // }
            if (this._barimg) {
                this._barimg.width = percent * 86;
            }
        }
    };
    // private timeInterVal;
    // private onMpChange(value:number):void{
    // 	if(!isNaN(value)){
    // 		if(this._mp < this._tmp){
    // 			if(!this.timeInterVal){
    // 				let self = this
    // 				this.timeInterVal = setInterval(()=>{
    // 					self.changeRoleMp(-10);
    // 				},1000)
    // 			}
    // 		}else{
    // 			clearInterval(this.timeInterVal)
    // 			this.timeInterVal = null;
    // 		}
    // 		let percent:number = value/this._tmp;
    // 		// MessageManager.inst().dispatch(CustomEvt.DMGSHOW);
    // 		if(this._mpbarimg){
    // 			this._mpbarimg.width = percent*90;
    // 		}
    // 	}
    // }
    /**人物等级提升刷新属性 */
    SoldierEntity.prototype.refreshAttr = function () {
        // this.soldierAttr.hp += 1500;
        // this._hp = this._thp = this.soldierAttr.hp;
        // this.soldierAttr.level = GameApp.level;
        // this.soldierAttr.atk = 500*GameApp.level + ((Math.random()*100)>>0)
    };
    // private isActive:boolean = false;
    // public changeWeaponBuff(type:number,isActive:boolean):void{
    // 	this.isActive = isActive;
    // 	if(type == 0){
    // 		//提高了暴击伤害;
    // 		if(isActive){
    // 			this.buffIcon.visible = true;
    // 			UserTips.inst().showTips(`激活武器暴击刀-<font color=0x00ff00>暴击伤害提高</font>`,null,3000);
    // 		}else{
    // 			this._crit = 0.4;
    // 			UserTips.inst().showTips("当前武器未解锁")
    // 			this.buffIcon.visible = false;
    // 			this.buffEffect.visible = false;
    // 		}
    // 		this.buffAttack = 0;
    // 		this.frameRate = 0;
    // 	}else if(type == 1){
    // 		//攻击伤害提高
    // 		this._crit = 0.4;
    // 		this.frameRate = 0;
    // 		if(isActive){
    // 			this.buffIcon.visible = true;
    // 			UserTips.inst().showTips(`激活武器破甲箭-<font color=0x00ff00>人物攻击力提高</font>`,null,3000);
    // 		}else{
    // 			this.buffAttack = 0;
    // 			UserTips.inst().showTips("当前武器未解锁")
    // 			this.buffIcon.visible = false;
    // 			this.buffEffect.visible = false;
    // 		}
    // 	}else{
    // 		//攻击速度提高
    // 		this._crit = 0.4;
    // 		this.buffAttack = 0;
    // 		if(isActive){
    // 			UserTips.inst().showTips(`激活武器闪电枪-<font color=0x00ff00>人物攻速提高</font>`,null,3000);
    // 			this.buffIcon.visible = true;
    // 		}else{
    // 			this.frameRate = null;
    // 			UserTips.inst().showTips("当前武器未解锁")
    // 			this.buffIcon.visible = false;
    // 			this.buffEffect.visible = false;
    // 		}
    // 	}
    // 	this.buffIcon.source = "effect_"+type+"_png";
    // }
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
            this.progressGroup.scaleX = -0.7;
        }
        else {
            this.progressGroup.scaleX = 0.7;
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
        // let bodyres:string = `${BODY}${this._res}_0_${this.dic}${this.curState}`
        // let weapon:string = `${WEAPON}${this._weaponRes}_${GameApp.sex}_${this.dic}${this.curState}`
        if (this._mc) {
            var frameRate = (this.curState == ActionState.ATTACK ? this.frameRate ? this.frameRate : null : 15);
            this._mc.playSlice(this._res, this._dic.toString(), this.curState, -1, frameRate);
            // this._mc.playFile(bodyres,-1,null,null,"",null,frameRate);
            // this._weaponMc.playFile(weapon,-1,null,null,null,null,frameRate);
        }
    };
    /**更新装备属性 */
    SoldierEntity.prototype.updateEquip = function () {
        var equips = GameApp.equipIds;
        for (var i = 0; i < equips.length; i++) {
            switch (equips[i]) {
                case 1001:
                    this.buffHp = 1;
                    UserTips.inst().showTips("\u5DF2\u6FC0\u6D3B\u5438\u8840\u6548\u679C+<font color=0x00ff00>[30%\u5438\u8840]</font>");
                    var mc1 = new MovieClip();
                    this.addChild(mc1);
                    mc1.scaleX = mc1.scaleY = 0.5;
                    mc1.playFile(EFFECT + "buff_1001", -1);
                    mc1.x = this.progressGroup.x - 60;
                    mc1.y = this.progressGroup.y + 50;
                    break;
                case 1002:
                    this.buffDef = 0.5;
                    UserTips.inst().showTips("\u9632\u5FA1\u589E\u52A0<font color=0x00ff00>[50%]</font>");
                    var mc2 = new MovieClip();
                    this.addChild(mc2);
                    mc2.scaleX = mc2.scaleY = 0.8;
                    mc2.playFile(EFFECT + "buff_1002", -1);
                    // mc2.x = this.progressGroup.x - 60;
                    mc2.y = 20;
                    break;
                case 1003:
                    this.soldierAttr.atk += 100;
                    UserTips.inst().showTips("\u653B\u51FB\u589E\u52A0<font color=0x00ff00>[100]</font>");
                    var mc3 = new MovieClip();
                    this.addChild(mc3);
                    // mc3.scaleX = mc3.scaleY = 0.8;
                    mc3.playFile(EFFECT + "buff_1003", -1);
                    mc3.y = 100;
                    break;
                case 1004:
                    this.critp = 1;
                    var mc4 = new MovieClip();
                    this.addChild(mc4);
                    mc4.scaleX = mc4.scaleY = 0.8;
                    mc4.playFile(EFFECT + "buff_1004", -1);
                    mc4.y = 0;
                    UserTips.inst().showTips("\u66B4\u51FB\u7387\u589E\u52A0W<font color=0x00ff00>[100%]</font>");
                    this.swapChildren(this._mc, mc4);
                    break;
            }
        }
    };
    /**执行攻击动作 */
    SoldierEntity.prototype.execAtkAction = function () {
        // if(GameApp.battleState == false){return}
        if ((this.isInAtkDis() || this.isInAtk) && !this.atkState) {
            this.moveEnd = false;
            if (this.curState != ActionState.ATTACK) {
                var time_1 = 300;
                if (this.frameRate) {
                    time_1 = 100;
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
                var bullet_1 = new MovieClip();
                LayerManager.MAP_LAYER.addChild(bullet_1);
                bullet_1.bounce = true;
                bullet_1.scaleX = bullet_1.scaleY = 0.5;
                bullet_1.playFile(EFFECT + "bullet", -1);
                bullet_1.x = self_1.x;
                bullet_1.y = self_1.y - 20;
                var rotation = Math.atan2(self_1._atkTar.y - self_1.y, self_1._atkTar.x - self_1.x) * 180 / Math.PI;
                bullet_1.rotation = rotation + 90;
                egret.Tween.get(bullet_1).to({ x: self_1._atkTar.x, y: self_1._atkTar.y }, 300).call(function () {
                    egret.Tween.removeTweens(bullet_1);
                    if (bullet_1 && bullet_1.parent) {
                        bullet_1.parent.removeChild(bullet_1);
                    }
                }, this);
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
                        var atk = self_1.soldierAttr.atk - direct * index;
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
                        var value = null;
                        if (self_1.critp) {
                            value = ((atk * self_1._crit) >> 0);
                        }
                        else {
                            var critIndex = (Math.random() * 100) >> 0;
                            if (critIndex >= 80) {
                                value = ((atk * self_1._crit) >> 0);
                            }
                        }
                        var damage = value ? atk + value : atk;
                        self_1._atkTar.reduceHp(atk + self_1.buffAttack, value);
                        if (self_1.general && self_1._atkTar.isDead) {
                            if (self_1.countTimeDown) {
                                clearTimeout(self_1.countTimeDown);
                                self_1.countTimeDown = null;
                            }
                            self_1.slashNum += 1;
                            MessageManager.inst().dispatch("showSlash", { num: self_1.slashNum });
                            if (!self_1.countTimeDown) {
                                self_1.countTimeDown = setTimeout(function () {
                                    clearTimeout(self_1.countTimeDown);
                                    self_1.countTimeDown = null;
                                    self_1.slashNum = 0;
                                    MessageManager.inst().dispatch("hideSlash");
                                }, 3000);
                            }
                        }
                        if (self_1.buffHp) {
                            self_1._hp += ((damage * 0.3) >> 0);
                            if (self_1._hp >= self_1._thp) {
                                self_1._hp = self_1._thp;
                            }
                            var hpfont_1 = new eui.BitmapLabel();
                            hpfont_1.font = "num_r0_fnt";
                            hpfont_1.name = "item_" + Math.random();
                            if (self_1.parent) {
                                self_1.parent.addChildAt(hpfont_1, self_1.parent.numChildren - 1);
                            }
                            hpfont_1.text = "+" + ((damage * 0.3) >> 0);
                            hpfont_1.x = self_1.x;
                            hpfont_1.y = self_1.y + -100 + ((Math.random() * 50) >> 0);
                            egret.Tween.get(hpfont_1).to({ y: self_1.y - 150 }, 600 + ((Math.random() * 400) >> 0), egret.Ease.circIn).call(function () {
                                egret.Tween.removeTweens(hpfont_1);
                                if (hpfont_1 && hpfont_1.parent) {
                                    hpfont_1.parent.removeChild(hpfont_1);
                                }
                            }, self_1);
                        }
                        // let skillEff:MovieClip = new MovieClip();
                        // self._atkTar.addChild(skillEff);
                        // skillEff.x = 0;
                        // skillEff.y = -30;
                        // skillEff.playFile(`${EFFECT}skill404`,1,null,true)
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
    SoldierEntity.prototype.addSkillEff = function (skillId, time) {
        if (time === void 0) { time = -1; }
        this.buffMc = new MovieClip();
        this.addChild(this.buffMc);
        this.buffMc.playFile(EFFECT + "eff_" + skillId, time);
    };
    SoldierEntity.prototype.hideSkillEff = function (skillid) {
        if (!!this.buffMc && this.buffMc.parent) {
            this.buffMc.parent.removeChild(this.buffMc);
        }
    };
    SoldierEntity.prototype.summonTime = function (time, cb, arg) {
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(time);
            if (cb && arg) {
                cb.call(arg, self.summonCount);
            }
            self._isDead = true;
            self.dispose();
        }, time);
    };
    SoldierEntity.prototype.changeRoleMp = function (value) {
        this.changeMp(value);
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
    SoldierEntity.prototype.execMoveAction = function (xy, cb, thisarg, isquick, randomXY) {
        var _this = this;
        if (isquick === void 0) { isquick = true; }
        if (randomXY === void 0) { randomXY = { x: 0, y: 0 }; }
        if (xy) {
            if (!this.moveEnd) {
                return;
            }
            this.moveEnd = false;
            // let angle:number = Math.atan2(xy.y - this.y,xy.x-this.x)*180/Math.PI;
            // this.calculEntityDic(angle)
            this.curState = ActionState.RUN;
            // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
            // this._mc.playFile(this._res,-1,null,false,this._dic.toString());
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(xy.x, xy.y);
            this.changeRoleAction(null, endP);
            var distance = egret.Point.distance(startP, endP);
            var time = distance / this.soldierAttr.spd;
            // let useTime:number = time*1000;
            // if(!this.general && isquick){
            // 	useTime = time*500;
            // }
            egret.Tween.get(this).to({ x: xy.x + randomXY.x, y: xy.y + randomXY.y }, 400).call(function () {
                egret.Tween.removeTweens(_this);
                _this.moveEnd = true;
                if (_this._mc) {
                    // this.curState = ActionState.STAND;
                    // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
                    // this._mc.playFile(this._res,-1,null,false,this._dic.toString());
                    // this.changeRoleAction();
                    if (cb && thisarg) {
                        cb.call(thisarg);
                    }
                }
            }, this);
        }
        else {
            if (this && this._atkTar && !this._atkTar.isDead) {
                // let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
                // this.calculEntityDic(angle);
                this.moveEnd = false;
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
                            _this.moveEnd = true;
                            egret.Tween.removeTweens(_this);
                        }
                    }, onChangeObj: this }).to({ x: this._atkTar.x, y: this._atkTar.y }, time * 1000).call(function () {
                    _this.moveEnd = true;
                    egret.Tween.removeTweens(_this);
                });
            }
        }
    };
    SoldierEntity.prototype.findPath = function (ex, ey, last) {
        if (last === void 0) { last = false; }
        if (!this.route.length) {
            // this.moveEnd = true;
            var _path = MapView.inst().findPath(this.x, this.y, ex, ey);
            if (_path) {
                _path.shift();
                this.route = _path;
            }
        }
        if (this.route && this.route.length && this.moveEnd) {
            //去掉第一个格子 。这个格子与人物在一个格子
            var node = this.route.shift();
            var xy = GameMap.grid2Point(node.x, node.y);
            var randomX = 0;
            var randomY = 0;
            if (last) {
                randomX = ((Math.random() * 60) >> 0);
                randomY = ((Math.random() * 60) >> 0);
            }
            this.execMoveAction(xy, null, this, null, { x: randomX, y: randomY });
        }
    };
    // /**执行站立状态 */
    SoldierEntity.prototype.execStandAction = function () {
        this.moveEnd = true;
        this.curState = ActionState.STAND;
        this.changeRoleAction();
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
        if (!this._atkTar || (this._atkTar && this._atkTar.isDead)) {
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
    Object.defineProperty(SoldierEntity.prototype, "isnoMp", {
        get: function () {
            return this._isnoMp;
        },
        enumerable: true,
        configurable: true
    });
    SoldierEntity.prototype.dispose = function () {
        // ObjectPool.push(this);
        // if(this.timeInterVal){
        // 	clearInterval(this.timeInterVal)
        // }
        this.curState = ActionState.DEAD;
        this.changeRoleAction();
        // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
        // this._mc.playFile(this._res,1,null,true,this._dic.toString());
        if (this._watcher) {
            this._watcher.unwatch();
        }
        if (this._watcher2) {
            this._watcher2.unwatch();
        }
        var self = this;
        egret.Tween.removeTweens(this);
        MapView.inst().refreshRoleItem(this);
        if (this.general) {
            MapView.inst().destoryMainRole();
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
        }, 300);
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
    return SoldierEntity;
}(BaseEntity));
__reflect(SoldierEntity.prototype, "SoldierEntity");
//# sourceMappingURL=SoldierEntity.js.map