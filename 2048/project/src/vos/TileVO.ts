/**
 * Created by wizardc on 2014/7/30.
 */
module game
{
    export class TileVO
    {
        public column:number;
        public row:number;
        public num:number;

        public constructor(column:number, row:number)
        {
            this.column = column;
            this.row = row;
            this.num = 0;
        }
    }
}
