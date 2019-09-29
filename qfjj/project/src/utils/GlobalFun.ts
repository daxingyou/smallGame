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
    private static _cb:()=>void;
    private static _arg:any;
	/**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
	public static shakeObj(target: egret.DisplayObject,time: number,rate: number,maxDis: number,cb?:()=>void,arg?:any):void{
		this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        this.timer.delay = 1000/rate;
        this.timer.repeatCount = this.count;
        if(cb){
            this._cb = cb;
        }
        if(arg){
            this._arg = arg;
        }
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
        if(this._cb && this._arg){
            this._cb.call(this._arg);
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
    public static sendToNativePhurse(_data:{goodid:number,goodname:number,goodtype:number,price:number}):void{
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
    /**
     * 获取克制关系 判断返回是否可以攻击 true可以攻击 。false 不可以攻击
     * 
     * initiativeCardAttr 主动的卡牌数据
     * passiveCardAttr 。  被动的卡牌数据
     * */
    public static isAtk(initiativeCardAttr:CardAttr,passiveCardAttr:CardAttr):boolean{
        let type1:number = initiativeCardAttr.type;
        let type2:number = passiveCardAttr.type;
        //判断锁定的目标是否可以攻击
        let atrBoo1:boolean = false;
        //处理2个特殊的边界值
        if(type1 == AttrEnum.S){
            //如果当前主动攻击方是s 遇到了f 会克制s 不可已攻击 
            atrBoo1 = !(type2 == AttrEnum.F);
        }else if(type1 == AttrEnum.F){
            //如果当前是F 处于最底层 。只有S 和 F 可以进行攻击
            atrBoo1 = (type2 == AttrEnum.S || type2 == AttrEnum.F)
        }else{
            // 获取2个卡牌类型 在关系集合中的 索引 。等级越高的卡牌 索引越大
            let index1:number = GameApp.realtionShip.indexOf(type1);
            let index2:number = GameApp.realtionShip.indexOf(type2);
            atrBoo1 = index1 >= index2;
        }
        return atrBoo1;
    }
    /**获取属性值对应的字符 */
    public static getChar(attrType:number):string{
        let str:string = "";
        switch(attrType){
            case AttrEnum.A:
                str = "A";
                break;
            case AttrEnum.B:
                str = "B";
                break;
            case AttrEnum.C:
                str = "C";
                break;
            case AttrEnum.D:
                str = "D";
                break;
            case AttrEnum.E:
                str = "E";
                break;
            case AttrEnum.F:
                str = "F";
                break;
            case AttrEnum.S:
                str = "S";
                break;
        }
        return str;
    }
    /**
     * 创建技能特效显示
     * @param id 技能id
     * @param parent 父级容器
     * @param loopCount 循环次数
     * @param pos 位置
     * */
    public static createSkillEff(camp:number,id:number,parent:egret.DisplayObjectContainer,loopCount:number,pos:XY):void{
        // let skillCfg:any = SkillCfg.skillCfg[camp];
        let skillCfg:any
        let curUseSkill:any;
        let loop:boolean = true;

        // if(id == 100001 || id == 100002 || id == 100003 || id == 100004){
        //     loop = true;
        // }
        for(let key in skillCfg){
            if(skillCfg[key].skillId == id){
                curUseSkill = skillCfg[key];
                break;
            }
        }

        let textInfo:eui.Label =new eui.Label();
        textInfo.size = 20;
		textInfo.scaleX = textInfo.scaleY = 1.5;
		textInfo.textColor = 0xffffff
		parent.addChild(textInfo);
        textInfo.x = pos.x - 70;
        textInfo.y = pos.y - 150;
        textInfo.text = curUseSkill.skillName;
        egret.Tween.get(textInfo).to({scaleX:1,scaleY:1},600,egret.Ease.circOut).wait(500).call(()=>{
			egret.Tween.removeTweens(textInfo);
			if(textInfo && textInfo.parent){
				textInfo.parent.removeChild(textInfo);
			}
			textInfo = null;
		},this)

        if(loop){
            let count = 1;
            let minx:number = 100;
            let maxx:number = StageUtils.inst().getWidth() - 100;
            let miny:number = 100;
            let maxy:number = StageUtils.inst().getHeight() - 100;;
            let mc:MovieClip = new MovieClip();
            mc.scaleX = mc.scaleY = 1;
            parent.addChild(mc);
            mc.playFile(`${SKILL_EFF}${curUseSkill.roleSkill}`,loopCount,null,true);
            mc.x = (Math.random()*(maxx - minx)+minx)>>0;
            mc.y = (Math.random()*(maxy - miny)+miny)>>0;
            let interVal = setInterval(()=>{
                count += 1;
                let mc:MovieClip = new MovieClip();
                mc.scaleX = mc.scaleY = 0.7;
                parent.addChild(mc);
                mc.playFile(`${SKILL_EFF}${curUseSkill.roleSkill}`,loopCount,null,true);
                mc.x = (Math.random()*(maxx - minx)+minx)>>0;
                mc.y = (Math.random()*(maxy - miny)+miny)>>0;
                if(count >= 15){
                    clearInterval(interVal);
                }
            },100)
        }else{
            let mc:MovieClip = new MovieClip();
            mc.scaleX = mc.scaleY = 1;
            parent.addChild(mc);
            mc.playFile(`${SKILL_EFF}${curUseSkill.roleSkill}`,loopCount,null,true);
            mc.x = pos.x;
            mc.y = pos.y;
        }
    }
    /**结算后更改关卡数据 */
    public static setLevelDate()
    {
        if(LevelCfg.gq == 6)
        {
            LevelCfg.gq = 1;
            LevelCfg.gq_max = 1;
            if(LevelCfg.chapter >= 5)
            {
                return;
            }
            LevelCfg.chapter++;
            LevelCfg.levelCfgs[LevelCfg.chapter - 1].state = 1;
            LevelCfg.levelCfgs[LevelCfg.chapter - 1].gq[LevelCfg.gq - 1].state = 1;
            MessageManager.inst().dispatch("UPDATE_CHAPTER", this);
        }else
        {
            LevelCfg.gq++;
            LevelCfg.levelCfgs[LevelCfg.chapter - 1].gq[LevelCfg.gq - 1].state = 1;
        }
        /**共开启的章节和关卡数量 */
        if(LevelCfg.gq >= LevelCfg.gq_max)
        {
            LevelCfg.gq_max = LevelCfg.gq;
        }
        if(LevelCfg.chapter >= LevelCfg.chapter_max)
        {
            LevelCfg.chapter_max = LevelCfg.chapter;
        }
        egret.localStorage.setItem("chapter_max", "" + LevelCfg.chapter_max);
        egret.localStorage.setItem("gq_max", "" + LevelCfg.gq_max);
    }
}
