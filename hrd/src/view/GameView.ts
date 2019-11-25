class GameView extends BaseEuiView{

	public cardGroup:eui.Group;
	private cnt:string = "两个黄鹂鸣翠柳,一行白鹭上青天";
	private vritualGrid:{x:number,y:number,occupied:number}[] = [];
	private winLab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		let percentw:number = StageUtils.inst().getWidth()/1136;
		this.cardGroup.scaleX = this.cardGroup.scaleY = percentw;
		let arr:string[] = this.cnt.split('');
		arr.sort(this.randomsort)

		for(let i:number = 0;i<4;i++){
			//行
			for(let j:number = 0;j<4;j++){
				// 列 
				let index:number = i*4+j;
				let obj:{x:number,y:number,occupied:number} = {x:j*(100+10),y:i*(100+10),occupied:-1}
				if(i >= 3 && j >= 3){
					this.vritualGrid.push(obj);
					continue;
				}
				let sp:eui.Group = this.createGrid(arr[index],this.cnt.indexOf(arr[index]));
				sp.x = obj.x
				sp.y = obj.y;
				obj.occupied = parseInt(sp.name);
				this.vritualGrid.push(obj);
			}
		}
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancle,this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCancle,this);
	}
	private beginPoint:egret.Point;
	private onBegin(evt:egret.TouchEvent):void{
		if(!this.beginPoint){
			this.beginPoint = new egret.Point();
			this.beginPoint.x = evt.stageX;
			this.beginPoint.y = evt.stageY;
		}
	}
	private onEnd(evt:egret.TouchEvent):void{
		if(this.beginPoint){
			let direct:number = this.judgeDirection({x:evt.stageX,y:evt.stageY});
			//获取 -1 格子周围的格子;
			for(let i:number = 0;i<this.vritualGrid.length;i++){
				if(this.vritualGrid[i].occupied == -1){
					let emptyGrid:{x:number,y:number,occupied:number} = this.vritualGrid[i];
					let index = i;
					let grid:{x:number,y:number,occupied:number} = this.judgeIfExistGrid(emptyGrid,direct);
					if(grid){
						console.log(grid);
						//要移动的格子的当前位置;
						let xx:number = grid.x;
						let yy:number = grid.y;
						let sp:eui.Group = this.cardGroup.getChildByName(grid.occupied.toString()) as eui.Group;
						if(sp){
							sp.x = emptyGrid.x;
							sp.y = emptyGrid.y;
							grid.x = emptyGrid.x;
							grid.y = emptyGrid.y;
							emptyGrid.x = xx;
							emptyGrid.y = yy;
							for(let j:number = 0;j<this.vritualGrid.length;j++){
								if(this.vritualGrid[j].occupied == grid.occupied){
									this.vritualGrid[i] = grid;
									this.vritualGrid[j] = emptyGrid;
									break;
								}
							}
							//交换集合中的位子
							this.judgeResult();
						}
					}else{
						console.log("当前移动方向不存在格子")
					}
					break;
				}
			}
		}
	}
	private judgeResult():void{
		let count:number = 0;
		for(let i:number = 0;i<this.vritualGrid.length;i++){
			if(this.vritualGrid[i].occupied == count){
				count += 1;
			}
		}
		if(count >= this.vritualGrid.length - 1){
			//游戏胜利
			this.touchEnabled = false;
			this.touchChildren = false;
			this.winLab.visible = true;
		}
	}
	/***/
	private judgeIfExistGrid(emptyGrid:{x:number,y:number,occupied:number},direct):{x:number,y:number,occupied:number}{
		if(direct == 1){
			//上
			let bottomY:number = emptyGrid.y + 110;
			let bottomX:number = emptyGrid.x;
			return this.getGridByPos(bottomX,bottomY);
		}else if(direct == 2){
			//右
			let bottomX:number = emptyGrid.x - 110;
			let bottomY:number = emptyGrid.y;
			return this.getGridByPos(bottomX,bottomY);
		}else if(direct == 3){
			//下
			let bottomX:number = emptyGrid.x ;
			let bottomY:number = emptyGrid.y - 110;
			return this.getGridByPos(bottomX,bottomY);
		}else{
			//左
			let bottomX:number = emptyGrid.x + 110;
			let bottomY:number = emptyGrid.y;
			return this.getGridByPos(bottomX,bottomY);
		}
	}
	private getGridByPos(x,y):{x:number,y:number,occupied:number}{
		for(let i:number = 0;i<this.vritualGrid.length;i++){
			if(this.vritualGrid[i].x == x && this.vritualGrid[i].y == y){
				return this.vritualGrid[i];
			}
		}
		return null;
	}
	private onCancle():void{
		this.beginPoint = null;
	}
	/**判断方向 */
	private judgeDirection(xy:XY):number{
		if(this.beginPoint){
			if(this.beginPoint.y > xy.y && this.beginPoint.y - xy.y >= 50 && Math.abs(this.beginPoint.x - xy.x) <= 50){
				return 1;
			}
			if(xy.x > this.beginPoint.x && xy.x - this.beginPoint.x >= 50 && Math.abs(this.beginPoint.y - xy.y) <= 50){
				return 2;
			}
			if(this.beginPoint.y < xy.y && xy.y - this.beginPoint.y >= 50 && Math.abs(this.beginPoint.x - xy.x) <= 50){
				return 3;
			}
			if(this.beginPoint.x > xy.x && this.beginPoint.x - xy.x >= 50&& Math.abs(this.beginPoint.y - xy.y) <= 50){
				return 4;
			}
		}
	}
	/**创建格子 */
	private createGrid(txt,index):eui.Group{
		let sp:eui.Group = new eui.Group();
		sp.width = sp.height = 100;
		this.cardGroup.addChild(sp);
		sp.touchEnabled = true;
		sp.touchChildren = false;
		let rect:eui.Rect = new eui.Rect(100,100,0x000000);
		sp.addChild(rect);
		sp.name = index;

		let word:eui.Label = new eui.Label();
		word.text = txt;
		sp.addChild(word);
		word.textColor = 0xffffff;
		word.size = 30;
		word.stroke = 1;
		word.strokeColor = 0x00ff00;
		word.anchorOffsetX = word.width>>1;
		word.anchorOffsetY = word.height>>1;
		word.horizontalCenter = 0;
		word.verticalCenter = 0;
		return sp;
	}
	private randomsort(a, b) {
		return Math.random()>.5 ? -1 : 1;
		//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
	}
	public close():void{

	}
}
ViewManager.inst().reg(GameView,LayerManager.UI_Main);