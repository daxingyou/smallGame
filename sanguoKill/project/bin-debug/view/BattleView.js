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
var BattleView = (function (_super) {
    __extends(BattleView, _super);
    // private video:egret.Video;
    function BattleView() {
        var _this = _super.call(this) || this;
        _this.curOwnAtkCount = 0;
        _this.levelAtkOrder = [0, 2, 1];
        _this.curLevelAtkIndex = 0;
        return _this;
    }
    BattleView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GameApp.battleEnd = false;
        // this.video = new egret.Video();
        // this.video.x = 0;                       //设置视频坐标x
        // this.video.y = 0;                       //设置视频坐标y
        // this.video.width = 640;                 //设置视频宽
        // this.video.height = 320;                //设置视频高
        // this.video.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
        // this.video.load("resource/res/video/resultWin.mp4");
        // LayerManager.UI_Pop.addChild(this.video);              //将视频添加到舞台
        // //监听视频加载完成
        // this.video.once(egret.Event.COMPLETE,this.onLoad,this);
        // //监听视频加载失败
        // this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
        GameApp.roleDeadNum = 0;
        GameApp.enemyDeadNum = 0;
        GameApp.ownDeadState = [0, 0, 0];
        GameApp.levelDeadState = [0, 0, 0];
        this.menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenMenu, this);
        MessageManager.inst().addListener(CustomEvt.SETTINGCLICK, this.onSetting, this);
        MessageManager.inst().addListener(CustomEvt.CLICK_KILL, this.onClickKill, this);
        MessageManager.inst().addListener(CustomEvt.PROP_USE, this.onPropUse, this);
        this.rectTop.visible = this.rectMiddle.visible = this.rectBottom.visible = false;
        this.rectTop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRectTouch, this);
        this.rectMiddle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRectTouch, this);
        this.rectBottom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRectTouch, this);
        this.ownList.itemRenderer = OwnHeroItem;
        this.ownData = new eui.ArrayCollection();
        this.ownList.dataProvider = this.ownData;
        /**
         * 设置我方将领加数据
         */
        this.ownData.source = UpgradeCfg.ins.getRoleInfo();
        //=======
        var self = this;
        var timeout1 = setTimeout(function () {
            clearTimeout(timeout1);
            self.ownForbid();
        }, 300);
        this.enemyList.itemRenderer = EnemyHeroItem;
        this.enemyData = new eui.ArrayCollection();
        this.enemyList.dataProvider = this.enemyData;
        /**设置敌方将领假数据 */
        this.enemyData.source = GameApp.charpter_info[GameApp.curLevel - 1];
        //=====
        egret.Tween.get(this.ownList).to({ left: 20 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.ownList);
        }, this);
        egret.Tween.get(this.enemyList).to({ right: 20 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.enemyList);
            _this.atkNumber = _this.judagePriority();
            var timeout = setTimeout(function () {
                clearTimeout(timeout);
                self.showAnimate();
            }, 600);
        }, this);
        this.ownList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.enemyList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onEnemtyTap, this);
        this.watcher = eui.Binding.bindHandler(GameApp, ["roleDeadNum"], this.onRoleDeadNum, this);
        this.watcher2 = eui.Binding.bindHandler(GameApp, ["enemyDeadNum"], this.onEnemyDead, this);
    };
    // private onLoad(e: egret.Event) {
    // 	console.log("video加载完成")
    //     this.video.play();
    //     //获取视频长度
    //     console.log(this.video.length);
    // }
    // private onLoadErr(e: egret.Event) {
    //     console.log("video load error happened");
    // }
    // public play(e: egret.TouchEvent) {
    // }
    BattleView.prototype.onRoleDeadNum = function (value) {
        if (value == 3) {
            //人物死亡
            GameApp.battleEnd = true;
            ViewManager.inst().open(ResultView, [{ state: 0 }]);
        }
    };
    BattleView.prototype.onEnemyDead = function (value) {
        if (value == 3) {
            //关卡死亡
            // let video:egret.Video = new egret.Video(`${VIDEO_EFF_ICON}/resultWin.mp4`,true);
            // video.width = StageUtils.inst().getWidth();
            // video.height = StageUtils.inst().getHeight();
            // LayerManager.UI_Pop.addChild(video);
            // video.play();
            // console.log(video.length);
            GameApp.battleEnd = true;
            ViewManager.inst().open(ResultView, [{ state: 1 }]);
        }
    };
    /**item点击了杀 */
    BattleView.prototype.onClickKill = function (evt) {
        this.rectTop.visible = this.rectMiddle.visible = this.rectBottom.visible = true;
    };
    BattleView.prototype.onRectTouch = function (evt) {
        this.rectTop.visible = this.rectMiddle.visible = this.rectBottom.visible = false;
    };
    /**使用了道具 */
    BattleView.prototype.onPropUse = function (evt) {
        var attr = evt.data.attr;
        GlobalFun.setBagData(attr.instId);
        //作用全部 。直接使用
        if (attr.forTar == Camp.owner) {
            //作用在已方身上
            if (attr.range == 3) {
                //己方全体生命值恢复
                for (var i = 0; i < 3; i++) {
                    var item = this.ownList.getChildAt(i);
                    if (item && !item.isDead) {
                        item.addHp = attr.hp;
                        if (i == 0) {
                            this.calculDmgShow(0, item);
                        }
                        else {
                            this.calculDmgShow(0, item, true);
                        }
                    }
                }
            }
            else {
                //单体生命值恢复
                var index = evt.data.tarIndex;
                var item = this.ownList.getChildAt(index);
                item.addHp = attr.hp;
                this.calculDmgShow(0, item);
            }
        }
        else {
            var icon = "role_eff_" + this.curSelectCard.itemIndex + "_png";
            ViewManager.inst().open(SkillEffShow, [{ icon: icon, pic: attr.instId }]);
            var self_1 = this;
            var timeout_1 = setTimeout(function (attr) {
                clearTimeout(timeout_1);
                //作用在敌方身上
                if (attr.range == 3) {
                    if (attr.hurt) {
                        //当前时针对敌方全体的技能牌 //全体播放特效
                        for (var i = 0; i < 3; i++) {
                            var item = self_1.enemyList.getChildAt(i);
                            if (item && !item.isDead) {
                                var value = ((self_1.curSelectCard.attr.atk + ((Math.random() * self_1.curSelectCard.attr.crit) >> 0)) * attr.hurt) >> 0;
                                item.reduceHp = value;
                                if (i == 0) {
                                    self_1.calculDmgShow(value, item);
                                }
                                else {
                                    self_1.calculDmgShow(value, item, true);
                                }
                            }
                        }
                    }
                    if (attr.oper == 0 && attr.atk) {
                        //当前是针对敌方全体的属性值变化 只持续一个回合
                        for (var j = 0; j < 3; j++) {
                            var item = self_1.enemyList.getChildAt(j);
                            if (item && !item.isDead) {
                                item.buffAtk = -(item.attr.atk * attr.atk);
                                if (j == 0) {
                                    self_1.calculDmgShow(0, item);
                                }
                                else {
                                    self_1.calculDmgShow(0, item, true);
                                }
                            }
                        }
                    }
                }
                else {
                    if (attr.hurt) {
                        //对敌人进行单体伤害
                        var index = evt.data.tarIndex;
                        var item = self_1.enemyList.getChildAt(index);
                        if (item) {
                            var value = ((self_1.curSelectCard.attr.atk + ((Math.random() * self_1.curSelectCard.attr.crit) >> 0)) * attr.hurt) >> 0;
                            item.reduceHp = value;
                            self_1.calculDmgShow(value, item);
                        }
                    }
                    if (attr.oper == 0 && attr.atk) {
                        //对敌人进行单体属性变化 只持续一个回合
                        var index = evt.data.tarIndex;
                        var item = self_1.enemyList.getChildAt(index);
                        if (item && !item.isDead) {
                            item.buffAtk = -(item.attr.atk * attr.atk);
                            self_1.calculDmgShow(0, item);
                        }
                    }
                }
            }, 2000, attr);
        }
    };
    BattleView.prototype.calculDmgShow = function (reduceValue, item, onlyFly) {
        if (onlyFly === void 0) { onlyFly = false; }
        if (!onlyFly) {
            this.curSelectCard.isAtk = true;
            this.curOwnAtkCount += 1;
            this.curSelectCard.resetPos();
            GlobalFun.filterToGrey(this.curSelectCard);
        }
        if (reduceValue) {
            var flyDmgFont_1 = new eui.Label();
            this.addChild(flyDmgFont_1);
            flyDmgFont_1.fontFamily = "yt";
            flyDmgFont_1.textColor = 0xfc3434;
            flyDmgFont_1.size = 30;
            var stageP = this.enemyList.localToGlobal(item.x, item.y);
            flyDmgFont_1.x = stageP.x + 60;
            flyDmgFont_1.y = stageP.y + 60;
            flyDmgFont_1.alpha = 0;
            flyDmgFont_1.text = "-" + reduceValue;
            egret.Tween.get(flyDmgFont_1).to({ alpha: 1, y: flyDmgFont_1.y - 50 }, 300).wait(500).to({ alpa: 1, y: flyDmgFont_1.y - 70 }, 1000).call(function () {
                egret.Tween.removeTweens(flyDmgFont_1);
                if (flyDmgFont_1 && flyDmgFont_1.parent) {
                    flyDmgFont_1.parent.removeChild(flyDmgFont_1);
                }
            }, this);
        }
        if (!onlyFly) {
            if (this.curOwnAtkCount >= 3) {
                this.curOwnAtkCount = 0;
                this.ownForbid();
                this.changeAtkTar();
            }
            else {
                this.changeOwnerFocus();
            }
        }
    };
    BattleView.prototype.onItemTap = function (evt) {
        var item = this.ownList.getChildAt(evt.itemIndex);
        if (item == this.curSelectCard) {
            //相当于初始化了
            return;
        }
        this.initOwnlistPos();
        if (item && !item.isDead && !item.isAtk) {
            this.curSelectCard = item;
            item.ready();
        }
    };
    /**点击地方 */
    BattleView.prototype.onEnemtyTap = function (evt) {
        if (this.atkNumber == 2) {
            return;
        }
        var item = this.enemyList.getChildAt(evt.itemIndex);
        if (item && !item.isDead && this.curSelectCard && !this.curSelectCard.isAtk) {
            this.curSelectCard.isAtk = true;
            this.curOwnAtkCount += 1;
            this.curSelectCard.resetPos();
            GlobalFun.filterToGrey(this.curSelectCard);
            var missBoo = item.judgeMiss();
            this.onRectTouch(null);
            var reduceHp = 0;
            var flyDmgFont_2 = new eui.Label();
            this.addChild(flyDmgFont_2);
            flyDmgFont_2.fontFamily = "yt";
            flyDmgFont_2.textColor = 0xfc3434;
            flyDmgFont_2.size = 30;
            var stageP = this.enemyList.localToGlobal(item.x, item.y);
            flyDmgFont_2.x = stageP.x + 60;
            flyDmgFont_2.y = stageP.y + 60;
            flyDmgFont_2.alpha = 0;
            if (!missBoo) {
                item.shake(200);
                reduceHp = this.curSelectCard.attr.atk + ((Math.random() * this.curSelectCard.attr.crit) >> 0);
                item.reduceHp = reduceHp;
                flyDmgFont_2.text = "-" + reduceHp;
            }
            else {
                flyDmgFont_2.text = "Miss";
            }
            if (this.curOwnAtkCount >= this.getOwnLive().length) {
                this.curOwnAtkCount = 0;
                this.ownForbid();
                this.changeAtkTar();
            }
            else {
                this.changeOwnerFocus();
            }
            egret.Tween.get(flyDmgFont_2).to({ alpha: 1, y: flyDmgFont_2.y - 50 }, 300).wait(500).to({ alpa: 1, y: flyDmgFont_2.y - 70 }, 1000).call(function () {
                egret.Tween.removeTweens(flyDmgFont_2);
                if (flyDmgFont_2 && flyDmgFont_2.parent) {
                    flyDmgFont_2.parent.removeChild(flyDmgFont_2);
                }
            }, this);
        }
    };
    /**初始化我方列表卡牌的位置 */
    BattleView.prototype.initOwnlistPos = function () {
        for (var i = 0; i < 3; i++) {
            var item = this.ownList.getChildAt(i);
            if (item) {
                item.resetPos();
            }
        }
    };
    /**我方禁止点击状态 */
    BattleView.prototype.ownForbid = function () {
        var len = this.ownList.$children.length;
        this.ownList.touchEnabled = false;
        this.ownList.touchChildren = false;
        this.ownList.touchThrough = false;
        for (var i = 0; i < len; i++) {
            var item = this.ownList.getChildAt(i);
            if (item) {
                GlobalFun.filterToGrey(item);
            }
        }
    };
    /**解除我放禁止点击状态 */
    BattleView.prototype.removeForbid = function () {
        var len = this.ownList.$children.length;
        this.ownList.touchEnabled = true;
        this.ownList.touchChildren = true;
        this.ownList.touchThrough = true;
        for (var i = 0; i < len; i++) {
            var item = this.ownList.getChildAt(i);
            if (item) {
                GlobalFun.clearFilters(item);
            }
        }
    };
    /**显示攻击提示 */
    BattleView.prototype.showAnimate = function () {
        var _this = this;
        var imgsource = this.atkNumber == 1 ? "own_atk_title_png" : "enemy_atk_title_png";
        var img = new eui.Image();
        img.source = imgsource;
        this.addChild(img);
        img.verticalCenter = 0;
        img.x = this.atkNumber == 1 ? -600 : StageUtils.inst().getWidth() + 600;
        var tx = (StageUtils.inst().getWidth() - 398) >> 1;
        var nx = this.atkNumber == 1 ? StageUtils.inst().getWidth() + 600 : -600;
        egret.Tween.get(img).to({ x: tx }, 1200, egret.Ease.circOut).wait(500).to({ x: nx }, 1200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(img);
            if (_this.atkNumber == 1) {
                _this.removeForbid(), _this.changeOwnerFocus();
            }
            else {
                _this.startLevelHeroAtk();
            }
        }, this);
    };
    /**切换攻击方 */
    BattleView.prototype.changeAtkTar = function () {
        for (var i = 0; i < 3; i++) {
            //chu shi hua初始化攻击状态
            var item = this.ownList.getChildAt(i);
            if (!item.isDead) {
                item.isAtk = false;
            }
        }
        this.atkNumber = this.atkNumber == 1 ? 2 : 1;
        this.showAnimate();
    };
    /**切换焦点 */
    BattleView.prototype.changeOwnerFocus = function () {
        var orider = [1, 0, 2];
        for (var i = 0; i < orider.length; i++) {
            var item = this.ownList.getChildAt(orider[i]);
            if (item && !item.isDead && !item.isAtk) {
                this.curSelectCard = item;
                this.curSelectCard.ready();
                break;
            }
        }
    };
    /**开启关卡英雄攻击 */
    BattleView.prototype.startLevelHeroAtk = function () {
        var _this = this;
        if (GameApp.battleEnd) {
            return;
        }
        this.curSelectCard = null;
        this.ownForbid();
        var item = this.enemyList.getChildAt(this.levelAtkOrder.shift());
        if (item) {
            if (item.isDead) {
                this.startLevelHeroAtk();
                return;
            }
            var livearr = this.getOwnLive();
            var index = (Math.random() * livearr.length) >> 0;
            var damageHero_1 = livearr[index];
            if (!damageHero_1) {
                return;
            }
            item.execAtkAction(function () {
                //当前执行攻击动作
                var missBoo = damageHero_1.judgeMiss();
                var reduceHp = 0;
                var flyDmgFont = new eui.Label();
                _this.addChild(flyDmgFont);
                flyDmgFont.fontFamily = "yt";
                flyDmgFont.textColor = 0xfc3434;
                flyDmgFont.size = 30;
                var stageP = _this.ownList.localToGlobal(damageHero_1.x, damageHero_1.y);
                flyDmgFont.x = stageP.x + 90;
                flyDmgFont.y = stageP.y + 60;
                flyDmgFont.alpha = 0;
                if (!missBoo) {
                    damageHero_1.shake(200);
                    reduceHp = item.attr.atk + ((Math.random() * item.attr.crit) >> 0) + item.buffAtk;
                    damageHero_1.reduceHp = reduceHp;
                    item.buffAtk = 0;
                    flyDmgFont.text = "-" + reduceHp;
                }
                else {
                    flyDmgFont.text = "Miss";
                }
                egret.Tween.get(flyDmgFont).to({ alpha: 1, y: flyDmgFont.y - 50 }, 300).wait(500).to({ alpa: 1, y: flyDmgFont.y - 70 }, 1000).call(function () {
                    egret.Tween.removeTweens(flyDmgFont);
                    if (flyDmgFont && flyDmgFont.parent) {
                        flyDmgFont.parent.removeChild(flyDmgFont);
                    }
                }, _this);
            }, function () {
                //攻击完成
                _this.curLevelAtkIndex += 1;
                if (_this.curLevelAtkIndex >= _this.getEnemyAtkCount()) {
                    _this.curLevelAtkIndex = 0;
                    _this.levelAtkOrder = [0, 2, 1];
                    //敌方战斗回合结束;
                    _this.removeForbid();
                    _this.changeAtkTar();
                }
                else {
                    var self_2 = _this;
                    var timeout_2 = setTimeout(function () {
                        clearTimeout(timeout_2);
                        self_2.startLevelHeroAtk();
                    }, 600);
                }
            }, this);
        }
    };
    BattleView.prototype.getEnemyAtkCount = function () {
        var num = 0;
        for (var i = 0; i < 3; i++) {
            if (GameApp.levelDeadState[i] == 0) {
                num += 1;
            }
        }
        return num;
    };
    /**获取敌方当前活着的英雄 */
    /**获取我方当前存活的英雄 */
    BattleView.prototype.getOwnLive = function () {
        var arr = [];
        for (var i = 0; i < 3; i++) {
            var item = this.ownList.getChildAt(i);
            if (!item.isDead) {
                arr.push(item);
            }
        }
        return arr;
    };
    /**根据敏捷值总和 判断谁先手 1 为我先手 。2为敌方先手*/
    BattleView.prototype.judagePriority = function () {
        var value1 = 0;
        if (this.ownData.source && this.ownData.source.length) {
            for (var i = 0; i < this.ownData.source.length; i++) {
                value1 += this.ownData.source[i].attr.agile;
            }
        }
        var value2 = 0;
        if (this.enemyData.source && this.enemyData.source.length) {
            for (var i = 0; i < this.enemyData.source.length; i++) {
                value2 += this.enemyData.source[i].attr.agile;
            }
        }
        return value1 >= value2 ? 1 : 2;
    };
    BattleView.prototype.onSetting = function (evt) {
        if (evt.data.oper) {
            //点击了继续
        }
        else {
            //点击了退出
            // let\
        }
    };
    BattleView.prototype.onOpenMenu = function (evt) {
        ViewManager.inst().open(SettingPopUp);
    };
    BattleView.prototype.close = function () {
        if (this.watcher) {
            this.watcher.unwatch();
        }
        if (this.watcher2) {
            this.watcher2.unwatch();
        }
        this.menuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenMenu, this);
        MessageManager.inst().removeListener(CustomEvt.SETTINGCLICK, this.onSetting, this);
        MessageManager.inst().removeListener(CustomEvt.CLICK_KILL, this.onClickKill, this);
        this.ownList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.enemyList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onEnemtyTap, this);
        this.rectTop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRectTouch, this);
        this.rectMiddle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRectTouch, this);
        this.rectBottom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRectTouch, this);
        MessageManager.inst().removeListener(CustomEvt.PROP_USE, this.onPropUse, this);
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
ViewManager.inst().reg(BattleView, LayerManager.UI_Main);
//# sourceMappingURL=BattleView.js.map