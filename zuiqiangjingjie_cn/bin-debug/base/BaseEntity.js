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
        _this._mp = 40;
        _this._tmp = 40;
        _this._attack = 20;
        _this._changeValue = 0.1;
        _this._isDead = false;
        _this.buffAttack = 0;
        _this.buffHp = 0;
        _this.buffDef = 0;
        _this._scale = 1;
        _this._crit = 0.4;
        _this._isnoMp = false;
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
        set: function (value) {
            this._id = value;
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
            var dmage = critValue ? dmg + critValue : dmg;
            if (this.buffDef) {
                dmage -= ((dmage * this.buffDef) >> 0);
                this.buffDef = 0;
            }
            this._hp -= (dmage >= 0 ? dmage : 0);
            // let dmgfont:eui.BitmapLabel = new eui.BitmapLabel();
            // dmgfont.scaleX = dmgfont.scaleY = 0.7;
            // dmgfont.font = "dmg_fnt";
            // if(this.parent){
            // 	this.parent.addChildAt(dmgfont,this.parent.numChildren - 1);
            // }
            // dmgfont.text = critValue?"c-"+(dmg+critValue):"-"+dmg;
            // dmgfont.x = this.x;
            // dmgfont.y = this.y + -100 + ((Math.random()*50)>>0);
            // // if(this.scaleX < 0){
            // // 	dmgfont.scaleX = -0.7;
            // // }else{
            // // 	dmgfont.scaleX = 0.7;
            // // }
            // egret.Tween.get(dmgfont).to({y:this.y-150},600+((Math.random()*400)>>0),egret.Ease.circIn).call(()=>{
            // 	egret.Tween.removeTweens(dmgfont);
            // 	if(dmgfont && dmgfont.parent){
            // 		dmgfont.parent.removeChild(dmgfont);
            // 	}
            // },this)
            if (this._hp <= 0) {
                this._hp = 0;
                this._isDead = true;
                this.dispose();
            }
        }
    };
    BaseEntity.prototype.changeMp = function (dmg) {
        if (dmg) {
            this._mp -= dmg;
        }
        if (this._mp >= this._tmp) {
            this._mp = this._tmp;
        }
        if (this._mp <= 0) {
            this._mp = 0;
            this._isnoMp = true;
        }
        else {
            this._isnoMp = false;
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