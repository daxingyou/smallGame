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
        // private progressGroup:eui.Group;
        _this.ObjectPoolKey = "SoldierEntity";
        _this.general = false;
        _this.camp = 1;
        _this.atkState = false;
        _this.buffState = false;
        /**反戈一击buff */
        _this.buff_100011 = false;
        //克制攻击力
        _this.restriceAtk = 0;
        _this.buffWait = false;
        _this.preventX = 0;
        return _this;
    }
    SoldierEntity.prototype.initialize = function () {
    };
    SoldierEntity.prototype.setSoldierData = function (camp, res, scale, soldierId) {
        if (scale === void 0) { scale = 1; }
        this._camp = camp;
        this.camp = camp;
        this._direc = this._camp == 1 ? 1 : -1;
        this._res = res;
        this._scale = scale;
        this.scaleX = this.scaleY = scale;
        this.scaleX = this.scaleX * camp;
        // let bodyres:string = `${BODY}${res}_${this.dic}${this.curState}`
        // this._weaponRes = weaponRes;
        // let weapon:string = `${WEAPON}${weaponRes}_${this.dic}${this.curState}`
        this.instId = soldierId;
        this._mc = new MovieClip();
        this.addChild(this._mc);
        // this._mc.playFile(bodyres,-1);
        this._hp = this._thp = this.soldierAttr.hp;
        // this._mp = this._tmp = this.soldierAttr.mp;
        this._weaponMc = new MovieClip();
        this.addChild(this._weaponMc);
        // this._weaponMc.playFile(weapon,-1)
        // this.progressGroup = new eui.Group();
        // this.progressGroup.width = 80;
        // this.addChild(this.progressGroup);
        // this.progressGroup.anchorOffsetX = 40;
        // // this.progressGroup.x = -40;
        // this.progressGroup.y = -110;
        // let levelLab:eui.Label = new eui.Label();
        // this.progressGroup.addChild(levelLab);
        // levelLab.fontFamily = "yt";
        // levelLab.size = 20;
        // levelLab.text = this.soldierAttr.level .toString()+"级";
        // levelLab.horizontalCenter = 0;
        // levelLab.top = -23;
        // let hpbarimg:eui.Image = new eui.Image();
        // hpbarimg.source = "entity_hp_bg_png";
        // this.progressGroup.addChild(hpbarimg);
        // hpbarimg.y = -15;
        // let hpimg:eui.Image = new eui.Image();
        // hpimg.source = "entity_hp_bar_png";
        // this.progressGroup.addChild(hpimg)
        // this._barimg = hpimg;
        // hpimg.y = -15;
        // let mpbarimg:eui.Image = new eui.Image();
        // mpbarimg.source = "entity_hp_bg_png";
        // this.progressGroup.addChild(mpbarimg);
        // mpbarimg.y = -7;
        // let mpimg:eui.Image = new eui.Image();
        // mpimg.source = "entity_mp_bar_png";
        // this.progressGroup.addChild(mpimg)
        // this._mpbarimg = mpimg;
        // mpimg.y = -7;
        // let nameLab:eui.Label = new eui.Label;
        // nameLab.text = GameApp.roleName;
        // this.progressGroup.addChild(nameLab);
        // nameLab.y = -40;
        // nameLab.horizontalCenter = 0;
        // nameLab.size = 20;
        // nameLab.stroke = 1;
        // nameLab.strokeColor = 0x000000;
        // nameLab.fontFamily = "ht";
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
        // this._watcher2 = eui.Binding.bindHandler(this,["_mp"],this.onMpChange,this);
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
        // let buffmc:MovieClip = new MovieClip();
        // this.addChild(buffmc);
        // // buffmc.x = this.x;
        // // buffmc.y = this.y;
        // buffmc.playFile(`${EFFECT}upstate`,3,null,true);
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
                this._barimg.width = percent * 90;
            }
        }
    };
    SoldierEntity.prototype.showAtkBuff = function () {
        var atkEff = new MovieClip();
        this.addChild(atkEff);
        if (this.soldierAttr.type == SoldierType.SOLDIER_GONG) {
            atkEff.playFile(EFFECT + "buff_gong", -1);
        }
        else {
            atkEff.playFile(EFFECT + "buff_atk", -1);
        }
        atkEff.x += 10;
        atkEff.y -= (this.height >> 1);
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            if (atkEff && atkEff.parent) {
                atkEff.parent.removeChild(atkEff);
            }
        }, 800);
    };
    SoldierEntity.prototype.showDefBuff = function (num) {
        var img = new eui.Image();
        img.source = "buff_def_png";
        this.addChild(img);
        img.anchorOffsetX = img.width >> 1;
        img.anchorOffsetY = img.height;
        this.buffDef = num;
        var rect = new eui.Rect();
        rect.fillColor = 0x000000;
        rect.anchorOffsetX = img.width >> 1;
        rect.anchorOffsetY = img.height;
        rect.width = 0;
        rect.height = 90;
        this.addChild(rect);
        img.mask = rect;
        img.scaleX = img.scaleY = 0.5;
        rect.scaleX = rect.scaleY = 0.5;
        egret.Tween.get(rect).to({ width: 80 }, 200).wait(500).call(function () {
            egret.Tween.removeTweens(rect);
            if (rect && rect.parent) {
                rect.parent.removeChild(rect);
            }
            if (img && img.parent) {
                img.parent.removeChild(img);
            }
        }, this);
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
        this.soldierAttr.hp += 1500;
        this._hp = this._thp = this.soldierAttr.hp;
        // this.soldierAttr.level = GameApp.level;
        // this.soldierAttr.atk = 500*GameApp.level + ((Math.random()*100)>>0)
    };
    // private frameRate:number = 0;
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
    SoldierEntity.prototype.changeRoleAction = function (state, playCount) {
        if (state === void 0) { state = ""; }
        if (playCount === void 0) { playCount = -1; }
        // let dic:number = this.dic;
        // if(tarPoint){
        // 	let angle:number = Math.atan2(tarPoint.y - this.y,tarPoint.x-this.x)*180/Math.PI;
        // 	this.calculEntityDic(angle);
        // }else{
        // 	if(this.atkTar && !this.atkTar.isDead){
        // 		let angle:number = Math.atan2(this.atkTar.y - this.y,this.atkTar.x-this.x)*180/Math.PI;
        // 		this.calculEntityDic(angle);
        // 	}
        // }
        // if(this.scaleX == -1){
        // 	this.progressGroup.scaleX = -1;
        // }else{
        // 	this.progressGroup.scaleX = 1;
        // }
        // if(this._atkTar && !this._atkTar.isDead){
        // 	let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
        // 	this.calculEntityDic(angle);
        // }
        if (!!state) {
            if (this.curState == state) {
                return;
            }
            this.curState = state;
        }
        // let bodyres:string = `${BODY}${this._res}_${GameApp.sex}_${this.dic}${this.curState}`
        // let weapon:string = `${WEAPON}${this._weaponRes}_${GameApp.sex}_${this.dic}${this.curState}`
        if (this._mc) {
            // let frameRate:number = (this.curState == ActionState.ATTACK?this.frameRate?this.frameRate:null:15)
            this._mc.playFile(this._res + "_" + this.curState, -1, null, null);
            var id = this.soldierAttr.id;
            if (this.curState == ActionState.STAND && (id == 100105 || id == 100109 || id == 100111 || id == 100112 || this.soldierAttr.type == CardType.general)) {
                egret.Tween.removeTweens(this);
                egret.Tween.get(this, { loop: true }).to({ scaleY: 0.95 }, 200).to({ scaleY: 1 }, 200);
            }
            if (this.curState == ActionState.RUN) {
                this.addCloud();
            }
            else {
                this.hideCloud();
            }
            // this._weaponMc.playFile(weapon,-1,null,null,null,null,frameRate);
        }
    };
    SoldierEntity.prototype.addCloud = function () {
        if (this.yanMc) {
            return;
        }
        this.yanMc = new MovieClip();
        this.yanMc.scaleX = this.yanMc.scaleY = 0.04;
        if (this.scaleX < 0) {
            this.yanMc.scaleX = 0.04 * this.camp;
        }
        else {
            this.yanMc.scaleX = -0.04 * this.camp;
        }
        this.yanMc.playFile(EFFECT + "yan", -1);
        this.addChild(this.yanMc);
        if (this._mc) {
            this.swapChildren(this.yanMc, this._mc);
        }
        // if(this.camp == 1){
        // 	this.yanMc.y += 10;
        // }
    };
    /**隐藏烟雾 */
    SoldierEntity.prototype.hideCloud = function () {
        if (this.yanMc && this.yanMc.parent) {
            this.yanMc.parent.removeChild(this.yanMc);
            this.yanMc = null;
        }
    };
    /**激活buff */
    SoldierEntity.prototype.activeBuff = function (buffId) {
        var cardVo = GlobalFun.getCardDataFromId(buffId);
        var mc = new MovieClip();
        this.addChild(mc);
        var self = this;
        switch (buffId) {
            case 100011:
                this.buff_100011 = true;
                this.buffState = true;
                mc.playFile("" + EFFECT + cardVo.buffSkillRes, 1, null, true);
                var timeout_1 = setTimeout(function () {
                    clearTimeout(timeout_1);
                    if (self_1) {
                        self_1.buffState = false;
                        self_1.buff_100011 = false;
                    }
                }, 10000);
                break;
            default:
                this.buff_100011 = true;
                this.buffState = true;
                mc.playFile("" + EFFECT + cardVo.buffSkillRes, 1, null, true);
                var self_1 = this;
                var timeout2_1 = setTimeout(function () {
                    clearTimeout(timeout2_1);
                    if (self_1) {
                        self_1.buffState = false;
                        self_1.buff_100011 = false;
                    }
                }, 10000);
                break;
        }
    };
    /**执行攻击动作 */
    SoldierEntity.prototype.execAtkAction = function (generalId, cb, arg) {
        if (this.yunMc) {
            if (cb && arg) {
                cb.call(arg);
            }
            return;
        }
        var self = this;
        if (generalId) {
            this.activeBuff(generalId);
            if (this.general) {
                this.execOnceAtkAction();
                return;
            }
        }
        if (this.soldierAttr.type == CardType.general) {
            //当前不是弓兵
            this.execMoveAction(null, function () {
                SoundManager.inst().playEffect(MUSIC + "atk.mp3");
                if (self.curState != ActionState.ATTACK) {
                    self.curState = ActionState.ATTACK;
                    self.changeRoleAction();
                }
                if (self.general) {
                    var mc = new MovieClip();
                    self.addChild(mc);
                    mc.playFile(EFFECT + "general_atk", 1, null, true);
                }
                var timeout = setTimeout(function () {
                    clearTimeout(timeout);
                    //当前攻击执行完毕
                    self.execMoveAction({ x: self.x, y: self.y }, function () {
                        if (self.generalId == 100011) {
                            self.buffState = false;
                        }
                        self.scaleX = self.scaleX * -1;
                        self.curState = ActionState.STAND;
                        self.changeRoleAction();
                    }, self);
                }, 300);
            }, this);
        }
        else {
            if (this.curState != ActionState.ATTACK) {
                this.curState = ActionState.ATTACK;
                this.changeRoleAction();
            }
            //需要远程攻击
            this.createArrow();
            var timeout2_2 = setTimeout(function () {
                clearTimeout(timeout2_2);
                self.createArrow();
            }, 150);
            var timeout_2 = setTimeout(function () {
                clearTimeout(timeout_2);
                //当前攻击执行完毕
                self.curState = ActionState.STAND;
                self.changeRoleAction();
            }, 300);
        }
    };
    SoldierEntity.prototype.showWaitState = function () {
        var self = this;
        if (this.yunMc) {
            if (this.yunTime) {
                clearTimeout(this.yunTime);
                this.buffWait = true;
                this.yunTime = setTimeout(function () {
                    clearTimeout(self.yunTime);
                    self.hideWaitState();
                    self.buffWait = false;
                }, 6000);
            }
            return;
        }
        this.yunMc = new MovieClip();
        this.addChild(this.yunMc);
        this.yunMc.playFile(EFFECT + "buff3", -1);
        this.buffWait = true;
        this.yunTime = setTimeout(function () {
            clearTimeout(self.yunTime);
            self.hideWaitState();
            self.buffWait = false;
        }, 6000);
    };
    SoldierEntity.prototype.hideWaitState = function () {
        if (this.yunMc && this.yunMc.parent) {
            this.yunMc.parent.removeChild(this.yunMc);
            this.yunMc = null;
        }
    };
    /**显示中毒buff */
    SoldierEntity.prototype.showPosion = function () {
        var self = this;
        if (this.posionMc) {
            if (this.posionTime) {
                clearTimeout(this.posionTime);
                this.posionTime = setTimeout(function () {
                    clearTimeout(self.posionTime);
                    self.hidePostion();
                }, 5000);
            }
            return;
        }
        this.posionMc = new MovieClip();
        this.addChild(this.posionMc);
        this.posionMc.scaleX = this.posionMc.scaleY = 0.5;
        this.posionMc.playFile(EFFECT + "buff4", -1);
        this.posionTime = setTimeout(function () {
            clearTimeout(self.posionTime);
            self.posionTime = null;
            self.hidePostion();
        }, 5000);
    };
    SoldierEntity.prototype.hidePostion = function () {
        if (this.posionMc && this.posionMc.parent) {
            this.posionMc.parent.removeChild(this.posionMc);
            this.posionMc = null;
        }
    };
    /**执行受击动作 */
    SoldierEntity.prototype.execAtkedAction = function (cb, arg) {
        var _this = this;
        if (this.buff_100011) {
            this.execOnceAtkAction();
            if (cb && arg) {
                cb.call(arg);
            }
        }
        var id = this.soldierAttr.id;
        egret.Tween.get(this).to({ x: this.x - 20 * this.camp }, 200).to({ x: this.x }, 200).call(function () {
            egret.Tween.removeTweens(_this);
            if (_this.curState == ActionState.STAND && (id == 100105 || id == 100109 || id == 100111 || id == 100112 || _this.soldierAttr.type == CardType.general)) {
                egret.Tween.get(_this, { loop: true }).to({ scaleY: 0.95 }, 200).to({ scaleY: 1 }, 200);
            }
        }, this);
        var hurtMc = new MovieClip();
        hurtMc.playFile(EFFECT + "hurt", 1, null, true);
        this.addChild(hurtMc);
    };
    SoldierEntity.prototype.showHurtMc = function () {
        var hurtMc = new MovieClip();
        hurtMc.playFile(EFFECT + "hurt", 1, null, true);
        this.addChild(hurtMc);
    };
    /**执行一次攻击动作 */
    SoldierEntity.prototype.execOnceAtkAction = function () {
        var self = this;
        if (this.curState != ActionState.ATTACK) {
            this.curState = ActionState.ATTACK;
            this.changeRoleAction();
        }
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.curState = ActionState.STAND;
            self.changeRoleAction();
        }, 300);
    };
    SoldierEntity.prototype.changeRoleMp = function (value) {
        this.changeMp(value);
    };
    /**创建弓箭 */
    SoldierEntity.prototype.createArrow = function () {
        var res = "bullet";
        var id = this.soldierAttr.id;
        if (id == 100105) {
            res = "bullet5";
        }
        else if (id == 100106) {
            res = "bullet3";
        }
        else if (id == 100107) {
            res = "bullet4";
        }
        else if (id == 100109) {
            res = "bullet5";
        }
        else if (id == 100110) {
            res = "bullet2";
        }
        else if (id == 100111) {
            res = "bullet5";
        }
        else if (id == 100112) {
            res = "bullet4";
        }
        else if (id == 100113) {
            res = "bullet2";
        }
        if (id == 100105 || id == 100109) {
            var boomMc = new MovieClip();
            boomMc.scaleX = boomMc.scaleY = 0.6;
            boomMc.playFile(EFFECT + "bulfire", 1, null, true);
            this.parent.addChild(boomMc);
            boomMc.scaleX = this.camp * boomMc.scaleX;
            boomMc.x = this.x;
            boomMc.y = this.y - (this.h >> 1);
        }
        if (id == 100110 || id == 100111 || id == 100113) {
            //导弹
            var bullet = new Bullet(this.x, this.y - (this.h >> 1), this.targetDis, this.y, 0, "game_arrow0_png");
            this.parent.addChild(bullet);
            GlobalFun.lighting(bullet);
        }
        else {
            //正常攻击
            var img_1 = new MovieClip();
            img_1.playFile("" + EFFECT + res, -1);
            img_1.scaleX = img_1.scaleY = 0.5;
            this.parent.addChild(img_1);
            img_1.anchorOffsetX = 20;
            img_1.scaleX = this.camp * img_1.scaleX;
            // let angle:number = Math.atan2(this.y,this.atkTar.x + this.targetDis*this.camp)*180/Math.PI;
            // img.rotation = angle;
            img_1.x = this.x;
            img_1.y = this.y - (this.h >> 1);
            egret.Tween.get(img_1).to({ x: this.targetDis, y: this.y }, 300).call(function () {
                egret.Tween.removeTweens(img_1);
                img_1.parent.removeChild(img_1);
            }, this);
        }
    };
    /**执行前往目标附近位置 */
    SoldierEntity.prototype.execMoveAction = function (xy, cb, thisarg) {
        var _this = this;
        if (xy) {
            this.scaleX = this.scaleX * -1;
            if (this.curState != ActionState.RUN) {
                this.curState = ActionState.RUN;
                // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
                // this._mc.playFile(this._res,-1,null,false,this._dic.toString());
                this.changeRoleAction();
                this.addCloud();
                if (this.yanMc) {
                    this.yanMc.scaleX *= -1;
                }
            }
            egret.Tween.get(this).to({ x: this.preventX }, 500).call(function () {
                _this.preventX = null;
                if (_this.yanMc) {
                    _this.yanMc.scaleX *= -1;
                }
                egret.Tween.removeTweens(_this);
                var id = _this.soldierAttr.id;
                if (_this.curState == ActionState.STAND && (id == 100105 || id == 100109 || id == 100111 || id == 100112 || _this.soldierAttr.type == CardType.general)) {
                    egret.Tween.get(_this, { loop: true }).to({ scaleY: 0.95 }, 200).to({ scaleY: 1 }, 200);
                }
                _this.hideCloud();
                if (cb && thisarg) {
                    cb.call(thisarg);
                }
            }, this);
        }
        else {
            if (this && this.targetDis) {
                // let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
                // this.calculEntityDic(angle);
                if (this.curState != ActionState.RUN) {
                    this.curState = ActionState.RUN;
                    // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
                    // this._mc.playFile(this._res,-1,null,false,this._dic.toString());
                    this.changeRoleAction();
                    this.addCloud();
                }
                this.preventX = this.x;
                egret.Tween.get(this).to({ x: this.targetDis }, 500).call(function () {
                    egret.Tween.removeTweens(_this);
                    var id = _this.soldierAttr.id;
                    if (_this.curState == ActionState.STAND && (id == 100105 || id == 100109 || id == 100111 || id == 100112 || _this.soldierAttr.type == CardType.general)) {
                        egret.Tween.get(_this, { loop: true }).to({ scaleY: 0.95 }, 200).to({ scaleY: 1 }, 200);
                    }
                    _this.hideCloud();
                    if (cb && thisarg) {
                        cb.call(thisarg);
                    }
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
    // public isInAtkDis():boolean{
    // 	// if(!this._atkTar){
    // 	// 	return this.isInAtk;
    // 	// }
    // 	if(this && this._atkTar && !this._atkTar.isDead){
    // 		let startP:egret.Point = new egret.Point(this.x,this.y);
    // 		let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
    // 		let distance:number = Math.sqrt(Math.pow(endP.x - startP.x,2) + Math.pow(endP.y - startP.y,2));
    // 		return  Math.abs(distance) <= this.soldierAttr.atkDis;
    // 	}
    // }
    // /**锁定目标 */
    // public lookAt(_atkTar:MonsterEntity,isNew:boolean = false):void{
    // 	// this.addAttrRestrict();
    // 	if(isNew){
    // 		this._atkTar = _atkTar;
    // 		return;
    // 	}
    // 	if(!this._atkTar ||(this._atkTar && this._atkTar.isDead)){
    // 		//重新锁定目标
    // 		this._atkTar = _atkTar;
    // 		if(this.isActive){
    // 			if(this._atkTar && this._atkTar.type == GameApp.weapon){
    // 				if(GameApp.weapon == 0){
    // 					this._crit = 1;
    // 				}else if(GameApp.weapon == 1){
    // 					this.buffAttack = this.soldierAttr.atk;
    // 				}else{
    // 					this.frameRate = 24;
    // 				}
    // 				this.buffEffect.visible = true;
    // 			}else{
    // 				this._crit = 0.4;
    // 				this.buffAttack =0;
    // 				this.frameRate = null;
    // 				this.buffEffect.visible = false;
    // 			}
    // 		}
    // 	}else{
    // 		return;
    // 	}
    // }
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
        // if(this.timeout){
        // 	clearTimeout(this.timeout)
        // }
        SoundManager.inst().playEffect(MUSIC + "dead.mp3");
        this.curState = ActionState.DEAD;
        this.changeRoleAction();
        // this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
        // this._mc.playFile(this._res,1,null,true,this._dic.toString());
        MessageManager.inst().dispatch("role_dead", { camp: this.camp, tar: this });
        if (this._watcher) {
            this._watcher.unwatch();
        }
        if (this._watcher2) {
            this._watcher2.unwatch();
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
        get: function () {
            return this._hp;
        },
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
        get: function () {
            return this._thp;
        },
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