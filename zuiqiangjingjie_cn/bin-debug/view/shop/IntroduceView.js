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
var IntroduceView = (function (_super) {
    __extends(IntroduceView, _super);
    function IntroduceView() {
        return _super.call(this) || this;
    }
    IntroduceView.prototype.initData = function (data, isshow) {
        // if(data.type == CardType.skill || data.type == CardType.special_skill || data.type == CardType.prop){
        if (isshow === void 0) { isshow = true; }
        // }else{
        //     this.quality.visible = false;
        // }
        // this.quality.visible = true;
        // this.quality.source = `quality_${data.quality}_png`;
    };
    IntroduceView.prototype.setData = function () {
        if (this.data["type"] == CardType.general) {
            this.jieshao_group.y = 134.5;
            this.buffDesc_label.text = this.data["buffDesc"];
            this.buffDesc_group.visible = true;
        }
        else {
            this.jieshao_group.y = 100.5;
            this.buffDesc_group.visible = false;
        }
        if (this.data["hp"] == 0 || this.data["atk"] == 0 || this.data["type"] == CardType.skill || this.data["type"] == CardType.special_skill || this.data["type"] == CardType.prop ||
            this.data["type"] == CardType.build) {
            this.hp_label.text = "无";
            this.atk_label.text = "无";
        }
        else {
            this.hp_label.text = this.data["hp"];
            this.atk_label.text = this.data["atk"];
        }
        if (this.data["insId"] == 100105 || this.data["insId"] == 100106 || this.data["insId"] == 100107) {
            this.hp_label.text = this.data["hp"];
            this.atk_label.text = this.data["atk"];
        }
        // this.jieshao_label.text=this.data["jieshao"];
        this.jieshao_label.textFlow = new egret.HtmlTextParser().parse(this.data["jieshao"]);
        this.person_img.source = this.data["cardModel"];
        this.initData(this.data);
        //let card = new CardItem( this.data["type"] , this.data["insId"] );
        //this.card_group.addChild( card );
    };
    IntroduceView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.infoGroup["autoSize"]();
        this.data = param[0];
        this.setData();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    IntroduceView.prototype.touchTapHandler = function (e) {
        switch (e.target) {
            case this.close_img:
                ViewManager.inst().close(IntroduceView);
                break;
        }
    };
    IntroduceView.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    return IntroduceView;
}(BaseEuiView));
__reflect(IntroduceView.prototype, "IntroduceView");
ViewManager.inst().reg(IntroduceView, LayerManager.TIPS_LAYER);
//# sourceMappingURL=IntroduceView.js.map