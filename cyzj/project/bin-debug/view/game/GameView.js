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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.round_num = 1;
        _this.round_max = 3;
        _this.map_speed = 5; /**地图速度 */
        _this.map_bool = true; /**地图是否移动 */
        _this.update_bool = true;
        _this.player_num = 5;
        _this.player_pos = [
            { x: StageUtils.inst().getWidth() / 2 - 100, y: StageUtils.inst().getHeight() / 2 + 80 },
            { x: StageUtils.inst().getWidth() / 2 - 150 - 100, y: StageUtils.inst().getHeight() / 2 + 40 },
            { x: StageUtils.inst().getWidth() / 2 - 300 - 100, y: StageUtils.inst().getHeight() / 2 + 120 },
            { x: StageUtils.inst().getWidth() / 2 - 300 - 100, y: StageUtils.inst().getHeight() / 2 + 40 },
            { x: StageUtils.inst().getWidth() / 2 - 150 - 100, y: StageUtils.inst().getHeight() / 2 + 120 },
        ];
        GameConfig.roleData = GameApp.roleData;
        return _this;
    }
    GameView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        this.warnLab.alpha = 0;
        egret.Tween.get(this)
            .to({ alpha: 1 }, 300)
            .call(function () {
            _this.init();
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            _this.addTouchEvent(_this.back_img, _this.touchBack);
            _this.addTouchEvent(_this.auto_img, _this.touchAuto);
            MessageManager.inst().addListener("NEXT_ROUND", _this.nextRound, _this);
            MessageManager.inst().addListener("HURT_FONT", _this.add_font, _this);
            MessageManager.inst().addListener("FASHI_EFFECT", _this.fashiEffect, _this);
        });
    };
    GameView.prototype.close = function () {
        egret.Tween.removeTweens(this);
        MessageManager.inst().removeListener("NEXT_ROUND", this.nextRound, this);
        MessageManager.inst().removeListener("HURT_FONT", this.add_font, this);
        MessageManager.inst().removeListener("FASHI_EFFECT", this.fashiEffect, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.removeTouchEvent(this.back_img, this.touchBack);
        this.removeTouchEvent(this.auto_img, this.touchAuto);
    };
    GameView.prototype.update = function () {
        this.map_move();
        if (!this.update_bool)
            return;
        this.removeRole();
        /**合并数组 */
        GameConfig.hebing();
        /**更新层级 */
        for (var i = 0; i < GameConfig.always_any.length; i++) {
            this.world_group.addChildAt(GameConfig.always_any[i], i);
        }
        /**判断是否过关 */
        if (GameConfig.monsterFig.length <= 0) {
            this.update_bool = false;
            if (this.round_max == 1) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
                this.rest();
                ViewManager.inst().open(OverView, ["win"]);
                this.map_bool = false;
                MessageManager.inst().dispatch("GAME_OVER");
            }
            else if (this.round_num <= this.round_max) {
                MessageManager.inst().dispatch("PLAYER_PLACE", this);
                MessageManager.inst().addListener("NEXT_ROUND", this.nextRound, this);
                this.round_num++;
                if (this.round_num <= this.round_max) {
                    this.round.text = this.round_num + " / " + this.round_max;
                }
            }
            else if (this.round_num > this.round_max) {
                /**过关 */
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
                this.rest();
                ViewManager.inst().open(OverView, ["win"]);
                this.map_bool = false;
                MessageManager.inst().dispatch("GAME_OVER");
            }
        }
        if (GameConfig.playerFig.length <= 0) {
            /**过关 */
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.rest();
            ViewManager.inst().open(OverView, ["failure"]);
            this.map_bool = false;
            MessageManager.inst().dispatch("GAME_OVER");
        }
    };
    GameView.prototype.touchBack = function () {
        ViewManager.inst().open(PauseView, [GameView]);
    };
    GameView.prototype.rest = function () {
        GameConfig.monsterFig = [];
        GameConfig.playerFig = [];
        GameConfig.monster_qian = [];
        GameConfig.monster_zhong = [];
        GameConfig.monster_hou = [];
        GameConfig.player_qian = [];
        GameConfig.player_hou = [];
    };
    GameView.prototype.touchAuto = function () {
        if (this.rect.visible == true) {
            this.rect.visible = false;
            GameConfig.auto_bool = true;
        }
        else {
            this.rect.visible = true;
            GameConfig.auto_bool = false;
        }
    };
    /**法师技能 */
    GameView.prototype.fashiEffect = function () {
        var mc = new MovieClip();
        mc.playFile("resource/res/view/game/fashi_skill", 1, null, false, "", null, 15);
        mc.x = this.world_group.width / 2 + 150;
        mc.y = this.world_group.height / 2 + 50;
        this.world_group.addChild(mc);
        setTimeout(function () {
            MessageManager.inst().dispatch("MONSTER_HURT", "all");
        }, 1200);
        setTimeout(function () {
            mc.destroy();
        }, 1400);
    };
    /**伤害字体 */
    GameView.prototype.add_font = function (evt) {
        var font = new EffectFont(evt.data.hurt, evt.data.any.x, evt.data.any.y);
        this.world_group.addChild(font);
    };
    /**下一波 */
    GameView.prototype.nextRound = function () {
        var _this = this;
        MessageManager.inst().removeListener("NEXT_ROUND", this.nextRound, this);
        this.map_bool = true;
        egret.Tween.get(this)
            .wait(1500)
            .call(function () {
            _this.createManster();
            _this.fenlei();
            _this.map_bool = false;
            _this.update_bool = true;
        });
    };
    /**地图移动 */
    GameView.prototype.map_move = function () {
        if (!this.map_bool)
            return;
        this.world_group.x += this.map_speed;
        this.x = -this.world_group.x;
        if (this.bg_0.x <= this.world_group.x - this.bg_0.width) {
            this.bg_0.x += 2 * this.bg_0.width;
        }
        if (this.bg_1.x <= this.world_group.x - this.bg_1.width) {
            this.bg_1.x += 2 * this.bg_1.width;
        }
    };
    GameView.prototype.init = function () {
        var _this = this;
        this.round_max = GameConfig.gqFig[GameConfig.gq].length;
        this.round.text = this.round_num + " / " + this.round_max;
        if (GameConfig.fight_state == "adventure") {
            this.round_max = 1;
            this.round.text = this.round_num + " / " + this.round_max;
        }
        this.world_group["autoSize"]();
        this.world_group.addChildAt(new GameIcon(), 999);
        /**创建英雄 */
        for (var i = 0; i < 5; i++) {
            if (GameConfig.roleData[i].isUnlock == true) {
                var role = new Role(i + 1, this.world_group.x - 100, this.world_group.y + this.world_group.height / 2 + 100, this.player_pos[i].x, this.player_pos[i].y);
                this.world_group.addChild(role);
                GameConfig.playerFig.push(role);
            }
        }
        /**创建怪物 */
        this.createManster();
        this.fenlei();
        egret.Tween.get(this)
            .wait(1000)
            .call(function () {
            _this.map_bool = false;
        });
    };
    /**创建怪物 */
    GameView.prototype.createManster = function () {
        var _this = this;
        if (GameConfig.fight_state == "adventure") {
            var monster = new Monster(0, Math.floor(Math.random() * 9 + 1), this.world_group.x + this.world_group.width + 100, this.world_group.y + this.world_group.height / 2 + 100, StageUtils.inst().getWidth() / 2 + 100, StageUtils.inst().getHeight() / 2 + 80);
            this.world_group.addChild(monster);
            GameConfig.monsterFig.push(monster);
        }
        else {
            if (GameConfig.gqFig[GameConfig.gq][this.round_num - 1] != -1) {
                for (var i = 0; i < GameConfig.gqFig[GameConfig.gq][this.round_num - 1]; i++) {
                    for (var j = 0; j < 3; j++) {
                        var monster = new Monster(i, GameConfig.gqFig_monster[GameConfig.gq][this.round_num - 1], this.world_group.x + this.world_group.width + 100, this.world_group.y + this.world_group.height / 2 + 100, StageUtils.inst().getWidth() / 2 + 100 + i * 150, StageUtils.inst().getHeight() / 2 + 40 + j * 40);
                        this.world_group.addChild(monster);
                        GameConfig.monsterFig.push(monster);
                    }
                }
            }
            else if (GameConfig.gqFig[GameConfig.gq][this.round_num - 1] == -1) {
                GlobalFun.shakeObj(this, 1, 20, 5);
                egret.Tween.get(this.warnLab).to({ alpha: 1 }, 300).to({ alpha: 0 }, 300).to({ alpha: 1 }, 300).to({ alpha: 0 }, 300).call(function () {
                    egret.Tween.removeTweens(_this.warnLab);
                    _this.warnLab.alpha = 0;
                }, this);
                var monster = new Monster(0, GameConfig.gqFig_monster[GameConfig.gq][this.round_num - 1], this.world_group.x + this.world_group.width + 100, this.world_group.y + this.world_group.height / 2 + 100, StageUtils.inst().getWidth() / 2 + 100, StageUtils.inst().getHeight() / 2 + 80);
                monster.scaleX = monster.scaleY = 1.5;
                this.world_group.addChild(monster);
                GameConfig.monsterFig.push(monster);
            }
        }
    };
    /**人物分类 */
    GameView.prototype.fenlei = function () {
        GameConfig.monster_qian = [];
        GameConfig.monster_zhong = [];
        GameConfig.monster_hou = [];
        GameConfig.player_qian = [];
        GameConfig.player_hou = [];
        for (var i = 0; i < GameConfig.monsterFig.length; i++) {
            if (GameConfig.monsterFig[i].priority == 0)
                GameConfig.monster_qian.push(GameConfig.monsterFig[i]);
            else if (GameConfig.monsterFig[i].priority == 1)
                GameConfig.monster_zhong.push(GameConfig.monsterFig[i]);
            else if (GameConfig.monsterFig[i].priority == 2)
                GameConfig.monster_hou.push(GameConfig.monsterFig[i]);
        }
        for (var j = 0; j < GameConfig.playerFig.length; j++) {
            if (GameConfig.playerFig[j].priority == 0)
                GameConfig.player_qian.push(GameConfig.playerFig[j]);
            else if (GameConfig.playerFig[j].priority == 1)
                GameConfig.player_hou.push(GameConfig.playerFig[j]);
        }
    };
    /**删除人物 */
    GameView.prototype.removeRole = function () {
        for (var i = 0; i < GameConfig.monsterFig.length; i++) {
            if (GameConfig.monsterFig[i].dead) {
                GameConfig.monsterFig.splice(i, 1);
                i--;
                this.fenlei();
                break;
            }
        }
        for (var j = 0; j < GameConfig.playerFig.length; j++) {
            if (GameConfig.playerFig[j].dead) {
                GameConfig.playerFig.splice(j, 1);
                j--;
                this.fenlei();
                break;
            }
        }
    };
    return GameView;
}(BaseEuiView));
__reflect(GameView.prototype, "GameView");
ViewManager.inst().reg(GameView, LayerManager.UI_Main);
//# sourceMappingURL=GameView.js.map