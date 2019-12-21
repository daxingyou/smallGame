/**
 * Internal purchase and sharing method
 *
 * 1 Send request recharge.sendToNativePhurse(_data:IpayParam,cb:(num)=>void,arg:any)
 * parameter: _data follow {Key1:'600'} Least support1individual most4A parameter 。
 *      _cb(num)   Callback function 。iosThis method will be used when the callback comes back 。arg Scope of the current callback parameternum byiosParameters returned
 *
 * 2.Send load complete
 *
 *   recharge.sendToNativeLoadEnd();
 *
 */
var recharge;
(function (recharge) {
    var _cb;
    var _arg;
    /**Purchase callback return */
    function payCallBack(param) {
        if (_cb && _arg) {
            _cb.call(_arg, param);
        }
    }
    /**Send toiosRequest for purchase */
    function sendToNativePhurse(_data, cb, arg) {
        window["callBack"] = payCallBack;
        _cb = cb;
        _arg = arg;
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.funciap) {
            window["webkit"].messageHandlers.funciap.postMessage(_data);
        }
    }
    recharge.sendToNativePhurse = sendToNativePhurse;
    /**Send outiosLoad complete */
    function sendToNativeLoadEnd() {
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.loadingFinish) {
            window["webkit"].messageHandlers.loadingFinish.postMessage({});
        }
    }
    recharge.sendToNativeLoadEnd = sendToNativeLoadEnd;
})(recharge || (recharge = {}));
//# sourceMappingURL=RechargeModule.js.map