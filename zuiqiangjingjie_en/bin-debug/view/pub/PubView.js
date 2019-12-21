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
/**
 * recruit syy
 */
var PubView = (function (_super) {
    __extends(PubView, _super);
    function PubView() {
        var _this = _super.call(this) || this;
        _this.select_num = 0;
        /*
        Click Options
        */
        _this.selecting = 5;
        _this.person_num = 0;
        /**
         * Answering questionsid
         *
         * */
        _this.question_id = 0;
        /**
         * Price required for card
         * */
        _this.wupin_money = [500, 500, 500];
        /*
        *Click to answer
        */
        _this.btn_state = 0;
        /**
         * Current gold coins
         */
        _this.current_money = 0;
        return _this;
    }
    /**
     *
     * Current milliseconds
     * */
    PubView.prototype.getTime = function () {
        return Date.now();
    };
    /**
    *Modify character picture
    *@param    num   display pictureid
    */
    PubView.prototype.changeImage = function (num) {
        var id = num == 1 ? 10000 : num == 2 ? 10001 : 10002;
        // this.image_person.source=`model_${id}_png`;
    };
    /**
     * Setting data
     * @param    num   Display dataid
     *
     * **/
    PubView.prototype.setData = function (num) {
        var obj = GlobalFun.getlocalStorage();
        var person = obj["person" + num];
        this.answer_label.text = "( " + person["ti_Array"].length + " / 6 )";
        if (person["ti_Array"].length >= 6) {
            this.group1.visible = false;
            this.group2.visible = true;
            // this.txt_top.visible=false;
            if (person["buy"] == 0) {
                this.zm_group.visible = true;
            }
            else if (person["buy"] == 1) {
                this.zm_group.visible = false;
            }
            this.money_label.text = "" + this.wupin_money[this.person_num - 1];
        }
        else {
            this.group2.visible = false;
            this.group1.visible = true;
            // this.txt_top.visible=true;
            if (this.getTime() >= ((person["time"] + 300)) * 1000 || (person["time"] == 0)) {
                this.time_label.visible = false;
                for (var i = 0; i < 9; i++) {
                    if (person["ti_Array"].indexOf(i) == -1) {
                        this.makeData(QuestionCfg.cfgs["" + num][i]);
                        this.question_id = i;
                        break;
                    }
                }
            }
            else {
                this.btn_state = this.person_num;
                this.time_label.visible = true;
                var time = (300 * 1000 - (this.getTime() - person["time"])) / 1000;
                var fen = Math.floor(time / 60);
                var miao = Math.floor(time % 60);
                if (miao > 9) {
                    this.time_label.text = "In cooling:" + fen + ":" + miao;
                }
                else {
                    this.time_label.text = "In cooling:" + fen + ":0" + miao;
                }
                this.setWhhite();
                for (var i = 0; i < 9; i++) {
                    if (person["ti_Array"].indexOf(i) == -1) {
                        this.makeData(QuestionCfg.cfgs["" + num][i]);
                        this.question_id = i;
                        break;
                    }
                }
            }
        }
    };
    /**
     * Setup time
     * @param    num   id
     *
     * **/
    PubView.prototype.setTime = function (num) {
        var obj = GlobalFun.getlocalStorage();
        var person = obj["person" + num];
        if (person["ti_Array"].length >= 6) {
        }
        else {
            if (this.getTime() >= ((person["time"] + 300)) * 1000 || (person["time"] == 0)) {
                this.time_label.visible = false;
            }
            else {
                this.time_label.visible = true;
                var time = (300 * 1000 - (this.getTime() - person["time"])) / 1000;
                var fen = Math.floor(time / 60);
                var miao = Math.floor(time % 60);
                if (miao > 9) {
                    this.time_label.text = "In cooling:" + fen + ":" + miao;
                }
                else {
                    this.time_label.text = "In cooling:" + fen + ":0" + miao;
                }
                this.setWhhite();
                if (fen <= 0 && miao <= 0) {
                    obj["person" + num]["time"] = 0;
                    obj["person" + num]["state"] = 0;
                    this.btn_state = 0;
                    GlobalFun.savelocalStorage(obj);
                }
            }
        }
    };
    PubView.prototype.frameHandler = function () {
        this.setTime(this.person_num);
    };
    /**
     * Processing answer data
     * @param    obj   data object
     *
     * **/
    PubView.prototype.makeData = function (obj) {
        this.title.text = obj["question"];
        this.select1.text = "A." + obj["selection"][0];
        this.select2.text = "B." + obj["selection"][1];
        this.select3.text = "C." + obj["selection"][2];
        this.select4.text = "D." + obj["selection"][3];
        this.select_num = obj["correct"];
    };
    PubView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (GlobalFun.judgelocalStorage()) {
        }
        else {
            var obj = {};
            /**
             * First person data
             * @param time No time to answer questions
             * @param state Number of wrong questions
             * @param ti_Array Array of answers
             */
            obj["person1"] = {};
            obj["person1"]["time"] = 0;
            obj["person1"]["state"] = 0;
            obj["person1"]["ti_Array"] = [];
            obj["person1"]["buy"] = 0;
            /**
             * Second person data
             * @param time No time to answer questions
             * *@param state Number of wrong questions
             * @param ti_Array Array of answers
             */
            obj["person2"] = {};
            obj["person2"]["time"] = 0;
            obj["person2"]["state"] = 0;
            obj["person2"]["ti_Array"] = [];
            obj["person2"]["buy"] = 0;
            /**
             * Third party data
             * @param time No time to answer questions
             * @param state Number of wrong questions
             * @param ti_Array Array of answers
             */
            obj["person3"] = {};
            obj["person3"]["time"] = 0;
            obj["person3"]["state"] = 0;
            obj["person3"]["ti_Array"] = [];
            obj["person3"]["buy"] = 0;
            GlobalFun.savelocalStorage(obj);
        }
        this.pubGroup["autoSize"]();
        this.pubGroup.verticalCenter = -700;
        egret.Tween.get(this.pubGroup).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.pubGroup);
        }, this);
        this.person_num = 1;
        this.changeImage(this.person_num);
        this.setData(this.person_num);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandler, this);
        this.selecting = 5;
        this.setWhhite();
        this.person_num = 2;
        this.select.x = this.person2.x;
        this.select.y = this.person2.y + 3;
        this.changeImage(this.person_num);
        this.setData(this.person_num);
        this.roleMove(this.person2);
    };
    /**
     * Set the status of the option to normal
     */
    PubView.prototype.setWhhite = function () {
        for (var i = 1; i <= 4; i++) {
            this["select_" + i].selected = false;
        }
        this.select1.textColor = 0XFFFFFf;
        this.select2.textColor = 0XFFFFFf;
        this.select3.textColor = 0XFFFFFf;
        this.select4.textColor = 0XFFFFFf;
    };
    /**
     * Set option status
     */
    PubView.prototype.setColor = function (num) {
        this.selecting = num - 1;
        for (var i = 0; i < 4; i++) {
            var label = this.group1.getChildByName("select" + (i + 1));
            var checkbox = this["select_" + (i + 1)];
            if ((i + 1) == num) {
                checkbox.selected = true;
                // label.textColor=0XC91818;
            }
            else {
                checkbox.selected = false;
                // label.textColor=0XFFFFFF;
            }
        }
    };
    /**
     * Set Click
     */
    PubView.prototype.touchTapHandler = function (e) {
        var _this = this;
        switch (e.target) {
            case this.person1:
                this.selecting = 5;
                this.setWhhite();
                this.person_num = 1;
                this.select.x = this.person1.x;
                this.select.y = this.person1.y + 3;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
                this.roleMove(this.person1);
                break;
            case this.person2:
                this.selecting = 5;
                this.setWhhite();
                this.person_num = 2;
                this.select.x = this.person2.x;
                this.select.y = this.person2.y + 3;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
                this.roleMove(this.person2);
                break;
            case this.person3:
                this.selecting = 5;
                this.setWhhite();
                this.select.x = this.person3.x;
                this.select.y = this.person3.y + 3;
                this.person_num = 3;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
                this.roleMove(this.person3);
                break;
            case this.ok_btn:
                if (this.selecting == 5) {
                    /**
                     * Please select an option
                     * */
                    UserTips.inst().showTips("Please select an option");
                }
                else {
                    if (this.btn_state == this.person_num) {
                        UserTips.inst().showTips("No answer at present");
                    }
                    else {
                        if (this.selecting == this.select_num) {
                            this.setWhhite();
                            if (GlobalFun.judgelocalStorage()) {
                                UserTips.inst().showTips("Correct answer");
                                var obj_1 = GlobalFun.getlocalStorage();
                                obj_1["person" + this.person_num]["state"] = 0;
                                obj_1["person" + this.person_num]["ti_Array"].push(this.question_id);
                                GlobalFun.savelocalStorage(obj_1);
                                this.setData(this.person_num);
                            }
                        }
                        else {
                            if (GlobalFun.judgelocalStorage()) {
                                var obj_2 = GlobalFun.getlocalStorage();
                                var state = obj_2["person" + this.person_num]["state"];
                                state++;
                                if (state >= 2) {
                                    /**
                                     * Second chance
                                     * */
                                    obj_2["person" + this.person_num]["state"] = 2;
                                    obj_2["person" + this.person_num]["time"] = this.getTime();
                                    GlobalFun.savelocalStorage(obj_2);
                                    this.setData(this.person_num);
                                }
                                else {
                                    /**
                                     * First chance
                                     * */
                                    UserTips.inst().showTips("Answering questions，Please reply again.");
                                    this.setWhhite();
                                    obj_2["person" + this.person_num]["state"] = 1;
                                    GlobalFun.savelocalStorage(obj_2);
                                }
                            }
                        }
                    }
                }
                break;
            case this.zhaomu_btn:
                var obj = GlobalFun.getlocalStorage();
                if (GameApp.gold >= this.wupin_money[this.person_num - 1]) {
                    GameApp.gold -= this.wupin_money[this.person_num - 1];
                    UserTips.inst().showTips("Successful recruitment");
                    obj["person" + this.person_num]["buy"] = 1;
                    this.zm_group.visible = false;
                    var role_id = void 0;
                    if (this.person_num == 1) {
                        role_id = 10000;
                    }
                    else if (this.person_num == 2) {
                        role_id = 10001;
                    }
                    else if (this.person_num == 3) {
                        role_id = 10002;
                    }
                    var card = GlobalFun.getCardDataFromId(role_id);
                    card.ownNum = 1;
                    GlobalFun.refreshCardData(role_id, { ownNum: card.ownNum });
                }
                else {
                    UserTips.inst().showTips("Insufficient gold");
                    obj["person" + this.person_num]["buy"] = 0;
                }
                GlobalFun.savelocalStorage(obj);
                break;
            case this.rect1:
                this.setColor(1);
                break;
            case this.rect2:
                this.setColor(2);
                break;
            case this.rect3:
                this.setColor(3);
                break;
            case this.rect4:
                this.setColor(4);
                break;
            case this.return_btn:
                egret.Tween.get(this.pubGroup).to({ verticalCenter: -700 }, 600, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(_this.pubGroup);
                    ViewManager.inst().close(PubView);
                }, this);
                break;
        }
    };
    PubView.prototype.roleMove = function (btn) {
        var _this = this;
        var _loop_1 = function (i) {
            if (this_1["person" + i].x == this_1.pos2.x) {
                if (btn == this_1["person" + i]) {
                    return { value: void 0 };
                }
                else {
                    egret.Tween.get(btn)
                        .to({ x: this_1.pos2.x, scaleX: 1, scaleY: 1 }, 300)
                        .call(function () {
                        btn.currentState = "down";
                        _this.pubGroup.addChild(btn);
                        egret.Tween.removeTweens(btn);
                    }, this_1);
                    egret.Tween.get(this_1["person" + i])
                        .to({ x: btn.x, scaleX: 0.6, scaleY: 0.6 }, 300)
                        .call(function () {
                        _this["person" + i].currentState = "up";
                    }, this_1);
                }
            }
        };
        var this_1 = this;
        for (var i = 1; i <= 3; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    PubView.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandler, this);
    };
    return PubView;
}(BaseEuiView));
__reflect(PubView.prototype, "PubView");
ViewManager.inst().reg(PubView, LayerManager.UI_Pop);
//# sourceMappingURL=PubView.js.map