class NameList {
    private static _inst: NameList;
    public constructor(){}
    public static inst():NameList{
        if( !this._inst ){
            this._inst = new NameList();
        }
        return this._inst;
    }

    private xing: string[]=[
        "马南" , "法拉第" , "曹" , "欧文" , "特里" , "贝克" , "享特" , "卡特" , "史密斯" , "特纳" , "霍尔" , "布鲁克" , "格林" , "伍德" , "福克斯" , "霍克" 
    ];
    private ming: string[]=[
        "弗兰克",
        "巴特",
        "开尔文",
        "朱莉",
        "艾玛",
        "兰瑞莎",
        "伊迪斯",
        "斯特拉",
        "梅",
        "阿曼达",
        "玛丽安",
        "洛兰",
        "凯特",
        "凯利",
        "迪亚高",
        "哈丽",
        "尼克",
        "艾琳",
        "伊夫",
        "所罗门",
        "保罗",
        "科林",
        "阿尔瓦",
        "埃尔维斯",
        "埃德温",
        "艾贝尔"
    ];

    public randomName():string {
        let _name = this.ming[ Math.floor( Math.random()*this.ming.length ) ] + "·" + this.xing[ Math.floor( Math.random()*this.xing.length ) ];
        return _name;
    }
    public city_name: string[] = [
        "维克" , "多维尔" , "马赞" , "麦肯" , "勒克瑙" , "雅西顿" , "杜根西" , "至高" , "诺恩", "卡尔卡松", "米斯林", "博亚莱斯", "索科特拉"
    ];
}