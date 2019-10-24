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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        return _super.call(this) || this;
    }
    StartGameView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.logoGroup.alpha = 0;
        this.logoGroup.scaleX = this.logoGroup.scaleY = 3;
        GlobalFun.sendToNativeLoadEnd();
        this.img["autoSize"]();
        egret.Tween.get(this.role).to({ left: -178 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.role);
        }, this);
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            egret.Tween.get(self.logoGroup).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(self.logoGroup);
            }, self);
        }, 300);
        this.addTouchEvent(this.startGameBtn, this.onStartGame, true);
        var vertexSrc = "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        var fragmentSrc1 = "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +
            "uniform float customUniform;\n" +
            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.1;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";
        this.customFilter1 = new egret.CustomFilter(vertexSrc, fragmentSrc1, {
            customUniform: 0
        });
        this.filters = [this.customFilter1];
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    StartGameView.prototype.onStartGame = function () {
        var _this = this;
        var firstEnter = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
        egret.Tween.get(this).to({ alpha: 0 }, 600).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.inst().close(StartGameView);
        }, this);
        if (!firstEnter) {
            egret.localStorage.setItem(LocalStorageEnum.FIRST_TIME, new Date().getTime().toString());
            egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST, "1");
            ViewManager.inst().open(StoryView);
        }
        else {
            ViewManager.inst().open(GameMainView);
        }
    };
    StartGameView.prototype.onFrame = function (evt) {
        this.start1.rotation += 1;
        this.start2.rotation -= 1;
        this.start3.rotation += 1;
        this.start4.rotation -= 1;
        this.customFilter1.uniforms.customUniform += 0.05;
        if (this.customFilter1.uniforms.customUniform > Math.PI * 2) {
            this.customFilter1.uniforms.customUniform = 0.0;
        }
    };
    StartGameView.prototype.close = function () {
        this.removeTouchEvent(this.startGameBtn, this.onStartGame);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.inst().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map