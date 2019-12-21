/**
 * Created by yangsong on 2014/11/22.
 * Object pool class
 */
class ObjectPool {
	private static _content: any = {};
	private _objs: Array<any>;

	/**
	 * Constructor
	 */
	public constructor() {
		this._objs = new Array<any>();
	}

	/**
	 * Put back an object
	 * @param obj
	 */
	public pushObj(obj: any): void {
		this._objs.push(obj);
	}

	/**
	 * Take out an object
	 * @returns {*}
	 */
	public popObj(): any {
		if (this._objs.length > 0) {
			return this._objs.pop();
		} else {
			return null;
		}
	}

	/**
	 * Clear all cached objects
	 */
	public clear(): void {
		while (this._objs.length > 0) {
			this._objs.pop();
		}
	}

	/**
	 * Take out an object
	 * @param classZ Class
	 * @return Object
	 *
	 */
	public static pop(refKey: string, ...args: any[]): any {
		if (!ObjectPool._content[refKey]) {
			ObjectPool._content[refKey] = [];
		}

		let list: Array<any> = ObjectPool._content[refKey];
		if (list.length) {
			let i: any = list.pop();
			//if (refKey == "CharMonster") {
			//	debug.log("Take one.CharMonster:" + i.hashCode);
			//}
			return i;
		} else {
			let classZ: any = egret.getDefinitionByName(refKey);
			let argsLen: number = args.length;
			let obj: any;
			if (argsLen == 0) {
				obj = new classZ();
			} else if (argsLen == 1) {
				obj = new classZ(args[0]);
			} else if (argsLen == 2) {
				obj = new classZ(args[0], args[1]);
			} else if (argsLen == 3) {
				obj = new classZ(args[0], args[1], args[2]);
			} else if (argsLen == 4) {
				obj = new classZ(args[0], args[1], args[2], args[3]);
			} else if (argsLen == 5) {
				obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
			}
			obj.ObjectPoolKey = refKey;
			return obj;
		}
	}

	/**
	 * Take out an object
	 * @param refKey Class
	 * @param extraKey Identification value
	 * @returns {any}
	 */
	public static popWithExtraKey(refKey: string, extraKey: any): any {
		if (!ObjectPool._content[refKey]) {
			ObjectPool._content[refKey] = [];
		}

		let obj: any;
		let list: Array<any> = ObjectPool._content[refKey];
		if (list.length) {
			for (let i = 0; i < list.length; i++) {
				if (list[i].extraKey == extraKey) {
					obj = list[i];
					list.splice(i, 1);
					break;
				}
			}
		}
		if (!obj) {
			let classZ: any = egret.getDefinitionByName(refKey);
			obj = new classZ(extraKey);
			obj.extraKey = extraKey;
			obj.ObjectPoolKey = refKey;
		}
		return obj;
	}

	/**
	 * Put an object
	 * @param obj
	 *
	 */
	public static push(obj: any): boolean {
		if (obj == null) {
			return false;
		}

		let refKey: any = obj.ObjectPoolKey;
		//Guarantee onlypopThe objects that come out can be put in，Or the cleared ones can't be put in
		if (!ObjectPool._content[refKey] || ObjectPool._content[refKey].indexOf(obj) > -1) {
			return false;
		}

		ObjectPool._content[refKey].push(obj);
		//if (refKey == "CharMonster") {
		//	debug.log("Let's play one.CharMonster" + obj.hashCode);
		//}
		return true;
	}

	/**
	 * Clear all objects
	 */
	public static clear(): void {
		ObjectPool._content = {};
	}

	/**
	 * Clear a class of objects
	 * @param classZ Class
	 * @param clearFuncName Functions needed to clear objects
	 */
	public static clearClass(refKey: string, clearFuncName: string = null): void {
		let list: Array<any> = ObjectPool._content[refKey];
		while (list && list.length) {
			let obj: any = list.pop();
			if (clearFuncName) {
				obj[clearFuncName]();
			}
			obj = null;
		}
		ObjectPool._content[refKey] = null;
		delete ObjectPool._content[refKey];
	}

	/**
	 * The object in cache executes a function uniformly
	 * @param classZ Class
	 * @param dealFuncName Function name to execute
	 */
	public static dealFunc(refKey: string, dealFuncName: string): void {
		let list: Array<any> = ObjectPool._content[refKey];
		if (list == null) {
			return;
		}

		let i: number = 0;
		let len: number = list.length;
		for (i; i < len; i++) {
			list[i][dealFuncName]();
		}
	}
}