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
var OwnHeroItem = (function (_super) {
    __extends(OwnHeroItem, _super);
    function OwnHeroItem() {
        var _this = _super.call(this) || this;
        _this._isDead = false;
        /**本次回合是否已经攻击过 */
        _this._isAtk = false;
        _this.skinName = "OwnHeroItemSkin";
        return _this;
    }
    OwnHeroItem.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    OwnHeroItem.prototype.onTouchTap = function (evt) {
        if (evt.target == this.killBtn) {
            MessageManager.inst().dispatch(CustomEvt.CLICK_KILL);
        }
        else if (evt.target == this.propBtn) {
            ViewManager.inst().open(PropPopUp);
        }
    };
    OwnHeroItem.prototype.dataChanged = function () {
        var _this = this;
        this.content.left = -(this.itemIndex * this.width);
        this.operGroup.visible = false;
        egret.Tween.get(this.content).to({ left: 0 }, this.itemIndex * 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        });
        var data = this.data;
        this._heroAttr = data;
        if (data.weaponId) {
            this.weaponImg.source = "" + EQUIP_ICON + data.weaponId + ".jpg";
        }
        if (data.protectedId) {
            this.protectedImg.source = "" + EQUIP_ICON + data.protectedId + ".jpg";
        }
        if (data.horseAtkId) {
            this.horseAtkImg.source = "" + EQUIP_ICON + data.horseAtkId + ".jpg";
        }
        if (data.horseProtId) {
            this.horseProtImg.source = "" + EQUIP_ICON + data.horseProtId + ".jpg";
        }
        this.heroImg.source = data.icon;
        this.hpLab.text = data.attr.hp + "/" + data.attr.hp;
        this._curHp = this._totalHp = data.attr.hp;
    };
    /**是否miss 敏捷 。命中*/
    OwnHeroItem.prototype.judgeMiss = function () {
        var index = (Math.random() * 100) >> 0;
        if (index <= 96) {
            return false;
        }
        else {
            return true;
        }
    };
    OwnHeroItem.prototype.ready = function () {
        var _this = this;
        this.borderMc = new MovieClip();
        this.borderMc.playFile(EFFECT + "border", -1);
        this.content.addChild(this.borderMc);
        this.borderMc.x = this.heroImg.x;
        this.borderMc.y = this.heroImg.y;
        this.borderMc.scaleX = this.borderMc.scaleY = 1.5;
        egret.Tween.get(this.content).to({ left: 50 }, 200).call(function () {
            egret.Tween.removeTweens(_this.content);
            _this.operGroup.visible = true;
        }, this);
        //出现杀 还有锦囊
        // this.content.left = 90;
    };
    OwnHeroItem.prototype.resetPos = function () {
        var _this = this;
        if (this.content.left != 0) {
            egret.Tween.removeTweens(this.content);
            egret.Tween.get(this.content).to({ left: 0 }, 200).call(function () {
                egret.Tween.removeTweens(_this.content);
            }, this);
        }
        this.operGroup.visible = false;
        if (this.borderMc && this.borderMc.parent) {
            this.borderMc.parent.removeChild(this.borderMc);
        }
        this.content.left = 0;
        this.content.top = 0;
    };
    /**晃动 */
    OwnHeroItem.prototype.shake = function (time) {
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
    Object.defineProperty(OwnHeroItem.prototype, "reduceHp", {
        /**血量减少 */
        set: function (value) {
            this._curHp -= value;
            if (this._curHp <= 0) {
                this._curHp = 0, this._isDead = true, this.visible = false, this.touchEnabled = false, GameApp.ownDeadState[this.itemIndex] = 1, this.dispose(), GameApp.roleDeadNum += 1;
            }
            ;
            this.hpLab.text = this._curHp + "/" + this._totalHp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwnHeroItem.prototype, "addHp", {
        /**血量恢复 */
        set: function (value) {
            this._curHp += value;
            if (this._curHp >= this._totalHp) {
                this._curHp = this._totalHp;
            }
            this.hpLab.text = this._curHp + "/" + this._totalHp;
            this.restoreEff = new MovieClip();
            this.restoreEff.playFile(EFFECT + "hpReset", 1, null, true);
            this.content.addChild(this.restoreEff);
            this.restoreEff.x = this.effpoint.x;
            this.restoreEff.y = this.effpoint.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwnHeroItem.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwnHeroItem.prototype, "attr", {
        get: function () {
            return this._heroAttr.attr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwnHeroItem.prototype, "isAtk", {
        get: function () {
            return this._isAtk;
        },
        set: function (value) {
            this._isAtk = value;
            if (value) {
                if (this.borderMc && this.borderMc.parent) {
                    this.borderMc.parent.removeChild(this.borderMc);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    OwnHeroItem.prototype.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return OwnHeroItem;
}(eui.ItemRenderer));
__reflect(OwnHeroItem.prototype, "OwnHeroItem");
//# sourceMappingURL=OwnHeroItem.js.map