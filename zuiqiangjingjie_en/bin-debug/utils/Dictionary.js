var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary() {
        this._keys = [];
        this._values = [];
    }
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         * Get a list of all child elements。
         */
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         * Get a list of all child element key names。
         */
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets a value for the specified key name。
     * @param   key Key name。
     * @param   value value。
     */
    Dictionary.prototype.setKeyValue = function (key, value) {
        var index = this._keys.indexOf(key);
        if (index >= 0) {
            this._values[index] = value;
            return;
        }
        this._keys.push(key);
        this._values.push(value);
    };
    /**
     * Returns the value of the specified key name。
     * @param   key Key name object。
     * @return Specify the value of the key name。
     */
    Dictionary.prototype.getValue = function (key) {
        var index = this._keys.indexOf(key);
        return index < 0 ? null : this._values[index];
    };
    /**
     * Remove the value of the specified key name。
     * @param   key Key name object。
     * @return Remove successfully。
     */
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * Clear the list of key names and key values for this object。
     */
    Dictionary.prototype.clear = function () {
        this._values.length = 0;
        this._keys.length = 0;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map