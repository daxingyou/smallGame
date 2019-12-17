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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        var _this = _super.call(this) || this;
        _this.city_pos = [
            { x: 275, y: 12 },
            { x: 55, y: 91 },
            { x: 105, y: 305 },
            { x: 360, y: 201 },
            { x: 470, y: 432 },
            { x: 586, y: 230 },
            { x: 511, y: 70 },
            { x: 809, y: 39 },
            { x: 789, y: 367 }
        ];
        _this.select_id = -1;
        _this.talk_str = [
            "如今天下大乱，三国相互倾轧，主公难道就没有一争天下之心？",
            "慎言！谈何容易，怜我兵少将寡啊！",
            "主公如真有此雄心，只要上面疏通一下，准王调遣至一合适之地作为根基，悄然招兵买马，待时机成熟定可举事成功。",
            "卿可有良选之地？",
            "主公请看。。"
        ];
        _this.talk_num = 0;
        _this.talk_state = 0;
        _this.info_num = [];
        _this.timeOut_arr = [];
        return _this;
    }
    StartGameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this.random_btn, this.touchTapHandler, true);
        this.addTouchEvent(this.start_btn, this.touchTapHandler, true);
        // this.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
        MessageManager.inst().addListener(CustomEvt.SELECT_MAIN_CITY, this.selectCityHandler, this);
        this.clickRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.talkTouchTap, this);
    };
    StartGameView.prototype.close = function () {
        this.removeTouchEvent(this.random_btn, this.touchTapHandler);
        this.removeTouchEvent(this.start_btn, this.touchTapHandler);
        MessageManager.inst().removeListener(CustomEvt.SELECT_MAIN_CITY, this.selectCityHandler, this);
        this.talk_group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.talkTouchTap, this);
    };
    StartGameView.prototype.init = function () {
        for (var i = 0; i < 9; i++) {
            var info = {
                goods: 980 + ((Math.random() * 20) >> 0),
                medal: 1,
                soldier_1: 180 + ((Math.random() * 20) >> 0),
                soldier_2: 380 + ((Math.random() * 20) >> 0),
                soldier_3: 80 + ((Math.random() * 20) >> 0),
            };
            this.info_num.push(info);
        }
        this.adapter();
        this.gold_label.text = "" + GameApp.gold;
        // this.goods_label.text = `${GameApp.goods}`;
        // this.medal_label.text = `${GameApp.medal}`;
        // let soldier_num = GameApp.soldier1Num + GameApp.soldier2Num + GameApp.soldier3Num;
        // this.soldier_label.text = `${soldier_num}`;
        this.name_input.text = NameList.inst().randomName();
        this.cityItemInit();
        this.info_group.right = -400;
        var scale = this.stage.stageWidth / 1334;
        this.talk_group.scaleX = this.talk_group.scaleY = scale;
        egret.Tween.get(this.talk_group)
            .to({ alpha: 1 }, 600)
            .call(function () {
            this.talk();
        }, this);
    };
    StartGameView.prototype.selectInfo = function () {
        this.goods_label.text = "" + this.info_num[this.select_id].goods;
        this.medal_label.text = "" + this.info_num[this.select_id].medal;
        var soldier_num = this.info_num[this.select_id].soldier_1 + this.info_num[this.select_id].soldier_2 + this.info_num[this.select_id].soldier_3;
        this.soldier_label.text = "" + soldier_num;
        GameApp.exp = soldier_num;
    };
    StartGameView.prototype.touchTapHandler = function (e) {
        // console.log(e.stageX - this.map_group.x , e.stageY - this.map_group.y);
        switch (e.target) {
            case this.random_btn:
                SoundManager.inst().playEffect(MUSIC + "collect.mp3");
                this.name_input.text = NameList.inst().randomName();
                break;
            case this.start_btn:
                SoundManager.inst().playEffect(MUSIC + "collect.mp3");
                if (this.select_id != -1) {
                    if (this.name_input.text.length < 2 || this.name_input.text.length > 6) {
                        UserTips.inst().showTips("名字长度不符！名称长度应为2-6个字符");
                    }
                    else {
                        GameApp.goods = this.info_num[this.select_id].goods;
                        GameApp.medal = this.info_num[this.select_id].medal;
                        GameApp.soldier1Num = this.info_num[this.select_id].soldier_1;
                        GameApp.soldier2Num = this.info_num[this.select_id].soldier_2;
                        GameApp.soldier3Num = this.info_num[this.select_id].soldier_3;
                        GlobalFun.changeName(this.name_input.text);
                        if (Main.DUBUGGER) {
                            Main.txt.text += this.select_id.toString();
                        }
                        GlobalFun.changeCityInfo(this.select_id + 1, { isMain: true, isOwn: true, isOnly: true });
                        ViewManager.inst().close(StartGameView);
                        ViewManager.inst().open(GameMainView);
                    }
                }
                else {
                    UserTips.inst().showTips("请先选择城市！");
                }
                break;
        }
    };
    StartGameView.prototype.talkTouchTap = function () {
        var _this = this;
        if (this.talk_group.alpha < 1)
            return;
        if (this.talk_num >= 5) {
            egret.Tween.get(this.talk_group)
                .to({ alpha: 0 }, 800)
                .to({ visible: false });
            egret.Tween.get(this.tip_group)
                .wait(850)
                .to({ alpha: 1 }, 1000)
                .wait(1500)
                .to({ alpha: 0 }, 500)
                .to({ visible: false });
            this.clickRect.visible = false;
            this.clickRect.touchEnabled = false;
            egret.Tween.get(this.info_group).wait(1850).to({ right: 30 }, 600, egret.Ease.backOut).call(function () {
                egret.Tween.removeTweens(_this.info_group);
            }, this);
            egret.Tween.get(this.tipFont).wait(1850).to({ alpha: 1 }, 600).call(function () {
                egret.Tween.removeTweens(_this.tipFont);
            }, this);
        }
        else {
            this.talk();
        }
    };
    StartGameView.prototype.cityItemInit = function () {
        var _loop_1 = function (i) {
            var item = new StartCityItem(i);
            item.x = this_1.city_pos[i].x;
            item.y = this_1.city_pos[i].y - 100;
            item.scaleX = item.scaleY = 2;
            this_1.map_group.addChild(item);
            item.alpha = 0;
            egret.Tween.get(item).to({ alpha: 1, y: this_1.city_pos[i].y, scaleX: 1, scaleY: 1 }, 100 * (i + 1), egret.Ease.backOut).call(function () {
                egret.Tween.removeTweens(item);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 9; i++) {
            _loop_1(i);
        }
    };
    StartGameView.prototype.selectCityHandler = function (e) {
        this.select_id = e.data;
        this.selectInfo();
        this.main_city_label.text = "" + NameList.inst().city_name[this.select_id];
    };
    StartGameView.prototype.talk = function () {
        switch (this.talk_state) {
            case 1:
                this.zhugong_img.visible = false;
                this.moushi_img.visible = true;
                this.zhugong_label.visible = false;
                this.moushi_label.visible = true;
                this.talk_state = 0;
                this.talk_bg.x = this.talk_group.width - this.talk_bg.width;
                this.talk_bg.source = "start_talk_bg_0_png";
                this.talk_label.x = 430;
                break;
            case 0:
                this.zhugong_img.visible = true;
                this.moushi_img.visible = false;
                this.zhugong_label.visible = true;
                this.moushi_label.visible = false;
                this.talk_state = 1;
                this.talk_bg.x = 0;
                this.talk_bg.source = "start_talk_bg_1_png";
                this.talk_label.x = 231;
                break;
        }
        this.typerEffect(this.talk_label, this.talk_str[this.talk_num], 50);
        this.talk_num++;
    };
    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    StartGameView.prototype.typerEffect = function (obj, content, interval, backFun) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        if (backFun === void 0) { backFun = null; }
        for (var i_1 = 0; i_1 < this.timeOut_arr.length; i_1++) {
            egret.clearTimeout(this.timeOut_arr[i_1]);
        }
        var strArr = content.split("");
        obj.text = "";
        var len = strArr.length;
        for (var i = 0; i < len; i++) {
            var timeOut = egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
                if ((Number(this) >= len - 1) && (backFun != null)) {
                    backFun();
                }
            }, i, interval * i);
            this.timeOut_arr.push(timeOut);
        }
    };
    StartGameView.prototype.adapter = function () {
        var scale = this.stage.stageWidth / 1334;
        this.info_group.scaleX = this.info_group.scaleY = scale;
        this.map_group.scaleX = this.map_group.scaleY = scale;
        this.tipFont.scaleX = this.tipFont.scaleY = scale;
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.inst().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map