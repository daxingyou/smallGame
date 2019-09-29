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

    public static _video:egret.Video;
    /*** 本示例关键代码段开始 ***/
    //加载
    public loadVideo(): void {
        Main._video = new egret.Video();
        Main._video.x = -1000;
        Main._video.y = -2000;
        Main._video.width = 427;
        Main._video.height = 240;
        Main._video.fullscreen = false;
        Main._video.poster = Main._video.fullscreen ? "resource/assets/posterfullscreen.jpg" : "resource/assets/posterinline.jpg";
        Main._video.load("resource/assets/trailer.mp4");
        this.addChild(Main._video);

        Main._video.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log("complete");
        }, this);
        // this._video.fullscreen = false;
    }
    public static _pauseTime: number = 0;
    //播放
    public static play():void {
        Main.stop();
        console.log("播放");
        Main._video.play(Main._pauseTime, false);
        Main._video.addEventListener(egret.Event.ENDED, Main.onComplete, this);
    }
    //停止
    public static stop():void {
        Main._video.pause();
    }
    //播放完成
    public static onComplete(e:egret.Event):void {
        console.log("播放结束");
        Main._video.removeEventListener(egret.Event.ENDED, Main.onComplete, this);
        Main._video.close();
        Main._video.parent.removeChild(Main._video);
    }
    protected createChildren(): void {
        super.createChildren();
        this.loadVideo();
        StageUtils.init();
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
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
            console.log(e);
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
            await RES.loadGroup("preload", 0 , LoadingUI.inst());
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
        //开发功能测试
		// egret.localStorage.clear();
		//
        LayerManager.inst().iniaizlize(this);
        //启用舞台的鼠标支持
        mouse.enable(this.stage);
        let data = RES.getRes("config_zip");
        JSZip.loadAsync(data).then((zipdata) => {
            return zipdata.file('config.json').async('text');
        }).then(text => {
            GlobalConfig.setData(JSON.parse(text));
            GameApp.inst().load();
        })
        let jsonData=RES.getRes("chapter_json");
        for(var p in jsonData)
        {
            if(p=="chapter")
            {
                GameApp.charpter_info=jsonData[p];
            }
        }
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
       
    }
}
