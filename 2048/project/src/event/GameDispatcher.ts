/**
 * Created by wizardc on 2014/7/30.
 */
module game
{
    export class GameDispatcher extends egret.EventDispatcher
    {
        private static _instance:GameDispatcher;

        public static getInstance():GameDispatcher
        {
            if(this._instance == null)
            {
                this._instance = new GameDispatcher();
            }
            return this._instance;
        }

        public constructor()
        {
            super();
        }
    }
}
