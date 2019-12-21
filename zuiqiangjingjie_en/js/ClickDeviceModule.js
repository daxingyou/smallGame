
/**
 * 点击设备后的侦听返回
 * 
 * egret.js EventDispatcher.prototype.$notifyListener
 * let namestr = `${egret.getQualifiedClassName(eventBin.thisObject)}`
	if(event.type == egret.TouchEvent.TOUCH_TAP ){
		let sceneName = namestr;
		window.clickDevice(event,sceneName)
	}
 */
function ajax_method(url,data,method,success) {
    // 异步对象
    var ajax = new XMLHttpRequest();

    // get 跟post  需要分别写不同的代码
    if (method=='get') {
        // get请求
        if (data) {
            // 如果有值
            url+='?';
            url+=data;
        }else{

        }
        // 设置 方法 以及 url
        ajax.open(method,url);

        // send即可
        ajax.send();
    }else{
        // post请求
        // post请求 url 是不需要改变
        ajax.open(method,url);

        // ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        if (data) {
            // 如果有值 从send发送
            ajax.send(data);
        }else{
            ajax.send();
        }
    }

    // 注册事件
    ajax.onreadystatechange = function () {
        // 在事件中 获取数据 并修改界面显示
        if (ajax.readyState==4&&ajax.status==200) {
            // console.log(ajax.responseText);

            // 将 数据 让 外面可以使用
            // return ajax.responseText;

            // 当 onreadystatechange 调用时 说明 数据回来了
            // ajax.responseText;

            // 如果说 外面可以传入一个 function 作为参数 success
            success(ajax.responseText);
        }
    }

}
let curClick= {};
window.clickDevice = function(param,sceneName){
	if(!Object.keys(curClick).length){
		curClick["x"] = param["stageX"];
		curClick["y"] = param["stageY"];
	}else{
		if(curClick.x == param["stageX"] && curClick.y == param["stageY"]){
			return;
		}else{
			curClick["x"] = param["stageX"];
			curClick["y"] = param["stageY"];
		}
	}
	if(param){
		let format = new TransFormat();
		if(param.target){
			format.clickLocalPoint = "x:"+parseInt(param.localX)+"|y:"+parseInt(param.localY);
			format.clickStagePoint = "x:"+parseInt(param.stageX)+"|y:"+parseInt(param.stageY);
		}
		format.sceneName = sceneName;
		format.timespan = new Date().getTime()
		let deviceIdstr = localStorage.getItem('KUchar');
		format.deviceId = deviceIdstr?deviceIdstr:"";
		let packagestr = localStorage.getItem('KDchar');
		format.package = packagestr?packagestr:"";
		format.clickTarget = `${egret.getQualifiedClassName(param.target)}`;
		let timeout = setTimeout(function(data) {
			curClick = {};
			clearTimeout(timeout);
			//间隔一秒 发送给服务器
			ajax_method('http://back.h5.h5youyou.com/location/apphlc',JSON.stringify(data),'post',(responseText)=>{
				console.log(responseText)
			})
		}, 1000,format);
	}
}

/**传输的数据类型 */
let TransFormat = function(){
	/**触摸点的本地坐标 */
	this.clickLocalPoint = '';
	/**触摸点的舞台坐标 */
	this.clickStagePoint = '';
	/**当前点击的对象 */
	this.clickTarget = null;
	/**当前所在的页面场景（路由界面） */
	this.sceneName = "";
	/**当前点击的时间戳 */
	this.timespan = 0;
	/**package当前包名 */
	this.package = "";
	/**deviceId设备唯一码 */
	this.deviceId = "";
}
