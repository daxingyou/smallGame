class MessageManager extends BaseClass{

	public constructor() {
		super();
	}
	public static inst():MessageManager{
		let _inst:MessageManager = this.single<MessageManager>();
		return _inst
	}
	/**
	 * Send custom events CustomEvt Registration in China
	 */
	public dispatch(event:string,param?:any):void{
		let customEvent:CustomEvt = new CustomEvt(event,param);
		StageUtils.inst().getStage().dispatchEvent(customEvent);
	}
	/**Registration event */
	public addListener(event:string,_cb:(evt:CustomEvt)=>void,_arg:any):void{
		StageUtils.inst().getStage().addEventListener(event,_cb,_arg);
	}
	
	/**Remove events */
	public removeListener(event:string,_cb,_arg):void{
		StageUtils.inst().getStage().removeEventListener(event,_cb,_arg);
	}
}
