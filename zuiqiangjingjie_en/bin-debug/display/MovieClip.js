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
 *  Animation class
 * @author
 */
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        /**Magnification ,The bigger the faster*/
        _this.rate = 1;
        _this.pixelHitTest = false;
        _this.wj = false;
        _this._mcFactory = new egret.MovieClipDataFactory();
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, _this.gameStart, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, _this.gamePause, _this);
        return _this;
    }
    MovieClip.prototype.gameStart = function () {
        this.play();
    };
    MovieClip.prototype.gamePause = function () {
        this.stop();
    };
    MovieClip.prototype.playFile = function (name, playCount, compFun, remove, framesLabel, _loadFun, frameRate) {
        var _this = this;
        if (playCount === void 0) { playCount = 1; }
        if (compFun === void 0) { compFun = null; }
        if (remove === void 0) { remove = true; }
        if (framesLabel === void 0) { framesLabel = ""; }
        if (name.indexOf("chargeff1") != -1 || name.indexOf("forceguildeff") != -1 || name.indexOf("qianghua") != -1 ||
            name.indexOf("forgeSuccess") != -1 || name.indexOf("neigongbaozhaeff") != -1 || name.indexOf("piaodongqipaohuang") != -1) {
            return;
        }
        this.time = egret.getTimer();
        this._compFun = compFun;
        this._loadFun = _loadFun;
        this.playCount = playCount;
        this.remove = remove;
        TimerManager.inst().remove(this.playComp, this);
        // if (this.texture && this.texture.bitmapData == null) {
        // 	//Resources have been released
        // } else if (this.name == name) {
        // 	this.createBody(framesLabel,frameRate);
        // 	return;
        // }
        this.name = name;
        if (this.texture) {
            MovieClip.removeDisplayObject(this, this.texture.bitmapData);
        }
        this.jsonData = null;
        this.texture = null;
        RES.getResByUrl(this.name + ".json", function (data, url) {
            if (_this.name + ".json" != url || !data)
                return;
            _this.jsonData = data;
            _this.createBody(framesLabel, frameRate);
        }, this, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl(this.name + ".png", function (data, url) {
            if (_this.name + ".png" != url || !data)
                return;
            _this.texture = data;
            if (_this.stage) {
                MovieClip.addDisplayObject(_this, _this.texture.bitmapData);
            }
            _this.createBody(framesLabel, frameRate);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    /**
     * @private
     * Show objects adding to stage
     */
    MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        if (this.texture) {
            MovieClip.addDisplayObject(this, this.texture.bitmapData);
        }
    };
    /**
     * @private
     * Show objects removing from stage
     */
    MovieClip.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        if (this.texture) {
            MovieClip.removeDisplayObject(this, this.texture.bitmapData);
        }
    };
    /**
     * Create a body animation
     */
    MovieClip.prototype.createBody = function (framesLaebl, frameRate) {
        if (framesLaebl === void 0) { framesLaebl = ""; }
        if (!this.jsonData || !this.texture)
            return;
        this._mcFactory.clearCache();
        this._mcFactory.mcDataSet = this.jsonData;
        this._mcFactory.texture = this.texture;
        var temp = this.name.split("/");
        var tempName = temp.pop();
        this.movieClipData = this._mcFactory.generateMovieClipData(tempName);
        if (!(this.name in MovieClip.originalRate)) {
            MovieClip.originalRate[this.name] = this.movieClipData.frameRate;
        }
        this.frameRate = frameRate ? frameRate : (MovieClip.originalRate[this.name] * this.rate) >> 0;
        //Autoplay from first frame
        try {
            this.gotoAndPlay(framesLaebl ? framesLaebl : 1, this.playCount);
        }
        catch (error) {
            console.warn("Error animation file:", this.name);
        }
        // this.visible = true;
        if (this.playCount > 0) {
            var tempTime = egret.getTimer() - this.time;
            tempTime = this.playTime * this.playCount - tempTime;
            if (tempTime > 0)
                TimerManager.inst().doTimer(tempTime, 1, this.playComp, this);
            else
                this.playComp();
        }
        if (this._loadFun) {
            this._loadFun();
        }
        //Throw event whose content has changed
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    /**
     * Auto play times complete processing
     * @param e
     */
    MovieClip.prototype.playComp = function () {
        if (this.stage && this._compFun)
            this._compFun();
        if (this.remove)
            DisplayUtils.removeFromParent(this);
    };
    Object.defineProperty(MovieClip.prototype, "playTime", {
        /** Total playing time(Millisecond) */
        get: function () {
            if (!this.movieClipData)
                return 0;
            return 1 / this.frameRate * this.totalFrames * 1000;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.clearComFun = function () {
        this._compFun = null;
    };
    //release
    MovieClip.prototype.dispose = function () {
        this.stop();
        this.resetMovieClip();
        this.clearComFun();
        TimerManager.inst().removeAll(this);
    };
    //recovery
    MovieClip.prototype.destroy = function () {
        DisplayUtils.removeFromParent(this);
        this.dispose();
        ObjectPool.push(this);
    };
    MovieClip.prototype.resetMovieClip = function () {
        var mc = this;
        mc.rotation = 0;
        mc.scaleX = 1;
        mc.scaleY = 1;
        mc.alpha = 1;
        mc.anchorOffsetX = 0;
        mc.anchorOffsetY = 0;
        mc.x = 0;
        mc.y = 0;
        mc.rate = 1;
        mc.$renderNode.cleanBeforeRender();
        mc._mcFactory.clearCache();
        mc._mcFactory.mcDataSet = null;
        mc._mcFactory.texture = null;
        mc.name = null;
        mc.jsonData = null;
        mc.filters = null;
        var bitmapData = mc.texture;
        if (bitmapData) {
            MovieClip.removeDisplayObject(mc, bitmapData.bitmapData);
        }
        mc.texture = null;
        mc.remove = false;
        egret.Tween.removeTweens(mc);
    };
    MovieClip.addDisplayObject = function (displayObject, bitmapData) {
        if (!bitmapData)
            return;
        var hashCode = bitmapData.hashCode;
        if (!MovieClip.displayList[hashCode]) {
            MovieClip.displayList[hashCode] = [displayObject];
            return;
        }
        var tempList = MovieClip.displayList[hashCode];
        if (tempList.indexOf(displayObject) < 0) {
            tempList.push(displayObject);
        }
    };
    MovieClip.removeDisplayObject = function (displayObject, bitmapData) {
        if (!bitmapData)
            return;
        var hashCode = bitmapData.hashCode;
        if (!MovieClip.displayList[hashCode]) {
            return;
        }
        var tempList = MovieClip.displayList[hashCode];
        var index = tempList.indexOf(displayObject);
        if (index >= 0) {
            tempList.splice(index, 1);
        }
        if (tempList.length == 0) {
            delete MovieClip.displayList[hashCode];
        }
    };
    /** Original frame rate */
    MovieClip.originalRate = {};
    MovieClip.displayList = egret.createMap();
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip");
//# sourceMappingURL=MovieClip.js.map