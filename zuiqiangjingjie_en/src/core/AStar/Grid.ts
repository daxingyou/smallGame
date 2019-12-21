/**
 * Grid class
 * @author chenkai
 * @since 2017/11/3
 */
namespace astar{
	export  class Grid {
		private _startNode:Node;    //Starting point
		private _endNode:Node;      //End
		private _nodes:Array<any>;  //Nodearray
		private _numCols:number;    //Grid ranks
		private _numRows:number;

		public constructor(numCols:number, numRows:number) {
			//Form grid area
			this._numCols = numCols;
			this._numRows = numRows;
			this._nodes = [];

			for(let i:number=0;i<numCols;i++){
				this._nodes[i] = [];
				for(let j:number=0;j<numRows;j++){
					this._nodes[i][j] = new Node(i,j);
				}
			}
		}

		public getNode(x:number , y:number):Node{
			return this._nodes[x][y];
		}

		public setEndNode(x:number, y:number){
			this._endNode = this._nodes[x][y];
		}

		public setStartNode(x:number, y:number){
			this._startNode = this._nodes[x][y];
		}

		public setWalkable(x:number, y:number, value:boolean){
			this._nodes[x][y].walkable = value;
		}

		public get endNode(){
			return this._endNode;
		}

		public get numCols(){
			return this._numCols;
		}

		public get numRows(){
			return this._numRows;
		}

		public get startNode(){
			return this._startNode;
		}
	}
}
