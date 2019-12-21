/**
 * Created by yangsong on 15-8-19.
 * Average tool class
 */
class AverageUtils {

	private maxNum:number;
	private nums:Array<number> = [];
	private numsLen:number = 0;
	private numSum:number = 0;

	/**
	 * Constructor
	 * @param $maxNum Maximum value involved in calculation
	 */
	public constructor($maxNum:number = 10) {
		this.maxNum = $maxNum;
	}

	/**
	 * Add a value
	 * @param value
	 */
	public push(value:number):void {
		if (this.numsLen > this.maxNum) {
			this.numsLen--;
			this.numSum -= this.nums.shift();
		}
		this.nums.push(value);
		this.numSum += value;
		this.numsLen++;
	}

	/**
	 * Get average
	 * @returns {number}
	 */
	public getValue():number {
		return this.numSum / this.numsLen;
	}

	/**
	 * empty
	 */
	public clear():void {
		this.nums.splice(0);
		this.numsLen = 0;
		this.numSum = 0;
	}
}
