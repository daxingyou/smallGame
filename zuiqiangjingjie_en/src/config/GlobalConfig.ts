class GlobalConfig {

	private static init:boolean;

	private static config:any;

	static setData(data:any)
	{
		this.config = data;
	}

	static parserData() {
		if (this.init) return;
		if (!this.config) return;
		for (let key in this.config) {
			let value = this.config[key];
			let objCls = egret.getDefinitionByName(key);
			if (objCls) {
				//Used to store and configure a default instance
				let objKey = `_obj${key}`;
				this[objKey] = new objCls();
				//Used to confirm whether the configuration table has been set __proto__ by Stored examples（this[objKey])
				let boolKey = `_bool${key}`;
				this[boolKey] = false;
				//Store the real configuration inthis[newKey]in
				let newKey = `_${key}_`;
				//EstablishkeyReference configuration
				Object.defineProperty(this, key, {
					get: function () {
						let obj = this[newKey];
						if (this[boolKey]) return obj;
						let proto = this[objKey];
						this.parseKeys(obj, proto, GlobalConfig.keys[key] || 0);
						this[boolKey] = true;
						return obj;
					},
					set: function (val) {
						this[newKey] = val;
					}
				});
			}
			//assignment
			this[key] = value;
		}
		//Data initialization completed
		this.init = true;
		this.config = null;
	}

	private static parseKeys(obj: any, proto: any, key: number) {
		if (key == 0) {
			obj.__proto__ = proto;
		} else {
			for (let i in obj) {
				this.parseKeys(obj[i], proto, key - 1);
			}
		}
	}
	// static QuestionCfg:QuestionCfg[];
	private static keys = {
		"QuestionCfg": 1
	};
}
