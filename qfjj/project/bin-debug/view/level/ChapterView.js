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
var ChapterView = (function (_super) {
    __extends(ChapterView, _super);
    // private btn:eui.Button;
    function ChapterView() {
        return _super.call(this) || this;
    }
    ChapterView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        // this.addTouchEvent(this.btn, ()=>{
        // 	GlobalFun.setLevelDate();
        // })
    };
    ChapterView.prototype.init = function () {
        LevelCfg.getLeveldata();
        // egret.localStorage.clear();
        for (var i = 0; i < LevelCfg.levelCfgs.length; i++) {
            var chapter = new ChapterItem(LevelCfg.levelCfgs[i]);
            chapter.x = LevelCfg.levelCfgs[i].x;
            chapter.y = LevelCfg.levelCfgs[i].y;
            chapter["autoSize"]();
            this.addChild(chapter);
        }
    };
    ChapterView.prototype.close = function () {
    };
    ChapterView.prototype.update = function () {
    };
    return ChapterView;
}(BaseEuiView));
__reflect(ChapterView.prototype, "ChapterView");
ViewManager.inst().reg(ChapterView, LayerManager.UI_Main);
//# sourceMappingURL=ChapterView.js.map