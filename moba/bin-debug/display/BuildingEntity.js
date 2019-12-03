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
var BuildingEntity = (function (_super) {
    __extends(BuildingEntity, _super);
    function BuildingEntity() {
        var _this = _super.call(this) || this;
        /**攻击状态 */
        _this.atkState = false;
        _this.type = 0;
        return _this;
    }
    BuildingEntity.prototype.setSoldierData = function (camp, res, attr, time, scale) {
        if (res === void 0) { res = ""; }
        this.touchEnabled = true;
        this.touchChildren = false;
        this._camp = camp;
        if (scale) {
            this._scale = scale;
            this.scaleX = this.scaleY = scale;
        }
        var buildImg = new eui.Image();
        buildImg.source = res;
        this.addChild(buildImg);
        this.modelImg = buildImg;
        this.type = attr.type;
        // let bodyres:string = `${this._res}_${this.dic}${this.curState}`;
        // this._mc = new MovieClip();
        // this.addChild(this._mc);
        // this._mc.playFile(bodyres,-1);
        this.buildAttr = attr;
        this.monsterAttr = attr;
        this.soldierAttr = attr;
        this._hp = this._thp = this.buildAttr.hp;
        this.progressGroup = new eui.Group();
        this.progressGroup.width = 106;
        this.addChild(this.progressGroup);
        this.progressGroup.anchorOffsetX = 53;
        this.progressGroup.scaleX = this.progressGroup.scaleY = 1;
        // this.progressGroup.x = -40;
        // let barRes:number = 0xfc3434;
        // let barimg:egret.Shape = new egret.Shape();
        // barimg.graphics.beginFill(barRes,1);
        // barimg.graphics.drawRect(0,0,90,8);
        // this._barImg = barimg;
        // barimg.graphics.endFill();
        // this.progressGroup.addChild(barimg);
        var hpbarimg = new eui.Image();
        hpbarimg.source = "own_hp_bg_png";
        this.progressGroup.addChild(hpbarimg);
        // hpbarimg.y = - (buildImg.height>>1) - 50;
        var hpimg = new eui.Image();
        hpimg.source = this.camp == 1 ? "own_hp_bar_png" : "enemy_hp_bar_png";
        this.progressGroup.addChild(hpimg);
        this._barImg = hpimg;
        hpimg.y = 4;
        hpimg.x = 10;
        // hpimg.y = hpbarimg.y;
        this.progressGroup.horizontalCenter = 0;
        this.progressGroup.y = -30;
        this._watcher = eui.Binding.bindHandler(this, ["_hp"], this.onHpChange, this);
    };
    Object.defineProperty(BuildingEntity.prototype, "area", {
        /**获取格子所占的位置 */
        get: function () {
            if (this.camp == 1 && this.buildAttr.type == 1) {
                return GameMap.calculBuildGridArea(new egret.Rectangle(this.x - ((this.width * this._scale)), this.y - ((this.height * this._scale) >> 1), this.width * this._scale, this.height * this._scale));
            }
            return GameMap.calculBuildGridArea(new egret.Rectangle(this.x - ((this.width * this._scale) >> 1), this.y - ((this.height * this._scale) >> 1), this.width * this._scale, this.height * this._scale));
        },
        enumerable: true,
        configurable: true
    });
    /**更新怪物坐标各自占有值 */
    BuildingEntity.prototype.refreshPos = function (gx, gy) {
        if (gx != this.gx || gy != this.gy) {
            // GameMap.AstarNode.setWalkable(this.gx,this.gy,true);
            this.gx = gx;
            this.gy = gy;
            // GameMap.AstarNode.setWalkable(gx,gy,false);
        }
    };
    BuildingEntity.prototype.upgrade = function () {
        this.soldierAttr.atk += ((this.soldierAttr.atk * 0.2) >> 0);
        this.soldierAttr.level = GameApp.level;
        this.soldierAttr.hp += ((this.soldierAttr.hp * 0.2) >> 0);
    };
    /**获取到目标位置的距离 是否达到攻击距离 */
    BuildingEntity.prototype.isInAtkDis = function () {
        if (this && this._atkTar && !this._atkTar.isDead) {
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
            var distance = Math.sqrt(Math.pow(endP.x - startP.x, 2) + Math.pow(endP.y - startP.y, 2));
            return Math.abs(distance) <= this.buildAttr.atkDis;
        }
    };
    /**执行攻击动作 */
    BuildingEntity.prototype.execAtkAction = function () {
        var _this = this;
        if (this.isInAtkDis() && !this.atkState && isNaN(this.pos)) {
            this.atkState = true;
            var self_1 = this;
            if (this._atkTar && !this._atkTar.isDead) {
                var mc_1 = new MovieClip(true);
                LayerManager.MAP_LAYER.addChild(mc_1);
                mc_1.scaleX = mc_1.scaleY = 0.2;
                mc_1.playFile(EFFECT + "fire", -1);
                mc_1.x = this.x;
                if (this.camp == -1) {
                    mc_1.y = this.y - (this.height >> 1);
                }
                else {
                    mc_1.y = this.y - 150;
                }
                // mc.y = this.y;
                var x_1 = this._atkTar.x;
                var y_1 = this._atkTar.y;
                egret.Tween.get(mc_1).to({ x: x_1, y: y_1 }, 800).call(function () {
                    egret.Tween.removeTweens(mc_1);
                    if (mc_1.parent) {
                        mc_1.parent.removeChild(mc_1);
                    }
                    self_1.atkState = false;
                    if (_this._atkTar) {
                        var offX = Math.abs(_this._atkTar.x - x_1);
                        var offY = Math.abs(_this._atkTar.y - y_1);
                        if (offX <= 50 && offY <= 50) {
                            var boommc = new MovieClip();
                            _this._atkTar.addChild(boommc);
                            boommc.playFile(EFFECT + "eff_101_boom", 1, null, true);
                            boommc.y -= 50;
                            if (self_1 && self_1._atkTar) {
                                var index = (Math.random() * 15 + 5) >> 0;
                                var direct = ((Math.random() * 100) >> 0) >= 50 ? -1 : 1;
                                var atk = self_1.soldierAttr.atk + direct * index;
                                var critIndex = (Math.random() * 100) >> 0;
                                var value = null;
                                if (critIndex >= 60) {
                                    value = ((atk * self_1._crit) >> 0);
                                }
                                self_1._atkTar.reduceHp(atk + self_1.buffAttack);
                            }
                        }
                    }
                }, this);
            }
        }
    };
    /**隐藏选中 */
    BuildingEntity.prototype.hideSelect = function () {
        if (!!this.selctMc && this.selctMc.parent) {
            this.selctMc.parent.removeChild(this.selctMc);
            this.selctMc = null;
        }
    };
    /**显示选中状态 */
    BuildingEntity.prototype.showSelect = function () {
        if (this.selctMc) {
            return;
        }
        var mc = new MovieClip();
        this.selctMc = mc;
        mc.scaleX = mc.scaleY = 3;
        mc.playFile(EFFECT + "select", -1);
        this.addChildAt(mc, 0);
        mc.x = this.modelImg.x + (this.modelImg.width / 2) - 10;
        mc.y = this.modelImg.y + this.modelImg.height - 65;
    };
    /**锁定目标 */
    BuildingEntity.prototype.lookAt = function (_atkTar, isNew) {
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
    BuildingEntity.prototype.unLookAt = function () {
        this._atkTar = null;
    };
    BuildingEntity.prototype.onHpChange = function (value) {
        if (!isNaN(value)) {
            var percent = value / this._thp;
            if (this._barImg) {
                this._barImg.width = percent * 90;
            }
        }
        // if(!this.timeout){
        // 	let self = this;
        // 	this.timeout = setTimeout(function() {
        // 		self.atkState = false;
        // 		clearTimeout(self.timeout);
        // 		self.timeout = null;
        // 	}, 3000);
        // }
    };
    Object.defineProperty(BuildingEntity.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    BuildingEntity.prototype.dispose = function () {
        var _this = this;
        if (this._watcher) {
            this._watcher.unwatch();
        }
        var self = this;
        if (this.camp == -1) {
            MapView.inst().refreshMonItem(this);
            MapView.inst().changeRoleTower();
        }
        else {
            MapView.inst().refreshRoleItem(this);
        }
        for (var i = 0; i < this.area.length; i++) {
            var xy = this.area[i];
            GameMap.AstarNode.setWalkable(xy.x, xy.y, true);
        }
        egret.Tween.get(this).to({ alpha: 0 }, 600).call(function () {
            egret.Tween.removeTweens(_this);
            _this._atkTar = null;
            if (_this && _this.parent) {
                _this.parent.removeChild(_this);
            }
        }, this);
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    Object.defineProperty(BuildingEntity.prototype, "hp", {
        set: function (value) {
            this._hp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildingEntity.prototype, "thp", {
        set: function (value) {
            this._thp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildingEntity.prototype, "atkTar", {
        get: function () {
            return this._atkTar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildingEntity.prototype, "buffAtk", {
        set: function (value) {
            this.buffAttack = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildingEntity.prototype, "buffHP", {
        set: function (value) {
            this.buffHp = value;
        },
        enumerable: true,
        configurable: true
    });
    return BuildingEntity;
}(BaseEntity));
__reflect(BuildingEntity.prototype, "BuildingEntity");
//# sourceMappingURL=BuildingEntity.js.map