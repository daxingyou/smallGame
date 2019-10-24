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
var AdventureView = (function (_super) {
    __extends(AdventureView, _super);
    function AdventureView() {
        var _this = _super.call(this) || this;
        _this.player_speedx = 10;
        _this.player_speedy = 5;
        _this.moveBool = false;
        _this.countdown_time = 120;
        return _this;
    }
    AdventureView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this.touch_group, this.touchTap);
        this.addTouchEvent(this.back_img, this.touchClose);
        MessageManager.inst().addListener("OPEN_BOX_LIST", this.openList, this);
        MessageManager.inst().addListener("BOX_SKILL", this.boxSkill, this);
        MessageManager.inst().addListener("GAME_PAUSE", this.gamePause, this);
        MessageManager.inst().addListener("GAME_START", this.gameStart, this);
        MessageManager.inst().addListener("BOX_PICKUP", this.adventure_effect, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    AdventureView.prototype.close = function () {
        this.removeTouchEvent(this.touch_group, this.touchTap);
        this.removeTouchEvent(this.back_img, this.touchClose);
        MessageManager.inst().removeListener("OPEN_BOX_LIST", this.openList, this);
        MessageManager.inst().removeListener("BOX_SKILL", this.boxSkill, this);
        MessageManager.inst().removeListener("GAME_PAUSE", this.gamePause, this);
        MessageManager.inst().removeListener("GAME_START", this.gameStart, this);
        MessageManager.inst().removeListener("BOX_PICKUP", this.adventure_effect, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        AdventureConfig.itemAny = [];
    };
    AdventureView.prototype.init = function () {
        var _this = this;
        this.world_group["autoSize"]();
        this.bg_0.x = 0;
        this.bg_1.x = this.bg_0.x + this.bg_1.width;
        this.addChildAt(this.world_group, 999999);
        this.player = new MovieClip();
        this.player.playFile("resource/res/view/game/role/role_" + (GameApp.roleDataIndex + 1), -1, null, false, "idle", null, 13);
        this.player.x = StageUtils.inst().getWidth() / 2;
        this.player.y = StageUtils.inst().getHeight() / 2 + 80;
        this.world_group.addChild(this.player);
        this.roleName = new TextEffect(GameApp.roleData[GameApp.roleDataIndex].name, 0xF2A909, 1);
        this.roleName.x = this.player.x - this.roleName.width / 2;
        this.roleName.y = this.player.y - 170;
        this.world_group.addChild(this.roleName);
        this.player_hp = new Hp(100, GameApp.roleData[GameApp.roleDataIndex].level);
        this.player_hp.x = StageUtils.inst().getWidth() / 2 - this.player_hp.width / 2;
        this.player_hp.y = StageUtils.inst().getHeight() / 2 - 50;
        this.world_group.addChild(this.player_hp);
        this.box_skill = new MovieClip();
        this.world_group.addChild(this.box_skill);
        this.box_skill.visible = false;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        this.sp = new egret.Bitmap(RES.getRes("miwu_img_png"));
        this.sp.width = 1139;
        this.sp.height = 1139;
        this.sp.anchorOffsetX = this.sp.width / 2;
        this.sp.anchorOffsetY = this.sp.height / 2;
        this.sp.x = this.player.x;
        this.sp.y = this.player.y + 150;
        this.world_group.addChild(this.sp);
        egret.Tween.get(this.sp)
            .to({ x: this.sp.x + 200 }, 1500);
        this.miwu.x = this.player.x;
        this.miwu.y = this.player.y;
        this.item_group.mask = this.miwu;
        this.player_mask(this.sp, StageUtils.inst().getWidth(), StageUtils.inst().getHeight() + 500);
        this.countdown.text = this.countdown_time + " s";
        egret.Tween.get(this, { loop: true })
            .wait(1000)
            .call(function () {
            _this.countdown_time--;
            _this.countdown.text = _this.countdown_time + " s";
        });
    };
    /**陷阱 */
    AdventureView.prototype.boxSkill = function () {
        var _this = this;
        this.box_skill.visible = true;
        this.box_skill.x = this.player.x;
        this.box_skill.y = this.player.y;
        this.box_skill.playFile("resource/res/view/adventure/adventure_effect", 1, null, false, "", null, 20);
        var font = new EffectFont(20, this.player.x, this.player.y);
        this.world_group.addChild(font);
        this.fire.alpha = 0;
        this.fire.visible = true;
        this.fire.x = this.player.x;
        this.fire.y = this.player.y - 200;
        this.world_group.addChild(this.fire);
        egret.Tween.get(this.fire)
            .to({ y: this.fire.y - 50, alpha: 1 }, 200)
            .wait(500)
            .to({ alpha: 0 }, 300)
            .call(function () {
            _this.fire.visible = false;
        }, this);
        this.player_hp.setHp(20);
        if (this.player_hp.getHp() <= 0) {
            egret.Tween.removeTweens(this);
            /**探险结束 */
            ViewManager.inst().open(AdventureOver);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        setTimeout(function () {
            _this.box_skill.visible = false;
        }, 1000);
    };
    AdventureView.prototype.touchClose = function () {
        MessageManager.inst().dispatch("GAME_PAUSE", this);
        ViewManager.inst().open(PauseView, [AdventureView]);
    };
    AdventureView.prototype.touchTap = function (evt) {
        this.moveBool = true;
        this.nx = evt.stageX;
        this.ny = evt.stageY;
        if (this.ny <= 280)
            this.ny = 280;
        else if (this.ny >= 630)
            this.ny = 630;
        var rot = Math.atan2(this.ny - this.player.y, this.nx - this.player.x);
        this.player_speedx = Math.cos(rot) * 15;
        this.player_speedy = Math.sin(rot) * 15;
        if (this.player_speedx < 0)
            this.player.scaleX = -1;
        else
            this.player.scaleX = 1;
        this.player.playFile("resource/res/view/game/role/role_" + (GameApp.roleDataIndex + 1), -1, null, false, "run", null, 13);
        this.nx = this.world_group.x + this.nx;
    };
    AdventureView.prototype.update = function () {
        if (this.countdown_time <= 0) {
            egret.Tween.removeTweens(this);
            /**探险结束 */
            ViewManager.inst().open(AdventureOver);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        this.createItem();
        this.itemOut();
        this.pickupItem();
        this.playerMove();
    };
    /**打开列表 */
    AdventureView.prototype.openList = function (evt) {
        this.world_group.addChild(this.box_list);
        this.box_list.visible = true;
        this.list.itemRenderer = BoxItem;
        this.list.dataProvider = new eui.ArrayCollection(evt.data);
    };
    /**创建物品 */
    AdventureView.prototype.createItem = function () {
        if (AdventureConfig.itemAny.length < 5) {
            for (var i = 0; i < 5 - AdventureConfig.itemAny.length; i++) {
                var num = Math.random() * 100;
                var item;
                if (num < 90) {
                    item = new AdventureItem();
                }
                else if (num < 100) {
                    item = new TreasureBox();
                }
                item.x = Math.random() * (this.world_group.width * 3) + (this.world_group.x - this.world_group.width);
                item.y = Math.random() * 350 + 280;
                this.item_group.addChildAt(item, 2);
                AdventureConfig.itemAny.push(item);
            }
        }
    };
    /**物品出界 */
    AdventureView.prototype.itemOut = function () {
        for (var i = 0; i < AdventureConfig.itemAny.length; i++) {
            if (AdventureConfig.itemAny[i].x <= this.world_group.x - this.world_group.width ||
                AdventureConfig.itemAny[i].x >= this.world_group.x + this.world_group.width * 2) {
                this.item_group.removeChild(AdventureConfig.itemAny[i]);
                AdventureConfig.itemAny.splice(i, 1);
                i--;
            }
        }
    };
    /**拾取物品 */
    AdventureView.prototype.pickupItem = function () {
        for (var i = 0; i < AdventureConfig.itemAny.length; i++) {
            var _x = this.world_group.x + this.player.x;
            var _y = this.player.y - 30;
            if (Math.abs(_x - AdventureConfig.itemAny[i].x) < 40 && Math.abs(_y - AdventureConfig.itemAny[i].y) < 60) {
                if (AdventureConfig.itemAny[i].vis == true) {
                    if (AdventureConfig.itemAny[i].id == 0) {
                        /**宝箱 */
                        this.box = AdventureConfig.itemAny[i];
                        MessageManager.inst().dispatch("OPEN_BOX", this.box);
                    }
                    else if (AdventureConfig.itemAny[i].id == 10016) {
                        /**金币 */
                        var tip = new AdventureEffect([{ x: this.player.x - 30, y: this.player.y - 30, img: AdventureConfig.itemAny[i].id, num: 5 }]);
                        this.world_group.addChildAt(tip, 99999);
                        GameApp.roleGold += 5;
                        AdventureConfig.itemAny[i].vis = false;
                        AdventureConfig.itemAny[i].effect();
                        AdventureConfig.itemAny.splice(i, 1);
                        i--;
                    }
                    else {
                        /**材料 */
                        var tip = new AdventureEffect([{ x: this.player.x - 30, y: this.player.y - 30, img: AdventureConfig.itemAny[i].id, num: 1 }]);
                        this.world_group.addChildAt(tip, 99999);
                        GameConfig.setAdventure(AdventureConfig.itemAny[i].id);
                        GlobalFun.addItemToBag(AdventureConfig.itemAny[i].id, 1);
                        AdventureConfig.itemAny[i].vis = false;
                        AdventureConfig.itemAny[i].effect();
                        AdventureConfig.itemAny.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    };
    AdventureView.prototype.adventure_effect = function (evt) {
        var tip = new AdventureEffect([{ x: this.player.x - 30, y: this.player.y - 30, img: evt.data.img, num: 1 }]);
        this.world_group.addChildAt(tip, 99999);
    };
    /**遮罩 */
    AdventureView.prototype.player_mask = function (dp, w, h) {
        var _this = this;
        var container = new egret.DisplayObjectContainer();
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.8);
        bg.graphics.drawRect(0, 0, w, h);
        bg.graphics.endFill();
        container.addChild(bg);
        container.addChild(dp);
        dp.blendMode = egret.BlendMode.ERASE;
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(container);
        this.bitmap = new egret.Bitmap(renderTexture);
        this.bitmap.anchorOffsetX = this.bitmap.width / 2;
        this.bitmap.anchorOffsetY = this.bitmap.height / 2;
        this.bitmap.x = this.player.x;
        this.bitmap.y = this.player.y;
        this.bitmap.width = 1334;
        this.world_group.addChild(this.bitmap);
        this.bitmap.touchEnabled = false; //允许点击
        this.bitmap.pixelHitTest = true; //镂空区域不响应点击，这样可以穿透点击到下面的背景
        this.world_group.addChild(this.countdown);
        this.world_group.addChild(this.back_img);
        this.world_group.addChild(this.tip_label);
        setTimeout(function () {
            egret.Tween.get(_this.tip_label)
                .to({ alpha: 0 }, 300);
        }, 2000);
    };
    /**玩家移动 */
    AdventureView.prototype.playerMove = function () {
        if (!this.moveBool)
            return;
        this.box = null;
        this.box_list.visible = false;
        MessageManager.inst().dispatch("CLOSE_BOX", this);
        this.world_group.x += this.player_speedx;
        this.x = -this.world_group.x;
        this.player.y += this.player_speedy;
        this.player_hp.y = this.player.y - 130;
        this.miwu.y = this.player.y;
        this.bitmap.y = this.player.y;
        this.roleName.y = this.player.y - 170;
        if (this.bg_0.x <= this.world_group.x - this.bg_0.width) {
            this.bg_0.x += 2 * this.bg_0.width;
        }
        else if (this.bg_0.x >= this.world_group.x + this.bg_0.width) {
            this.bg_0.x -= 2 * this.bg_0.width;
        }
        if (this.bg_1.x <= this.world_group.x - this.bg_1.width) {
            this.bg_1.x += 2 * this.bg_1.width;
        }
        else if (this.bg_1.x >= this.world_group.x + this.bg_1.width) {
            this.bg_1.x -= 2 * this.bg_1.width;
        }
        if (Math.abs(this.player.y - this.ny) < 10) {
            this.player_speedy = 0;
        }
        if (Math.abs((this.world_group.x + this.player.x) - this.nx) < 10) {
            this.player_speedx = 0;
        }
        if (Math.abs(this.player.y - this.ny) < 20 && Math.abs((this.world_group.x + this.player.x) - this.nx) < 20) {
            this.moveBool = false;
            this.player.playFile("resource/res/view/game/role/role_" + (GameApp.roleDataIndex + 1), -1, null, false, "idle", null, 13);
        }
    };
    AdventureView.prototype.gamePause = function () {
        egret.Tween.pauseTweens(this);
    };
    AdventureView.prototype.gameStart = function () {
        egret.Tween.resumeTweens(this);
    };
    return AdventureView;
}(BaseEuiView));
__reflect(AdventureView.prototype, "AdventureView");
ViewManager.inst().reg(AdventureView, LayerManager.UI_Main);
//# sourceMappingURL=AdventureView.js.map