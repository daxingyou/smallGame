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
        _this.cnt = "两个黄鹂鸣翠柳,一行白鹭上青天";
        _this.vritualGrid = [];
        return _this;
    }
    GameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var percentw = StageUtils.inst().getWidth() / 1136;
        this.cardGroup.scaleX = this.cardGroup.scaleY = percentw;
        var arr = this.cnt.split('');
        arr.sort(this.randomsort);
        for (var i = 0; i < 4; i++) {
            //行
            for (var j = 0; j < 4; j++) {
                // 列 
                var index = i * 4 + j;
                var obj = { x: j * (100 + 10), y: i * (100 + 10), occupied: -1 };
                if (i >= 3 && j >= 3) {
                    this.vritualGrid.push(obj);
                    continue;
                }
                var sp = this.createGrid(arr[index], this.cnt.indexOf(arr[index]));
                sp.x = obj.x;
                sp.y = obj.y;
                obj.occupied = parseInt(sp.name);
                this.vritualGrid.push(obj);
            }
        }
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onCancle, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onCancle, this);
    };
    GameView.prototype.onBegin = function (evt) {
        if (!this.beginPoint) {
            this.beginPoint = new egret.Point();
            this.beginPoint.x = evt.stageX;
            this.beginPoint.y = evt.stageY;
        }
    };
    GameView.prototype.onEnd = function (evt) {
        if (this.beginPoint) {
            var direct = this.judgeDirection({ x: evt.stageX, y: evt.stageY });
            //获取 -1 格子周围的格子;
            for (var i = 0; i < this.vritualGrid.length; i++) {
                if (this.vritualGrid[i].occupied == -1) {
                    var emptyGrid = this.vritualGrid[i];
                    var index = i;
                    var grid = this.judgeIfExistGrid(emptyGrid, direct);
                    if (grid) {
                        console.log(grid);
                        //要移动的格子的当前位置;
                        var xx = grid.x;
                        var yy = grid.y;
                        var sp = this.cardGroup.getChildByName(grid.occupied.toString());
                        if (sp) {
                            sp.x = emptyGrid.x;
                            sp.y = emptyGrid.y;
                            grid.x = emptyGrid.x;
                            grid.y = emptyGrid.y;
                            emptyGrid.x = xx;
                            emptyGrid.y = yy;
                            for (var j = 0; j < this.vritualGrid.length; j++) {
                                if (this.vritualGrid[j].occupied == grid.occupied) {
                                    this.vritualGrid[i] = grid;
                                    this.vritualGrid[j] = emptyGrid;
                                    break;
                                }
                            }
                            //交换集合中的位子
                            this.judgeResult();
                        }
                    }
                    else {
                        console.log("当前移动方向不存在格子");
                    }
                    break;
                }
            }
        }
    };
    GameView.prototype.judgeResult = function () {
        var count = 0;
        for (var i = 0; i < this.vritualGrid.length; i++) {
            if (this.vritualGrid[i].occupied == count) {
                count += 1;
            }
        }
        if (count >= this.vritualGrid.length - 1) {
            //游戏胜利
            this.touchEnabled = false;
            this.touchChildren = false;
            this.winLab.visible = true;
        }
    };
    /***/
    GameView.prototype.judgeIfExistGrid = function (emptyGrid, direct) {
        if (direct == 1) {
            //上
            var bottomY = emptyGrid.y + 110;
            var bottomX = emptyGrid.x;
            return this.getGridByPos(bottomX, bottomY);
        }
        else if (direct == 2) {
            //右
            var bottomX = emptyGrid.x - 110;
            var bottomY = emptyGrid.y;
            return this.getGridByPos(bottomX, bottomY);
        }
        else if (direct == 3) {
            //下
            var bottomX = emptyGrid.x;
            var bottomY = emptyGrid.y - 110;
            return this.getGridByPos(bottomX, bottomY);
        }
        else {
            //左
            var bottomX = emptyGrid.x + 110;
            var bottomY = emptyGrid.y;
            return this.getGridByPos(bottomX, bottomY);
        }
    };
    GameView.prototype.getGridByPos = function (x, y) {
        for (var i = 0; i < this.vritualGrid.length; i++) {
            if (this.vritualGrid[i].x == x && this.vritualGrid[i].y == y) {
                return this.vritualGrid[i];
            }
        }
        return null;
    };
    GameView.prototype.onCancle = function () {
        this.beginPoint = null;
    };
    /**判断方向 */
    GameView.prototype.judgeDirection = function (xy) {
        if (this.beginPoint) {
            if (this.beginPoint.y > xy.y && this.beginPoint.y - xy.y >= 50 && Math.abs(this.beginPoint.x - xy.x) <= 50) {
                return 1;
            }
            if (xy.x > this.beginPoint.x && xy.x - this.beginPoint.x >= 50 && Math.abs(this.beginPoint.y - xy.y) <= 50) {
                return 2;
            }
            if (this.beginPoint.y < xy.y && xy.y - this.beginPoint.y >= 50 && Math.abs(this.beginPoint.x - xy.x) <= 50) {
                return 3;
            }
            if (this.beginPoint.x > xy.x && this.beginPoint.x - xy.x >= 50 && Math.abs(this.beginPoint.y - xy.y) <= 50) {
                return 4;
            }
        }
    };
    /**创建格子 */
    GameView.prototype.createGrid = function (txt, index) {
        var sp = new eui.Group();
        sp.width = sp.height = 100;
        this.cardGroup.addChild(sp);
        sp.touchEnabled = true;
        sp.touchChildren = false;
        var rect = new eui.Rect(100, 100, 0x000000);
        sp.addChild(rect);
        sp.name = index;
        var word = new eui.Label();
        word.text = txt;
        sp.addChild(word);
        word.textColor = 0xffffff;
        word.size = 30;
        word.stroke = 1;
        word.strokeColor = 0x00ff00;
        word.anchorOffsetX = word.width >> 1;
        word.anchorOffsetY = word.height >> 1;
        word.horizontalCenter = 0;
        word.verticalCenter = 0;
        return sp;
    };
    GameView.prototype.randomsort = function (a, b) {
        return Math.random() > .5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    };
    GameView.prototype.close = function () {
    };
    return GameView;
}(BaseEuiView));
__reflect(GameView.prototype, "GameView");
ViewManager.inst().reg(GameView, LayerManager.UI_Main);
//# sourceMappingURL=GameView.js.map