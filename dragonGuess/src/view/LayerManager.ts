class LayerManager extends BaseClass{

	public static readonly UI_Main:eui.UILayer = new eui.UILayer();

	public static readonly UI_Pop:eui.UILayer = new eui.UILayer();
	

	public iniaizlize(p:egret.DisplayObjectContainer):void{
		p.addChild(LayerManager.UI_Main);
		LayerManager.UI_Main.touchThrough = true;
		p.addChild(LayerManager.UI_Pop);
		LayerManager.UI_Pop.touchThrough = true;
	}
}