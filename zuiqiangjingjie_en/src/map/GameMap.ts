/**
 *
 * Map grid auxiliary class
 */
class GameMap {

	/** Current map grid size */
	public static CELL_SIZE: number;
	/** Maximum width of current map */
	public static MAX_WIDTH: number;
	/** Maximum height of current map */
	public static MAX_HEIGHT: number;
	public static COL: number;
	public static ROW: number;
	/** Lattice data */
	public static buildTouch:boolean = false;
	public static grid = [];
	public static runGrid = [];
	public static AstarNode;
	
	/** Initialization */
	static init(data: MapInfo): void {
		let gds = data.grids;
		GameMap.grid = [];
		GameMap.runGrid = [];
		GameMap.CELL_SIZE = data.gridw;
		GameMap.MAX_WIDTH = data.pixwidth;
		GameMap.MAX_HEIGHT = data.pixheight;
		GameMap.COL = data.cols;
		GameMap.ROW = data.rows;
		this.AstarNode = new astar.Grid(data.cols,data.rows)
		
		for(let i = 0;i<data.rows;i++){
			GameMap.grid[i] = []
			for(let j = 0;j<data.cols;j++){
				GameMap.grid[i][j] = gds[i*data.cols+j]
				if(GameMap.grid[i][j] == 1){
					let obj = {row:i,col:j};
					GameMap.runGrid.push(obj);
				}
				if(GameMap.grid[i][j] == 0 ){
					this.AstarNode.setWalkable(j,i,false);
				}
			}
		}
	}
	/**Pixel to grid coordinates */
	static point2Grid(px:number,py:number):XY{
		let gridXnum = (px/GameMap.CELL_SIZE)>>0;
		let gridYnum = (py/GameMap.CELL_SIZE)>>0;
		return {x:gridXnum,y:gridYnum};
	}
	/**Grid position to pixel */
	static grid2Point(gx:number,gy:number):XY{
		let x = gx * GameMap.CELL_SIZE;
		let y = gy * GameMap.CELL_SIZE;
		return {x:x,y:y}
	}
	/**
	 * Calculate the set of grids occupied by buildings
	 * Returns the set of grid coordinates occupied
	 */
	static calculBuildGridArea(rect:egret.Rectangle):XY[]{
		let blockXNum = Math.ceil(rect.width/GameMap.CELL_SIZE);
		let blockYNum = Math.ceil(rect.height/GameMap.CELL_SIZE);
		let xys:XY[] = [];
		let firstGrid:XY = GameMap.point2Grid(rect.x,rect.y);
		for(let i = 0;i<blockXNum;i++){

			for(let j = 0;j<blockYNum;j++){
				let xy = {x:firstGrid.x+i,y:firstGrid.y+j};
				xys.push(xy);
			}
		}
		return xys;
	}
	/**Judge whether it is at the blocking point according to the grid coordinates  */
	static walkable(x:number,y:number):boolean{
		if(!(GameMap.grid[x])){
			return null;
		}
		
		if(isNaN(GameMap.grid[x][y])){
			return null;
		}
		let grid = GameMap.grid[x][y];
		if(grid == 3){
			return null
		}
		return grid;
	}
	

}
interface MapInfo{
	grids:number[],
	gridw:number,
	gridh:number,
	slicew:number,
	sliceh:number,
	pixwidth:number,
	pixheight:number,
	cols:number,
	rows:number,
}
interface XY{
	x:number,
	y:number
}

