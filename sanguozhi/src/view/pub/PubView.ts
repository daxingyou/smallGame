/**
 * 招募 syy
 */
class PubView extends BaseEuiView{
	public person1:eui.Button;
    public person2:eui.Button;
    public person3:eui.Button;

    public group1:eui.Group;
    public group2:eui.Group;

    public return_btn:eui.Button;

    // public txt_top:eui.Label;
    private image_person:eui.Image;
    private ok_btn:eui.Button;
    private zhaomu_btn:eui.Button;


    public title:eui.Label;
    public select1:eui.Label;
    public select2:eui.Label;
    public select3:eui.Label;
    public select4:eui.Label;

    private select_1:eui.CheckBox;
    private select_2:eui.CheckBox;
    private select_3:eui.CheckBox;
    private select_4:eui.CheckBox;

    private rect1:eui.Rect;
    private rect2:eui.Rect;
    private rect3:eui.Rect;
    private rect4:eui.Rect;

    public select_num:number=0;
    private select:eui.Image;
    /*
    点击选项
    */ 
    public selecting:number=5;
    public person_num:number=0;
    /**
     * 回答问题的id
     * 
     * */ 
    public question_id:number=0;
    /**
     * 卡片需要的价格
     * */ 
    public wupin_money:number[]=[500,500,500];
    public money_label:eui.Label;
    public time_label:eui.Label;
    public answer_label:eui.Label;
    /*
    *点击是否可以作答
    */
    public btn_state:number=0;
    /**
     * 当前金币
     */
    public current_money:number=0;
    private pubGroup:eui.Group;
	public constructor() {
		super();
	}
    /**
     * 
     * 当前的毫秒数
     * */ 
    public getTime():number
    {
        return Date.now();
    }
    /**
    *修改角色图片
    *@param    num   显示图片id
    */ 
    private changeImage(num:number)
    {
        let id:number = num == 1?10000:num == 2?10001:10002;
        this.image_person.source=`model_${id}_png`;
    }
    /**
     * 设置数据
     * @param    num   显示数据id
     * 
     * **/ 
    private setData(num:number)
    {
        let obj=GlobalFun.getlocalStorage();
        let person=obj[`person`+num];
        this.answer_label.text=`( ${person["ti_Array"].length} / 6 )`;
        if(person["ti_Array"].length>=6)
        {
            this.group1.visible=false;
            this.group2.visible=true;
            // this.txt_top.visible=false;
            this.money_label.text=`${this.wupin_money[this.person_num-1]}`;
        }else
        {
            this.group2.visible=false;
            this.group1.visible=true;
            // this.txt_top.visible=true;
            if(this.getTime()>=((person["time"]+300))*1000||(person["time"]==0))
            {
                this.time_label.visible=false;
                for(let i=0;i<9;i++)
                {
                    if(person["ti_Array"].indexOf(i)==-1)
                    {
                        this.makeData(QuestionCfg.cfgs[`${num}`][i]);
                        this.question_id=i;
                        break;
                    }
                }
            }else
            {
                this.btn_state=this.person_num;
                this.time_label.visible=true;
                let time=(300*1000-(this.getTime()-person["time"]))/1000;
                let fen=Math.floor(time/60);
                let miao=Math.floor(time%60);
                if(miao>9)
                {
                    this.time_label.text=`冷却中:${fen}:${miao}`;
                }else
                {
                    this.time_label.text=`冷却中:${fen}:0${miao}`;
                }
                this.setWhhite()
                for(let i=0;i<9;i++)
                {
                    if(person["ti_Array"].indexOf(i)==-1)
                    {
                        this.makeData(QuestionCfg.cfgs[`${num}`][i]);
                        this.question_id=i;
                        break;
                    }
                }
                
            }
            
        }
    }
    /**
     * 设置时间
     * @param    num   id
     * 
     * **/ 
    public setTime(num:number)
    {
        let obj=GlobalFun.getlocalStorage();
        let person=obj[`person`+num];
        if(person["ti_Array"].length>=6)
        {
            
        }else
        {
            if(this.getTime()>=((person["time"]+300))*1000||(person["time"]==0))
            {
                this.time_label.visible=false;
            }else
            {
                this.time_label.visible=true;
                let time=(300*1000-(this.getTime()-person["time"]))/1000;
                let fen=Math.floor(time/60);
                let miao=Math.floor(time%60);
                
                if(miao>9)
                {
                    this.time_label.text=`冷却中:${fen}:${miao}`;
                }else
                {
                    this.time_label.text=`冷却中:${fen}:0${miao}`;
                }
                this.setWhhite()
                if(fen<=0&&miao<=0)
                {
                    obj[`person`+num]["time"]=0;
                    obj[`person`+num]["state"]=0;
                    this.btn_state=0;
                    GlobalFun.savelocalStorage(obj);
                }
            }
        }
        
    }
    private frameHandler()
    {
        this.setTime(this.person_num);
    }
    /**
     * 处理答题数据
     * @param    obj   数据对象
     * 
     * **/ 
    private makeData(obj:any)
    {
        this.title.text=obj["question"];
        this.select1.text=`A.${obj["selection"][0]}`;
        this.select2.text=`B.${obj["selection"][1]}`;
        this.select3.text=`C.${obj["selection"][2]}`;
        this.select4.text=`D.${obj["selection"][3]}`;
        this.select_num=obj["correct"];
    }
	public open(...param):void{
        if(GlobalFun.judgelocalStorage())
        {

        } else
        {
            let obj={};
            /**
             * 第一人数据
             * @param time 禁止答题的时间
             * @param state 打错题的次数
             * @param ti_Array 答完题存放的数组
             */
            obj["person1"]={};
            obj["person1"]["time"]=0;
            obj["person1"]["state"]=0;
            obj["person1"]["ti_Array"]=[];

            /**
             * 第二人数据
             * @param time 禁止答题的时间
             * *@param state 打错题的次数
             * @param ti_Array 答完题存放的数组
             */
            obj["person2"]={};
            obj["person2"]["time"]=0;
            obj["person2"]["state"]=0;
            obj["person2"]["ti_Array"]=[];
            /**
             * 第三人数据
             * @param time 禁止答题的时间
             * @param state 打错题的次数
             * @param ti_Array 答完题存放的数组
             */
            obj["person3"]={};
            obj["person3"]["time"]=0;
            obj["person3"]["state"]=0;
            obj["person3"]["ti_Array"]=[];
            GlobalFun.savelocalStorage(obj);
        }
        this.pubGroup["autoSize"]();
        this.pubGroup.verticalCenter = -600;
        egret.Tween.get(this.pubGroup).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
            egret.Tween.removeTweens(this.pubGroup);
        },this)
        this.person_num=1;
        this.changeImage(this.person_num);
        this.setData(this.person_num);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.frameHandler,this);
	}
    /**
     * 设置选项的状态为普通
     */
    public setWhhite()
    {
        for(let i:number = 1;i<=4;i++){
            this[`select_${i}`].selected = false;
        }
        this.select1.textColor=0XFFFFFf;
        this.select2.textColor=0XFFFFFf;
        this.select3.textColor=0XFFFFFf;
        this.select4.textColor=0XFFFFFf;
    }
    /**
     * 设置选项状态
     */
    public setColor(num:number)
    {
        this.selecting=num-1;
        for(let i=0;i<4;i++)
        {
            let label=<eui.Label>this.group1.getChildByName(`select${i+1}`);
            let checkbox:eui.CheckBox = this[`select_${i+1}`];
            if((i+1)==num)
            {
                checkbox.selected = true;
                // label.textColor=0XC91818;
            }else
            {
                checkbox.selected = false;
                // label.textColor=0XFFFFFF;
            }
        }
    }
    /**
     * 设置点击
     */
    public touchTapHandler(e:egret.TouchEvent)
    {
        switch(e.target)
        {
            case this.person1:
                this.selecting=5;
                this.setWhhite();
                this.person_num=1;
                this.select.x = this.person1.x - 5;
                this.select.y = this.person1.y - 5;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
            break;
            case this.person2:
                this.selecting=5;
                this.setWhhite();
                this.person_num=2;
                this.select.x = this.person2.x - 5;
                this.select.y = this.person2.y - 5;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
            
            break;
            case this.person3:
                this.selecting=5;
                this.setWhhite();
                this.select.x = this.person3.x - 5;
                this.select.y = this.person3.y - 5;
                this.person_num=3;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
            break;
            case this.ok_btn:
            if(this.selecting==5)
            {
                /**
                 * 请选择选项
                 * */ 
                UserTips.inst().showTips("请选择选项");
            }else
            {
                if(this.btn_state==this.person_num)
                {
                    UserTips.inst().showTips("当前不可作答");
                }else
                {
                    if(this.selecting==this.select_num)
                    {
                        this.setWhhite();
                        if(GlobalFun.judgelocalStorage())
                        {
                            UserTips.inst().showTips("回答正确");
                            let obj=GlobalFun.getlocalStorage();
                            obj[`person${this.person_num}`]["state"]=0;
                            obj[`person${this.person_num}`]["ti_Array"].push(this.question_id);
                            GlobalFun.savelocalStorage(obj);
                            this.setData(this.person_num);
                        }
                    }else
                    {
                        if(GlobalFun.judgelocalStorage())
                        {
                            
                            let obj=GlobalFun.getlocalStorage();

                            let state= obj[`person${this.person_num}`]["state"];
                            state++;
                            if(state>=2)
                            {
                                /**
                                 * 第二次机会
                                 * */ 
                                obj[`person${this.person_num}`]["state"]=2;
                                obj[`person${this.person_num}`]["time"]=this.getTime();
                                GlobalFun.savelocalStorage(obj);
                                this.setData(this.person_num);
                            }else
                            {
                                /**
                                 * 第一次机会
                                 * */ 
                                UserTips.inst().showTips("打错题，请再答");
                                this.setWhhite();
                                obj[`person${this.person_num}`]["state"]=1;
                                GlobalFun.savelocalStorage(obj);
                            }
                            
                        }
                    }
                }
                
            }
            break;
            case this.zhaomu_btn:
            if(GameApp.gold>=this.wupin_money[this.person_num-1])
            {
                UserTips.inst().showTips(`购买${this.person_num}`);
            }else
            {
                UserTips.inst().showTips("金币不够");
            }
            break;
            case this.rect1:
            this.setColor(1);
            break;
            case this.rect2:
            this.setColor(2);
            break;
            case this.rect3:
            this.setColor(3);
            break;
            case this.rect4:
            this.setColor(4);
            break;
            case this.return_btn:
            egret.Tween.get(this.pubGroup).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
                egret.Tween.removeTweens(this.pubGroup);
                ViewManager.inst().close(PubView);
            },this)
            
            break;
        }
    }
	public close():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.frameHandler,this);
	}
}
ViewManager.inst().reg(PubView,LayerManager.UI_Pop);