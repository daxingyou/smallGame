/**
 * Page array
 * @author Peach.T 2010-5-3
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PageArray = (function () {
    function PageArray(source, size) {
        if (size === void 0) { size = 20; }
        this.dataSource = source;
        this.size = size;
        this.currentPage = 0;
        this.setPageData();
    }
    Object.defineProperty(PageArray.prototype, "length", {
        /**
         *Data source length
         */
        get: function () {
            return this.dataSource.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * set up data sources
     *
     */
    PageArray.prototype.setPageData = function () {
        this.pageData = [];
        var index = this.currentPage * this.size;
        var nextIndex = (this.currentPage + 1) * this.size;
        var min = Math.min(this.length, nextIndex);
        for (var i = index; i < min; i++) {
            this.pageData.push(this.dataSource[i]);
        }
    };
    PageArray.prototype.getDataSource = function () {
        return this.dataSource;
    };
    Object.defineProperty(PageArray.prototype, "totalPage", {
        get: function () {
            return Math.ceil(this.length / this.size);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Is there a previous page
     * @return
     *
     */
    PageArray.prototype.havePre = function () {
        return this.currentPage != 0; //no data，Or just one page，Or in the case of multiple pages on the first page
    };
    /**
     * Is there a next page
     * @return
     *
     */
    PageArray.prototype.haveNext = function () {
        return this.currentPage < this.totalPage - 1; //no data ，Or on the last page
    };
    /**
     * Flip pages forward
     *
     */
    PageArray.prototype.prev = function () {
        this.currentPage--;
        this.setPageData();
    };
    /**
     * Flip pages back
     *
     */
    PageArray.prototype.next = function () {
        this.currentPage++;
        this.setPageData();
    };
    /**
     * home page
     *
     */
    PageArray.prototype.first = function () {
        this.currentPage = 0;
        this.setPageData();
    };
    /**
     * Last
     *
     */
    PageArray.prototype.last = function () {
        this.currentPage = this.totalPage - 1;
        this.setPageData();
    };
    /**
     * How many pages to jump to
     * @param index The number of pages
     *
     */
    PageArray.prototype.gotoPage = function (index) {
        if (this.totalPage < index) {
            return;
        }
        else {
            this.currentPage = index - 1;
            this.setPageData();
        }
    };
    return PageArray;
}());
__reflect(PageArray.prototype, "PageArray");
//# sourceMappingURL=PageArray.js.map