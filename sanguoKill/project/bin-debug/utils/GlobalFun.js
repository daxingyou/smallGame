var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 共用方法
 */
var GlobalFun = (function () {
    function GlobalFun() {
    }
    GlobalFun.getOption = function (key) {
        if (window.location) {
            var search = location.search;
            if (search == "") {
                return "";
            }
            search = search.slice(1);
            var searchArr = search.split("&");
            var length_1 = searchArr.length;
            for (var i = 0; i < length_1; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    };
    /**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
    GlobalFun.shakeObj = function (target, time, rate, maxDis) {
        this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        this.timer.delay = 1000 / rate;
        this.timer.repeatCount = this.count;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.shaking, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        this.timer.reset();
        this.timer.start();
    };
    GlobalFun.shaking = function () {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2;
        this.target.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
        egret.Tween.get(this.target).to({ x: this.initX, y: this.initY }, 999 / this.rate);
    };
    GlobalFun.shakeComplete = function () {
        if (this.target) {
            egret.Tween.removeTweens(this.target);
            this.target.x = this.initX;
            this.target.y = this.initY;
        }
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.shaking, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
    };
    /**停止震动 */
    GlobalFun.stop = function () {
        this.shakeComplete();
    };
    GlobalFun.filterToGrey = function (tar) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    };
    GlobalFun.skillBuffFilter = function (buffid, tar) {
        var colorMatrix = [];
        switch (buffid) {
            case 10000:
                //紫色 --狂暴
                colorMatrix = [
                    1, 0, 0, 0, 196,
                    0, 1, 0, 0, 64,
                    0, 0, 1, 0, 201,
                    0, 0, 0, 1, 0
                ];
                break;
            case 10001:
                //智谋-- 绿色
                colorMatrix = [
                    1, 0, 0, 0, 102,
                    0, 1, 0, 0, 158,
                    0, 0, 1, 0, 39,
                    0, 0, 0, 1, 0
                ];
                break;
            case 10002:
                //防御--黄色
                colorMatrix = [
                    1, 0, 0, 0, 155,
                    0, 1, 0, 0, 128,
                    0, 0, 1, 0, 26,
                    0, 0, 0, 1, 0
                ];
                break;
        }
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    };
    GlobalFun.clearFilters = function (tar) {
        tar.filters = [];
    };
    /**发送到ios请求购买 */
    GlobalFun.sendToNativePhurse = function (_data) {
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.payGood) {
            window["webkit"].messageHandlers.payGood.postMessage(JSON.stringify(_data));
        }
    };
    /**发送ios加载完成 */
    GlobalFun.sendToNativeLoadEnd = function () {
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.loadingFinish) {
            window["webkit"].messageHandlers.loadingFinish.postMessage({});
        }
    };
    /**购买返回 */
    GlobalFun.payCallBack = function (_cb) {
        GameApp.pay_cbDdata = _cb;
    };
    /**
     * 创建技能特效显示
     * @param id 技能id
     * @param parent 父级容器
     * @param loopCount 循环次数
     * @param pos 位置
     * */
    GlobalFun.createSkillEff = function (camp, id, parent, loopCount, pos) {
        // let skillCfg:any = SkillCfg.skillCfg[camp];
        var skillCfg;
        var curUseSkill;
        var loop = true;
        // if(id == 100001 || id == 100002 || id == 100003 || id == 100004){
        //     loop = true;
        // }
        for (var key in skillCfg) {
            if (skillCfg[key].skillId == id) {
                curUseSkill = skillCfg[key];
                break;
            }
        }
        var textInfo = new eui.Label();
        textInfo.size = 20;
        textInfo.scaleX = textInfo.scaleY = 1.5;
        textInfo.textColor = 0xffffff;
        parent.addChild(textInfo);
        textInfo.x = pos.x - 70;
        textInfo.y = pos.y - 150;
        textInfo.text = curUseSkill.skillName;
        egret.Tween.get(textInfo).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).wait(500).call(function () {
            egret.Tween.removeTweens(textInfo);
            if (textInfo && textInfo.parent) {
                textInfo.parent.removeChild(textInfo);
            }
            textInfo = null;
        }, this);
        if (loop) {
            var count_1 = 1;
            var minx_1 = 100;
            var maxx_1 = StageUtils.inst().getWidth() - 100;
            var miny_1 = 100;
            var maxy_1 = StageUtils.inst().getHeight() - 100;
            ;
            var mc = new MovieClip();
            mc.scaleX = mc.scaleY = 1;
            parent.addChild(mc);
            mc.playFile("" + SKILL_EFF + curUseSkill.roleSkill, loopCount, null, true);
            mc.x = (Math.random() * (maxx_1 - minx_1) + minx_1) >> 0;
            mc.y = (Math.random() * (maxy_1 - miny_1) + miny_1) >> 0;
            var interVal_1 = setInterval(function () {
                count_1 += 1;
                var mc = new MovieClip();
                mc.scaleX = mc.scaleY = 0.7;
                parent.addChild(mc);
                mc.playFile("" + SKILL_EFF + curUseSkill.roleSkill, loopCount, null, true);
                mc.x = (Math.random() * (maxx_1 - minx_1) + minx_1) >> 0;
                mc.y = (Math.random() * (maxy_1 - miny_1) + miny_1) >> 0;
                if (count_1 >= 15) {
                    clearInterval(interVal_1);
                }
            }, 100);
        }
        else {
            var mc = new MovieClip();
            mc.scaleX = mc.scaleY = 1;
            parent.addChild(mc);
            mc.playFile("" + SKILL_EFF + curUseSkill.roleSkill, loopCount, null, true);
            mc.x = pos.x;
            mc.y = pos.y;
        }
    };
    GlobalFun.getTestRoleData = function () {
        var ownarr = [];
        for (var i = 0; i < 3; i++) {
            var item = {
                icon: "role_" + i + "_png",
                level: 1,
                weaponId: 10000,
                protectedId: 10019,
                horseAtkId: 10025,
                horseProtId: 0,
                attr: {
                    hp: 220 + (i * 30), agile: 20 + (i * 3), atk: 26 + (i * 3), hit: 15 + (i * 3), protected: 22 + (i * 3), crit: (10 + (i * 3))
                }
            };
            ownarr.push(item);
        }
        return ownarr;
    };
    GlobalFun.getEnemyTestData = function () {
        var enemyArr = [];
        for (var j = 0; j < 3; j++) {
            var item = {
                icon: "level_1_" + j + "_png",
                level: 1,
                weaponId: 0,
                protectedId: 0,
                horseAtkId: 0,
                horseProtId: 0,
                attr: {
                    hp: 180 + (j * 30), agile: 15 + (j * 3), atk: 16 + (j * 3), hit: 18 + (j * 3), protected: 17 + (j * 3), crit: (7 + (j * 3))
                }
            };
            enemyArr.push(item);
        }
        return enemyArr;
    };
    /**获取背包数据 0武器 1防具 2锦囊 3进攻马 4防御马*/
    GlobalFun.getBagData = function (id) {
        var any_0 = [];
        var any_1 = [];
        var any_2 = [];
        var any_3 = [];
        var any_4 = [];
        for (var i = 0; i < ItemCfg.bagCfg.length; i++) {
            if (ItemCfg.bagCfg[i] == null)
                continue;
            if (ItemCfg.bagCfg[i].type == ItemType.weapon) {
                any_0.push(ItemCfg.bagCfg[i]);
            }
            else if (ItemCfg.bagCfg[i].type == ItemType.protection) {
                any_1.push(ItemCfg.bagCfg[i]);
            }
            else if (ItemCfg.bagCfg[i].type == ItemType.prop) {
                any_2.push(ItemCfg.bagCfg[i]);
            }
            else if (ItemCfg.bagCfg[i].type == ItemType.weapon_ma) {
                any_3.push(ItemCfg.bagCfg[i]);
            }
            else if (ItemCfg.bagCfg[i].type == ItemType.protection_ma) {
                any_4.push(ItemCfg.bagCfg[i]);
            }
        }
        if (id == 0)
            return any_0;
        else if (id == 1)
            return any_1;
        else if (id == 2)
            return any_2;
        else if (id == 3)
            return any_3;
        else if (id == 4)
            return any_4;
    };
    /**更改数据 */
    GlobalFun.setBagData = function (id) {
        for (var i = 0; i < ItemCfg.bagCfg.length; i++) {
            if (ItemCfg.bagCfg[i].instId == id) {
                ItemCfg.bagCfg[i] = null;
                break;
            }
        }
        for (var i = 0; i < ItemCfg.bagCfg.length; i++) {
            var tem;
            for (var j = i + 1; j < ItemCfg.bagCfg.length; j++) {
                if (ItemCfg.bagCfg[i] == null && ItemCfg.bagCfg[j] != null) {
                    tem = ItemCfg.bagCfg[j];
                    ItemCfg.bagCfg[j] = ItemCfg.bagCfg[i];
                    ItemCfg.bagCfg[i] = tem;
                }
            }
        }
        GlobalFun.setBagList();
    };
    /**更换装备 any0背包里的装备 any1武将身上的装备 */
    GlobalFun.change = function (any0, any1) {
        ItemCfg.bagCfg[ItemCfg.bagCfg.indexOf(any0)] = any1;
        GlobalFun.setBagList();
    };
    /**本地存储背包列表 */
    GlobalFun.setBagList = function () {
        egret.localStorage.setItem("baglength", (ItemCfg.bagCfg.length - 10) + "");
        var card_length = 0;
        for (var i = 0; i < ItemCfg.bagCfg.length; i++) {
            if (ItemCfg.bagCfg[i] != null) {
                card_length++;
                egret.localStorage.setItem("bagid" + i, ItemCfg.bagCfg[i].instId + "");
            }
        }
        egret.localStorage.setItem("card_length", card_length + "");
    };
    /**过去本地背包列表 */
    GlobalFun.getBagList = function () {
        var length = 0;
        if (egret.localStorage.getItem("baglength"))
            length = parseInt(egret.localStorage.getItem("baglength"));
        if (length > 0) {
            ItemCfg.bagCfg = [];
            for (var i = 0; i < length + 10; i++) {
                ItemCfg.bagCfg.push(null);
            }
        }
        var card_length = 0;
        if (egret.localStorage.getItem("card_length"))
            card_length = parseInt(egret.localStorage.getItem("card_length"));
        if (card_length > 0) {
            for (var j = 0; j < card_length; j++) {
                for (var i = 0; i < ItemCfg.itemCfg.length; i++) {
                    var id = parseInt(egret.localStorage.getItem("bagid" + j));
                    if (id == ItemCfg.itemCfg[i].instId) {
                        ItemCfg.bagCfg[j] = ItemCfg.itemCfg[i];
                        break;
                    }
                }
            }
        }
    };
    /**在背包更换装备 */
    GlobalFun.changeEquip = function (data, roleID) {
        var value = null;
        var id = 0;
        for (var i = 0; i < UpgradeCfg.ins.roleEquip[roleID].length; i++) {
            if (data.type == UpgradeCfg.ins.roleEquip[roleID][i].type) {
                value = UpgradeCfg.ins.roleEquip[roleID][i];
                UpgradeCfg.ins.roleEquip[roleID].splice(i, 1);
                UpgradeCfg.ins.roleEquip[roleID].push(data);
                // i --;
            }
        }
        switch (data.type) {
            case ItemType.weapon:
                UpgradeCfg.ins.roleData[roleID].weaponId = data.instId;
                break;
            case ItemType.protection:
                UpgradeCfg.ins.roleData[roleID].protectedId = data.instId;
                break;
            case ItemType.weapon_ma:
                UpgradeCfg.ins.roleData[roleID].horseAtkId = data.instId;
                break;
            case ItemType.protection_ma:
                UpgradeCfg.ins.roleData[roleID].horseProtId = data.instId;
                break;
        }
        return value;
    };
    GlobalFun.count = 0; //计时器次数
    GlobalFun.timer = new egret.Timer(1000);
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map