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
var EnemyHeroItem = (function (_super) {
    __extends(EnemyHeroItem, _super);
    function EnemyHeroItem() {
        var _this = _super.call(this) || this;
        _this._isDead = false;
        _this._buffAtk = 0;
        _this.skinName = "EnemyHeroItemSkin";
        return _this;
    }
    EnemyHeroItem.prototype.dataChanged = function () {
        var _this = this;
        this.content.left = (this.itemIndex * this.width);
        egret.Tween.get(this.content).to({ left: 0 }, this.itemIndex * 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        });
        this.atkMark.visible = false;
        this.protectedMark.visible = false;
        var data = this.data;
        this._heroAttr = data;
        this.heroImg.source = LEVEL_ICON + "level_" + data.level + "_" + this.itemIndex + ".jpg";
        this.hpLab.text = data.attr.hp + "/" + data.attr.hp;
        this._curHp = this._totalHp = data.attr.hp;
    };
    EnemyHeroItem.prototype.execAtkAction = function (atkcb, cb, thisArg) {
        var _this = this;
        egret.Tween.get(this.content).to({ left: -50 }, 300, egret.Ease.circOut).call(function () {
            atkcb.call(thisArg);
        }, this).wait(300).to({ left: 0 }, 100).call(function () {
            egret.Tween.removeTweens(_this.content);
            cb.call(thisArg);
        }, this);
    };
    /**是否miss 敏捷 。命中*/
    EnemyHeroItem.prototype.judgeMiss = function () {
        var index = (Math.random() * 100) >> 0;
        if (index <= 96) {
            return false;
        }
        else {
            return true;
        }
    };
    EnemyHeroItem.prototype.shake = function (time) {
        var topx = this.content.top - 5;
        var ntopx = this.content.top + 5;
        var top = this.content.top;
        egret.Tween.get(this.content, { loop: true }).to({ top: topx }, 50).to({ top: ntopx }, 50);
        var self = this;
        var timeout = setTimeout(function () {
            self.content.top = top;
            clearTimeout(timeout);
            egret.Tween.removeTweens(self.content);
        }, time);
    };
    Object.defineProperty(EnemyHeroItem.prototype, "reduceHp", {
        set: function (value) {
            this._curHp -= value;
            if (this._curHp <= 0) {
                this._curHp = 0, this._isDead = true, this.visible = false, GameApp.levelDeadState[this.itemIndex] = 1, GameApp.enemyDeadNum += 1;
            }
            ;
            this.hpLab.text = this._curHp + "/" + this._totalHp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnemyHeroItem.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnemyHeroItem.prototype, "attr", {
        get: function () {
            return this._heroAttr.attr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnemyHeroItem.prototype, "buffAtk", {
        get: function () {
            return this._buffAtk = 0;
        },
        set: function (value) {
            this._buffAtk = value;
            if (value) {
                this.atkMark.visible = true;
            }
            else {
                this.atkMark.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return EnemyHeroItem;
}(eui.ItemRenderer));
__reflect(EnemyHeroItem.prototype, "EnemyHeroItem");
//# sourceMappingURL=EnemyHeroItem.js.map