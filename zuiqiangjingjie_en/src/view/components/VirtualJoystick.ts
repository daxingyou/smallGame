/**
 * Virtual rocker
 * @author chenkai
 * @since 2017/5/4
 */
class VirtualJoystick extends eui.Component{
	private ball:eui.Image;          //ring
	private circle:eui.Image;        //Pellet
	private circleRadius:number = 0; //Radius of circle
	private ballRadius:number = 0;   //Ball radius
	private centerX:number = 0;      //Center point coordinates
	private centerY:number = 0;
	private touchID:number;          //touchID
	public constructor() {
		super();
		this.skinName = "VirtualJoystickSkin";
	}

	public childrenCreated(){
		//Get circle and sphere radius
		this.circle.width = this.circle.height = 141;
		this.ball.width = this.ball.height = 42;
		this.circleRadius = this.circle.height/2;
		this.ballRadius = this.ball.height/2;
		//Get center point
		this.centerX = this.circleRadius;
		this.centerY = this.circleRadius;
		//Setting anchor points
		this.ball.anchorOffsetX = this.ballRadius;
		this.ball.anchorOffsetY = this.ballRadius;
		//Set the ball's initial position
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
	}

	//Start virtual rocker 
	public start(){
		this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
	}

	//Stop virtual rocker
	public stop(){
		this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
	}

	//Touch start，Show virtual rocker
	private onTouchBegin(e:egret.TouchEvent){
		// if(this.parent){
		// 	return;
		// }
		this.touchID = e.touchPointID;
		this.x = e.stageX;
		this.y = e.stageY;
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
		// GameConst.stage.addChild(this);

		this.dispatchEvent(new VJEvent(VJEvent.VJ_START));
	}

	//End of touch，Hide virtual rocker
	private onTouchEnd(e:egret.TouchEvent){
		if(this.touchID != e.touchPointID){
			return;
		}
		this.touchID = null;
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
		// this.hide();
		this.dispatchEvent(new VJEvent(VJEvent.VJ_END));
	}
	//Touch Mobile，Set the position of the ball
	private p1:egret.Point = new egret.Point();
	private p2:egret.Point = new egret.Point();
	private onTouchMove(e:egret.TouchEvent){
		if(this.touchID != e.touchPointID){
			return;
		}
		let stageP:egret.Point = this.localToGlobal(this.centerX,this.centerY);
		//Get the distance between finger and virtual rocker
		// this.p1.x = this.x;
		// this.p1.y = this.y;
		this.p2.x = e.stageX;
		this.p2.y = e.stageY;
		var dist = egret.Point.distance(stageP, this.p2);
		var angle:number = Math.atan2(e.stageY - stageP.y, e.stageX - stageP.x)
		//Finger distance within the circle
		if(dist <= (this.circleRadius - this.ballRadius)){
			let point:egret.Point = this.globalToLocal(e.stageX,e.stageY);
			// this.ball.x = this.centerX + e.stageX - this.x;
			// this.ball.y = this.centerY + e.stageY - this.y;
			this.ball.x = point.x
			this.ball.y = point.y
		//Finger distance outside the circle
		}else{
			this.ball.x = Math.cos(angle)*(this.circleRadius - this.ballRadius) + this.centerX;
			this.ball.y = Math.sin(angle)*(this.circleRadius - this.ballRadius) + this.centerY;
		}
		//Distribution events
		this.dispatchEvent(new VJEvent(VJEvent.VJ_MOVE,false,angle))
	}

	private hide(){
		this.parent && this.parent.removeChild(this);
	}
}
namespace VJ_EVENT{
	
}