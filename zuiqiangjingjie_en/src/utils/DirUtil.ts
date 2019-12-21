/**
 * Direction tool
 */
class DirUtil {

	/**
	 * adopt2spot，Obtain8Direction value
	 * p1 starting point
	 * p2 End point
	 */
	public static get8DirBy2Point(p1: any, p2: any): number {
		//Calculation direction
		let angle: number = MathUtils.getAngle(MathUtils.getRadian2(p1.x, p1.y, p2.x, p2.y));
		return this.angle2dir(angle);
	}

	/**
	 * adopt2spot，Obtain4Direction value
	 * p1 starting point
	 * p2 End point
	 */
	public static get4DirBy2Point(p1: any, p2: any): number {
		return p1.x < p2.x ? (p1.y < p2.y ? 3 : 1) : (p1.y < p2.y ? 5 : 7);
	}

	/** Direction rotation angle */
	public static dir2angle(dir: number): number {
		dir *= 45;
		dir -= 90;
		return dir;
	}

	/** Angle direction */
	public static angle2dir(angle: number): number {
		if (angle < -90)
			angle += 360;
		return Math.round((angle + 90) / 45) % 8;
	}

	/** Negative direction */
	public static dirOpposit(dir: number): number {
		// 7 == 3
		// 6 == 2
		// 5 == 1
		// 4 == 0
		return dir < 4 ? dir + 4 : dir - 4;
	}

	/** 8Direction change5Direction resource direction */
	public static get5DirBy8Dir(dir8: number): number {
		return dir8 - this.isScaleX(dir8);
	}

	/** Whether the current direction needs to be flipped */
	public static isScaleX(dir8: number): number {
		let td: number = 2 * (dir8 - 4);
		if (td < 0) td = 0;
		return td;
	}

	/** Obtain the coordinates of the direction lattice */
	// public static getGridByDir(dir: number, pos: number = 1, p: { x: number, y: number } = {
	// 	x: 0,
	// 	y: 0
	// }): { x: number, y: number } {
	// 	let angle: number = this.dir2angle(this.dirOpposit(dir));
	// 	return MathUtils.getDirMove(angle, pos * GameMap.CELL_SIZE, p.x, p.y);
	// }
}