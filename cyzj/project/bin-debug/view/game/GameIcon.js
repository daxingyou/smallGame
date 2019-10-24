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
var GameIcon = (function (_super) {
    __extends(GameIcon, _super);
    function GameIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameIconSkin";
        _this.init();
        _this["autoSize"]();
        return _this;
    }
    GameIcon.prototype.init = function () {
        for (var i = 0; i < 5; i++) {
            if (GameConfig.roleData[i].isUnlock == true) {
                var icon = new IconItem(i + 1);
                icon.x = 10 + i * 127;
                icon.y = 5;
                this.icon_group.addChild(icon);
            }
        }
    };
    return GameIcon;
}(eui.Component));
__reflect(GameIcon.prototype, "GameIcon");
//# sourceMappingURL=GameIcon.js.map