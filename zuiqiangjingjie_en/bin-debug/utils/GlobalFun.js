var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Sharing method
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
     * Vibration display object
     * @param        target    Vibration target object
     * @param        time      Duration of vibration（second）
     * @param        rate      Vibration frequency(How many vibrations per second)
     * @param        maxDis    Maximum vibration distance
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
    /**show leaf */
    GlobalFun.showAnimateleaf = function () {
        // if(this.showstate){return}
        // this.showstate = true;
        // var leafContainer = document.querySelector('.falling-leaves');
        // this.leaf = new window["LeafScene"](leafContainer);
        // this.leaf.init();
        // this.leaf.render();
        // let self = this;
    };
    GlobalFun.stopAnimateleaf = function () {
        //    this.showstate = false;
        //    if(this.leaf){
        //        this.leaf["stop"]();
        //    }
    };
    GlobalFun.shaking = function () {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2;
        this.target.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
        egret.Tween.get(this.target).to({ x: this.initX, y: this.initY }, 999 / this.rate);
    };
    /**External normal light */
    GlobalFun.lighting = function (obj, color, boo) {
        if (color === void 0) { color = 0xEFAE10; }
        if (boo === void 0) { boo = false; }
        var color = color; /// Halo color，Hexadecimal，No transparency
        var alpha = 0.8; /// Color transparency of halos，Yes. color Transparency setting of parameters。Valid value is 0.0 reach 1.0。for example，0.8 Set transparency value to 80%。
        var blurX = 35; /// Horizontal ambiguity。Valid value is 0 reach 255.0（floating-point）
        var blurY = 35; /// Vertical ambiguity。Valid value is 0 reach 255.0（floating-point）
        var strength = 2; /// Strength of impression，The bigger the value is.，The darker the color is imprinted，And the contrast between the light and the background is stronger。Valid value is 0 reach 255。Not yet realized
        var quality = 3 /* HIGH */; /// Number of filter applications，Suggested use BitmapFilterQuality Class to represent
        var inner = boo; /// Specifies whether the glow is inside，Not yet realized
        var knockout = false; /// Specifies whether the object has a hollowing effect，Not yet realized
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        obj.filters = [glowFilter];
        egret.Tween.get(glowFilter, { loop: true }).to({ alpha: 0.2 }, 1000).to({ alpha: 0.8 }, 1000);
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
    /**Stop shaking */
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
                //Violet --Rage
                colorMatrix = [
                    1, 0, 0, 0, 196,
                    0, 1, 0, 0, 64,
                    0, 0, 1, 0, 201,
                    0, 0, 0, 1, 0
                ];
                break;
            case 10001:
                //Resourcefulness-- green
                colorMatrix = [
                    1, 0, 0, 0, 102,
                    0, 1, 0, 0, 158,
                    0, 0, 1, 0, 39,
                    0, 0, 0, 1, 0
                ];
                break;
            case 10002:
                //defense--yellow
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
    /**Send toiosRequest for purchase */
    GlobalFun.sendToNativePhurse = function (_data) {
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.payGood) {
            window["webkit"].messageHandlers.payGood.postMessage(JSON.stringify(_data));
        }
    };
    /**Send outiosLoad complete */
    GlobalFun.sendToNativeLoadEnd = function () {
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.loadingFinish) {
            window["webkit"].messageHandlers.loadingFinish.postMessage({});
        }
    };
    /**Purchase return */
    GlobalFun.payCallBack = function (_cb) {
        GameApp.pay_cbDdata = _cb;
    };
    /**After the role information is created, it is called. */
    GlobalFun.changeName = function (name) {
        GameApp.roleInfo.name = name;
        egret.localStorage.setItem(LocalStorageEnum.ROLEINFO, JSON.stringify(GameApp.roleInfo));
    };
    /**
     * Get the card data owned by the character according to the type
     * type: CardType.build || CardType.general...
     *
     * isJudge Will judge whether it has 。Parameter isfalse Will return Card data owned 。 Parameter istrue All card data of the corresponding type will be returned
     */
    GlobalFun.getCardsFromType = function (type, isJudge) {
        if (isJudge === void 0) { isJudge = false; }
        var arr = [];
        for (var i = 0; i < GameApp.cardInfo.length; i++) {
            var itemCardVo = GameApp.cardInfo[i];
            var condition = isJudge ? true : (itemCardVo.level > 1 || itemCardVo.ownNum > 0);
            if (itemCardVo.type == type && condition) {
                //Same type 。also Class greater than1 perhaps Quantity owned greater than0 Description already owned；
                arr.push(this.deepObj(itemCardVo));
            }
        }
        return arr;
    };
    /**Get my current card information */
    GlobalFun.getOwnCards = function () {
        var arr = [];
        for (var i = 0; i < GameApp.cardInfo.length; i++) {
            var itemCardVo = GameApp.cardInfo[i];
            if ((itemCardVo.level > 1 || itemCardVo.ownNum > 0)) {
                //Same type 。also Class greater than1 perhaps Quantity owned greater than0 Description already owned；
                arr.push(this.deepObj(itemCardVo));
            }
        }
        return arr;
    };
    /**according toidGet the corresponding card data
     *
     * cardid Cardsid；Return CardAttrVotype
     *
     * attr Corresponding CardAttrVoKey value in Data of corresponding key value will be returned eg: afferent ["ownNum","atk","hp"] Return：{ownNum:1,atk:200,hp:500};
     *
    */
    GlobalFun.getCardDataFromId = function (cardid, attr) {
        var cardVo = null;
        for (var i = 0; i < GameApp.cardInfo.length; i++) {
            if (GameApp.cardInfo[i].insId == cardid) {
                cardVo = this.deepObj(GameApp.cardInfo[i]);
                break;
            }
        }
        if (!cardVo) {
            console.error("Incoming cardsidNo data present-----insid:" + cardid);
        }
        else {
            if (attr) {
                var obj = {};
                for (var i = 0; i < attr.length; i++) {
                    obj[attr[i]] = cardVo[attr[i]];
                }
                return obj;
            }
            return cardVo;
        }
    };
    /**Acquisition formation
     * ownSolderis data
     * state 0Game player 1npc
    */
    GlobalFun.getFormation = function (ownSolderis, state, entitys) {
        var group = new eui.Group();
        var group0 = new eui.Group();
        var group1 = new eui.Group();
        var group2 = new eui.Group();
        group.addChild(group0);
        group.addChild(group1);
        group.addChild(group2);
        var formation = 0; /**Square matrix number */
        var lie = 0;
        var pos = [{ x1: -3, x2: 10, x3: -13.53, x4: 198.3 }, { x1: 0, x2: 12, x3: -29.59, x4: 198.3 }, { x1: 7, x2: 14, x3: -50.59, x4: 200.3 }];
        group.width = 692;
        group.height = 471;
        group0.width = 150;
        group0.height = 471;
        group1.width = 150;
        group1.height = 471;
        group2.width = 150;
        group2.height = 471;
        switch (state) {
            case 0:
                group0.x = 431.12;
                group0.y = 41.83;
                group1.x = 313.15;
                group1.y = 41.83;
                group2.x = 198.82;
                group2.y = 39.83;
                for (var i = 0; i < 3; i++) {
                    var _group = group.getChildAt(i);
                    if (ownSolderis[i].generalId != 0) {
                        formation = 6;
                    }
                    else {
                        formation = 4;
                    }
                    var card = GlobalFun.getCardDataFromId(ownSolderis[i].soldierID);
                    switch (ownSolderis[i].soldierID) {
                        case 100105:
                        case 100106:
                        case 100112:
                            lie = 3;
                            for (var k = 0; k < lie; k++) {
                                for (var j = 0; j < 12; j++) {
                                    var ani = new SoldierEntity();
                                    var vo = { level: 1, atk: Math.floor(card.atk / 36), hp: Math.floor(card.hp / 36), type: ownSolderis[i].soldierType, id: ownSolderis[i].soldierID };
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.setSoldierData(state == 0 ? 1 : -1, EFFECT + "role_" + ownSolderis[i].soldierID);
                                    entitys.push(ani);
                                    // ani.playFile(`${EFFECT}role_${ownSolderis[i].soldierType}_stand`, -1);
                                    _group.addChild(ani);
                                    if (ownSolderis[i].soldierID == 100106) {
                                        ani.scaleX = ani.scaleY = 0.8;
                                    }
                                    if (formation == 4) {
                                        ani.x = 6 + k * 30 - Math.floor(j / 4) * pos[i].x1 - j * pos[i].x2;
                                        ani.y = 18 + j * 28 + Math.floor(j / 4) * 28;
                                    }
                                    else if (formation == 6) {
                                        // ani.x = 6 + k * 30 - Math.floor(j/6) * pos[i].x1 - j * pos[i].x2;
                                        // ani.y = 18 + j * 30 + Math.floor(j/6) * 30;
                                        ani.x = 6 + k * 30 - Math.floor(j / 6) * (pos[i].x1 + 20 + i * 2) * ani.scaleX - j * (pos[i].x2 - 2);
                                        ani.y = 10 + j * 27 + Math.floor(j / 6) * 70;
                                    }
                                }
                            }
                            break;
                        case 100109:
                        case 100110:
                        case 100113:
                        case 100107:
                            lie = 2;
                            for (var k = 0; k < lie; k++) {
                                for (var j = 0; j < 12; j++) {
                                    var ani = new SoldierEntity();
                                    var vo = { level: 1, atk: Math.floor(card.atk / 24), hp: Math.floor(card.hp / 24), type: ownSolderis[i].soldierType, id: ownSolderis[i].soldierID };
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.scaleX = ani.scaleY = 0.5;
                                    ani.setSoldierData(state == 0 ? 1 : -1, EFFECT + "role_" + ownSolderis[i].soldierID);
                                    entitys.push(ani);
                                    _group.addChild(ani);
                                    if (formation == 4) {
                                        ani.x = 8 + k * 62 - Math.floor(j / 4) * pos[i].x1 * ani.scaleX - j * pos[i].x2;
                                        ani.y = 18 + j * 28 + Math.floor(j / 4) * 28;
                                    }
                                    else if (formation == 6) {
                                        // ani.x = 8 + k * 52 - Math.floor(j/6) * pos[i].x1 * ani.scaleX - j * pos[i].x2;
                                        // ani.y = 18 + j * 30 + Math.floor(j/6) * 30;
                                        ani.x = 8 + k * 62 - Math.floor(j / 6) * (pos[i].x1 + 20 + i * 8) * ani.scaleX - j * (pos[i].x2 - 2);
                                        ani.y = 8 + j * 27 + Math.floor(j / 6) * 76;
                                    }
                                }
                            }
                            break;
                    }
                    if (formation == 6) {
                        var bool = false;
                        if (!bool) {
                            bool = true;
                            var ani_1 = new SoldierEntity();
                            var vo = { level: 1, atk: card.atk, hp: card.hp, type: CardType.general, id: ownSolderis[i].generalId };
                            ani_1.soldierAttr = vo;
                            ani_1.general = true;
                            ani_1.generalId = ownSolderis[i].generalId;
                            ani_1.parentGroupIndex = i;
                            entitys.push(ani_1);
                            ani_1.setSoldierData(state == 0 ? 1 : -1, EFFECT + "role_" + ownSolderis[i].generalId);
                            // ani_1.playFile(`${EFFECT}role_${ownSolderis[i].generalId}_stand`, -1);
                            ani_1.x = pos[i].x3;
                            ani_1.y = pos[i].x4;
                            _group.addChildAt(ani_1, 9999999);
                        }
                    }
                }
                break;
            case 1:
                group2.x = 431.12;
                group2.y = 41.83;
                group1.x = 313.15;
                group1.y = 41.83;
                group0.x = 198.82;
                group0.y = 39.83;
                for (var i = 0; i < 3; i++) {
                    var _group = group.getChildAt(i);
                    if (ownSolderis[i].generalId != 0) {
                        formation = 6;
                    }
                    else {
                        formation = 4;
                    }
                    var card = GlobalFun.getCardDataFromId(ownSolderis[i].soldierID);
                    switch (ownSolderis[i].soldierID) {
                        case 100105:
                        case 100106:
                        case 100112:
                            lie = 3;
                            for (var k = 0; k < lie; k++) {
                                for (var j = 0; j < 12; j++) {
                                    var ani = new SoldierEntity();
                                    var vo = { level: 1, atk: Math.floor(card.atk / 36), hp: Math.floor(card.hp / 36), type: ownSolderis[i].soldierType, id: ownSolderis[i].soldierID };
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.setSoldierData(state == 1 ? -1 : 0, EFFECT + "role_" + ownSolderis[i].soldierID);
                                    entitys.push(ani);
                                    // let ani:MovieClip = new MovieClip();
                                    // ani.playFile(`${EFFECT}role_${ownSolderis[i].soldierType}_stand`, -1);
                                    ani.scaleX = -1;
                                    _group.addChild(ani);
                                    if (formation == 4) {
                                        ani.x = 6 + k * 30 + Math.floor(j / 4) * pos[i].x1 + j * pos[i].x2;
                                        ani.y = 18 + j * 28 + Math.floor(j / 4) * 28;
                                    }
                                    else if (formation == 6) {
                                        ani.x = 6 + k * 30 + Math.floor(j / 6) * pos[i].x1 + j * pos[i].x2;
                                        ani.y = 18 + j * 30 + Math.floor(j / 6) * 30;
                                    }
                                }
                            }
                            if (formation == 6) {
                                var bool = false;
                                if (!bool) {
                                    bool = true;
                                    var ani_1 = new SoldierEntity();
                                    var vo = { level: 1, atk: card.atk, hp: card.hp, type: CardType.general, id: ownSolderis[i].generalId };
                                    ani_1.soldierAttr = vo;
                                    ani_1.general = true;
                                    ani_1.generalId = ownSolderis[i].generalId;
                                    ani_1.parentGroupIndex = i;
                                    ani_1.setSoldierData(state == 1 ? -1 : 1, EFFECT + "role_" + ownSolderis[i].generalId);
                                    entitys.push(ani_1);
                                    // let ani_1:MovieClip = new MovieClip();
                                    // ani_1.playFile(`${EFFECT}role_${ownSolderis[i].generalId}_stand`, -1);
                                    ani_1.x = -pos[i].x3;
                                    ani_1.y = pos[i].x4;
                                    ani_1.scaleX = -1;
                                    _group.addChildAt(ani_1, 9999999);
                                }
                            }
                            break;
                        case 100109:
                        case 100110:
                        case 100113:
                        case 100107:
                            lie = 2;
                            for (var k = 0; k < lie; k++) {
                                for (var j = 0; j < 12; j++) {
                                    var ani = new SoldierEntity();
                                    var vo = { level: 1, atk: Math.floor(card.atk / 24), hp: Math.floor(card.hp / 24), type: ownSolderis[i].soldierType, id: ownSolderis[i].soldierID };
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.scaleX = ani.scaleY = 0.5;
                                    ani.setSoldierData(state == 1 ? -1 : 0, EFFECT + "role_" + ownSolderis[i].soldierID);
                                    entitys.push(ani);
                                    // let ani:MovieClip = new MovieClip();
                                    // ani.playFile(`${EFFECT}role_${ownSolderis[i].soldierType}_stand`, -1);
                                    ani.scaleX = -1;
                                    _group.addChild(ani);
                                    if (formation == 4) {
                                        ani.x = 8 + k * 62 + Math.floor(j / 4) * pos[i].x1 * ani.scaleX + j * pos[i].x2;
                                        ani.y = 18 + j * 28 + Math.floor(j / 4) * 28;
                                    }
                                    else if (formation == 6) {
                                        ani.x = 8 + k * 62 + Math.floor(j / 6) * pos[i].x1 * ani.scaleX + j * pos[i].x2;
                                        ani.y = 18 + j * 30 + Math.floor(j / 6) * 30;
                                    }
                                }
                            }
                            if (formation == 6) {
                                var bool = false;
                                if (!bool) {
                                    bool = true;
                                    var ani_1 = new SoldierEntity();
                                    var vo = { level: 1, atk: card.atk, hp: card.hp, type: CardType.general, id: ownSolderis[i].generalId };
                                    ani_1.soldierAttr = vo;
                                    ani_1.general = true;
                                    ani_1.generalId = ownSolderis[i].generalId;
                                    ani_1.parentGroupIndex = i;
                                    ani_1.setSoldierData(state == 1 ? -1 : 1, EFFECT + "role_" + ownSolderis[i].generalId);
                                    entitys.push(ani_1);
                                    // let ani_1:MovieClip = new MovieClip();
                                    // ani_1.playFile(`${EFFECT}role_${ownSolderis[i].generalId}_stand`, -1);
                                    ani_1.x = -pos[i].x3;
                                    ani_1.y = pos[i].x4;
                                    ani_1.scaleX = -1;
                                    _group.addChildAt(ani_1, 9999999);
                                }
                            }
                            break;
                    }
                }
                break;
        }
        return { group: group, group0: group0, group1: group1, group2: group2 };
    };
    /**
     * Update card data
     *
     * cardid Cardsid
     *
     * attr Corresponding to the data to be changed Be careful：Key value needs to match CardAttrVoAgreement 。 eg: {ownNum:20,atk:200} Will directly cover No logic algorithm
    */
    GlobalFun.refreshCardData = function (cardId, attr) {
        var cardAttr;
        for (var i = 0; i < GameApp.cardInfo.length; i++) {
            if (GameApp.cardInfo[i].insId == cardId) {
                cardAttr = GameApp.cardInfo[i];
                break;
            }
        }
        if (!cardAttr) {
            console.error("Incoming cardsidNo data present-----insid:" + cardId);
            return;
        }
        for (var key in attr) {
            cardAttr[key] = attr[key];
        }
        egret.localStorage.setItem(LocalStorageEnum.CARDINFO, JSON.stringify(GameApp.cardInfo));
    };
    /**
     * Get current city information
     *
     * id：Cityid Corresponding checkpointsid 123456789；
     * */
    GlobalFun.getCityInfo = function (id) {
        var citys = GameApp.roleInfo.citys;
        for (var i = 0; i < citys.length; i++) {
            if (citys[i].cityId == id) {
                return this.deepObj(citys[i]);
            }
        }
    };
    /**
     * Modify the current city information
     *
     * id:Cityid Corresponding checkpointsid 123456789；
     *
     * attr CorrespondingRoleInfoVo Medium CityInfoKey value in eg {isMain:true,timespan:30000}
     * */
    GlobalFun.changeCityInfo = function (id, attr) {
        var citys = GameApp.roleInfo.citys;
        var curCityInfo;
        for (var i = 0; i < citys.length; i++) {
            if (citys[i].cityId == id) {
                curCityInfo = citys[i];
                break;
            }
        }
        if (!curCityInfo) {
            console.error("Current cityiderror----cityId：" + id);
            return;
        }
        else {
            for (var key in attr) {
                curCityInfo[key] = attr[key];
            }
        }
        egret.localStorage.setItem(LocalStorageEnum.ROLEINFO, JSON.stringify(GameApp.roleInfo));
    };
    /**Change current age */
    GlobalFun.getYearShow = function () {
        var year = GameApp.year;
        var yearArr = year.toString().split("");
        var cnNums = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        return "West dollar" + cnNums[parseInt(yearArr[0])] + cnNums[parseInt(yearArr[1])] + cnNums[parseInt(yearArr[2])] + "year" + cnNums[parseInt(yearArr[3])] + "month";
    };
    /**Get the question list of the corresponding camp hero */ ;
    GlobalFun.getCityHeroQuestion = function (city) {
        var questions = QuestionCfg.cfgs[city];
        return questions;
    };
    GlobalFun.deepObj = function (param) {
        var obj = {};
        for (var key in param) {
            obj[key] = param[key];
        }
        return obj;
    };
    /*
    *Judge local storage
    */
    GlobalFun.judgelocalStorage = function () {
        if (egret.localStorage.getItem("sanguozhi_shop")) {
            return true;
        }
        else {
            return false;
        }
    };
    /*
    *Get local data
    */
    GlobalFun.getlocalStorage = function () {
        var objString = egret.localStorage.getItem("sanguozhi_shop");
        var obj = JSON.parse(objString);
        return obj;
    };
    /*
    *Store local data
    */
    GlobalFun.savelocalStorage = function (obj) {
        egret.localStorage.setItem("sanguozhi_shop", JSON.stringify(obj));
    };
    /**Display clouds */
    GlobalFun.showCloudAni = function (time, cb, arg) {
        var cloud = document.getElementsByClassName('cloud')[0];
        if (!GlobalFun.cloudInit) {
            GlobalFun.cloudInit = true;
            window["showCloud"]();
        }
        else {
            window["playCloud"]();
        }
        if (cloud) {
            cloud.style.transition = "opacity " + time + "s";
            cloud.style.visibility = "visible";
            cloud.style.opacity = 1;
            // cloud.style.left = "0px";
        }
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            GlobalFun.hideCloudAni(2);
            if (cb && arg) {
                cb.call(arg);
            }
        }, time * 1000);
    };
    /**Hidden clouds */
    GlobalFun.hideCloudAni = function (time) {
        var cloud = document.getElementsByClassName('cloud')[0];
        if (cloud) {
            cloud.style.opacity = 0;
            var timeout_1 = setTimeout(function () {
                cloud.style.transition = 'none';
                clearTimeout(timeout_1);
                cloud.style.display = "hidden";
                window["stopAni"]();
            }, time * 1000);
            // cloud.style.left = "-9999px";
        }
    };
    GlobalFun.count = 0; //Number of timers
    GlobalFun.timer = new egret.Timer(1000);
    GlobalFun.showstate = false;
    GlobalFun.cloudInit = false;
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map