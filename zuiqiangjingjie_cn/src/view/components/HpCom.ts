class HpCom extends eui.Component{
	private flag:eui.Image;
	private nameLab:eui.Label;
	private proMask:eui.Rect;
	private hpBar:eui.Image;
	private 
	public constructor() {
		super();
		this.skinName = "HpComSkin"
	}
	protected childrenCreated():void{
		this.hpBar.mask = this.proMask
	}
	public initData(flag:string,namestr:string):void{
		this.nameLab.text = namestr;
		this.flag.source = flag;
	}
	public setData(c:number,v:number):void{
		let curW:number = c/v*127;
		this.proMask.width = curW;
	}
}