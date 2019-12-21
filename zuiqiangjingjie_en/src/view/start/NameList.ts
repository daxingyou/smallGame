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
        "Ma Nan" , "Faraday" , "Cao" , "Irving" , "Terry" , "Beck" , "hunter" , "Carter" , "Smith" , "Turner" , "Holzer" , "Brook" , "Green" , "Wood" , "Fawkes" , "Hawke" 
    ];
    private ming: string[]=[
        "Frank",
        "Barthes",
        "Kelvin",
        "Julie",
        "Emma",
        "LAN Sha Sha",
        "Eades",
        "Stella",
        "Plum blossom",
        "Amanda",
        "Marianne",
        "Lorrain",
        "Kate",
        "Kelly",
        "Diego",
        "Halle",
        "Nick",
        "Aileen",
        "Eve",
        "Solomon",
        "Paul",
        "Colin",
        "Alva",
        "Elvis",
        "Edwin",
        "Abel"
    ];

    public randomName():string {
        let _name = this.ming[ Math.floor( Math.random()*this.ming.length ) ] + " " + this.xing[ Math.floor( Math.random()*this.xing.length ) ];
        return _name;
    }
    public city_name: string[] = [
        "Vick" , "Doville" , "Ma Zan" , "Mccann" , "Lucknow" , "Arthedain" , "Du gong xi" , "Supreme" , "Noon", "Carcassonne", "Mithrim", "Boya Les", "Suo Cora"
    ];
}