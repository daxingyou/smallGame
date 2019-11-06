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
var BaseEntity = (function (_super) {
    __extends(BaseEntity, _super);
    function BaseEntity() {
        var _this = _super.call(this) || this;
        //方向
        _this._dic = 4;
        _this._hp = 40;
        _this._thp = 40;
        _this._attack = 20;
        _this._changeValue = 0.1;
        _this._isDead = false;
        _this.buffAttack = 0;
        _this.buffHp = 0;
        _this.buffDef = 0;
        _this._scale = 1;
        _this._crit = 0.4;
        _this.initialize();
        return _this;
    }
    BaseEntity.prototype.initialize = function () { };
    Object.defineProperty(BaseEntity.prototype, "camp", {
        get: function () {
            return this._camp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "instId", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "dic", {
        get: function () {
            return this._dic;
        },
        set: function (value) {
            this._dic = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "attack", {
        get: function () {
            var index = (Math.random() * 100) >> 0;
            var dic = index >= 50 ? 1 : -1;
            return (this._attack + this.buffAttack) + dic * ((this._attack + this.buffAttack) * this._changeValue);
        },
        set: function (value) {
            this._attack = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseEntity.prototype.reduceHp = function (dmg, critValue) {
        if (this.buffHp > 0) {
            this.buffHp -= dmg;
        }
        else {
            // let cirt:boolean = false;
            // if(this._camp == -1){
            // 	let index:number = (Math.random()*100)>>0;
            // 	if(index >= 60){
            // 		cirt = true;
            // 		dmg += ((dmg*this._crit)>>0);
            // 	}
            // }
            this._hp -= critValue ? dmg + critValue : dmg;
            var dmgfont_1 = new eui.BitmapLabel();
            dmgfont_1.scaleX = dmgfont_1.scaleY = 0.7;
            if (GameApp.fuben == "boss" && this._camp == -1) {
                MessageManager.inst().dispatch(CustomEvt.BOSS_DMG, { dmg: dmg });
            }
            dmgfont_1.font = "dmg_fnt";
            this.parent.addChildAt(dmgfont_1, this.parent.numChildren - 1);
            dmgfont_1.text = critValue ? "c-" + (dmg + critValue) : "-" + dmg;
            dmgfont_1.x = this.x;
            dmgfont_1.y = this.y + -100 + ((Math.random() * 50) >> 0);
            // if(this.scaleX < 0){
            // 	dmgfont.scaleX = -0.7;
            // }else{
            // 	dmgfont.scaleX = 0.7;
            // }
            egret.Tween.get(dmgfont_1).to({ y: this.y - 150 }, 600 + ((Math.random() * 400) >> 0), egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(dmgfont_1);
                if (dmgfont_1 && dmgfont_1.parent) {
                    dmgfont_1.parent.removeChild(dmgfont_1);
                }
            }, this);
            if (this._hp <= 0) {
                this._hp = 0;
                this._isDead = true;
                if (GameApp.fuben != "boss" && this._camp == -1) {
                    MessageManager.inst().dispatch(CustomEvt.BOSS_DEAD);
                }
                this.dispose();
            }
        }
    };
    //计算方向
    BaseEntity.prototype.calculEntityDic = function (angle) {
        if (angle >= -20 && angle <= 20) {
            this._dic = DirectionEnum.RIGHT;
            this.scaleX = this._scale;
        }
        else if (angle < -20 && angle >= -70) {
            this._dic = DirectionEnum.TR;
            this.scaleX = this._scale;
        }
        else if (angle < -70 && angle > -110) {
            this._dic = DirectionEnum.TOP;
            this.scaleX = this._scale;
        }
        else if (angle > 20 && angle <= 70) {
            this._dic = DirectionEnum.RB;
            this.scaleX = this._scale;
        }
        else if (angle > 70 && angle <= 110) {
            this._dic = DirectionEnum.BOTTOM;
            this.scaleX = this._scale;
        }
        else if (angle > 110 && angle <= 160) {
            this._dic = DirectionEnum.RB;
            this.scaleX = -this._scale;
        }
        else if ((angle > 160 && angle <= 180) || (angle >= -180 && angle <= -160)) {
            this._dic = DirectionEnum.RIGHT;
            this.scaleX = -this._scale;
        }
        else if (angle > -160 && angle <= -110) {
            this._dic = DirectionEnum.TR;
            this.scaleX = -this._scale;
        }
    };
    BaseEntity.prototype.dispose = function () {
    };
    return BaseEntity;
}(eui.Component));
__reflect(BaseEntity.prototype, "BaseEntity");
//# sourceMappingURL=BaseEntity.js.map