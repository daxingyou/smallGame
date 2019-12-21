class GuideCfg {
	
	public static readonly guidecfg:any = {
		"1_1":{"event":CustomEvt.GUIDE_CLICK_CITY,next:"1_2",param:{id:"1_1"},cnt:"commander,Let's start from here!!!"},
		"1_2":{"event":CustomEvt.GUIDE_CLICK_BATTLE,next:"",param:{id:"1_1"},cnt:"Click to start the pre War deployment"}
	}
}