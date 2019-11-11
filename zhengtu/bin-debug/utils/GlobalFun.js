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
    /**刷新个人拥有的英雄数据 */
    GlobalFun.refreshHeroData = function (insId, attr, values) {
        var ownGeneralstr = egret.localStorage.getItem(LocalStorageEnum.OWN_GENERAL);
        var ownGeneralArr = JSON.parse(ownGeneralstr).attr;
        for (var j = 0; j < ownGeneralArr.length; j++) {
            if (ownGeneralArr[j].insId == insId) {
                for (var i = 0; i < attr.length; i++) {
                    ownGeneralArr[j][attr[i]] = values[i];
                }
                break;
            }
        }
        egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL, JSON.stringify({ attr: ownGeneralArr }));
    };
    /**外发光 */
    GlobalFun.light = function (tar, color) {
        var color = color ? color : 0x33CCFF; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 15; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 15; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        tar.filters = [glowFilter];
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
    /**判断是否开启技能 */
    GlobalFun.isOpenSkill = function (skillId) {
        var level = parseInt(egret.localStorage.getItem("skill_" + skillId));
        if (level >= 2) {
            return true;
        }
        return false;
    };
    /**
     * 创建技能特效显示
     * @param id 技能id
     * @param parent 父级容器
     * @param loopCount 循环次数
     * @param pos 位置
     * */
    GlobalFun.createSkillEff = function (camp, id, parent, loopCount, pos) {
        var skillCfg = SkillCfg.skillCfg;
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
        // let textInfo:eui.Label =new eui.Label();
        // textInfo.size = 20;
        // textInfo.scaleX = textInfo.scaleY = 1.5;
        // textInfo.textColor = 0xffffff
        // parent.addChild(textInfo);
        // textInfo.x = pos.x - 70;
        // textInfo.y = pos.y - 150;
        // textInfo.text = curUseSkill.skillName;
        // egret.Tween.get(textInfo).to({scaleX:1,scaleY:1},600,egret.Ease.circOut).wait(500).call(()=>{
        // 	egret.Tween.removeTweens(textInfo);
        // 	if(textInfo && textInfo.parent){
        // 		textInfo.parent.removeChild(textInfo);
        // 	}
        // 	textInfo = null;
        // },this)
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
            mc.playFile("" + SKILL_EFF + curUseSkill.skillId, loopCount, null, true);
            mc.x = (Math.random() * (maxx_1 - minx_1) + minx_1) >> 0;
            mc.y = (Math.random() * (maxy_1 - miny_1) + miny_1) >> 0;
            var interVal_1 = setInterval(function () {
                count_1 += 1;
                var mc = new MovieClip();
                mc.scaleX = mc.scaleY = 0.7;
                parent.addChild(mc);
                mc.playFile("" + SKILL_EFF + curUseSkill.skillId, loopCount, null, true);
                mc.x = (Math.random() * (maxx_1 - minx_1) + minx_1) >> 0;
                mc.y = (Math.random() * (maxy_1 - miny_1) + miny_1) >> 0;
                if (count_1 >= 5) {
                    clearInterval(interVal_1);
                }
            }, 100);
        }
        else {
            var mc = new MovieClip();
            mc.scaleX = mc.scaleY = 1;
            parent.addChild(mc);
            mc.playFile("" + SKILL_EFF + curUseSkill.skillId, loopCount, null, true);
            mc.x = pos.x;
            mc.y = pos.y;
        }
    };
    GlobalFun.guideToNext = function (comObj, width, height) {
        if (GameApp.guilding) {
            if (GameApp.guildView) {
                if (GameApp.nextStepId) {
                    GameApp.guildView.nextStep({ id: GameApp.nextStepId, comObj: comObj, width: width, height: height });
                }
                else {
                    GameApp.guildView = null;
                    // GameApp.guilding = false;
                    ViewManager.inst().close(GuideView);
                }
            }
        }
    };
    GlobalFun.count = 0; //计时器次数
    GlobalFun.timer = new egret.Timer(1000);
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map