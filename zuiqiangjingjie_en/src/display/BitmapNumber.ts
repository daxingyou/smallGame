/**
 * Materials need to be loaded in advance
 * Material naming rules：type_numerical value（There are types because there are usually several digital pictures at the same time，Such as size or different colors）
 * Point material naming：type_dot
 * EstablishBitmapNumberUsecreateNumPicReturnDisplayObjectContainer
 * CreatedBitmapNumberThe value needs to change is calledchangeNum
 * RecyclingdesstroyNumPic
 *
 * Created by Saco on 2014/8/1.
 */
class BitmapNumber extends BaseClass {
	private _imgPool: egret.Bitmap[];
	private _containerPool: egret.DisplayObjectContainer[];

	public constructor() {
		super();
		this._imgPool = [];
		this._containerPool = [];
	}


	
	/*
	 * Returns a number and type as neededDisplayObjectContainer
	 * numNumeric value，Decimal point support
	 * typeMaterial type
	 * */
	public createNumPic(num: number | string, type: string, offset: number = 0,offsetY:number=0): egret.DisplayObjectContainer {
		let container: egret.DisplayObjectContainer = this.getContainer();
		let numStr: string = num.toString();
		let index: number = 0;
		let tempBm: egret.Bitmap;
		for (index; index < numStr.length; index++) {
			tempBm = this.getSingleNumPic(numStr.charAt(index), type);
			container.addChild(tempBm);
		}
		this.repositionNumPic(container, offset,offsetY);
		return container;
	}

	//Recycle digitalDisplayObjectContainer
	public desstroyNumPic(picContainer: egret.DisplayObjectContainer): void {
		this.clearContainer(picContainer);
		if (picContainer.parent)
			picContainer.parent.removeChild(picContainer);
		this._containerPool.push(picContainer);
	}

	/*
	 * Change with numbersDisplayObjectContainerNumeric value
	 * This method is provided to improve efficiency，Directly replace thetexture，Avoid redundant deletion and creation
	 * */
	public changeNum(picContainer: egret.DisplayObjectContainer, num: number | string, type: string, offset: number = 0, offsetY: number = 0): void {
		let numStr: string = num.toString();
		if(!picContainer){return}
		//If the current number of digits is more than the target number, the redundant ones will be recycled
		if (picContainer.numChildren > numStr.length) {
			while (picContainer.numChildren > numStr.length) {
				this.recycleBM(<egret.Bitmap>picContainer.getChildAt(picContainer.numChildren - 1))
			}
		}
		let index: number = 0;
		let tempStr: string;
		for (index; index < numStr.length; index++) {
			//If the currentBitmapGet new if the quantity is not enoughBitmapMake up
			if (index >= picContainer.numChildren)
				picContainer.addChild(this.getBitmap());
			tempStr = numStr.charAt(index);
			tempStr = tempStr == "." ? "dot" : tempStr;
			(<egret.Bitmap>picContainer.getChildAt(index)).texture = this.getTexture(tempStr, type);
		}
		this.repositionNumPic(picContainer, offset, offsetY);
	}

	//The width of each number is different，So rearrange it
	private repositionNumPic(container: egret.DisplayObjectContainer, offset: number = 0, offsetY: number = 0): void {
		let index: number = 0;
		let lastX: number = 0;
		let temp: egret.DisplayObject;
		for (index; index < container.numChildren; index++) {
			temp = container.getChildAt(index);
			temp.x = lastX - offset;
			// temp.y = - offsetY;
			lastX = temp.x + temp.width;
		}
	}

	//Cleaning container
	private clearContainer(picContainer: egret.DisplayObjectContainer): void {
		while (picContainer.numChildren) {
			this.recycleBM(<egret.Bitmap>picContainer.getChildAt(picContainer.numChildren-1));
		}
	}

	//recoveryBitmap
	private recycleBM(bm: egret.Bitmap): void {
		if (bm && bm.parent) {
			bm.parent.removeChild(bm);
			bm.texture = null;
			this._imgPool.push(bm);
		}
	}

	private getContainer(): egret.DisplayObjectContainer {
		if (this._containerPool.length)
			return this._containerPool.shift();
		return new egret.DisplayObjectContainer();
	}

	//Get a single numberBitmap
	private getSingleNumPic(num: string, type: string): egret.Bitmap {
		if (num == ".")
			num = "dot";
		let bm: egret.Bitmap = this.getBitmap();
		bm.texture = this.getTexture(num, type);
		return bm;
	}

	private getTexture(num: string, type: string): egret.Texture {
		return RES.getRes(type + num + "_png");
	}

	private getBitmap(): egret.Bitmap {
		if (this._imgPool.length)
			return this._imgPool.shift();
		return new egret.Bitmap();
	}
}
