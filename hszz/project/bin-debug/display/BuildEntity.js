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
var BuildEntity = (function (_super) {
    __extends(BuildEntity, _super);
    function BuildEntity() {
        var _this = _super.call(this) || this;
        _this.cdstate = false;
        _this.camp = 1;
        return _this;
    }
    BuildEntity.prototype.setBuildData = function (camp, cardVo) {
        this._camp = camp;
        this.camp = camp;
        var img = new eui.Image(cardVo.model);
        this.soldierAttr = cardVo;
        this._thp = this._hp = cardVo.hp;
        this.scaleX = this.scaleY = 0.6;
        this.addChild(img);
        this.progressGroup = new eui.Group();
        this.progressGroup.width = 100;
        // this.progressGroup.scaleX = this.progressGroup.scaleY = 0.6;
        this.addChild(this.progressGroup);
        this.progressGroup.x = 70;
        this.progressGroup.y = 0;
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
        barimg.graphics.drawRect(0, 0, 100, 10);
        barimg.graphics.endFill();
        this._barimg = barimg;
        this.progressGroup.addChild(barimg);
        var self = this;
        this.timeInterval = setInterval(function () {
            self._hp -= 20;
            self.reduceHp(20);
        }, 1000);
        this._watcher = eui.Binding.bindHandler(this, ["_hp"], this.onHpChange, this);
    };
    BuildEntity.prototype.onHpChange = function (value) {
        if (!isNaN(value)) {
            var percent = value / this._thp;
            if (this._barimg) {
                this._barimg.graphics.clear();
                var barRes = this.camp == 1 ? 0x00ff00 : 0xfc3434;
                this._barimg.graphics.beginFill(barRes, 1);
                this._barimg.graphics.drawRect(0, 0, percent * 100, 10);
                this._barimg.graphics.endFill();
            }
        }
    };
    BuildEntity.prototype.execAtkAction = function () {
        this.cdstate = true;
        var self = this;
        this.timeout = setTimeout(function () {
            clearTimeout(self.timeout);
            self.cdstate = false;
        }, 3000);
    };
    Object.defineProperty(BuildEntity.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    BuildEntity.prototype.dispose = function () {
        // ObjectPool.push(this);
        if (this._watcher) {
            this._watcher.unwatch();
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
    };
    BuildEntity.prototype.lookAt = function (_atkTar, isNew) {
        // this.addAttrRestrict();
        if (isNew === void 0) { isNew = false; }
    };
    Object.defineProperty(BuildEntity.prototype, "hp", {
        set: function (value) {
            this._hp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEntity.prototype, "thp", {
        set: function (value) {
            this._thp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEntity.prototype, "buffAtk", {
        set: function (value) {
            this.buffAttack = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEntity.prototype, "buffHP", {
        set: function (value) {
            this.buffHp = value;
        },
        enumerable: true,
        configurable: true
    });
    return BuildEntity;
}(BaseEntity));
__reflect(BuildEntity.prototype, "BuildEntity");
//# sourceMappingURL=BuildEntity.js.map