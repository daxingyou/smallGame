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
 * Created by yangsong on 2014/11/23.
 * TimerManager
 */
var TimerManager = (function (_super) {
    __extends(TimerManager, _super);
    /**
     * Constructor
     */
    function TimerManager() {
        var _this = _super.call(this) || this;
        _this.currHandler = null;
        _this._handlers = [];
        _this.nexthandles = null;
        _this._currTime = egret.getTimer();
        _this._currFrame = 0;
        egret.startTick(_this.onEnterFrame, _this);
        return _this;
    }
    TimerManager.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    TimerManager.prototype.getFrameId = function () {
        return this._currFrame;
    };
    TimerManager.prototype.getCurrTime = function () {
        return this._currTime;
    };
    // Sort from large to small
    TimerManager.binFunc = function (b1, b2) {
        if (b1.exeTime > b2.exeTime)
            return -1;
        else if (b1.exeTime < b2.exeTime)
            return 1;
        else
            return 0;
    };
    TimerManager.DeleteHandle = function (handler) {
        handler.clear();
        ObjectPool.push(handler);
    };
    /**
     * Execute function per frame
     * @param frameTime
     */
    TimerManager.prototype.onEnterFrame = function (time) {
        this._currFrame++;
        this._currTime = egret.getTimer();
        var currTime = 0;
        // process the nextlist first
        var nexthandles = this.nexthandles;
        this.nexthandles = null;
        if (nexthandles && nexthandles.length > 0) {
            for (var _i = 0, nexthandles_1 = nexthandles; _i < nexthandles_1.length; _i++) {
                var handler_1 = nexthandles_1[_i];
                handler_1.method.call(handler_1.methodObj);
                TimerManager.DeleteHandle(handler_1);
            }
            nexthandles = null;
        }
        if (this._handlers.length <= 0)
            return false;
        var handler = this._handlers[this._handlers.length - 1];
        while (handler.exeTime <= this._currTime) {
            this.currHandler = handler = this._handlers.pop();
            handler.method.call(handler.methodObj);
            currTime = egret.getTimer();
            handler.exeTime = currTime + handler.delay;
            var repeat = handler.forever;
            if (!repeat) {
                if (handler.repeatCount > 1) {
                    handler.repeatCount--;
                    repeat = true;
                }
                else {
                    if (handler.onFinish) {
                        handler.onFinish.apply(handler.finishObj);
                    }
                }
            }
            if (repeat) {
                var index = Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
                this._handlers.splice(index, 0, handler);
            }
            else {
                TimerManager.DeleteHandle(handler);
            }
            if (currTime - this._currTime > 5)
                break;
            if (this._handlers.length <= 0)
                break;
            else
                handler = this._handlers[this._handlers.length - 1];
        }
        this.currHandler = null;
        return false;
    };
    TimerManager.prototype.create = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
        if (delay < 0 || repeat < 0 || method == null) {
            return;
        }
        var handler = ObjectPool.pop("TimerHandler");
        handler.forever = repeat == 0;
        handler.repeatCount = repeat;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.onFinish = onFinish;
        handler.finishObj = fobj;
        handler.exeTime = startTime + this._currTime;
        // this._handlers.push(handler);
        var index = Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
        this._handlers.splice(index, 0, handler);
    };
    /**
     *
     * Timing execution
     * @param delay Execution interval:Millisecond
     * @param repeat Execution times, 0For unlimited times
     * @param method Execution function
     * @param methodObj The object of the execution function
     * @param onFinish Execute function complete
     * @param fobj The object to which the execution function belongs
     * @param remove Delete existing
     *
     */
    TimerManager.prototype.doTimer = function (delay, repeat, method, methodObj, onFinish, fobj) {
        if (onFinish === void 0) { onFinish = null; }
        if (fobj === void 0) { fobj = null; }
        this.create(delay, delay, repeat, method, methodObj, onFinish, fobj);
    };
    /**
     *
     * Timing execution
     * @param startTime How long is the first execution delayed
     * @param delay Execution interval:Millisecond
     * @param repeat Execution times, 0For unlimited times
     * @param method Execution function
     * @param methodObj The object of the execution function
     * @param onFinish Execute function complete
     * @param fobj The object to which the execution function belongs
     * @param remove Delete existing
     *
     */
    TimerManager.prototype.doTimerDelay = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
        if (onFinish === void 0) { onFinish = null; }
        if (fobj === void 0) { fobj = null; }
        this.create(startTime, delay, repeat, method, methodObj, onFinish, fobj);
    };
    // Next frame execution，And only once
    TimerManager.prototype.doNext = function (method, methodObj) {
        var handler = ObjectPool.pop("TimerHandler");
        handler.method = method;
        handler.methodObj = methodObj;
        if (!this.nexthandles)
            this.nexthandles = [];
        this.nexthandles.push(handler);
    };
    /**
     * Clear
     * @param method Functions to remove
     * @param methodObj Object corresponding to the function to be removed
     */
    TimerManager.prototype.remove = function (method, methodObj) {
        var currHandler = this.currHandler;
        if (currHandler && currHandler.method == method &&
            currHandler.methodObj == methodObj) {
            currHandler.forever = false;
            currHandler.repeatCount = 0;
        }
        for (var i = this._handlers.length - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                this._handlers.splice(i, 1);
                TimerManager.DeleteHandle(handler);
            }
        }
    };
    /**
     * Clear
     * @param methodObj Object corresponding to the function to be removed
     */
    TimerManager.prototype.removeAll = function (methodObj) {
        var currHandler = this.currHandler;
        if (currHandler && currHandler.methodObj == methodObj) {
            currHandler.forever = false;
            currHandler.repeatCount = 0;
        }
        for (var i = this._handlers.length - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.methodObj == methodObj) {
                this._handlers.splice(i, 1);
                TimerManager.DeleteHandle(handler);
            }
        }
    };
    /**
     * Check if it already exists
     * @param method
     * @param methodObj
     *
     */
    TimerManager.prototype.isExists = function (method, methodObj) {
        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.method == method && handler.methodObj == methodObj) {
                return true;
            }
        }
        return false;
    };
    return TimerManager;
}(BaseClass));
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
        /**Execution interval*/
        this.delay = 0;
        /**Repeat or not*/
        this.forever = false;
        /**Number of repetitions*/
        this.repeatCount = 0;
        /**execution time*/
        this.exeTime = 0;
    }
    /**Clear*/
    TimerHandler.prototype.clear = function () {
        this.method = null;
        this.methodObj = null;
        this.onFinish = null;
        this.finishObj = null;
        this.forever = false;
    };
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
//# sourceMappingURL=TimerManager.js.map