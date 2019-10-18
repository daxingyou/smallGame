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
var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        return _super.call(this) || this;
    }
    HomeView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this, this.touchTap);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.roleMc = new MovieClip();
        this.roleMc.x = this.roleGroup.width >> 1;
        this.roleMc.y = this.roleGroup.height >> 1;
        this.roleGroup.addChild(this.roleMc);
        this.roleMc.playFile(EFFECT + "role", -1);
        this.roleGroup.visible = false;
        MessageManager.inst().addListener("RETURN_OUTHOME", this.onBack, this);
        MessageManager.inst().addListener("CLICK_END", this.onClickEnd, this);
    };
    HomeView.prototype.onClickEnd = function () {
        this.roleGroup.visible = false;
    };
    HomeView.prototype.onBack = function () {
        //从面回来
        var self = this;
        if (GameApp.outTime > 0) {
            this.roleGroup.visible = true;
            this.interVal = setInterval(function () {
                GameApp.outTime += 1;
                if (GameApp.outTime % 30 == 0) {
                    //30s换一个地方游玩
                    GameApp.buildIndex += 1;
                }
                if (GameApp.outTime >= 5 * 60) {
                    self.roleGroup.visible = false;
                    GameApp.outTime = 0;
                    GameApp.buildIndex = 0;
                    clearInterval(self.interVal);
                    UserTips.inst().showTips("游玩结束");
                    var gold = 0;
                    for (var key in GameApp.wayGather) {
                        gold += GameApp.wayGather[key].gold;
                    }
                    GameConfig.gold += gold;
                    if (gold != 0) {
                        UserTips.inst().showTips("游玩获得" + gold + "金币");
                    }
                    GameApp.wayGather = [];
                    GameApp.routeIndex = [];
                }
            }, 1000);
        }
    };
    HomeView.prototype.close = function () {
        this.removeTouchEvent(this, this.touchTap);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        MessageManager.inst().removeListener("RETURN_OUTHOME", this.onBack, this);
    };
    HomeView.prototype.init = function () {
    };
    HomeView.prototype.update = function () {
        if (GameConfig.level >= 10) {
            this.level_name.source = "img_level_normal_" + GameConfig.level + "_png";
        }
        else {
            this.level_name.source = "img_level_normal_0" + GameConfig.level + "_png";
        }
        this.gold.text = "" + GameConfig.gold;
        this.zhu.text = "" + GameConfig.zhu;
        this.miaoshu.text = BagConfig.bagFig[BagConfig.bagID].wellSay;
        this.cloth.source = BagConfig.bagFig[BagConfig.bagID].image + "_png";
        GameApp.clothId = BagConfig.bagFig[BagConfig.bagID].id;
        this.head_img.source = BagConfig.bagFig[BagConfig.bagID].header + "_png";
        this.head_frame.source = "img_head_frame_noraml_" + GameConfig.frame + "_png";
    };
    HomeView.prototype.onClothChange = function () {
        var clothCfg = GlobalFun.getClothCfg();
        this.miaoshu.text = clothCfg.wellSay;
    };
    HomeView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.juqing:
                ViewManager.inst().open(StoryLineView);
                ViewManager.inst().close(HomeView);
                break;
            case this.nishang:
                ViewManager.inst().open(ClothesShopView);
                ViewManager.inst().close(HomeView);
                break;
            case this.denghui:
                if (GameApp.outTime > 0) {
                    UserTips.inst().showTips("正在游玩中");
                    return;
                }
                ViewManager.inst().open(GuessPlay);
                break;
            case this.xiang:
                ViewManager.inst().open(BagView);
                break;
            case this.youwan:
                clearInterval(this.interVal);
                ViewManager.inst().open(OutHomeView);
                break;
            case this.add_zhu:
                ViewManager.inst().open(BuyZhuView);
                break;
            case this.duihuan:
                ViewManager.inst().open(ExchangeView);
                break;
        }
    };
    return HomeView;
}(BaseEuiView));
__reflect(HomeView.prototype, "HomeView");
ViewManager.inst().reg(HomeView, LayerManager.UI_Main);
//# sourceMappingURL=HomeView.js.map