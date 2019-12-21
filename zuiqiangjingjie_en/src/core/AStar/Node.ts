/**
 * Node node
 * @author chenkai
 * @since 2017/11/3
 */
namespace astar{
	export class Node {
		public x:number;    //column
		public y:number;    //That's ok
		public f:number;    //cost f = g+h
		public g:number;    //Cost from starting point to current point
		public h:number;    //Estimated cost from current point to end point
		public walkable:boolean = true;
		public parent:Node;
		public costMultiplier:number = 1.0;
	
		public constructor(x:number , y:number) {
			this.x = x;
			this.y = y;
		}
	}
}
