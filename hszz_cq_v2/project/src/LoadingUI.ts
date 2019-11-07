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

    private progressTip:eui.Image;
    private progressBg:eui.Image;
    private progressBar:eui.Image;
    private game_name:eui.Image;
    private game_nameMask:eui.Image;
    private game_role0:eui.Image;
    private game_role1:eui.Image;
    private name_guang:eui.Image;
    private star_right:eui.Image;
    private star_left:eui.Image;
    private start_btn:eui.Image;
    private role_effect:eui.Image;
    private progressPanel:eui.Group;
    private progressMask:eui.Rect
    private static _instance:LoadingUI;
    // private _loadHorse:MovieClip;
    private _w:number;
    private _total:number = 13.5;
    public constructor() {
        super();
        this.createView();
        MessageManager.inst().addListener("LOADING_OVER", this.setVis, this);
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
    private setVis()
    {
        this.progressTip.visible = false;
        this.progressBg.visible = false;
        this.progressBar.visible = false;
        this.progressPanel.visible = false;
        this.progressMask.visible = false;

        this.start_btn = new eui.Image();
        this.start_btn.source = "loading_btn_png";
        this.start_btn.horizontalCenter = 0;
        this.start_btn.bottom = 150;
        this.addChild(this.start_btn);
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
    }
    private touchTap()
    {
        LoadingUI.inst().hide();
		if(egret.localStorage.getItem(LocalStorageEnum.ROLE_NAME))
		{
			ViewManager.inst().open(GameMainView)
		}else
		{
			ViewManager.inst().open(ChooseView);
		}
    }
    private createView(): void {
        this.star_right = new eui.Image();
        this.star_right.source = "lx_0_png";
        this.star_right.x = StageUtils.inst().getWidth();
        this.star_right.y = 100;
        this.addChild(this.star_right);

        egret.Tween.get(this.star_right, {loop:true})
        .to({x:StageUtils.inst().getWidth() / 2, y:StageUtils.inst().getHeight() / 2 - 200}, Math.floor(Math.random() * 500 + 500))
        .wait(Math.floor(Math.random() * 3000))
        .call(()=>{
            this.star_right.source = "lx_" + Math.floor(Math.random()*4) + "_png";
        }, this)

        this.star_left = new eui.Image();
        this.star_left.source = "lx_0_png";
        this.star_left.x = 0;
        this.star_left.y = 100;
        this.star_left.scaleX = -1;
        this.addChild(this.star_left);

        egret.Tween.get(this.star_left, {loop:true})
        .to({x:StageUtils.inst().getWidth() / 2, y:StageUtils.inst().getHeight() / 2 - 200}, Math.floor(Math.random() * 500 + 500))
        .wait(Math.floor(Math.random() * 3000))
        .call(()=>{
            this.star_left.source = "lx_" + Math.floor(Math.random()*4) + "_png";
        }, this)

        this.game_role0 = new eui.Image();
        this.game_role0.source = "loading_role_png";
        this.game_role0.anchorOffsetX = this.game_role0.width / 2 ;
        this.game_role0.anchorOffsetY = this.game_role0.height / 2;
        this.game_role0.horizontalCenter = 0;
        this.game_role0.verticalCenter = 100;
        this.addChild(this.game_role0);
        this.game_role1 = new eui.Image();
        this.game_role1.source = "loading_role_png";
        this.game_role1.anchorOffsetX = this.game_role1.width / 2 ;
        this.game_role1.anchorOffsetY = this.game_role1.height / 2;
        this.game_role1.horizontalCenter = 0;
        this.game_role1.verticalCenter = 100;
        this.addChild(this.game_role1);

        egret.Tween.get(this.game_role1, {loop:true})
        .to({scaleX:1.1, scaleY:1.1, alpha:0}, 2500);

        this.role_effect = new eui.Image();
        this.role_effect.source = "loading_effect_png";
        this.role_effect.left = 0;
        this.role_effect.right = 0;
        this.role_effect.bottom = 0;
        this.addChild(this.role_effect);

        this.game_name = new eui.Image();
        this.game_name.source = "game_name_png";
        this.game_name.horizontalCenter = 0;
        this.game_name.top = 30;
        this.addChild(this.game_name);
        this.game_nameMask = new eui.Image();
        this.game_nameMask.source = "game_name_png";
        this.game_nameMask.horizontalCenter = 0;
        this.game_nameMask.top = 30;
        this.addChild(this.game_nameMask);

        this.name_guang = new eui.Image();
        this.name_guang.source = "game_nameeffect_png";
        this.name_guang.x = -150;
        this.name_guang.y = 30;
        this.addChild(this.name_guang);

        this.progressPanel = new eui.Group();
        this.addChild(this.progressPanel);
        this._w = (StageUtils.inst().getWidth());
        this.progressPanel.horizontalCenter = 0;
        this.progressPanel.left = 0;
        this.progressPanel.right = 0;
        this.progressPanel.bottom = 0;

        this.progressTip = new eui.Image();
        this.progressTip.source = "loading_tip_png";
        this.progressPanel.addChild(this.progressTip);
        this.progressTip.horizontalCenter = 0;
        this.progressTip.bottom = 190;

        this.progressBg = new eui.Image();
        this.progressBg.source = "progress_bg_png";
        this.progressPanel.addChild(this.progressBg);
        this.progressBg.horizontalCenter = 0;
        this.progressBg.bottom = 150;

        this.progressBar = new eui.Image();
        this.progressBar.source = "progress_pro_png";
        this.progressBar.horizontalCenter = 0;
        this.progressBar.bottom = 150;
        this.progressPanel.addChild(this.progressBar);

        // this._loadHorse = new MovieClip();
        // this.progressPanel.addChild(this._loadHorse);
        // this._loadHorse.playFile(`${EFFECT}loading_horse`,-1);

        this.progressMask = new eui.Rect;
        this.progressMask.height = 37;
        this.progressMask.width=0;
        this.progressMask.left = 0;
        this.progressMask.bottom = 150;
        this.progressPanel.addChild(this.progressMask);
        // this._loadHorse.y = this.progressMask.y;
        // this._loadHorse.x = this.progressMask.x + this.progressMask.width;

        this.name_guang.mask = this.game_nameMask;
        egret.Tween.get(this.name_guang, {loop:true})
        .to({x:StageUtils.inst().getWidth()}, 350)
        .wait(2000);

        this.progressBar.mask = this.progressMask;

        this.textField = new eui.Label();
        this.progressPanel.addChild(this.textField);
        this.textField.fontFamily = `ht`;
        this.textField.textColor = 0x91795B;
        this.textField.stroke = 1.5;
        this.textField.strokeColor = 0x000000;
        this.textField.size = 20;
        this.textField.y = -40;
        this.textField.horizontalCenter = 0;
        this.setVis();
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
