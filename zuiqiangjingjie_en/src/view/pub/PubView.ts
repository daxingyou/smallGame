/**
 * recruit syy
 */
class PubView extends BaseEuiView{
	public person1:eui.Button;
    public person2:eui.Button;
    public person3:eui.Button;

    public group1:eui.Group;
    public group2:eui.Group;
    private pos1:eui.Group;
    private pos2:eui.Group;
    private pos3:eui.Group;

    public return_btn:eui.Button;

    // public txt_top:eui.Label;
    // private image_person:eui.Image;
    private ok_btn:eui.Button;
    private zhaomu_btn:eui.Button;
    private zm_group:eui.Group;


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
    Click Options
    */ 
    public selecting:number=5;
    public person_num:number=0;
    /**
     * Answering questionsid
     * 
     * */ 
    public question_id:number=0;
    /**
     * Price required for card
     * */ 
    public wupin_money:number[]=[500,500,500];
    public money_label:eui.Label;
    public time_label:eui.Label;
    public answer_label:eui.Label;
    /*
    *Click to answer
    */
    public btn_state:number=0;
    /**
     * Current gold coins
     */
    public current_money:number=0;
    private pubGroup:eui.Group;
	public constructor() {
		super();
	}
    /**
     * 
     * Current milliseconds
     * */ 
    public getTime():number
    {
        return Date.now();
    }
    /**
    *Modify character picture
    *@param    num   display pictureid
    */ 
    private changeImage(num:number)
    {
        let id:number = num == 1?10000:num == 2?10001:10002;
        // this.image_person.source=`model_${id}_png`;
    }
    /**
     * Setting data
     * @param    num   Display dataid
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
            if(person["buy"] == 0)
            {
                this.zm_group.visible = true;
            }else if(person["buy"] == 1)
            {
                this.zm_group.visible = false;
            }
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
                    this.time_label.text=`In cooling:${fen}:${miao}`;
                }else
                {
                    this.time_label.text=`In cooling:${fen}:0${miao}`;
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
     * Setup time
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
                    this.time_label.text=`In cooling:${fen}:${miao}`;
                }else
                {
                    this.time_label.text=`In cooling:${fen}:0${miao}`;
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
     * Processing answer data
     * @param    obj   data object
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
             * First person data
             * @param time No time to answer questions
             * @param state Number of wrong questions
             * @param ti_Array Array of answers
             */
            obj["person1"]={};
            obj["person1"]["time"]=0;
            obj["person1"]["state"]=0;
            obj["person1"]["ti_Array"]=[];
            obj["person1"]["buy"]=0;

