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
        "刘" , "王" , "曹" , "马" , "赵" , "孙" , "关" , "诸葛" , "司马" , "公孙" , "郭" , "吕" , "吴" , "慕容" , "张" , "刘" 
    ];
    private ming: string[]=[
        "飞",
        "镜",
        "润",
        "培",
        "海",
        "澜",
        "丰",
        "二",
        "九",
        "啸",
        "锦",
        "启",
        "天",
        "鑫",
        "世",
        "思",
        "浩",
        "子",
        "守",
        "鹏",
        "同",
        "文",
        "波",
        "亮",
        "慧",
        "广",
        "宽",
        "心",
        "学",
        "雪",
        "智",
        "一",
        "八",
        "铭",
        "阔",
        "韬",
        "洛",
        "凯",
        "白",
        "志",
        "风" 
    ];

    public randomName():string {
        let _name = this.xing[ Math.floor( Math.random()*this.xing.length ) ] + this.ming[ Math.floor( Math.random()*this.ming.length ) ];
        return _name;
    }

    public city_name: string[] = [
        "荆州" , "兖州" , "雍州" , "青州" , "冀州" , "徐州" , "豫州" , "扬州" , "凉州"
    ];
}