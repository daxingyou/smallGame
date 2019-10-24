/**
 * 共用方法
 */
class GlobalFun {
	public constructor() {
	}
    
	public static getOption(key:string):string {
        if (window.location) {
            let search = location.search;
            if (search == "") {
                return "";
            }
            search = search.slice(1);
            let searchArr = search.split("&");
            let length = searchArr.length;
            for (let i:number = 0; i < length; i++) {
                let str = searchArr[i];
                let arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    } 
	private static initX:number;                //初始位置
    private static initY: number;  
    private static target:egret.DisplayObject;  //震动目标
    private static maxDis: number;              //震动距离
    private static count: number = 0;           //计时器次数
    private static rate: number;                //一秒震动次数
    private static timer:egret.Timer = new egret.Timer(1000);
	/**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
	public static shakeObj(target: egret.DisplayObject,time: number,rate: number,maxDis: number):void{
		this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        this.timer.delay = 1000/rate;
        this.timer.repeatCount = this.count;
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.shaking, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        this.timer.reset();
        this.timer.start();
	}
	private static shaking(): void {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random()*this.maxDis*2;
        this.target.y = this.initY - this.maxDis +  Math.random()*this.maxDis*2;
        egret.Tween.get(this.target).to({x:this.initX, y:this.initY},999/this.rate);    
    }
     
    private static shakeComplete(): void {
        if(this.target){
            egret.Tween.removeTweens(this.target);
            this.target.x = this.initX;
            this.target.y = this.initY;
        }
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.shaking,this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.shakeComplete,this);
    }
	/**停止震动 */
    public static stop(){
        this.shakeComplete();
    }
    public static filterToGrey(tar:egret.DisplayObject):void{
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    }
    public static skillBuffFilter(buffid,tar){
        var colorMatrix = [];
        switch(buffid){
            case 10000:
                //紫色 --狂暴
                colorMatrix = [
                    1,0,0,0,196,
                    0,1,0,0,64,
                    0,0,1,0,201,
                    0,0,0,1,0
                ]
                break;
            case 10001:
                //智谋-- 绿色
                colorMatrix = [
                    1,0,0,0,102,
                    0,1,0,0,158,
                    0,0,1,0,39,
                    0,0,0,1,0
                ]
                break;
            case 10002:
                //防御--黄色
                colorMatrix = [
                    1,0,0,0,155,
                    0,1,0,0,128,
                    0,0,1,0,26,
                    0,0,0,1,0
                ]
                break;
        }
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    }
    public static clearFilters(tar:egret.DisplayObject):void{
        tar.filters = [];
    }
    /**发送到ios请求购买 */
    public static sendToNativePhurse(_data:{goodid:number,goodnum:number,goodtype:number,price:number}):void{
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.payGood)
        {
            window["webkit"].messageHandlers.payGood.postMessage(JSON.stringify(_data));
        }
    }
    /**发送ios加载完成 */
    public static sendToNativeLoadEnd():void{
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.loadingFinish)
        {
            window["webkit"].messageHandlers.loadingFinish.postMessage({});
        }
    }
    /**购买返回 */
    public static payCallBack(_cb):void{
        GameApp.pay_cbDdata = _cb;
    }
    /**增加背包物品 */
    public static addItemToBag(itemId:number,num:number):void{
        let bagDataStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        let itemCfg:any = ItemCfg.itemCfg[itemId];
        if(bagDataStr){
            let bagData:any[] = JSON.parse(bagDataStr);
            let isame:boolean = false;
            for(let i:number = 0;i<bagData.length;i++){
                if(bagData[i].id == itemId){
                    isame = true;
                    bagData[i].num += num;
                    break;
                }
            }
            if(!isame){
                bagData.push({id:itemId,num:num,type:itemCfg.type});
            }
            egret.localStorage.setItem(LocalStorageEnum.ROLE_BAG,JSON.stringify(bagData));
        }else{
            let obj:any = {id:itemId,num:num,type:itemCfg.type};
            egret.localStorage.setItem(LocalStorageEnum.ROLE_BAG,JSON.stringify([obj]));
        }
    }
    /**移除背包物品 */
    public static removeItemFromBag(itemId:number,num:number):void{
        let bagDataStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        if(bagDataStr){
            let bagData:any[] = JSON.parse(bagDataStr);
            for(let i:number = 0;i<bagData.length;i++){
                if(bagData[i].id == itemId){
                    bagData[i].num -= num;
                    if(bagData[i].num <= 0){
                        bagData.splice(i,1);
                    }
                    break;
                }
            }
           
            egret.localStorage.setItem(LocalStorageEnum.ROLE_BAG,JSON.stringify(bagData));
        }
    }
    /**获取背包item数量 */
    public static getItemNumFromBag(itemId:number):number{
        let bagDataStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        if(bagDataStr){
            let bagData:any[] = JSON.parse(bagDataStr);
            for(let i:number = 0;i<bagData.length;i++){
                if(bagData[i].id == itemId){
                   return  bagData[i].num
                }
            }
            return 0
        }else{
            return 0
        }
    }
    /**获取合成材料 0为合成材料 。1为卷轴 2位碎片*/
    public static getMetarisFromBag(type):any[]{
        let arr:any[] = [];
        let bagDataStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        if(bagDataStr){
            let bagData:any[] = JSON.parse(bagDataStr);
            for(let i:number = 0;i<bagData.length;i++){
                if(bagData[i].type == type){
                   //当前是合成材料
                   arr.push(bagData[i])
                }
            }
        }
        return arr;
    }
    /**碎片增加 */
    public static addSuiPian(index,num):void{
        let datastr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA) ;
	    let roleInfoData:RoleInfoVo[] = JSON.parse(datastr);
        roleInfoData[index+1].o_suipian += num;
        if(roleInfoData[index+1].o_suipian >= roleInfoData[index+1].t_suipian){
            //已经解锁
            roleInfoData[index+1].isUnlock = true;
        }
        egret.localStorage.setItem(LocalStorageEnum.ROLE_DATA,JSON.stringify(roleInfoData));
        MessageManager.inst().dispatch(CustomEvt.ADD_SHIELD,{index:index});
    }
}
