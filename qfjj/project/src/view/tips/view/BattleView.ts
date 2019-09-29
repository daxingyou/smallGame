class BattleView extends BaseEuiView{
	private gridGroup:eui.Group;

	//保存数据 代表格子 坐标
	private gridData:any = {};
	//初始格子数据
	private gData:any = {};
	//格子实体集合
	private entitys:CardEntity[];

	private selectEntity:CardEntity;

	//可走区域焦点集合显示
	private focusRects:eui.Image[] ;

	//回合代表值 1为我方回合 。-1 为敌方回合
	private battleCount:number = 1;

	private nameLab:eui.Label;

	private ownCountLab:eui.Label;
	private enemyCountLab:eui.Label;
	private timeLab:eui.Label;
	private countTime:number = 180;
	private timer:egret.Timer;

	private returnBtn:eui.Image;
	private resetBtn:eui.Image;

	private _levelCfg;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.entitys = [];
		this.focusRects = [];
		this.nameLab.text = LevelCfg.levelCfgs[LevelCfg.chapter-1].chapter_name;
		//生成关卡格子
		let col:number = 5;
		let row:number = 7;
		for(let i:number = 0;i<row;i++){
			for(let j:number = 0;j<col;j++){
				if(param[0].blevel == 1){
					if(param[0].slevel == 1){
						if(i == 0 || i == row-1){
							this.gridData[j+"_"+i] = -1;
							this.gData[j+"_"+i] = -1;
							this.createBlock(i*(100 ),j*(100 ));
							continue;
						}
						if(j == 0 || j == col -1){
							this.gridData[j+"_"+i] = -1;
							this.gData[j+"_"+i] = -1;
							this.createBlock(i*(100 ),j*(100 ));
							continue;
						}
					}else if(param[0].slevel == 2){
						if((i==0 && j == 0 ) || (i==0 && j==col-1) || (i==row-1 && j==0) || (i==row-1 && j==col-1)){
							this.gridData[j+"_"+i] = -1;
							this.gData[j+"_"+i] = -1;
							this.createBlock(i*(100 ),j*(100 ));
							continue;
						}
					}
				}
				this.gridData[j+"_"+i] = 1;
				this.gData[j+"_"+i] = 1;
				let img:eui.Image = new eui.Image();
				img.source = "grid_png";
				this.gridGroup.addChild(img);

				
				img.x = j*(100 );
				img.y = i*(100 );
			}
		}
		let leveCfg:any = param[0].blevel == 1?ChapterCfg.leveCfg[1][param[0].slevel - 1 ]:ChapterCfg.leveCfg[2][0];
		this._levelCfg = leveCfg;
		this.timer = new egret.Timer(1000,this.countTime);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onComplete,this);
		//卡牌类型索引
		this.refreshCardShow(0,leveCfg);
		this.refreshCardShow(1,leveCfg);	
		//	
		this.refreshTopInfo();
		this.gridGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);

		MessageManager.inst().addListener("closeStory",this.onCloseStory,this);

		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.resetBtn,this.onReset,true);
	}
	private onReturn():void{
		ViewManager.inst().close(BattleView);
		ViewManager.inst().open(ChapterView);
	}
	private onReset():void{
		this.countTime = 180;	
		this.timer.reset();
		this.timer.start();
		for(let i:number = 0;i<this.entitys.length;i++){
			this.entitys[i].parent.removeChild(this.entitys[i]);
		}
		this.entitys = [];
		egret.Tween.removeAllTweens();
		this.battleCount = 1;
		for(let j:number = 0;j<this.focusRects.length;j++){
			this.focusRects[j].parent.removeChild(this.focusRects[j])
		}
		this.timeLab.text = "180";
		this.focusRects = [];
		this.gridData = this.gData;
		this.refreshCardShow(0,this._levelCfg);
		this.refreshCardShow(1,this._levelCfg);
		this.refreshTopInfo();
	}
	private onCloseStory():void{
		this.showAnimate();
		this.timer.start();
	}
	private onTimer():void{
		this.countTime -= 1;
		if(this.countTime <= 0){
			this.countTime = 0;
		}
		this.timeLab.text = this.countTime.toFixed();
	}
	private onComplete():void{
		let enemyEntitys:CardEntity[] = this.getEntitysFromCamp(0);
		if(enemyEntitys.length){
			this.battleFail();
		}
	}
	/**刷新顶部信息显示 */
	private refreshTopInfo():void{
		let ownEntitys:CardEntity[] = this.getEntitysFromCamp(1);
		let enemyEntitys:CardEntity[] = this.getEntitysFromCamp(0);
		this.ownCountLab.text = ownEntitys.length.toString();
		this.enemyCountLab.text = enemyEntitys.length.toString();
	}
	/**显示回合label */
	private showAnimate():void{
		let label:eui.Label = new eui.Label();
		this.addChild(label);
		label.size = 40;
		label.fontFamily = "yt";
		label.text = this.battleCount == 1?"我方回合":"敌方回合";
		label.verticalCenter = 0;
		label.left = this.battleCount == 1?-110:StageUtils.inst().getWidth()+110;
		if(this.battleCount == 1){
			this.touchEnabled = false;
			this.touchChildren = false;
			let x:number = (StageUtils.inst().getWidth()>>1) - (label.width>>1);
			let nx:number = StageUtils.inst().getWidth() + 110;
			egret.Tween.get(label).to({left:x},600,egret.Ease.circOut).wait(100).to({left:nx},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(label);
				label.parent.removeChild(label);
				this.touchEnabled = true;
				this.touchChildren = true;
			},this)
		}else{
			this.touchEnabled = false;
			this.touchChildren = false;
			let x:number = (StageUtils.inst().getWidth()>>1) - (label.width>>1);
			let nx:number = -110;
			egret.Tween.get(label).to({left:x},600,egret.Ease.circOut).wait(100).to({left:nx},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(label);
				label.parent.removeChild(label);
				this.execAiOper();
			},this)
		}
	}
	/**执行电脑ai操作 先判断 只有电脑才会走这个逻辑
	 * 
	 * 先遍历每个单位附近上下左右四方 。查询是否有可以攻击的单位 。找寻攻击利益最大化的 进行攻击
	 * 如果有： 
	 *   需要判断是否可以安全攻击。 （攻击以后 不会被攻击）
	 *     如果可以：
	 *        执行攻击动作 （攻击完成进入下一个回合）
	 *     如果不可以
	 *        查询下一个有攻击的单位 重复以上逻辑
	 * 如果没有
	 *   随机一个单位 进行移动操作 是否有可以安全的攻击移动对象
	 *      是否可以安全的移动 
	 * 		   首先判断 移动后的位置 周围 是否进行安全的攻击操作 。如果有 。移动过去 如果没有 向一个方向移动 需要判断这个移动后方向的周围4格子是否有可能被攻击 或者直接被攻击
	 *         如果4个方向都不可以移动的话 判断周围 是否有可以帮助的己方单位。有的话并且安全 可以移动到可以移动的周围。
	 *      不可以安全移动 （移动任何方向都会直接被攻击） 重复以上操作 更换下一个单位 执行逻辑
	*/
	private execAiOper():void{
		//获取当前玩家的实体卡牌
		let playerEntitys:CardEntity[] = this.getEntitysFromCamp(1);
		//获取当前电脑的实体卡牌
		let computerEntitys:CardEntity[] = this.getEntitysFromCamp(0);
		//当前电脑可以攻击的集合
		let atkEntitys:any = {};// { computerEntity:[]}
		//当前电脑可以移动的集合
		let moveEntitys:any = {};
		//获取电脑单位 所有 周围 。可攻击的玩家卡牌
		for(let i:number = 0;i<computerEntitys.length;i++){
			let xy:XY = {x:computerEntitys[i].attr.x,y:computerEntitys[i].attr.y};
			let leftGrid:{xy:XY,isAtk:boolean} = this.getRangeRectCfg({x:xy.x - 1,y:xy.y},0);
			let rightGrid:{xy:XY,isAtk:boolean} = this.getRangeRectCfg({x:xy.x + 1,y:xy.y},0);
			let bottomGrid:{xy:XY,isAtk:boolean} = this.getRangeRectCfg({x:xy.x,y:xy.y+1},0);
			let topGrid:{xy:XY,isAtk:boolean} = this.getRangeRectCfg({x:xy.x,y:xy.y -1},0);
			let curKey:string = computerEntitys[i].attr.x + "_" + computerEntitys[i].attr.y
			if(!atkEntitys[curKey]){atkEntitys[curKey] = []}
			if(!moveEntitys[curKey]){moveEntitys[curKey] = []}
			if(leftGrid && leftGrid.isAtk){atkEntitys[curKey].push(leftGrid)};
			if(rightGrid && rightGrid.isAtk){atkEntitys[curKey].push(rightGrid)};
			if(bottomGrid && bottomGrid.isAtk){atkEntitys[curKey].push(bottomGrid)};
			if(topGrid && topGrid.isAtk){atkEntitys[curKey].push(topGrid)};
			if(leftGrid && !leftGrid.isAtk){moveEntitys[curKey].push(leftGrid)};
			if(rightGrid && !rightGrid.isAtk){moveEntitys[curKey].push(rightGrid)};
			if(bottomGrid && !bottomGrid.isAtk){moveEntitys[curKey].push(bottomGrid)};
			if(topGrid && !topGrid.isAtk){moveEntitys[curKey].push(topGrid)};
		}
		let cardDatas:any = {};
		//key值 为当前电脑卡牌的位置索引 value值 为对应的4周格子情况
		for(let key in atkEntitys){
			let couputerPosArr:string[] = key.split("_");
			let computerXY:XY = {x:parseInt(couputerPosArr[0]),y:parseInt(couputerPosArr[1])};
			//获取每一个电脑的卡牌攻击集合中 。可以进行安全攻击的 。利益最大化的 卡牌数据
			let cardData:{xy:XY,isAtk:boolean} = this.getSafeAtk(computerXY,atkEntitys[key]);
			if(cardData){
				cardDatas[key] = cardData;
			}
		}
		if(Object.keys(cardDatas).length){
			//当前存在可以进行 安全攻击 。利益最大的卡牌数据集合 需要 选取其中一个收益最大的卡牌 进行攻击;
			let keys:string[] = Object.keys(cardDatas);
			let max:{xy:XY,isAtk:boolean} = cardDatas[keys[0]];
			let computerKey:string = keys[0];
			let item:CardEntity = this.getEntityFromGrid(max.xy);
			for(let i:number = 1;i<keys.length;i++){
				let item2:CardEntity = this.getEntityFromGrid(cardDatas[keys[i]].xy);
				if(item2.attr.type < item.attr.type){
					item = item2;
					computerKey = keys[i];
					max = cardDatas[keys[i]];
				}
			}
			//找到了 利益最大的卡牌 进行攻击操作
			let couputerPosArr:string[] = computerKey.split("_");
			let computerXY:XY = {x:parseInt(couputerPosArr[0]),y:parseInt(couputerPosArr[1])};
			let atkComputerItem:CardEntity = this.getEntityFromGrid(computerXY);
			//执行攻击缓动 
			this.execAtkAction(max.xy,atkComputerItem,()=>{
				this.refreshTopInfo();
				this.refreshGrid(computerKey,1);
				atkComputerItem.attr.x = max.xy.x;
				atkComputerItem.attr.y = max.xy.y;
				this.refreshGrid(max.xy.x+"_"+max.xy.y,0);
			},this);
			
		}else{
			//不存在电脑可以攻击的卡牌 。执行移动逻辑判断
			let runs:any = {};
			let count:number = 0;
			let len:number = Object.keys(moveEntitys).length;
			for(let key in moveEntitys){
				// 移动时 首先 是否满足 可以 安全的攻击
				let couputerPosArr:string[] = key.split("_");
				let computerXY:XY = {x:parseInt(couputerPosArr[0]),y:parseInt(couputerPosArr[1])};
				//
				this.moveDirectionJudge(computerXY,moveEntitys[key],(data,xy)=>{
					runs[xy.x +"_"+xy.y] = data;
					count += 1;
					if(count >= len){
						//循环执行完毕

						let keys:string[] = Object.keys(runs);
						//优先有危险的格子先移动
						let dangerKey:any = this.judgeDanger(runs);
						let atkKey:any = this.judgeAtk(runs);
						let index:number = (Math.random()*keys.length)>>0;
						let moveItemKey:string = keys[index];
						if(dangerKey){
							//保留 有危险中 。价值最高的卡牌
							moveItemKey = dangerKey;
						}else{
							//没有危险 执行以下逻辑
							
						}
						let moveDirections:{xy:XY,isAtk:boolean}[] = runs[moveItemKey];
						if(!dangerKey && atkKey){
							moveItemKey = Object.keys(atkKey)[0];
							moveDirections = atkKey[moveItemKey];
						}
						if(!moveDirections.length){
							for(let key in runs){
								if(key != moveItemKey && runs[key].length){
									moveItemKey = key;
									moveDirections = runs[key];
									break;
								}
							}
						}
						let curIndex:number = keys.indexOf(moveItemKey);
						let directionIndex:number = (Math.random()*moveDirections.length)>>0;
						let direction:{xy:XY,isAtk:boolean} = moveDirections[directionIndex];

						let couputerPosArr:string[] = moveItemKey.split("_");
						let computerXY:XY = {x:parseInt(couputerPosArr[0]),y:parseInt(couputerPosArr[1])};
						let computerItem:CardEntity = this.getEntityFromGrid(computerXY);

						if(!direction){
							console.log("index----"+directionIndex);
							console.log(moveDirections);
							console.log(runs);
							direction = moveDirections[0];
							if(!direction){
								//备用逻辑 防止直接卡死 。
								let walkArea:{xy:XY,isAtk:boolean}[] = this.getWalkArea(computerXY,0);
								direction = walkArea[0];
								if(!direction){
									//如果还没有 。直接切换回合 重新走逻辑
									this.battleCount = -this.battleCount;
									this.showAnimate();
									return;
								}
							}
						}
						let mx:number = direction.xy.x *(100);
						let my:number = direction.xy.y *(100);
						
						this.refreshGrid(moveItemKey,1);
						computerItem.attr.x = direction.xy.x;
						computerItem.attr.y = direction.xy.y;
						this.refreshGrid(direction.xy.x+"_"+direction.xy.y,0);
						egret.Tween.get(computerItem).to({x:mx,y:my},300).call(()=>{
							egret.Tween.removeTweens(computerItem);
							this.battleCount = -this.battleCount;
							this.showAnimate();
						},this);
					}
				},this);
			}
			//筛选出 电脑卡牌所有实际可走的格子后(已经排除了移动后直接被攻击的情况) 。先选择快要有危险的格子进行移动 
			//需要先选出一个 对自己有利的格子进行行走(可以安全的攻击敌方的) 如果没有 。随便选择一个移动
			//安全的攻击敌方条件 。 我移动后的位置周围 卡牌 优先级 都比我低 安全的直接攻击敌方 | 离敌方还有一定距离 如果是相同的话 优先级排后边 或者不移动
		}
		
	}
	private battleSuccess():void{
		console.log("战斗胜利")
		this.timer.stop();
		egret.Tween.removeAllTweens();
		GlobalFun.setLevelDate();
		ViewManager.inst().open(ResultPopUp,[{state:1}])
	}
	private battleFail():void{
		this.timer.stop();
		console.log("战斗失败")
		egret.Tween.removeAllTweens();
		ViewManager.inst().open(ResultPopUp,[{state:0}])
	}
	/**当移动对象 没有可移动的格子时切换目标 */
	private changeNextTarget(runs,moveItemKey,moveDirections,index?:number):void{
		// if(moveDirections.length <= 0){
		// 	//当前不能走 重新选择
		// 	if(isNaN(index)){
		// 		index = 0;
		// 	}else{
		// 		index+=1;
		// 	}
		// 	let newmoveItemKey:string = Object.keys(runs)[index];
		// 	let newmoveDirections:{xy:XY,isAtk:boolean}[] = runs[moveItemKey];
		// 	this.changeNextTarget(runs,newmoveItemKey,newmoveDirections,index);
		// 	return;
		// }
		
	}
	/**获取当前可以前往攻击的格子 --ai */
	private judgeAtk(runs:any):any{
		let obj = null;
		for(let key in runs){
			let couputerPosArr:string[] = key.split("_");
			let computerXY:XY = {x:parseInt(couputerPosArr[0]),y:parseInt(couputerPosArr[1])};
			let computerEntity:CardEntity = this.getEntityFromGrid(computerXY);
			
			//获取卡牌 周围第二格 的情况
			let routes:{xy:XY,isAtk:boolean}[] = runs[key];
			
			let atkGther:{xy:XY,isAtk:boolean}[] = [];
			for(let i:number = 0;i<routes.length;i++){
				let walkArea:{xy:XY,isAtk:boolean}[] = this.getWalkArea(routes[i].xy,0);
				let boo:boolean = false;
				for(let j:number = 0;j<walkArea.length;j++){
					if(walkArea[j].isAtk){
						//周围存在不同阵营的卡牌 并且 这些卡 都比我的优先级小
						let item:CardEntity = this.getEntityFromGrid(walkArea[j].xy);
						let isAtk:boolean = GlobalFun.isAtk(computerEntity.attr,item.attr);
						if(isAtk && computerEntity.attr.type < item.attr.type){
							//相同的移动过去 可能会被杀掉
							boo = true;
						}
						if(!isAtk && computerEntity.attr.type >= item.attr.type){
							boo = false;
						}
					}
				}
				if(boo){
					//满足了 移动过去主动攻击的条件
					obj = {};
					obj[key] = routes[i];
					break;
				}
			}
			if(obj){
				break;
			}
		}
		return obj;
	}
	/**获取当前有危险的格子 --ai */
	private judgeDanger(runs:any):string{
		let dangerEntity:any[] = [];
		for(let key in runs){
			//key为我当前的电脑卡牌位置
			let couputerPosArr:string[] = key.split("_");
			let computerXY:XY = {x:parseInt(couputerPosArr[0]),y:parseInt(couputerPosArr[1])};
			let computerEntity:CardEntity = this.getEntityFromGrid(computerXY);
			//获取卡牌四周的情况
			let walkArea:{xy:XY,isAtk:boolean}[] = this.getWalkArea(computerXY,0);
			for(let i:number = 0;i<walkArea.length;i++){
				if(walkArea[i].isAtk){
					//当前电脑格子周围存在敌方单位；
					//判断是否会被攻击；
					let item:CardEntity = this.getEntityFromGrid(walkArea[i].xy);
					let isAtk:boolean = GlobalFun.isAtk(item.attr,computerEntity.attr);
					if(isAtk){
						//敌方可以攻击
						dangerEntity.push(key);
						break;
					}
				}
			}
		}
		let max:any = dangerEntity[0];
		let couputerPosArr:string[] = []
		let computerXY:XY = null;
		let maxComputerEntity:CardEntity = null;
		if(max){
			couputerPosArr = max.split("_");
			computerXY = {x:parseInt(couputerPosArr[0]),y:parseInt(couputerPosArr[1])};
			maxComputerEntity = this.getEntityFromGrid(computerXY);
		}
		for(let i:number = 1;i<dangerEntity.length;i++){
			let posArr:string[] = dangerEntity[i].split("_");
			let xy:XY = {x:parseInt(posArr[0]),y:parseInt(posArr[1])};
			let computerEntity:CardEntity = this.getEntityFromGrid(xy);
			if(maxComputerEntity.attr.type > computerEntity.attr.type){
				maxComputerEntity = computerEntity;
				max = dangerEntity[i];
			}
		}
		return max;
	}
	/**
	 * 移动方向后的判断 可移动的区域 
	 * xy 当前电脑卡牌的 xy
	 * 
	 * moveEntitys 当前可以移动的集合
	 * 
	 * 需要做特殊处理 。如果 都有危险 那么随便选择一个移动
	 * */
	private moveDirectionJudge(xy:XY,moveEntitys:{xy:XY,isAtk:boolean}[],execCom?:(data,xy)=>void,arg?:any):void{
		//第一个集合中的方向
		let index:number = 0;
		
		//真正可以行走的集合
		let relaticRun:{xy:XY,isAtk:boolean}[] = [];
		let self = this;
		//备用
		let randomindex:number = (Math.random()*moveEntitys.length)>>0;
		let randomEntity:{xy:XY,isAtk:boolean} = moveEntitys[randomindex];
		function juage(_index:number = 0){
			if(!moveEntitys.length){
				if(execCom && arg){
					execCom.call(arg,relaticRun,xy);
				}
				return;
			}
			let dangerBoo:boolean = false;
			let direction:{xy:XY,isAtk:boolean} = moveEntitys[_index];
			let walkArea:{xy:XY,isAtk:boolean}[] = self.getWalkArea(direction.xy,0);
			for(let i:number = 0;i<walkArea.length;i++){
				if(walkArea[i].isAtk){
					//当前存在不同阵营的卡牌 需要判断我是否会被攻击
					//
					let item1:CardEntity = self.getEntityFromGrid(walkArea[i].xy);
					let computerCard:CardEntity = self.getEntityFromGrid(xy)
					let isAtk:boolean = GlobalFun.isAtk(item1.attr,computerCard.attr);
					if(isAtk){
						dangerBoo = true;
						break;
					}
				}
			}
			if(!dangerBoo){
				//移动后没有危险
				relaticRun.push(moveEntitys[index]);
			}
			index += 1;
			if(index < moveEntitys.length){
				//判断完成
				juage(index);
			}else{
				if(!relaticRun.length){
					//备用移动 。当都不能移动的时候 。随机移动一个
					relaticRun = [randomEntity]
				}
				if(execCom && arg){
					execCom.call(arg,relaticRun,xy);
				}
			}
		}
		//获取移动后的周围情况
		juage(index);
		
	}
	/**获取可以安全攻击的 可以获取最大利益的一个对象 ---ai */
	private getSafeAtk(computerXY:XY,rangeGrids:{xy:XY,isAtk:boolean}[]):{xy:XY,isAtk:boolean}{
		let computerItem:CardEntity = this.getEntityFromGrid(computerXY);
		let atkList:{xy:XY,isAtk:boolean}[] = [];
		for(let i:number = 0;i<rangeGrids.length;i++){
			let item:CardEntity = this.getEntityFromGrid(rangeGrids[i].xy);
			let isAtk:boolean = GlobalFun.isAtk(computerItem.attr,item.attr);
			if(isAtk){
				//当前属性 满足 可以进行攻击 。然后判断是否可以安全攻击
				//获取 假如电脑攻击后的位置 周围情况 当前阵营
				let xy:XY = {x:item.attr.x,y:item.attr.y};
				//匹配到的数据是 玩家的阵营数据
				let walkArea:{xy:XY,isAtk:boolean}[] = this.getWalkArea(xy,0);
				let isDangerBoo:boolean = false;
				for(let key in walkArea){
					if(walkArea[key].isAtk){
						let item:CardEntity = this.getEntityFromGrid(walkArea[key].xy);
						let atkboo:boolean = GlobalFun.isAtk(item.attr,computerItem.attr);
						if(atkboo){
							//当前如果电脑攻击以后 。会有危险
							isDangerBoo = true;
							break;
						}
					}
				}
				if(isDangerBoo){
					//有危险 放弃攻击
					continue;
				}else{
					//没有危险；
					//放到可以进行攻击的列表中 。最后从这个列表中选出一个 攻击得到利益最大的一个;
					atkList.push(rangeGrids[i]);
				}
			}
		}
		let max:{xy:XY,isAtk:boolean} = null;
		if(atkList.length){
			max = atkList[0];
			let item:CardEntity = this.getEntityFromGrid(max.xy);
			for(let i:number = 1;i<atkList.length;i++){
				let item2:CardEntity = this.getEntityFromGrid(atkList[i].xy);
				if(item2.attr.type < item.attr.type){
					item = item2;
					max = atkList[i];
				}
			}
		}
		return max;
		
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		let target = evt.target;
		if(target instanceof CardEntity){
			if(target.attr.camp == 1){
				if(this.selectEntity == target){return}
				this.refreshFocusRect(null,true);
				this.selectEntity = target;
				//当前点击的是己方阵营实体
				let rangeGrids:{xy:XY,isAtk:boolean}[] = this.getWalkArea({x:target.attr.x,y:target.attr.y},this.selectEntity.attr.camp);
				this.refreshFocusRect(rangeGrids);
			}
		}
	}
	/**焦点区域点击 */
	private onFocusRectTouch(evt:egret.TouchEvent):void{
		let namestr:string = evt.target.name;
		if(namestr){
			
			//当前点击到了焦点区域
			let nameArr:string[] = namestr.split("_");
			this.touchEnabled = false;
			this.touchChildren = false;
			let xy:XY = {x:parseInt(nameArr[0]),y:parseInt(nameArr[1])};
			let key:string = this.selectEntity.attr.x + "_" + this.selectEntity.attr.y;
			this.refreshGrid(key,1);
			this.selectEntity.attr.x = xy.x;
			this.selectEntity.attr.y = xy.y;
			this.refreshGrid(xy.x+"_"+xy.y,0);
			this.refreshFocusRect(null,true);
			let mx:number = xy.x*(100);
			let my:number = xy.y*(100 );
			if(parseInt(nameArr[2]) == 0){
				//当前是移动操作
				egret.Tween.get(this.selectEntity).to({x:mx,y:my},300).call(()=>{
					// this.touchEnabled = true;
					// this.touchChildren = true;
					this.battleCount = -this.battleCount;
					egret.Tween.removeTweens(this.selectEntity);
					this.selectEntity = null;
					this.showAnimate();
				},this);
			}else{
				//当前是攻击操作
				this.execAtkAction(xy,this.selectEntity,()=>{
					this.refreshTopInfo();
					this.selectEntity = null;
				},this);
			}
			
		}
	}
	/**
	 * 执行攻击动作 
	 * xy 被攻击者的xy；
	 * atkItem 执行攻击的对象
	 *
	 * */
	private execAtkAction(xy:XY,atkItem:CardEntity,cb?:()=>void,arg?:any):void{
		let dmgItem:CardEntity = this.getEntityFromGrid(xy);
		let layerIndex:number = dmgItem.parent.getChildIndex(dmgItem);
		this.gridGroup.setChildIndex(atkItem,layerIndex +1);
		let mx:number = xy.x*(100 );
		let my:number = xy.y*(100 );
		egret.Tween.get(atkItem).to({x:mx,y:my},300,egret.Ease.circOut).to({x:atkItem.x,y:atkItem.y},200);
		if(dmgItem){
			GlobalFun.shakeObj(dmgItem,1,5,5,()=>{
				//受击震动完成
				egret.Tween.get(dmgItem).to({alpha:0.5},200).to({alpha:1},200).to({alpha:0.5},200).to({alpha:1},200).call(()=>{
					//死亡闪烁完成
					egret.Tween.removeTweens(dmgItem);
					this.removeEntityFromGrid(xy);
					egret.Tween.get(atkItem).to({x:mx,y:my},300).call(()=>{
						//当前攻击单位移动到攻击实体的位置完成
						this.touchEnabled = true;
						this.touchChildren = true;
						egret.Tween.removeTweens(atkItem);
						// this.selectEntity = null;
						if(cb && arg){cb.call(arg);}

						let computerEntitys:CardEntity[] = this.getEntitysFromCamp(0);
						let playerEntitys:CardEntity[] = this.getEntitysFromCamp(1);
						if(!computerEntitys.length){
							this.battleSuccess();
							return;
						}
						if(!playerEntitys.length){
							this.battleFail();
							return;
						}
						this.battleCount = -this.battleCount
						this.showAnimate();
					},this);
				})
			},this);
		}
	}
	/**刷新焦点区域 */
	private refreshFocusRect(rangeGrids:{xy:XY,isAtk:boolean}[],remove?:boolean):void{
		if(remove){
			for(let i:number = 0;i<this.focusRects.length;i++){
				egret.Tween.removeTweens(this.focusRects[i]);
				this.focusRects[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onFocusRectTouch,this);
				if(this.focusRects[i] && this.focusRects[i].parent){
					this.focusRects[i].parent.removeChild(this.focusRects[i]);
				}
			}
			this.focusRects = [];
			return;
		}
		for(let i:number = 0;i<rangeGrids.length;i++){
			let img:eui.Image = new eui.Image();
			img.source = "focusRect_png";
			if(rangeGrids[i].isAtk){
				let item:CardEntity = this.getEntityFromGrid(rangeGrids[i].xy);
				let isAtk:boolean = GlobalFun.isAtk(this.selectEntity.attr,item.attr);
				let num:number = isAtk?1:0;
				if(!isAtk){
					img.visible = false;
					img.touchEnabled = false;
				}
				// rect.fillColor = 0xfc3434;
				img.name = rangeGrids[i].xy.x + "_" + rangeGrids[i].xy.y+"_"+num;
			}else{
				// rect.fillColor = 0x00ff00
				img.name = rangeGrids[i].xy.x + "_" + rangeGrids[i].xy.y+"_"+0;
			}
			img.alpha = 0.8;
			
			this.gridGroup.addChild(img);
			this.focusRects.push(img);
			img.x = rangeGrids[i].xy.x*(100 );
			img.y = rangeGrids[i].xy.y*(100);
			egret.Tween.get(img,{loop:true}).to({alpha:0.5},600).to({alpha:0.8},600);
			img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFocusRectTouch,this);
		}
	}
	/**生成卡牌显示 
	 * ecards 敌方的卡牌
	 * ocards 己方的卡牌
	 * epos 敌方卡牌的位置
	 * opos 己方卡牌的位置
	*/
	private refreshCardShow(camp,cfg:{ecards:string,ocards:string,epos:string,opos:string}):void{
		let cardsArr:string[] = camp == 0?cfg.ecards.split("_"):cfg.ocards.split("_");
		let posArr:string[] = camp == 0?cfg.epos.split("|"):cfg.opos.split("|");
		for(let i:number = 0;i<posArr.length;i++){
			this.refreshGrid(posArr[i],0);
			let grid:string[] = posArr[i].split("_");
			let cardType:number = parseInt(cardsArr[i]);

			let attr:CardAttr = {camp:camp,type:cardType,res:"",x:parseInt(grid[0]),y:parseInt(grid[1])};
			let cardEntity:CardEntity = new CardEntity();
			cardEntity.attr = attr;
			this.gridGroup.addChild(cardEntity);
			cardEntity.x = attr.x*(100 );
			cardEntity.y= attr.y*(100 );
			this.entitys.push(cardEntity);
		}
	}
	/**
	 * 获取当前选择的格子 周围可走区域 
	 * xy 当前选择格子的xy坐标
	 * 
	 * camp 当前执行操作的阵营
	 * 
	 * */
	private getWalkArea(xy:XY,camp:number,range:number = 1):{xy:XY,isAtk:boolean}[]{
		let leftGrid:{xy:XY,isAtk:boolean} = this.getRangeRectCfg({x:xy.x - range,y:xy.y},camp);
		let rightGrid:{xy:XY,isAtk:boolean} = this.getRangeRectCfg({x:xy.x + range,y:xy.y},camp);
		let bottomGrid:{xy:XY,isAtk:boolean} = this.getRangeRectCfg({x:xy.x,y:xy.y+range},camp);
		let topGrid:{xy:XY,isAtk:boolean} = this.getRangeRectCfg({x:xy.x,y:xy.y -range},camp);
		let walkArea:{xy:XY,isAtk:boolean}[] = [];
		if(leftGrid){walkArea.push(leftGrid)};
		if(rightGrid){walkArea.push(rightGrid)};
		if(bottomGrid){walkArea.push(bottomGrid)};
		if(topGrid){walkArea.push(topGrid)};
		return walkArea;
	}
	/**获取周围格子对应配置 */
	private getRangeRectCfg(xy:XY,camp:number):{xy:XY,isAtk:boolean}{
		let obj:{xy:XY,isAtk:boolean};
		if(!isNaN(this.gridData[xy.x+"_"+xy.y])){
			if(this.gridData[xy.x+"_"+xy.y] == 1){
				//当前是可以走
				obj = {xy:xy,isAtk:false}
			}else if(this.gridData[xy.x+"_"+xy.y] == 0){
				//当前有阻挡
				let item:CardEntity = this.getEntityFromGrid(xy);
				if(item && item.attr.camp != camp){
					//当前左边是敌方单位 可以进行选择攻击
					obj = {xy:xy,isAtk:true}
				}
			}
		}
		return obj
	}
	/**根据格子坐标 获取对应的实体单位 */
	private getEntityFromGrid(xy:XY):CardEntity{
		for(let i:number = 0;i<this.entitys.length;i++){
			let item:CardEntity = this.entitys[i];
			if(item.attr.x == xy.x && item.attr.y == xy.y){
				// let isAtk:boolean = GlobalFun.isAtk(this.selectEntity.attr,item.attr);
				// if(isAtk){
				return item;
				// }
			}
		}
		return null;
	}
	/**根据坐标移除对应的实体单位 */
	private removeEntityFromGrid(xy:XY):void{
		for(let i:number = 0;i<this.entitys.length;i++){
			let item:CardEntity = this.entitys[i];
			if(item.attr.x == xy.x && item.attr.y == xy.y){
				if(item && item.parent){
					item.parent.removeChild(item);
				}
				this.entitys.splice(i,1);
				break;
			}
		}
	}
	/**根据阵营获取所有存在的实体对象 */
	public getEntitysFromCamp(camp:number = 0):CardEntity[]{
		let arr:CardEntity[] = [];
		for(let i:number = 0;i<this.entitys.length;i++){
			let item:CardEntity = this.entitys[i];
			if(item.attr.camp == camp){
				arr.push(item);
			}
		}
		return arr;
	}
	/**更新格子坐标 */
	private refreshGrid(key:string,value:number):void{
		this.gridData[key] = value;
	}
	//生成阻挡物
	private createBlock(x:number,y:number):void{

		let img:eui.Image = new eui.Image();
		img.source = "grid_png";
		this.gridGroup.addChild(img);
		img.x = y;
		img.y = x;
		

		let forbidIcon:eui.Image = new eui.Image();
		forbidIcon.source = "forbid_icon_png";
		this.gridGroup.addChild(forbidIcon);
		forbidIcon.x = y + 10;
		forbidIcon.y = x + 10;
	}
	public close():void{
		this.gridGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onComplete,this);
		MessageManager.inst().removeListener("closeStory",this.onCloseStory,this);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.resetBtn,this.onReset);
	}
}
ViewManager.inst().reg(BattleView,LayerManager.UI_Main)