class StartGameView extends BaseEuiView{
	private logoGroup:eui.Group;
	private startGameBtn:eui.Image;
	private customFilter1;

	private role:eui.Image;
	private start1:eui.Image;
	private start2:eui.Image;
	private start3:eui.Image;
	private start4:eui.Image;

	private img:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.logoGroup.alpha = 0;
		this.logoGroup.scaleX = this.logoGroup.scaleY = 3;
		GlobalFun.sendToNativeLoadEnd();

		this.img["autoSize"]();

		egret.Tween.get(this.role).to({left:-178},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.role);
			
		},this) 
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			egret.Tween.get(self.logoGroup).to({alpha:1,scaleX:1,scaleY:1},600,egret.Ease.circIn).call(()=>{
				egret.Tween.removeTweens(self.logoGroup);
			},self)
		}, 300);
		
		this.addTouchEvent(this.startGameBtn,this.onStartGame,true);
		let vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +

            "uniform vec2 projectionVector;\n" +

            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +

            "const vec2 center = vec2(-1.0, 1.0);\n" +

            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
		"}";
		let fragmentSrc1 =
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +

            "uniform float customUniform;\n" +

            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.1;\n" +
            "gl_FragColor = fg * vColor;\n" +
		"}";
		this.customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                customUniform: 0
            }
        );
		this.filters = [this.customFilter1]
		this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
	}
	private onStartGame():void{
		let firstEnter:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
		egret.Tween.get(this).to({alpha:0},600).call(()=>{
			egret.Tween.removeTweens(this);
			ViewManager.inst().close(StartGameView);
		},this)
		if(!firstEnter){
			egret.localStorage.setItem(LocalStorageEnum.FIRST_TIME,new Date().getTime().toString());
			egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST,"1");
			ViewManager.inst().open(StoryView);
		}else{
			
			ViewManager.inst().open(GameMainView);
		}
	}
	private onFrame(evt:egret.Event):void{
		this.start1.rotation += 1;
		this.start2.rotation -= 1;
		this.start3.rotation += 1;
		this.start4.rotation -= 1;
		this.customFilter1.uniforms.customUniform += 0.05;
		if (this.customFilter1.uniforms.customUniform > Math.PI * 2) {
			this.customFilter1.uniforms.customUniform = 0.0;
		}
	}
	public close():void{
		this.removeTouchEvent(this.startGameBtn,this.onStartGame);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
	}
}
ViewManager.inst().reg(StartGameView,LayerManager.UI_Main);