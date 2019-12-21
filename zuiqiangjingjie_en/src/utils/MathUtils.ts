/**
 * Created by yangsong on 2014/11/22.
 * Mathematical calculation tools
 */
class MathUtils {

	/**
	 * Radian to angle
	 * @param radian Radian
	 * @returns {number}
	 */
	public static getAngle(radian: number): number {
		return 180 * radian / Math.PI;

	}

	/**
	 * Conversion of angle value to radian system
	 * @param angle
	 */
	public static getRadian(angle: number): number {
		return angle / 180 * Math.PI;
	}

	/**
	 * Get the radian between two points
	 * @param p1X
	 * @param p1Y
	 * @param p2X
	 * @param p2Y
	 * @returns {number}
	 */
	public static getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
		let xdis: number = p2X - p1X;
		let ydis: number = p2Y - p1Y;
		return Math.atan2(ydis, xdis);
	}

	/**
	 * Get the distance between two points
	 * @param p1X
	 * @param p1Y
	 * @param p2X
	 * @param p2Y
	 * @returns {number}
	 */
	public static getDistance(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
		let disX: number = p2X - p1X;
		let disY: number = p2Y - p1Y;
		let disQ: number = disX * disX + disY * disY;
		return Math.sqrt(disQ);
	}

	public static getDistanceByObject(s: { x: number, y: number }, t: { x: number, y: number }): number {
		return this.getDistance(s.x, s.y, t.x, t.y);
	}

	/**Get the square of the distance between two points */
	public static getDistanceX2ByObject(s: { x: number, y: number }, t: { x: number, y: number }): number {
		let disX: number = s.x - t.x;
		let disY: number = s.y - t.y;
		return disX * disX + disY * disY;
	}

	/** Angle move point */
	public static getDirMove(angle: number, distance: number, offsetX: number = 0, offsetY: number = 0): { x: number, y: number } {
		let radian = this.getRadian(angle);
		let p = {x: 0, y: 0};
		p.x = Math.cos(radian) * distance + offsetX;
		p.y = Math.sin(radian) * distance + offsetY;
		return p;
	}


	/**
	 * Obtain the random number of an interval
	 * @param $from minimum value
	 * @param $end Maximum value
	 * @returns {number}
	 */
	public static limit($from: number, $end: number): number {
		$from = Math.min($from, $end);
		$end = Math.max($from, $end);
		let range: number = $end - $from;
		return $from + Math.random() * range;
	}

	/**
	 * Obtain the random number of an interval(Frame number)
	 * @param $from minimum value
	 * @param $end Maximum value
	 * @returns {number}
	 */
	public static limitInteger($from: number, $end: number): number {
		return Math.round(this.limit($from, $end));
	}

	/**
	 * Get an element randomly in an array
	 * @param arr array
	 * @returns {any} Random results
	 */
	public static randomArray(arr: Array<any>): any {
		let index: number = Math.floor(Math.random() * arr.length);
		return arr[index];
	}

	/**Rounding */
	public static toInteger(value: number): number {
		return value >> 0;
	}
}