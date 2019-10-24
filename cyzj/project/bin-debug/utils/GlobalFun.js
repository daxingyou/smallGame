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
    /**增加背包物品 */
    GlobalFun.addItemToBag = function (itemId, num) {
        var bagDataStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        var itemCfg = ItemCfg.itemCfg[itemId];
        if (bagDataStr) {
            var bagData = JSON.parse(bagDataStr);
            var isame = false;
            for (var i = 0; i < bagData.length; i++) {
                if (bagData[i].id == itemId) {
                    isame = true;
                    bagData[i].num += num;
                    break;
                }
            }
            if (!isame) {
                bagData.push({ id: itemId, num: num, type: itemCfg.type });
            }
            egret.localStorage.setItem(LocalStorageEnum.ROLE_BAG, JSON.stringify(bagData));
        }
        else {
            var obj = { id: itemId, num: num, type: itemCfg.type };
            egret.localStorage.setItem(LocalStorageEnum.ROLE_BAG, JSON.stringify([obj]));
        }
    };
    /**移除背包物品 */
    GlobalFun.removeItemFromBag = function (itemId, num) {
        var bagDataStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        if (bagDataStr) {
            var bagData = JSON.parse(bagDataStr);
            for (var i = 0; i < bagData.length; i++) {
                if (bagData[i].id == itemId) {
                    bagData[i].num -= num;
                    if (bagData[i].num <= 0) {
                        bagData.splice(i, 1);
                    }
                    break;
                }
            }
            egret.localStorage.setItem(LocalStorageEnum.ROLE_BAG, JSON.stringify(bagData));
        }
    };
    /**获取背包item数量 */
    GlobalFun.getItemNumFromBag = function (itemId) {
        var bagDataStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        if (bagDataStr) {
            var bagData = JSON.parse(bagDataStr);
            for (var i = 0; i < bagData.length; i++) {
                if (bagData[i].id == itemId) {
                    return bagData[i].num;
                }
            }
            return 0;
        }
        else {
            return 0;
        }
    };
    /**获取合成材料 0为合成材料 。1为卷轴 2位碎片*/
    GlobalFun.getMetarisFromBag = function (type) {
        var arr = [];
        var bagDataStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        if (bagDataStr) {
            var bagData = JSON.parse(bagDataStr);
            for (var i = 0; i < bagData.length; i++) {
                if (bagData[i].type == type) {
                    //当前是合成材料
                    arr.push(bagData[i]);
                }
            }
        }
        return arr;
    };
    /**碎片增加 */
    GlobalFun.addSuiPian = function (index, num) {
        var datastr = egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA);
        var roleInfoData = JSON.parse(datastr);
        roleInfoData[index + 1].o_suipian += num;
        if (roleInfoData[index + 1].o_suipian >= roleInfoData[index + 1].t_suipian) {
            //已经解锁
            roleInfoData[index + 1].isUnlock = true;
        }
        egret.localStorage.setItem(LocalStorageEnum.ROLE_DATA, JSON.stringify(roleInfoData));
        MessageManager.inst().dispatch(CustomEvt.ADD_SHIELD, { index: index });
    };
    GlobalFun.count = 0; //计时器次数
    GlobalFun.timer = new egret.Timer(1000);
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map