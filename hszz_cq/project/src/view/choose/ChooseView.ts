class ChooseView extends BaseEuiView
{
	private role_img:eui.Image;
	private woman:eui.Image;
	private man:eui.Image;
	private effect:eui.Image;
	private start_btn:eui.Image;
	private touzi_btn:eui.Image;
	private role_name:eui.EditableText;
	private names:string[] = ["糖果仙女","电力猫咪","蜡笔小没良心","马尾姑娘","叮当不响","╭⌒浮生若夢","姐很高，也很傲","秋心飘雪","勿忘心安.","手心里的回忆","相见泪染妆",
	"嘴角、一丝笑","剩夏光年","旧约i","萌小姐i","梦中的梦","风吹辫辫飘","半度微风","和你遇见","独遗酒盏","扬州灯火","仙气胶囊","寻菡","零落","薇糖","梦之","清秀姑娘",
	"白凝","从蓉","丹琴","万物生长","醉笙情"];
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this, this.touchTap);
	}
	public close():void{
		this.removeTouchEvent(this, this.touchTap);
	}
	private init()
	{

	}
	private sex:number = 0;
	private touchTap(evt:CustomEvt)
	{
		switch(evt.target)
		{
			case this.man:
				this.effect.y = this.man.y;
				this.role_img.source = "man_role_png";
				egret.localStorage.setItem(LocalStorageEnum.ROLE_SEX, "0");
				this.sex = 0;
				break;
			case this.woman:
				this.effect.y = this.woman.y;
				this.role_img.source = "woman_role_png";
				egret.localStorage.setItem(LocalStorageEnum.ROLE_SEX, "1");
				this.sex = 1;
				break;
			case this.touzi_btn:
				this.role_name.text = this.names[Math.floor(Math.random()*this.names.length)];
				egret.localStorage.setItem(LocalStorageEnum.ROLE_NAME, this.role_name.text);
				break;
			case this.start_btn:
				if(this.role_name.text == "")
				{
					UserTips.inst().showTips("名字不能为空！");
				}else
				{
					GameApp.roleName = this.role_name.text;
					GameApp.sex = this.sex;
					ViewManager.inst().close(ChooseView);
					ViewManager.inst().open(GameMainView);
				}
				break;
		}
	}
}
ViewManager.inst().reg(ChooseView,LayerManager.UI_Main);