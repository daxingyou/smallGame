var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by wizardc on 2014/7/29.
 */
var game;
(function (game) {
    var GameData = (function () {
        function GameData() {
        }
        GameData.getInstance = function () {
            if (this._instance == null) {
                this._instance = new GameData();
            }
            return this._instance;
        };
        /**
         * 开始新游戏.
         */
        GameData.prototype.newGame = function () {
            this._grids = [];
            this.score = 0;
            this._successed = false;
            game.GameDispatcher.getInstance().dispatchEventWith(game.Message.GAME_RESTART, false);
            this.insertRandomTile();
        };
        /**
         * 添加一个随机项.
         */
        GameData.prototype.insertRandomTile = function () {
            var noUseTiles = [];
            for (var i = 0; i < game.Config.TILE_COLUMN; i++) {
                for (var j = 0; j < game.Config.TILE_ROW; j++) {
                    if (this._grids[j * game.Config.TILE_COLUMN + i] == null) {
                        noUseTiles.push(new egret.Point(i, j));
                    }
                }
            }
            if (noUseTiles.length > 0) {
                var index = Math.floor(Math.random() * noUseTiles.length);
                var p = noUseTiles[index];
                var num = Math.random() < 0.75 ? 2 : 4;
                //记录数据
                var tileVO = new game.TileVO(p.x, p.y);
                tileVO.num = num;
                this._grids[p.y * game.Config.TILE_COLUMN + p.x] = tileVO;
                //抛出事件
                game.GameDispatcher.getInstance().dispatchEventWith(game.Message.INSERT_TILE, false, { row: p.y, column: p.x, num: num });
            }
        };
        /**
         * 执行移动.
         * @param direction 方向.
         */
        GameData.prototype.doMove = function (direction) {
            var score = 0;
            var len = (direction == 0 || direction == 2) ? game.Config.TILE_COLUMN : game.Config.TILE_ROW;
            for (var i = 0; i < len; i++) {
                var list = this.getQueueTile(direction, i);
                var newList = [];
                score += this.mergeQueueTile(direction, i, list, newList);
                this.updateQueueTile(direction, i, newList);
            }
            if (score != 0) {
                this.score += score;
                game.GameDispatcher.getInstance().dispatchEventWith(game.Message.SCORE_UPDATE, false, { addScore: score });
            }
            this.insertRandomTile();
            if (this.checkFailure()) {
                ViewManager.inst().open(Result);
                game.GameDispatcher.getInstance().dispatchEventWith(game.Message.GAME_FAILURE, false);
            }
            var passLevelstr = egret.localStorage.getItem("pass_" + GameApp.level);
            if (!passLevelstr) {
                //  if(!this._successed && this.checkSuccess())
                // {
                //     this._successed = true;
                //     game.GameDispatcher.getInstance().dispatchEventWith(game.Message.GAME_SUCCESS, false);
                //     egret.localStorage.setItem("pass_"+GameApp.level,"1");
                // }
                // else if(this.checkFailure())
                // {
                // }
            }
        };
        /**
         * 获取一行数据.
         * @param direction 方向.
         * @param index 该方向上的索引.
         */
        GameData.prototype.getQueueTile = function (direction, index) {
            var result = [];
            var len = (direction == 0 || direction == 2) ? game.Config.TILE_ROW : game.Config.TILE_COLUMN;
            for (var i = 0; i < len; i++) {
                switch (direction) {
                    case 0: //上
                    case 2://下
                        result.push(this._grids[game.Config.TILE_COLUMN * i + index]);
                        break;
                    case 1: //右
                    case 3://左
                        result.push(this._grids[game.Config.TILE_COLUMN * index + i]);
                        break;
                }
            }
            //反转数组
            if (direction == 0 || direction == 3) {
                result.reverse();
            }
            return result;
        };
        /**
         * 合并一行数据.
         * @param direction 方向.
         * @param index 该方向上的索引.
         * @param source 数据列表.
         * @param newList 运算结束后的新数据列表.
         * @returns {number} 合并后获得的分数.
         */
        GameData.prototype.mergeQueueTile = function (direction, index, source, newList) {
            var score = 0;
            var i;
            var len = source.length;
            var p;
            //移动靠拢去掉空白
            for (i = len - 1; i >= 0; i--) {
                if (source[i] != null) {
                    newList.unshift(source[i]);
                }
            }
            //填充数组
            for (i = newList.length; i < len; i++) {
                newList.unshift(null);
            }
            //合并相同项
            for (i = len - 1; i >= 0; i--) {
                //已经没有项目时就跳出
                if (newList[i] == null) {
                    break;
                }
                //取出当前项
                var nowTile = newList[i];
                //当前项目已经是最后一个时判断位置是否更新后即可跳出
                if (newList[i - 1] == null) {
                    //获取当前的位置
                    p = this.getRowAndColumn(direction, index, i);
                    //抛出事件
                    if (p.x != nowTile.column || p.y != nowTile.row) {
                        game.GameDispatcher.getInstance().dispatchEventWith(game.Message.MOVE_TILE, false, { oldRow: nowTile.row, oldColumn: nowTile.column, newRow: p.y, newColumn: p.x });
                        nowTile.column = p.x;
                        nowTile.row = p.y;
                    }
                    break;
                }
                //取出相邻的下一项
                var nextTile = newList[i - 1];
                //可以合并
                if (nowTile.num == nextTile.num) {
                    //数据修改
                    nowTile.num *= 2;
                    //移除下一项
                    newList.splice(i - 1, 1);
                    newList.unshift(null);
                    //记录获得的分数
                    score += nowTile.num;
                    //获取当前的位置
                    p = this.getRowAndColumn(direction, index, i);
                    //抛出事件
                    game.GameDispatcher.getInstance().dispatchEventWith(game.Message.MERGE_REMOVE_TILE, false, { oldRow: nowTile.row, oldColumn: nowTile.column, newRow: p.y, newColumn: p.x });
                    game.GameDispatcher.getInstance().dispatchEventWith(game.Message.MERGE_REMOVE_TILE, false, { oldRow: nextTile.row, oldColumn: nextTile.column, newRow: p.y, newColumn: p.x });
                    game.GameDispatcher.getInstance().dispatchEventWith(game.Message.MERGE_NEW_TILE, false, { row: p.y, column: p.x, num: nowTile.num });
                    nowTile.column = p.x;
                    nowTile.row = p.y;
                }
                else {
                    //获取当前的位置
                    p = this.getRowAndColumn(direction, index, i);
                    //抛出事件
                    if (p.x != nowTile.column || p.y != nowTile.row) {
                        game.GameDispatcher.getInstance().dispatchEventWith(game.Message.MOVE_TILE, false, { oldRow: nowTile.row, oldColumn: nowTile.column, newRow: p.y, newColumn: p.x });
                        nowTile.column = p.x;
                        nowTile.row = p.y;
                    }
                }
            }
            return score;
        };
        /**
         * 获取行数和列数.
         * @param direction 方向.
         * @param index 该方向上的索引.
         * @param i 列表中的索引.
         * @returns {egret.Point} 位置.
         */
        GameData.prototype.getRowAndColumn = function (direction, index, i) {
            var p = new egret.Point();
            switch (direction) {
                case 0://上
                    p.x = index;
                    p.y = (game.Config.TILE_ROW - 1) - i;
                    break;
                case 1://右
                    p.x = i;
                    p.y = index;
                    break;
                case 2://下
                    p.x = index;
                    p.y = i;
                    break;
                case 3://左
                    p.x = (game.Config.TILE_COLUMN - 1) - i;
                    p.y = index;
                    break;
            }
            return p;
        };
        /**
         * 更新一行数据.
         * @param direction 方向.
         * @param index 该方向上的索引.
         * @param list 数据列表.
         */
        GameData.prototype.updateQueueTile = function (direction, index, list) {
            var indexs = [];
            var i;
            var len = (direction == 0 || direction == 2) ? game.Config.TILE_ROW : game.Config.TILE_COLUMN;
            for (i = 0; i < len; i++) {
                switch (direction) {
                    case 0: //上
                    case 2://下
                        indexs.push(game.Config.TILE_COLUMN * i + index);
                        break;
                    case 1: //右
                    case 3://左
                        indexs.push(game.Config.TILE_COLUMN * index + i);
                        break;
                }
            }
            //反转数组
            if (direction == 0 || direction == 3) {
                indexs.reverse();
            }
            for (i = 0; i < len; i++) {
                this._grids[indexs[i]] = list[i];
            }
        };
        /**
         * 检测是否成功.
         */
        GameData.prototype.checkSuccess = function () {
            var len = game.Config.TILE_COLUMN * game.Config.TILE_ROW;
            for (var i = 0; i < len; i++) {
                if (this._grids[i] != null && this._grids[i].num >= game.Config.WIN_NUMBER) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 检测是否失败.
         */
        GameData.prototype.checkFailure = function () {
            for (var i = 0; i < game.Config.TILE_COLUMN; i++) {
                for (var j = 0; j < game.Config.TILE_ROW; j++) {
                    var tileVO = this._grids[j * game.Config.TILE_COLUMN + i];
                    if (tileVO != null) {
                        for (var k = 0; k < 4; k++) {
                            var nearbyTileVO = this.getNearbyTileVo(i, j, k);
                            //可以合并则不会失败
                            if (nearbyTileVO != null && tileVO.num == nearbyTileVO.num) {
                                return false;
                            }
                        }
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        };
        /**
         * 获取相邻的格子.
         * @param column 列数.
         * @param row 行数.
         * @param direction 方向.
         */
        GameData.prototype.getNearbyTileVo = function (column, row, direction) {
            switch (direction) {
                case 0://上
                    row--;
                    break;
                case 1://右
                    column++;
                    break;
                case 2://下
                    row++;
                    break;
                case 3://左
                    column--;
                    break;
            }
            if (row < 0 || row >= game.Config.TILE_ROW) {
                return null;
            }
            if (column < 0 || column >= game.Config.TILE_COLUMN) {
                return null;
            }
            return this._grids[row * game.Config.TILE_COLUMN + column];
        };
        return GameData;
    }());
    game.GameData = GameData;
    __reflect(GameData.prototype, "game.GameData");
})(game || (game = {}));
//# sourceMappingURL=GameData.js.map