            /**
             * Second person data
             * @param time No time to answer questions
             * *@param state Number of wrong questions
             * @param ti_Array Array of answers
             */
            obj["person2"]={};
            obj["person2"]["time"]=0;
            obj["person2"]["state"]=0;
            obj["person2"]["ti_Array"]=[];
            obj["person2"]["buy"]=0;
            /**
             * Third party data
             * @param time No time to answer questions
             * @param state Number of wrong questions
             * @param ti_Array Array of answers
             */
            obj["person3"]={};
            obj["person3"]["time"]=0;
            obj["person3"]["state"]=0;
            obj["person3"]["ti_Array"]=[];
            obj["person3"]["buy"]=0;
            GlobalFun.savelocalStorage(obj);
        }
        this.pubGroup["autoSize"]();
        this.pubGroup.verticalCenter = -700;
        egret.Tween.get(this.pubGroup).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
            egret.Tween.removeTweens(this.pubGroup);
        },this)
        this.person_num=1;
        this.changeImage(this.person_num);
        this.setData(this.person_num);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.frameHandler,this);
        this.selecting=5;
        this.setWhhite();
        this.person_num=2;
        this.select.x = this.person2.x;
        this.select.y = this.person2.y + 3;
        this.changeImage(this.person_num);
        this.setData(this.person_num);
        this.roleMove(this.person2);
	}
    /**
     * Set the status of the option to normal
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
     * Set option status
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
     * Set Click
     */
    public touchTapHandler(e:egret.TouchEvent)
    {
        switch(e.target)
        {
            case this.person1:
                this.selecting=5;
                this.setWhhite();
                this.person_num=1;
                this.select.x = this.person1.x;
                this.select.y = this.person1.y + 3;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
                this.roleMove(this.person1);
            break;
            case this.person2:
                this.selecting=5;
                this.setWhhite();
                this.person_num=2;
                this.select.x = this.person2.x;
                this.select.y = this.person2.y + 3;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
                this.roleMove(this.person2);
            break;
            case this.person3:
                this.selecting=5;
                this.setWhhite();
                this.select.x = this.person3.x;
                this.select.y = this.person3.y + 3;
                this.person_num=3;
                this.changeImage(this.person_num);
                this.setData(this.person_num);
                this.roleMove(this.person3);
            break;
            case this.ok_btn:
            if(this.selecting==5)
            {
                /**
                 * Please select an option
                 * */ 
                UserTips.inst().showTips("Please select an option");
            }else
            {
                if(this.btn_state==this.person_num)
                {
                    UserTips.inst().showTips("No answer at present");
                }else
                {
                    if(this.selecting==this.select_num)
                    {
                        this.setWhhite();
                        if(GlobalFun.judgelocalStorage())
                        {
                            UserTips.inst().showTips("Correct answer");
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
                                 * Second chance
                                 * */ 
                                obj[`person${this.person_num}`]["state"]=2;
                                obj[`person${this.person_num}`]["time"]=this.getTime();
                                GlobalFun.savelocalStorage(obj);
                                this.setData(this.person_num);
                            }else
                            {
                                /**
                                 * First chance
                                 * */ 
                                UserTips.inst().showTips("Answering questions，Please reply again.");
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
            let obj=GlobalFun.getlocalStorage();
            if(GameApp.gold>=this.wupin_money[this.person_num-1])
            {
                GameApp.gold -= this.wupin_money[this.person_num-1];
                UserTips.inst().showTips(`Successful recruitment`);
                obj[`person`+this.person_num]["buy"] = 1;
                this.zm_group.visible = false;
                let role_id;
                if(this.person_num == 1)
                {
                    role_id = 10000;
                }else if(this.person_num == 2)
                {
                    role_id = 10001;
                }else if(this.person_num == 3)
                {
                    role_id = 10002;
                }
                let card:CardAttrVo = GlobalFun.getCardDataFromId(role_id);
                card.ownNum = 1;
                GlobalFun.refreshCardData(role_id, {ownNum:card.ownNum});
            }else
            {
                UserTips.inst().showTips("Insufficient gold");
                obj[`person`+this.person_num]["buy"] = 0;
            }
            GlobalFun.savelocalStorage(obj);
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
            egret.Tween.get(this.pubGroup).to({verticalCenter:-700},600,egret.Ease.circOut).call(()=>{
                egret.Tween.removeTweens(this.pubGroup);
                ViewManager.inst().close(PubView);
            },this)
            
            break;
        }
    }
    private roleMove(btn:eui.Button)
    {
        for(let i = 1; i <= 3; i++)
        {
            if(this["person" + i].x == this.pos2.x)
            {
                if(btn == this["person" + i])
                {
                    return;
                }else
                {
                    egret.Tween.get(btn)
                    .to({x:this.pos2.x, scaleX:1, scaleY:1}, 300)
                    .call(()=>{
                        btn.currentState = "down";
                        this.pubGroup.addChild(btn);
                        egret.Tween.removeTweens(btn);
                    }, this);
                    egret.Tween.get(this["person" + i])
                    .to({x:btn.x, scaleX:0.6, scaleY:0.6}, 300)
                    .call(()=>{
                        this["person" + i].currentState = "up";
                    }, this)
                }
            }
        }
    }
	public close():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.frameHandler,this);
	}
}
ViewManager.inst().reg(PubView,LayerManager.UI_Pop);