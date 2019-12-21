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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super.call(this) || this;
        _this.btn_name = [
            "shuishou", "zhengbing", "neiwu", "kazu", "jiuguan", "shangcheng"
        ];
        _this.city_pos = [
            { x: 1608, y: 1007 },
            { x: 1064.15, y: 1070 },
            { x: 913, y: 758 },
            { x: 1150, y: 480 },
            { x: 1534, y: 566 },
            { x: 1443, y: 235 },
            { x: 1065, y: 33 },
            { x: 740, y: 60 },
            { x: 637, y: 339 },
            { x: 532, y: 679 },
            { x: 486, y: 930 },
            { x: 190, y: 494 },
            { x: 46, y: 39 }
        ];
        _this._initialize = false;
        _this.ox = 0;
        _this.oy = 0;
        _this.nx = 0;
        _this.ny = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onChildrenCreated, _this);
        return _this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            param[_a] = arguments[_a];
        }
        var citys = GameApp.roleInfo.citys;
        var mapX;
        var mapY;
        var precentw = StageUtils.inst().getWidth() / 1334;
        for (var i = 0; i < citys.length; i++) {
            if (citys[i].isOnly == true) {
                var _i = 0;
                if (i == 0) {
                    _i = i + 1;
                }
                else {
                    _i = i - 1;
                }
                var pos = this.map_group.localToGlobal(this.city_pos[_i].x, this.city_pos[_i].y);
                var cx = void 0;
                var cy = void 0;
                cx = StageUtils.inst().getWidth() / 2 - pos.x;
                cy = StageUtils.inst().getHeight() / 2 - pos.y;
                this.map_group.x += cx;
                this.map_group.y += cy;
                if (this.map_group.x >= 0) {
                    this.map_group.x = 0;
                }
                else if (this.map_group.x <= StageUtils.inst().getWidth() - this.map_group.width * precentw) {
                    this.map_group.x = StageUtils.inst().getWidth() - this.map_group.width * precentw;
                }
                if (this.map_group.y >= 57 * precentw) {
                    this.map_group.y = 57 * precentw;
                }
                else if (this.map_group.y <= StageUtils.inst().getHeight() - this.map_group.height * precentw) {
                    this.map_group.y = StageUtils.inst().getHeight() - this.map_group.height * precentw;
                }
            }
        }
        this.touch_map.touchEnabled = true;
        this.touch_map.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mapMove, this);
        this.touch_map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mapBegin, this);
        this.touch_map.addEventListener(egret.TouchEvent.TOUCH_END, this.mapEnd, this);
    };
    GameMainView.prototype.mapMove = function (evt) {
        if (this.ox == 0 || this.oy == 0) {
            return;
        }
        var precentw = StageUtils.inst().getWidth() / 1334;
        var precenth = StageUtils.inst().getHeight() / 750;
        var cx;
        var cy;
        this.nx = evt.stageX;
        this.ny = evt.stageY;
        cx = this.nx - this.ox;
        cy = this.ny - this.oy;
        this.map_group.x += cx;
        this.map_group.y += cy;
        if (this.map_group.x >= 0) {
            this.map_group.x = 0;
        }
        else if (this.map_group.x <= StageUtils.inst().getWidth() - this.map_group.width * precentw) {
            this.map_group.x = StageUtils.inst().getWidth() - this.map_group.width * precentw;
        }
        if (this.map_group.y >= 57 * precentw) {
            this.map_group.y = 57 * precentw;
        }
        else if (this.map_group.y <= StageUtils.inst().getHeight() - this.map_group.height * precentw) {
            this.map_group.y = StageUtils.inst().getHeight() - this.map_group.height * precentw;
        }
        this.ox = this.nx;
        this.oy = this.ny;
    };
    GameMainView.prototype.mapBegin = function (evt) {
        this.ox = this.nx = evt.stageX;
        this.oy = this.ny = evt.stageY;
    };
    GameMainView.prototype.mapEnd = function (evt) {
        this.ox = this.nx = 0;
        this.oy = this.ny = 0;
    };
    GameMainView.prototype.onChildrenCreated = function () {
        if (Main.DUBUGGER) {
            Main.txt.text += "initialize";
        }
        this._initialize = true;
        this.adapter();
        MessageManager.inst().addListener(CustomEvt.COLLECT_START, this.onCollectStart, this);
        if (Main.DUBUGGER) {
            Main.txt.text += "\n messagemanager" + MessageManager.inst() ? "messagemanager" : 0;
        }
        if (Main.DUBUGGER) {
            Main.txt.text += "\n messagemanager" + CustomEvt.COLLECT_START ? "CustomEvt.COLLECT_START" : 0;
        }
        MessageManager.inst().addListener(CustomEvt.COLLECT_END, this.onCollectCD, this);
        MessageManager.inst().addListener(CustomEvt.TAX_START, this.onTaxStart, this);
        MessageManager.inst().addListener(CustomEvt.NEIWU_CD, this.onNeiwuCd, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_CITY, this.onGuideClickCity, this);
        this.addTouchEvent(this.icon_img, this.touchIcon);
        this.onTaxStart();
        if (Main.DUBUGGER) {
            Main.txt.text += "\n ready tax";
        }
        this.onCollectStart();
        if (Main.DUBUGGER) {
            Main.txt.text += "\n ready collect";
        }
        this.onCollectCD();
        if (Main.DUBUGGER) {
            Main.txt.text += "\n ready collect cd";
        }
        // if(Main.DUBUGGER){
        // 	Main.txt.text += "\n ready sound"
        // }
        // SoundManager.inst().playBg(`${MUSIC}home.mp3`);
        // if(Main.DUBUGGER){
        // 	Main.txt.text += "\n bg sound ok"
        // }
        // SoundManager.inst().touchBg();
        // if(Main.DUBUGGER){
        // 	Main.txt.text += "\n soundfinish"
        // }
        // let firemc:MovieClip = new MovieClip();
        // this.map_group.addChild(firemc);
        // firemc.playFile(`${EFFECT}fire`,-1);
        // firemc.x = this.firepos.x;
        // firemc.y = this.firepos.y;
        // if(Main.DUBUGGER){
        // 	Main.txt.text += "\n firemc finish"
        // }
        for (var i = 0; i < this.btn_name.length; i++) {
            this.addTouchEvent(this[this.btn_name[i] + "_btn"], this.touchTapHandler, true);
        }
        this.addTouchEvent(this.recharge_img, this.touchTapHandler, true);
        this.rechargeRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.recharge, this);
        // this.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
        this.onNeiwuCd();
        if (Main.DUBUGGER) {
            Main.txt.text += "\n neuwu finish";
        }
        this.watcher1 = eui.Binding.bindProperty(GameApp, ["gold"], this.gold_label, "text");
        this.watcher2 = eui.Binding.bindProperty(GameApp, ["goods"], this.goods_label, "text");
        this.watcher3 = eui.Binding.bindProperty(GameApp, ["medal"], this.medal_label, "text");
        this.watcher4 = eui.Binding.bindHandler(GameApp, ["soldier1Num"], this.onSolderChange, this);
        this.watcher5 = eui.Binding.bindHandler(GameApp, ["soldier2Num"], this.onSolderChange, this);
        this.watcher6 = eui.Binding.bindHandler(GameApp, ["soldier3Num"], this.onSolderChange, this);
        this.watcher7 = eui.Binding.bindProperty(GameApp, ["exp"], this.exp_label, "text");
        if (Main.DUBUGGER) {
            Main.txt.text += "\n watcher finish";
        }
        TimerManager.inst().doTimer(1000, 0, this.onGlobalTimer, this);
        this.yearLab.text = GlobalFun.getYearShow();
        this.yearLab.mask = this.yearMask;
        var firststr = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
        if (!firststr) {
            if (Main.DUBUGGER) {
                Main.txt.text += "\n start guide";
            }
            this.rewardCards = [];
            this.rewardGroup["autoSize"]();
            this.firstRect.visible = true;
            this.touchEnabled = false;
            this.touchChildren = false;
            this.rewardGroup.visible = true;
            egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST, "1");
            var self_1 = this;
            var cards_1 = GlobalFun.getOwnCards();
            if (!cards_1) {
                self_1.onStartGuide();
                GlobalFun.showAnimateleaf();
                self_1.firstRect.visible = false;
                self_1.rewardGroup.visible = false;
            }
            var timeout2_1 = setTimeout(function () {
                clearTimeout(timeout2_1);
                var _loop_1 = function (i) {
                    var item = new ShopItem();
                    item.alpha = 0;
                    item.anchorOffsetX = item.width >> 1;
                    item.anchorOffsetY = item.height >> 1;
                    self_1.rewardGroup.addChild(item);
                    item.initData(cards_1[i - 1], false, "reward");
                    var qualityIndex = cards_1[i - 1].type == CardType.general ? 4 : cards_1[i - 1].quality;
                    GlobalFun.lighting(item, GameApp.qualityColor[qualityIndex]);
                    if (i <= 5) {
                        item.x = (i - 1) * (item.width + 10) + 125;
                        item.y = item.height >> 1;
                    }
                    else {
                        item.x = (i - 1 - 5) * (item.width + 10);
                        item.y = (item.height >> 1) + item.height + 10;
                    }
                    item.scaleX = item.scaleY = 0;
                    self_1.rewardCards.push(item);
                    var timeout = setTimeout(function (_item) {
                        clearTimeout(timeout);
                        SoundManager.inst().playEffect(MUSIC + "reward.mp3");
                        egret.Tween.get(_item).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.backOut).call(function () {
                            egret.Tween.removeTweens(_item);
                            if (i >= cards_1.length) {
                                self_1.touchEnabled = true;
                                self_1.touchChildren = true;
                                var font = new eui.Label();
                                font.text = "点击领取登陆奖励";
                                self_1.rewardGroup.addChild(font);
                                font.horizontalCenter = 0;
                                font.verticalCenter = 220;
                                font.alpha = 0;
                                egret.Tween.get(font, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 1000);
                                self_1.addEventListener(egret.TouchEvent.TOUCH_TAP, self_1.onTouchClickReward, self_1);
                            }
                        }, self_1);
                    }, 150 * (i - 1), item);
                };
                for (var i = 1; i <= cards_1.length; i++) {
                    _loop_1(i);
                }
            }, 700);
        }
        else {
            if (Main.DUBUGGER) {
                Main.txt.text += "\n init bth";
            }
            this.init();
            GlobalFun.showAnimateleaf();
        }
    };
    GameMainView.prototype.touchIcon = function () {
        ViewManager.inst().open(PlayerInfoView);
    };
    GameMainView.prototype.recharge = function () {
        ViewManager.inst().open(RechargePopUp);
    };
    GameMainView.prototype.onGuideClickCity = function () {
        ViewManager.inst().open(BattleProgressPop, [{ cityId: this.guideCity.cityId }]);
    };
    GameMainView.prototype.onTouchClickReward = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClickReward, this);
        var _loop_2 = function (i) {
            var item = this_1.rewardCards[i];
            var cardBtnStagePos = this_1.btn_group.localToGlobal(this_1.kazu_btn.x, this_1.kazu_btn.y);
            var localXy = this_1.rewardGroup.globalToLocal(cardBtnStagePos.x, cardBtnStagePos.y);
            var self_2 = this_1;
            var timeout = setTimeout(function (_item) {
                clearTimeout(timeout);
                SoundManager.inst().playEffect(MUSIC + "collect.mp3");
                egret.Tween.get(_item).to({ scaleX: 0, scaleY: 0, alpha: 0, x: localXy.x, y: localXy.y }, 600, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(_item);
                    if (i >= self_2.rewardCards.length - 1) {
                        self_2.rewardCards = [];
                        self_2.rewardGroup.removeChildren();
                        self_2.firstRect.visible = false;
                        self_2.rewardGroup.visible = false;
                        self_2.touchEnabled = false;
                        self_2.touchChildren = false;
                        self_2.init();
                        var guideTime_1 = setTimeout(function () {
                            clearTimeout(guideTime_1);
                            self_2.onStartGuide();
                            GlobalFun.showAnimateleaf();
                        }, 1000);
                    }
                }, self_2);
            }, 150 * (i - 1), item);
        };
        var this_1 = this;
        for (var i = 0; i < this.rewardCards.length; i++) {
            _loop_2(i);
        }
    };
    /**开始引导 */
    GameMainView.prototype.onStartGuide = function () {
        ViewManager.inst().open(GuideView);
        GameApp.guideView = ViewManager.inst().getView(GuideView);
        if (GameApp.guideView) {
            if (this.guideCity) {
                this.touchEnabled = true;
                this.touchChildren = true;
                GuideCfg.guidecfg["1_1"].cnt = "\u6307\u6325\u5B98\uFF0C\u60F3\u8981\u5DE9\u56FA\u6839\u57FA\uFF0C\u987B\u5148\u62FF\u4E0B" + NameList.inst().city_name[this.guideCity.cityId - 1] + "\uFF01";
                GameApp.guideView.nextStep({ id: "1_1", comObj: this.guideCity, width: this.guideCity.width, height: this.guideCity.height, offsetX: -this.guideCity.width / 2, offsetY: -this.guideCity.height / 2 });
            }
        }
    };
    /**显示关卡 */
    GameMainView.prototype.showLevel = function () {
        var allCitys = GameApp.roleInfo.citys;
        var unlockCitys = [];
        for (var i = 0; i < allCitys.length; i++) {
            var itemCity = allCitys[i];
            var city = this.map_group.getChildByName(itemCity.cityId.toString());
            city.hideBattleIcon();
            if (!itemCity.isOwn) {
                // GlobalFun.changeCityInfo(itemCity.cityId,{isOpen:false})
                GlobalFun.filterToGrey(city);
            }
            else {
                if (!itemCity.isMain) {
                    city.showBattleIcon();
                }
                unlockCitys.push(itemCity);
                GlobalFun.clearFilters(city);
            }
        }
        var minCityInfo = this.getMinOrMaxCity(unlockCitys, "min");
        var maxCityInfo = this.getMinOrMaxCity(unlockCitys, "max");
        if (minCityInfo && minCityInfo.cityId - 1 >= 1) {
            GlobalFun.changeCityInfo((minCityInfo.cityId - 1), { isOpen: true });
            var minCity = this.map_group.getChildByName((minCityInfo.cityId - 1).toString());
            this.guideCity = minCity;
            GlobalFun.clearFilters(minCity);
            minCity.showBattleIcon();
        }
        if (maxCityInfo && maxCityInfo.cityId + 1 <= 9) {
            GlobalFun.changeCityInfo((maxCityInfo.cityId + 1), { isOpen: true });
            var maxCity = this.map_group.getChildByName((maxCityInfo.cityId + 1).toString());
            if (!this.guideCity) {
                this.guideCity = maxCity;
            }
            GlobalFun.clearFilters(maxCity);
            maxCity.showBattleIcon();
        }
    };
    GameMainView.prototype.getMinOrMaxCity = function (cityinfo, oper) {
        var city = cityinfo[0];
        for (var i = 0; i < cityinfo.length; i++) {
            var condition = oper == "max" ? city.cityId < cityinfo[i].cityId : city.cityId > cityinfo[i].cityId;
            if (city != cityinfo[i] && condition) {
                city = cityinfo[i];
            }
        }
        return city;
    };
    GameMainView.prototype.onSolderChange = function () {
        // let soldier_num = GameApp.soldier1Num + GameApp.soldier2Num + GameApp.soldier3Num;
        this.exp_label.text = "" + GameApp.exp;
    };
    /**全局的占领城池后的税收 */
    GameMainView.prototype.onGlobalTimer = function () {
        var allCitys = GameApp.roleInfo.citys;
        for (var i = 0; i < allCitys.length; i++) {
            var itemCity = allCitys[i];
            if (itemCity.isMain && !itemCity.isOnly) {
                //当前已经占领 并且不是主城;
                var nowTime = new Date().getTime();
                var city = this.map_group.getChildByName(itemCity.cityId.toString());
                if (itemCity.isEnemy) {
                    if (!city.ifHasEnemy) {
                        GlobalFun.changeCityInfo(itemCity.cityId, { isEnemy: true });
                        city.showEnemyGroup();
                    }
                }
                else {
                    city.hideEnemyGroup();
                }
                if (nowTime - itemCity.timespan >= 5 * 60 * 1000) {
                    //现在时间 - 当前城池记录的时间 大于5分钟 。可以显示征收了
                    this.showCityCollect(itemCity.cityId);
                    if (city) {
                        if (!city.ifHasEnemy) {
                            GlobalFun.changeCityInfo(itemCity.cityId, { isEnemy: true });
                            city.showEnemyGroup();
                        }
                    }
                }
                else {
                    this.hideCityCollect(itemCity.cityId);
                }
            }
        }
    };
    /**显示城市可以征收状态 */
    GameMainView.prototype.showCityCollect = function (cityid) {
        var group = this.map_group.getChildByName("tax_" + cityid);
        if (group) {
            return;
        }
        group = new eui.Group();
        group.touchChildren = false;
        group.touchThrough = false;
        group.touchEnabled = true;
        group.name = "tax_" + cityid;
        this.map_group.addChild(group);
        var iconImg = new eui.Image("tax_goods_png");
        iconImg.width = 54;
        iconImg.height = 26;
        group.addChild(iconImg);
        var numTxt = new eui.Label();
        group.addChild(numTxt);
        numTxt.text = GlobalFun.getCityInfo(cityid).goodProduce.toString();
        numTxt.anchorOffsetX = numTxt.width >> 1;
        numTxt.anchorOffsetY = numTxt.height;
        numTxt.x = iconImg.x + (iconImg.width >> 1);
        numTxt.y = 5;
        numTxt.size = 20;
        var city = this.map_group.getChildByName(cityid.toString());
        group.anchorOffsetX = group.width >> 1;
        if (city) {
            group.x = city.x;
            group.y = city.y - 80;
        }
        else {
            console.log("当前城市不存在-----id:" + cityid);
        }
        egret.Tween.get(group, { loop: true }).to({ rotation: group.rotation - 5 }, 50).to({ rotation: group.rotation + 5 }, 50).to({ rotation: group.rotation - 5 }, 50).to({ rotation: group.rotation + 5 }, 50).wait(1000);
    };
    /**隐藏城市可以征收状态 */
    GameMainView.prototype.hideCityCollect = function (cityid) {
        var group = this.map_group.getChildByName("tax_" + cityid);
        if (group && group.parent) {
            egret.Tween.removeTweens(group);
            group.parent.removeChild(group);
        }
    };
    /**点击征收 */
    GameMainView.prototype.clickCollect = function (cityId) {
        var product = GlobalFun.getCityInfo(cityId).goodProduce;
        UserTips.inst().showTips("征收获得物资x" + product);
        GameApp.goods += product;
        GlobalFun.changeCityInfo(cityId, { timespan: new Date().getTime() });
        this.hideCityCollect(cityId);
    };
    GameMainView.prototype.close = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onChildrenCreated, this);
        this.rechargeRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.recharge, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_CITY, this.onGuideClickCity, this);
        this.map_group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCityTouch, this);
        TimerManager.inst().remove(this.onGlobalTimer, this);
        if (this.collectInterVal) {
            clearInterval(this.collectInterVal);
        }
        ;
        if (this.collectCdInterVal) {
            clearInterval(this.collectCdInterVal);
        }
        ;
        if (this.taxInterVal) {
            clearInterval(this.taxInterVal);
        }
        if (this.neiwuInterval) {
            clearInterval(this.neiwuInterval);
        }
        MessageManager.inst().removeListener(CustomEvt.COLLECT_START, this.onCollectStart, this);
        MessageManager.inst().removeListener(CustomEvt.COLLECT_END, this.onCollectCD, this);
        MessageManager.inst().removeListener(CustomEvt.TAX_START, this.onTaxStart, this);
        for (var i = 0; i < this.btn_name.length; i++) {
            this.removeTouchEvent(this[this.btn_name[i] + "_btn"], this.touchTapHandler);
        }
        this.removeTouchEvent(this.recharge_img, this.touchTapHandler);
        MessageManager.inst().removeListener(CustomEvt.NEIWU_CD, this.onNeiwuCd, this);
        if (this.watcher1) {
            this.watcher1.unwatch();
        }
        if (this.watcher2) {
            this.watcher1.unwatch();
        }
        if (this.watcher3) {
            this.watcher1.unwatch();
        }
        if (this.watcher4) {
            this.watcher1.unwatch();
        }
        if (this.watcher5) {
            this.watcher1.unwatch();
        }
        if (this.watcher6) {
            this.watcher1.unwatch();
        }
        if (this.watcher7) {
            this.watcher1.unwatch();
        }
        this.touch_map.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mapMove, this);
        this.touch_map.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mapBegin, this);
        this.touch_map.removeEventListener(egret.TouchEvent.TOUCH_END, this.mapEnd, this);
    };
    GameMainView.prototype.init = function () {
        this.btnInit();
        this.setInfoUI();
        this.cityItemInit();
        this.showLevel();
        this.map_group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCityTouch, this);
    };
    GameMainView.prototype.onCityTouch = function (evt) {
        var cityName = evt.target.name;
        if (!!~cityName.indexOf("tax")) {
            //点击了税收
            this.clickCollect(parseInt(cityName.split("_")[1]));
        }
        else {
            //点击了关卡城池
            var city = this.map_group.getChildByName(cityName);
            if (city && city.ifHasEnemy) {
                var levelIndex = (Math.random() * 4 + 1) >> 0;
                GameCfg.chapter = 1;
                GameCfg.level = levelIndex;
                ViewManager.inst().close(GameMainView);
                ViewManager.inst().open(DoubtfulView, [{ type: cityName }]);
                return;
            }
            if (!!cityName) {
                var cityInfo = GlobalFun.getCityInfo(parseInt(cityName));
                if (cityInfo.cityId > 9) {
                    UserTips.inst().showTips("暂未解锁");
                    return;
                }
                if (cityInfo.isMain) {
                    UserTips.inst().showTips("当前城池已占领");
                    return;
                }
                if (!cityInfo.isOpen) {
                    UserTips.inst().showTips("请先占领上一个城池");
                    return;
                }
                ViewManager.inst().open(BattleProgressPop, [{ cityId: cityInfo.cityId }]);
            }
        }
    };
    GameMainView.prototype.touchTapHandler = function (e) {
        // console.log( e.stageX - 52 , e.stageY - 68 );
        for (var i = 0; i < this.btn_name.length; i++) {
            if (e.target == this[this.btn_name[i] + "_btn"]) {
                this.btnTouch(this.btn_name[i]);
            }
        }
        switch (e.target) {
            case this.recharge_img:
                ViewManager.inst().open(RechargePopUp);
                break;
        }
    };
    GameMainView.prototype.btnInit = function () {
        var _this = this;
        egret.Tween.get(this.yearMask).to({ width: 248 }, 1000).call(function () {
            egret.Tween.removeTweens(_this.yearMask);
        }, this);
        var self = this;
        egret.Tween.get(this.btn_group).to({ alpha: 1 }, 600).call(function () { egret.Tween.removeTweens(_this.btn_group); }, this);
        for (var i = 0; i < self.btn_name.length; i++) {
            var btn = self[self.btn_name[i] + "_btn"];
            btn.alpha = 0;
        }
        var timeout = setTimeout(function () {
            for (var i = 0; i < self.btn_name.length; i++) {
                var btn = self[self.btn_name[i] + "_btn"];
                var btn_y = btn.y;
                btn.y = self.btn_group.height;
                btn.alpha = 1;
                egret.Tween.get(btn)
                    .wait(150 * i)
                    .to({ y: btn_y }, 800, egret.Ease.backOut);
            }
        }, 300);
        var scale = this.stage.stageWidth / 1334;
        var timeout2 = setTimeout(function () {
            clearTimeout(timeout2);
            var cardBtnStagePos = self.btn_group.localToGlobal(self.kazu_btn.x, self.kazu_btn.y);
            GameApp.cardStaticX = cardBtnStagePos.x;
            GameApp.cardStaticY = cardBtnStagePos.y;
            egret.Tween.get(self.role_img).to({ alpha: 1 }, 600).call(function () {
                egret.Tween.removeTweens(self.role_img);
                self.role_img2.alpha = 1;
                egret.Tween.get(self.role_img2, { loop: true }).to({ scaleX: scale + 0.01, scaleY: scale + 0.01, alpha: 0.8 }, 500).to({ scaleX: scale, scaleY: scale, alpha: 0 }, 500).wait(1500);
            }, self);
        }, 600);
    };
    GameMainView.prototype.setInfoUI = function () {
        this.gold_label.text = "" + GameApp.gold;
        this.goods_label.text = "" + GameApp.goods;
        this.medal_label.text = "" + GameApp.medal;
        // let soldier_num = GameApp.soldier1Num + GameApp.soldier2Num + GameApp.soldier3Num;
        this.exp_label.text = "" + GameApp.exp;
        var main_id = 0;
        for (var i = 0; i < 9; i++) {
            var isMain = GlobalFun.getCityInfo(i + 1).isMain;
            if (isMain == true) {
                main_id = i;
            }
        }
        this.main_city_label.text = "" + NameList.inst().city_name[main_id];
        this.name_label.text = "" + GameApp.roleInfo.name;
    };
    GameMainView.prototype.cityItemInit = function () {
        var _loop_3 = function (i) {
            var item = new MainCityItem(i);
            item.x = this_2.city_pos[i].x + 80;
            item.y = this_2.city_pos[i].y;
            item.name = (i + 1).toString();
            this_2.map_group.addChild(item);
            item.alpha = 0;
            egret.Tween.get(item).to({ alpha: 1, y: this_2.city_pos[i].y + 80, scaleX: 1, scaleY: 1 }, 100 * (i + 1), egret.Ease.backOut).call(function () {
                egret.Tween.removeTweens(item);
            }, this_2);
        };
        var this_2 = this;
        for (var i = 0; i < 13; i++) {
            _loop_3(i);
        }
    };
    GameMainView.prototype.btnTouch = function (name) {
        switch (name) {
            case "shuishou":
                ViewManager.inst().open(TaxPopUp);
                break;
            case "zhengbing":
                ViewManager.inst().open(CollectSoldierPop);
                break;
            case "neiwu":
                ViewManager.inst().open(NeiWuPopUp);
                break;
            case "kazu":
                ViewManager.inst().open(CardView);
                break;
            case "jiuguan":
                ViewManager.inst().open(PubView);
                break;
            case "shangcheng":
                ViewManager.inst().open(ShopView);
                break;
        }
    };
    /**税收冷却计时 */
    GameMainView.prototype.onTaxStart = function () {
        var self = this;
        this.taxInterVal = setInterval(function () {
            var endTime = egret.localStorage.getItem(LocalStorageEnum.TAX_CD_TIME);
            if (endTime && parseInt(endTime) <= new Date().getTime()) {
                //税收已经满仓
                clearInterval(self.taxInterVal);
                // egret.localStorage.setItem(LocalStorageEnum.TAX_CD_TIME,"");
                //主界面提示 领取状态
            }
            else {
                clearInterval(self.taxInterVal);
            }
        }, 1000);
    };
    /**开始征兵 */
    GameMainView.prototype.onCollectStart = function () {
        var self = this;
        this.collectInterVal = setInterval(function () {
            var endTime = egret.localStorage.getItem(LocalStorageEnum.collectTime);
            if (endTime && parseInt(endTime) <= new Date().getTime()) {
                clearInterval(self.collectInterVal);
                //当前是可以收集的状态 。征兵已经结束 。需要点击领取 。主界面提示
            }
            else {
                clearInterval(self.collectInterVal);
            }
        }, 1000);
    };
    /**征兵cd结束 */
    GameMainView.prototype.onCollectCD = function () {
        var self = this;
        this.collectCdInterVal = setInterval(function () {
            var endTime = egret.localStorage.getItem(LocalStorageEnum.COLLECT_CD_TIME);
            if (endTime && parseInt(endTime) <= new Date().getTime()) {
                egret.localStorage.setItem(LocalStorageEnum.COLLECT_CD_TIME, "");
            }
            else {
                clearInterval(self.collectCdInterVal);
            }
        }, this);
    };
    GameMainView.prototype.adapter = function () {
        if (Main.DUBUGGER) {
            Main.txt.text += "\n ready adapter";
        }
        var scale = this.stage.stageWidth / 1334;
        if (Main.DUBUGGER) {
            Main.txt.text += "\n adapter scale " + scale;
        }
        this.btn_group.scaleX = this.btn_group.scaleY = scale;
        if (Main.DUBUGGER) {
            Main.txt.text += "\n " + this.btn_group ? "btngroup" : 0;
        }
        this.info_group.scaleX = this.info_group.scaleY = scale;
        if (Main.DUBUGGER) {
            Main.txt.text += "\n " + this.info_group ? "info_group" : 0;
        }
        this.map_group.scaleX = this.map_group.scaleY = scale;
        if (Main.DUBUGGER) {
            Main.txt.text += "\n " + this.map_group ? "map_group" : 0;
        }
        this.role_img.scaleX = this.role_img.scaleY = scale;
        if (Main.DUBUGGER) {
            Main.txt.text += "\n " + this.role_img ? "role_img" : 0;
        }
        this.role_img2.scaleX = this.role_img2.scaleY = scale;
        if (Main.DUBUGGER) {
            Main.txt.text += "\n " + this.role_img2 ? "role_img2" : 0;
        }
        this.role_img2.alpha = 0;
        this.role_img.alpha = 0;
        if (Main.DUBUGGER) {
            Main.txt.text += "\n adapter finsish";
        }
    };
    /**内务cd */
    GameMainView.prototype.onNeiwuCd = function () {
        var self = this;
        this.neiwuInterval = setInterval(function () {
            var endTime = egret.localStorage.getItem(LocalStorageEnum.NEIWU_CD_TIME);
            if (endTime && parseInt(endTime) <= new Date().getTime()) {
                egret.localStorage.setItem(LocalStorageEnum.NEIWU_CD_TIME, "");
            }
            else {
                clearInterval(self.neiwuInterval);
            }
        }, this);
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.inst().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map