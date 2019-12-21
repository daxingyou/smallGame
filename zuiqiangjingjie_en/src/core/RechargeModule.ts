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
namespace recharge{
    let _cb:(num)=>void;
    let _arg:any;
    /**Purchase callback return */
    function payCallBack(param):void{
        if(_cb && _arg){
            _cb.call(_arg,param);
        }
    }
    /**Send toiosRequest for purchase */
    export function sendToNativePhurse(_data:IpayParam,cb:(num)=>void,arg:any):void{
        window["callBack"] = payCallBack;
        _cb = cb;
        _arg = arg;
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.funciap)
        {
            window["webkit"].messageHandlers.funciap.postMessage(_data);
        }
    }
    /**Send outiosLoad complete */
    export function sendToNativeLoadEnd():void{
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.loadingFinish)
        {
            window["webkit"].messageHandlers.loadingFinish.postMessage({});
        }
    }
}
interface IpayParam{
    Key1:string;
    Key2?:string;
    Key3?:string;
    key4?:string;
}