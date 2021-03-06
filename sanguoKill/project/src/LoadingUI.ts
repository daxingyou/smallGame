//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends eui.UILayer implements RES.PromiseTaskReporter {

    private progressBg:eui.Image;
    private progressBar:eui.Image;
    private progressPanel:eui.Group;
    private progressMask:eui.Rect
    private static _instance:LoadingUI;
    // private _loadHorse:MovieClip;
    private _w:number;
    private _total:number = 33.5;
    public constructor() {
        super();
        this.createView();
    }
    public static inst():LoadingUI{
        if(!this._instance){
            this._instance = new LoadingUI();
        }
        return this._instance;
    }
    public hide():void{
        if(this.parent){
            this.parent.removeChild(this);
        }
    }
    private textField: eui.Label;

    private createView(): void {

        this.progressPanel = new eui.Group();
        this.addChild(this.progressPanel);
        this._w = (StageUtils.inst().getWidth());
        this.progressPanel.horizontalCenter = 0;
        this.progressPanel.left = 0;
        this.progressPanel.right = 0;
        this.progressPanel.bottom = 0;

        this.progressBg = new eui.Image();
        this.progressBg.source = "progress_bg_png";
        this.progressPanel.addChild(this.progressBg);
        this.progressBg.left = 0;
        this.progressBg.right = 0;
        this.progressBg.bottom = 0;

        this.progressBar = new eui.Image();
        this.progressBar.source = "progress_pro_png";
        this.progressBar.left = 0;
        this.progressBar.right = 0;
        this.progressBar.bottom = 0;
        this.progressPanel.addChild(this.progressBar);

        // this._loadHorse = new MovieClip();
        // this.progressPanel.addChild(this._loadHorse);
        // this._loadHorse.playFile(`${EFFECT}loading_horse`,-1);

        this.progressMask = new eui.Rect;
        this.progressMask.height = 37;
        this.progressMask.width=0;
        this.progressPanel.addChild(this.progressMask);
        // this._loadHorse.y = this.progressMask.y;
        // this._loadHorse.x = this.progressMask.x + this.progressMask.width;

        this.progressBar.mask = this.progressMask;

        this.textField = new eui.Label();
        this.progressPanel.addChild(this.textField);
        this.textField.fontFamily = `yt`
        this.textField.size = 16;
        this.textField.y = 0;
        this.textField.horizontalCenter = 0;
    }

    public onProgress(current: number, total: number): void {
        let cutsize:string = (current/total*this._total).toFixed(1)
        
        let w:number = (current/total)*this._w
        if(w >= this._w){w = this._w,cutsize=this._total.toString()}
        this.textField.text = `正在加载游戏资源...请稍候(${current}/${total})-(${cutsize}MB/${this._total}MB)`;
        this.progressMask.width = w;
        // this._loadHorse.x = this.progressMask.width;
    }
}
