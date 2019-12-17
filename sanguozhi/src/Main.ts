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

class Main extends eui.UILayer {

    public static DUBUGGER:boolean = false;
    public static txt:eui.Label;
    protected createChildren(): void {
        super.createChildren();
        StageUtils.init();

        if(Main.DUBUGGER){
            let txt:eui.Label = new eui.Label();
            txt.touchEnabled = false;
            txt.size = 30;
            Main.txt = txt;
            StageUtils.inst().getStage().addChildAt(txt,9999)
            txt.width = StageUtils.inst().getWidth();
            txt.height = StageUtils.inst().getHeight();
        }
        let self = this;
        
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // if(self.DUBUGGER){
            //     txt.text = "游戏进入后台";
            // }
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // if(self.DUBUGGER){
            //     txt.text = "游戏重新唤醒" + Math.random()
            // }
            // egret.ticker.resume();
        }
        
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        if (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2) {
            egret.TextField.default_fontFamily = `${DEFAULT_FONT}`
        }
        this.runGame().catch(e => {
            if(Main.DUBUGGER){
                 Main.txt.text = e;
            }
            console.error(e);
        })
        window["payCallBack"] = GlobalFun.payCallBack;
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            this.stage.addChild(LoadingUI.inst());
            await RES.loadGroup("preload", 0,LoadingUI.inst());
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this); 

        })
    }
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let self = this;
        // this.anchorOffsetX = StageUtils.inst().getWidth()>>1;
        // this.anchorOffsetY = StageUtils.inst().getHeight()>>1;
        // this.x = StageUtils.inst().getWidth()>>1;
        // this.y = StageUtils.inst().getHeight()>>1;
        // window.onorientationchange = function(){
        //     self.judgeRotation();
        // }
        // this.judgeRotation();
        //开发功能测试
        // RES.getResByUrl("resource⁩/res⁩/view⁩/music.mp3",(data)=>{
           
        // },this);
        SoundManager.inst().playBg(`${MUSIC}home.mp3`);
        SoundManager.inst().touchBg();
		egret.localStorage.clear();
        eui.Image.prototype["autoSize"] = eui.Button.prototype["autoSize"] = eui.Group.prototype["autoSize"] = eui.Rect.prototype["autoSize"] = function(){
            let precentw:number = StageUtils.inst().getWidth()/1334;
            let precenth:number = StageUtils.inst().getHeight()/750;
            this.scaleX = this.scaleY = precentw;
            this.x *= precentw;
            this.y *= precenth;
        }
        PlayerPhalanx.prototype["phalanxSize"] = NpcPhalanx.prototype["phalanxSize"] = function(){
            let precentw:number = StageUtils.inst().getWidth()/1334;
            let precenth:number = StageUtils.inst().getHeight()/750;
            this.scaleX = precentw;
            this.scaleY = precenth;
            this.x *= precentw;
            this.y *= precenth;
        }
		//
        LayerManager.inst().iniaizlize(this);
        ViewManager.inst().curView = "Main_initialize";
        GameApp.inst().load();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
        },this);


        
        // let data = RES.getRes("config_zip");
        // JSZip.loadAsync(data).then((zipdata) => {
        //     return zipdata.file('config.json').async('text');
        // }).then(text => {
        //     GlobalConfig.setData(JSON.parse(text));
        //     GameApp.inst().load();
        // })
       
    }
    // private judgeRotation(){
    //     let player = document.getElementsByClassName("egret-player")[0];
    //     switch(window.orientation){
    //         case 0:
    //         case 180:
    //             let scale = StageUtils.inst().getWidth()/1334;
    //             let cssStyle2 = `-moz-transform:rotate(-90deg) scale(${scale});
    //         -webkit-transform:rotate(-90deg) scale(${scale});
    //         -o-transform:rotate(-90deg) scale(${scale});
    //         -ms-transform:rotate(-90deg); scale(${scale});
    //         margin: auto;width: 100%;height: 100%;`
    //             // player.setAttribute("style",cssStyle2);
    //             this.rotation = -90;
    //             this.scaleX = this.scaleY = scale;
    //         break;
    //         case -90:
    //         case 90:
    //             // let scale = StageUtils.inst().getWidth()/1334;
    //             let cssStyle = `-moz-transform:rotate(0deg) scale(${1});
    //         -webkit-transform:rotate(0deg) scale(${1});
    //         -o-transform:rotate(0deg) scale(${1});
    //         -ms-transform:rotate(0deg); scale(${1});
    //         margin: auto;width: 100%;height: 100%;`
    //             player.setAttribute("style",cssStyle);
    //             break;
    //     }
    // }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
       
    }
}
