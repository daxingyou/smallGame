class ViewManager extends BaseClass{

	/**
	 * RegisteredUIinformation
	 */
	private _regesterInfo: any;
	public curscene:string;
	/**Displayeduientity */
	private _views:BaseEuiView[];
	public curView:string;
	public constructor() {
		super();
		this._regesterInfo = {};
		this._views = [];
	}
	public static inst():ViewManager{
		let _inst:ViewManager = this.single<ViewManager>();
		return _inst
	}
	/**Get whether the current interface is registered */
	private getKey(nameOrClass: any): string {
		let key: string = "";
		let keys = Object.keys(this._regesterInfo);
		for (let i: number = 0, len = keys.length; i < len; i++) {
			let tempKey: string = keys[i];
			if (this._regesterInfo[tempKey][0] == nameOrClass) {
				key = tempKey;
				break;
			}
		}
		return key;
	}
	/**Get whether the current interface exists */
	private isExistView(view:any):any{
		for(let i:number = 0;i<this._views.length;i++){
			if(this._views[i] instanceof view){
				return {view:this._views[i],index:i};
			}
		}
		return null;
	}
	/**
	 * Panel registration
	 * @param view Panel class
	 * @param layer Hierarchy
	 */
	public reg(viewClass: any, layer:eui.UILayer): void {
		if (viewClass == null) {
			return;
		}
		let keys: string = egret.getQualifiedClassName(viewClass);
		if (this._regesterInfo[keys]) {
			return;
		}
		this._regesterInfo[keys] = [viewClass, layer];
	}
	public open(nameOrClass: any, param: any[] = null,startEffect:boolean = false):void{
		let keys: string = this.getKey(nameOrClass);
		if(keys){
			
			//The current interface has been registered
			let info: any[] = this._regesterInfo[keys];
			let layer:eui.UILayer = info[1];
			if(layer == LayerManager.UI_Pop){
				GlobalFun.stopAnimateleaf();
			}
			let obj = this.isExistView(info[0]);
			let view: BaseEuiView = obj?obj.view:null;
			let index = obj?obj.index -1:0;
			if (view == null) {
				view = new info[0]();
				view.addToParent(info[1]);
				view.open.apply(view, param);
				this._views.push(view);
			}else{
				if(view.refreshPage){
					view.refreshPage.apply(view,param);
				}
			}
			let namestr = `${egret.getQualifiedClassName(nameOrClass)}`;
			if(namestr != "TipsView"){
				ViewManager.inst().curView = `${egret.getQualifiedClassName(nameOrClass)}`
			}
			if(startEffect){
				let curView:BaseEuiView = this._views[index];
				if(curView){
					curView.left = 0
					egret.Tween.get(curView).to({left:-100},500,egret.Ease.circOut).call(()=>{
						egret.Tween.removeTweens(curView);
					},this)
				}
				view.left = view.width;
				egret.Tween.get(view).to({left:0},500,egret.Ease.circOut).call(()=>{
					egret.Tween.removeTweens(view);
				},this)
			}
		}else{
			//The current interface is not registered
			console.log("The current interface is not registered----"+nameOrClass);
		}
	}
	public getView(nameOrClass: any): BaseEuiView {
		let keys: string = this.getKey(nameOrClass);
		let info: any[] = this._regesterInfo[keys];
		let obj = this.isExistView(info[0]);
		let view: BaseEuiView = obj?obj.view:null;
		// if (this._views[keys] instanceof Array)
		// 	return null;
		return view
	}
	public closeReturnEffect(nameOrClass:any,removed:boolean = false,_preView = null):void{
		let keys: string = this.getKey(nameOrClass);
		if(keys){
			let info: any[] = this._regesterInfo[keys];
			let obj = this.isExistView(info[0]);
			let index = obj?obj.index:0;
			let view: BaseEuiView = this._views[index];
			let preView:BaseEuiView = this._views[index-1];
			if(view){
				egret.Tween.get(view).to({left:view.width},500,egret.Ease.circOut).call(()=>{
					egret.Tween.removeTweens(view);
					if(removed){
						//This interface needs to be removed;
						this.close(nameOrClass);
					}
				},this)
			}
			if(_preView){
				let keys2: string = this.getKey(_preView);
				if(keys2){
					let info2: any[] = this._regesterInfo[keys2];
					let obj2 = this.isExistView(info2[0]);
					let index2 = -1;
					if(obj2)index2 = obj2.index;
					if(index2 != -1)preView = this._views[index2];
				}
			}
			if(preView){
				if(preView.refreshPage){
					preView.refreshPage();
				}
				egret.Tween.get(preView).to({left:0},500,egret.Ease.circOut).call(()=>{
					egret.Tween.removeTweens(preView);
				})
			}
		}
		
	}
	public close(nameOrClass: any):void{
		let keys: string = this.getKey(nameOrClass);
		if(keys){
			//The current interface has been registered
			let info: any[] = this._regesterInfo[keys];
			let layer:eui.UILayer = info[1];
			if(layer == LayerManager.UI_Pop){
				GlobalFun.showAnimateleaf();
			}
			let obj = this.isExistView(info[0]);
			if(!obj){return null}
			let index = obj?obj.index:0;
			let view: BaseEuiView = this._views[index];
			if (view == null) {
				return null;
			}else{
				this._views.splice(index,1)
				view.removeFromeParent();
			}

		}else{
			//The current interface is not registered
			console.log("The current interface is not registered----"+nameOrClass);
		}
	}
	
}