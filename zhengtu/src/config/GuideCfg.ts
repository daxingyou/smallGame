class GuideCfg {
	
	public static readonly guidecfg:any = {
		"1_1":{"event":CustomEvt.GUIDE_CLICK_COLLECT,next:"",wait:"1_2",param:{},tip:"集结队伍,准备征战"},
		"1_2":{"event":CustomEvt.GUIDE_CLICK_BATTLE,next:"",param:{},wait:"1_3",tip:""},
		"1_3":{"event":CustomEvt.GUIDE_SELECT_LEVEL,next:"",wait:"2_1",param:{}},
		// "1_3":{"event":CustomEvt.GUIDE_USE_SKILL,next:"",wait:"2_1",param:{},tip:"使用强力技能,击退敌人,切记每个技能可以使用一次"},

		"2_1":{"event":CustomEvt.GUIDE_OPEN_GENERAL,next:"",wait:"2_2",param:{}},
		"2_2":{"event":CustomEvt.GUIDE_ADD_SOLDIER,next:"2_3",wait:"",param:{},tip:"及时的补充兵力,为下一回的战斗做准备"},
		"2_3":{"event":CustomEvt.GUIDE_TRAIN_SOLDIER,next:"2_4",param:{}},
		"2_4":{"event":CustomEvt.GUIDE_CLOSE_SOLDIER,next:"",param:{}},


		// "3_1":{"event":CustomEvt.GUIDE_CLICK_BUILD_GOODS,next:"3_2",param:{}},
		// "3_2":{"event":CustomEvt.GUIDE_COLLECT_FE,next:"3_3",param:{},tip:"运输可以获得大量资源(补充兵力的必需品)"},
		// "3_3":{"event":CustomEvt.GUIDE_QUICK_FE,next:"3_4",param:{},tip:"花费黄金可以加速资源的运输"},
		// "3_4":{"event":CustomEvt.GUIDE_COLLECT_WOOD,next:"3_5",param:{}},
		// "3_5":{"event":CustomEvt.GUIDE_COLLECT_GOOD,next:"3_6",param:{}},
		// "3_6":{"event":CustomEvt.GUIDE_CLOSE_COLLECT,next:"",param:{}},
	}
}