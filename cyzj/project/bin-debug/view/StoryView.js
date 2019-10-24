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
var StoryView = (function (_super) {
    __extends(StoryView, _super);
    function StoryView() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.words = [
            "……",
            "灵珊，你来啦！咦？怎么一脸不高兴啊？",
            "小琳，有看到狄青吗？他今天没来公会帮忙，去他家里也没找着人。",
            "啊！哦…兴许是跑到哪里去勾搭漂亮妹子了吧，哈……哈哈…",
            "哼！小琳，你还是这么不会说谎。老实交代，你们到低有什么事情瞒着我？",
            "呃……好吧，灵珊，这事真不能怪我，我本来也不想瞒着你。",
            "昨晚，狄青和他师父“下地”去了，临走前他还特意嘱咐我说…不能告诉你……",
            "早就跟你们说过，不要跟那个来路不明的人搅在一起，你们就是不听！",
            "（大半夜的跑去那种鬼地方找死吗？万一遇到什么不干净的东西……）",
            "嘿嘿…其实，我也跟他们偷学了些关于“灵力”的知识，最近正准备融合到我的发明里去呢！",
            "等着瞧吧灵珊，这将会是本世纪最伟大的发明，没有之一！！",
            "（哼！算了，我还是去看看吧！）",
            "喂…喂喂！你发什么愣啊，有没有在听我说啊喂！灵珊！你别走啊！",
        ];
        return _this;
    }
    StoryView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 600).call(function () {
            egret.Tween.removeTweens(_this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchtap, _this);
        }, this);
        this.talkGroup1.visible = false;
        this.talkGroup2.visible = false;
        var icon1y = this.nextIcon1.y;
        egret.Tween.get(this.nextIcon1, { loop: true }).to({ y: icon1y + 10 }, 500).to({ y: icon1y }, 500);
        var icon2y = this.nextIcon2.y;
        egret.Tween.get(this.nextIcon2, { loop: true }).to({ y: icon2y + 10 }, 500).to({ y: icon2y }, 500);
        this.addTouchEvent(this.jumpBtn, this.onJump, true);
        this.tweenToTalk();
    };
    StoryView.prototype.onTouchtap = function (evt) {
        if (evt.target == this.jumpBtn) {
            return;
        }
        if ((this.index % 2)) {
            //右边对话显示
            if (this.talkGroup2.alpha == 0) {
                this.tweenToTalk();
            }
        }
        else {
            if (this.talkGroup1.alpha == 0) {
                this.tweenToTalk();
            }
        }
    };
    StoryView.prototype.tweenToTalk = function () {
        var _this = this;
        if (this.words.length) {
            var str = this.words.shift();
            if ((this.index % 2)) {
                //右边对话
                this.talkTxtLab2.text = str;
                this.touchEnabled = false;
                this.touchChildren = false;
                egret.Tween.get(this.talkGroup1).to({ alpha: 0 }, 300).call(function () {
                    egret.Tween.removeTweens(_this.talkGroup1);
                    _this.talkGroup1.visible = false;
                }, this);
                this.talkGroup2.visible = true;
                egret.Tween.get(this.talkGroup2).to({ alpha: 1 }, 600).call(function () {
                    egret.Tween.removeTweens(_this.talkGroup2);
                    _this.touchEnabled = true;
                    _this.touchChildren = true;
                }, this);
            }
            else {
                this.touchEnabled = false;
                this.touchChildren = false;
                //左边对话
                this.talkTxtLab1.text = str;
                egret.Tween.get(this.talkGroup2).to({ alpha: 0 }, 300).call(function () {
                    egret.Tween.removeTweens(_this.talkGroup2);
                    _this.talkGroup2.visible = false;
                }, this);
                this.talkGroup1.visible = true;
                egret.Tween.get(this.talkGroup1).to({ alpha: 1 }, 600).call(function () {
                    egret.Tween.removeTweens(_this.talkGroup1);
                    _this.touchEnabled = true;
                    _this.touchChildren = true;
                }, this);
            }
            this.index += 1;
        }
        else {
            //剧情展示结束 。进入战斗;
            this.onJump();
        }
    };
    /**点击跳过剧情 */
    StoryView.prototype.onJump = function () {
        var _this = this;
        //直接结束剧情 进入战斗
        this.touchEnabled = false;
        this.touchChildren = false;
        egret.Tween.get(this).to({ alpha: 0 }, 600).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.inst().close(StoryView);
        }, this);
        ViewManager.inst().open(GameMainView);
    };
    StoryView.prototype.close = function () {
        egret.Tween.removeTweens(this.nextIcon1);
        egret.Tween.removeTweens(this.nextIcon2);
        this.removeTouchEvent(this.jumpBtn, this.onJump);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchtap, this);
    };
    return StoryView;
}(BaseEuiView));
__reflect(StoryView.prototype, "StoryView");
ViewManager.inst().reg(StoryView, LayerManager.UI_Main);
//# sourceMappingURL=StoryView.js.map