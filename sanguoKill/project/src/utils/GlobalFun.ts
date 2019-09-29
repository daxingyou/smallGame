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
    public static getTestRoleData():HeroAttr[]{
        let ownarr:HeroAttr[] = [];
		for(let i:number = 0;i<3;i++){
			let item:HeroAttr = {
				icon:"role_"+i+"_png",
				level:1,
				weaponId:10000,
				protectedId:10019,
				horseAtkId:10025,
				horseProtId:0,
				attr:{
					hp:220+(i*30),agile:20+(i*3),atk:26+(i*3),hit:15+(i*3),protected:22+(i*3),crit:(10+(i*3))
				}
			}
			ownarr.push(item);
		}
        return ownarr;
    }
    public static getEnemyTestData():HeroAttr[]{
        let enemyArr:HeroAttr[] = [];
		for(let j:number = 0;j<3;j++){
			let item:HeroAttr = {
				icon:"level_1_"+j+"_png",
				level:1,
				weaponId:0,
				protectedId:0,
				horseAtkId:0,
				horseProtId:0,
				attr:{
					hp:180+(j*30),agile:15+(j*3),atk:16+(j*3),hit:18+(j*3),protected:17+(j*3),crit:(7+(j*3))
				}
			}
			enemyArr.push(item);
		}
        return enemyArr;
    }

    /**获取背包数据 0武器 1防具 2锦囊 3进攻马 4防御马*/
    public static getBagData(id:number):any[]
    {
        var any_0:any[] = [];
        var any_1:any[] = [];
        var any_2:any[] = [];
        var any_3:any[] = [];
        var any_4:any[] = [];

        for(let i = 0; i < ItemCfg.bagCfg.length; i++)
        {
            if(ItemCfg.bagCfg[i] == null)
                continue;
            if(ItemCfg.bagCfg[i].type == ItemType.weapon)
            {
                any_0.push(ItemCfg.bagCfg[i]);
            }
            else if(ItemCfg.bagCfg[i].type == ItemType.protection)
            {
                any_1.push(ItemCfg.bagCfg[i]);
            }
            else if(ItemCfg.bagCfg[i].type == ItemType.prop)
            {
                any_2.push(ItemCfg.bagCfg[i]);
            }
            else if(ItemCfg.bagCfg[i].type == ItemType.weapon_ma)
            {
                any_3.push(ItemCfg.bagCfg[i]);
            }
            else if(ItemCfg.bagCfg[i].type == ItemType.protection_ma)
            {
                any_4.push(ItemCfg.bagCfg[i]);
            }
        }

        if(id == 0)
            return any_0;
        else if(id == 1)
            return any_1;
        else if(id == 2)
            return any_2;
        else if(id == 3)
            return any_3;
        else if(id == 4)
            return any_4;
    }
    /**更改数据 */
    public static setBagData(id:number)
    {
        for(let i = 0; i < ItemCfg.bagCfg.length; i ++)
        {
            if(ItemCfg.bagCfg[i].instId == id)
            {
                ItemCfg.bagCfg[i] = null;
                break;
            }
        }

        for(let i=0;i< ItemCfg.bagCfg.length;i++){
            var tem:any;
            for(let j=i+1;j< ItemCfg.bagCfg.length;j++){
                if(ItemCfg.bagCfg[i] == null && ItemCfg.bagCfg[j] != null)
                {
                    tem = ItemCfg.bagCfg[j];
                    ItemCfg.bagCfg[j] = ItemCfg.bagCfg[i]
                    ItemCfg.bagCfg[i] = tem;
                }
            }
        }
        GlobalFun.setBagList();
    }
    /**更换装备 any0背包里的装备 any1武将身上的装备 */
    public static change(any0:any,any1:any)
    {
        ItemCfg.bagCfg[ItemCfg.bagCfg.indexOf(any0)] = any1;
        GlobalFun.setBagList();
    }
    /**本地存储背包列表 */
    public static setBagList()
    {
        egret.localStorage.setItem("baglength", (ItemCfg.bagCfg.length - 10) + "");
        var card_length:number = 0;
        for(let i = 0; i < ItemCfg.bagCfg.length; i++)
        {
            if(ItemCfg.bagCfg[i] != null)
            {
                card_length++;
                egret.localStorage.setItem("bagid" + i, ItemCfg.bagCfg[i].instId + "");
            }
        }
        egret.localStorage.setItem("card_length" , card_length + "");
    }
    /**过去本地背包列表 */
    public static getBagList()
    {
        var length:number = 0;
        if(egret.localStorage.getItem("baglength"))
            length = parseInt(egret.localStorage.getItem("baglength"));
        if(length > 0)
        {
            ItemCfg.bagCfg = [];
            for(let i = 0; i < length + 10; i++)
            {
                ItemCfg.bagCfg.push(null);
            }
        }
        var card_length = 0;
        if(egret.localStorage.getItem("card_length"))
            card_length = parseInt(egret.localStorage.getItem("card_length"));
        if(card_length > 0)
        {
            for(let j = 0; j < card_length; j++)
            {
                for(let i = 0; i < ItemCfg.itemCfg.length; i++)
                {
                    var id = parseInt(egret.localStorage.getItem("bagid" + j));
                    if(id == ItemCfg.itemCfg[i].instId)
                    {
                        ItemCfg.bagCfg[j] = ItemCfg.itemCfg[i];
                        break;
                    }
                }
            }
        }
    }
    /**在背包更换装备 */
    public static changeEquip( data:any , roleID:number ):any {
		let value = null;
        let id = 0;
		for( let i = 0 ; i < UpgradeCfg.ins.roleEquip[ roleID ].length ; i ++ ) {
			if( data.type == UpgradeCfg.ins.roleEquip[ roleID ][i].type ) {
				value = UpgradeCfg.ins.roleEquip[ roleID ][i];
				UpgradeCfg.ins.roleEquip[ roleID ].splice( i , 1 );
				UpgradeCfg.ins.roleEquip[ roleID ].push( data );
				// i --;
			}
		}
        switch( data.type ) {
            case ItemType.weapon:
                UpgradeCfg.ins.roleData[ roleID ].weaponId = data.instId;
                break;
            case ItemType.protection:
                UpgradeCfg.ins.roleData[ roleID ].protectedId = data.instId;
                break;
            case ItemType.weapon_ma:
                UpgradeCfg.ins.roleData[ roleID ].horseAtkId = data.instId;
                break;
            case ItemType.protection_ma:
                UpgradeCfg.ins.roleData[ roleID ].horseProtId = data.instId;
                break;
        }
		return value;
	}

}
