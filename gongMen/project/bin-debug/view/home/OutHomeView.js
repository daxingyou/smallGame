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
var OutHomeView = (function (_super) {
    __extends(OutHomeView, _super);
    function OutHomeView() {
        var _this = _super.call(this) || this;
        _this.timespan = 5 * 60;
        _this.startBoo = false;
        _this.countTime = 0;
        _this.routeIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        _this.prevObj = {};
        _this.curStr = "";
        return _this;
    }
    OutHomeView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.watcher = eui.Binding.bindProperty(GameConfig, ["gold"], this.gold, "text");
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.infoBtn, this.onOpenInfo, true);
        for (var i = 1; i <= 13; i++) {
            this["img" + i]["autoSize"]();
        }
        this.roleMc = new MovieClip();
        this.addChild(this.roleMc);
        this.roleMc.playFile(EFFECT + "role", -1);
        this.roleMc.visible = false;
        if (GameApp.routeIndex.length) {
            this.routeIndex = GameApp.routeIndex;
            var curimg = void 0;
            for (var i = 0; i < this.routeIndex.length; i++) {
                var index = this.routeIndex[i];
                var img = this["img" + index];
                var issame = false;
                for (var key in GameApp.wayGather) {
                    if (GameApp.wayGather[key].id == index) {
                        //当前存在相同的;
                        issame = true;
                        break;
                    }
                }
                if (!issame && i <= GameApp.buildIndex) {
                    var gold = (Math.random() * 5 + 5) >> 0;
                    var rewardStr = "\u60A8\u5728" + img.name + "\u83B7\u5F97" + gold + "\u91D1\u5E01";
                    var desc = "\u60A8\u5728" + img.name + "\u6E38\u73A9";
                    this.curStr = "\n\u60A8\u5F53\u524D\u6B63\u5728" + img.name + "\u6E38\u73A9";
                    this.curPos = img.name;
                    curimg = img;
                    this.prevObj = {
                        gold: gold,
                        pos: img.name,
                        reawrdStr: rewardStr,
                        desc: desc,
                        id: index,
                    };
                    GameApp.wayGather.push(this.prevObj);
                }
            }
        }
        else {
            this.routeIndex.sort(function () { return 0.5 - Math.random(); });
            GameApp.routeIndex = this.routeIndex;
        }
        this.addTouchEvent(this.startBtn, this.onStart, true);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        if (GameApp.outTime > this.timespan || GameApp.outTime == 0) {
            this.outEnd();
            this.routeIndex.sort(function () { return 0.5 - Math.random(); });
            GameApp.routeIndex = this.routeIndex;
        }
        else {
            this.startBoo = true;
            this.startBtn.currentState = "down";
            //开始计时
            this.timer.start();
            this.roleMc.visible = true;
            this.randomRoleMcPos();
            this.countTime = GameApp.outTime;
        }
        this.addTouchEvent(this.wayLineBtn, this.onWayLine, true);
        this.addTouchEvent(this.rewardBtn, this.onReward, true);
    };
    OutHomeView.prototype.onWayLine = function () {
        if (!this.countTime) {
            UserTips.inst().showTips("尚未开始游玩,暂未获得您的足迹");
            return;
        }
        var wayStr = '';
        for (var key in GameApp.wayGather) {
            if (GameApp.wayGather[key].pos == this.curPos) {
                continue;
            }
            wayStr += GameApp.wayGather[key].desc + "\n";
        }
        wayStr += this.curStr;
        ViewManager.inst().open(RewardPop, [{ title: "足迹", cnt: wayStr }]);
    };
    OutHomeView.prototype.onReward = function () {
        if (!this.countTime) {
            UserTips.inst().showTips("尚未开始游玩,暂未获得您的奖励");
            return;
        }
        var goldstr = "";
        for (var key in GameApp.wayGather) {
            if (GameApp.wayGather[key].pos == this.curPos) {
                continue;
            }
            goldstr += GameApp.wayGather[key].reawrdStr + "\n";
        }
        goldstr += this.curStr;
        ViewManager.inst().open(RewardPop, [{ title: "奖励", cnt: goldstr }]);
    };
    OutHomeView.prototype.randomRoleMcPos = function () {
        var index = this.routeIndex[GameApp.buildIndex];
        var img = this["img" + index];
        this.roleMc.x = img.x;
        this.roleMc.y = img.y + img.height + 50;
        var gold = (Math.random() * 5 + 5) >> 0;
        var rewardStr = "\u60A8\u5728" + img.name + "\u83B7\u5F97" + gold + "\u91D1\u5E01";
        var desc = "\u60A8\u5728" + img.name + "\u6E38\u73A9";
        this.curStr = "\n\u60A8\u5F53\u524D\u6B63\u5728" + img.name + "\u6E38\u73A9";
        this.curPos = img.name;
        this.prevObj = {
            gold: gold,
            pos: img.name,
            reawrdStr: rewardStr,
            desc: desc,
            id: index,
        };
        var issame = false;
        for (var key in GameApp.wayGather) {
            if (GameApp.wayGather[key].id == index) {
                //当前存在相同的;
                issame = true;
                break;
            }
        }
        if (!issame) {
            GameApp.wayGather.push(this.prevObj);
        }
    };
    OutHomeView.prototype.onTimer = function (evt) {
        this.countTime += 1;
        GameApp.outTime = this.countTime;
        if (this.countTime % 30 == 0) {
            //30s换一个地方游玩
            GameApp.buildIndex += 1;
            this.randomRoleMcPos();
        }
        var timestr = DateUtils.getFormatBySecond(this.countTime, DateUtils.TIME_FORMAT_1);
        this.timeLab.text = timestr;
        if (this.countTime > this.timespan) {
            //游玩结束
            var gold = 0;
            for (var key in GameApp.wayGather) {
                gold += GameApp.wayGather[key].gold;
            }
            GameConfig.gold += gold;
            if (gold != 0) {
                UserTips.inst().showTips("游玩获得" + gold + "金币");
            }
            this.outEnd();
        }
    };
    OutHomeView.prototype.onStart = function () {
        if (this.startBoo) {
            this.startBoo = false;
            MessageManager.inst().dispatch("CLICK_END");
            this.outEnd();
        }
        else {
            this.startBoo = true;
            this.startBtn.currentState = "down";
            //开始计时
            this.timer.start();
            this.roleMc.visible = true;
            this.randomRoleMcPos();
        }
    };
    OutHomeView.prototype.outEnd = function () {
        GameApp.buildIndex = 0;
        GameApp.wayGather = [];
        GameApp.routeIndex = [];
        this.roleMc.visible = false;
        this.timer.stop();
        this.countTime = 0;
        GameApp.outTime = 0;
        this.startBtn.currentState = "up";
        this.timeLab.text = "00:00:00";
    };
    OutHomeView.prototype.onOpenInfo = function () {
        var cnt = "\t\t在游戏系统中可以获得大量的金币!来吧,尽情的携君同游吧,不过，也要了解一下规则哦\n\t\t 规则如下:游戏时间以分钟为单位,5分钟清算一次奖励,未到5分钟结算时间,此阶段奖励清零,所以要注意游玩时间哦";
        ViewManager.inst().open(HelpPop, [{ cnt: cnt }]);
    };
    OutHomeView.prototype.onReturn = function () {
        ViewManager.inst().close(OutHomeView);
        MessageManager.inst().dispatch("RETURN_OUTHOME");
    };
    OutHomeView.prototype.close = function () {
        if (this.watcher) {
            this.watcher.unwatch();
        }
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.infoBtn, this.onOpenInfo);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.removeTouchEvent(this.wayLineBtn, this.onWayLine);
        this.removeTouchEvent(this.rewardBtn, this.onReward);
    };
    return OutHomeView;
}(BaseEuiView));
__reflect(OutHomeView.prototype, "OutHomeView");
ViewManager.inst().reg(OutHomeView, LayerManager.UI_Pop);
//# sourceMappingURL=OutHomeView.js.map