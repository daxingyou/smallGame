/**
 * Created by zhangac on 2016/11/23.
 */
class Algorithm {
	public static sortAsc(b1, b2): number {
		if (b1 < b2) return -1;
		else if (b1 > b2) return 1;
		else return 0;
	}

		/**
	 * according toobj1 obj2OfattrAttribute ranking
	 * No passattrAccording toobj1，obj2Comparative size
	 * @param obj1
	 * @param obj2
	 * @param attr
	 */
	public static sortAscAttr(obj1, obj2, attr?:string): number {
		let result: number;
		if(attr == undefined){
			result = Algorithm.sortAsc(obj1, obj2);
		}
		else{
			let attr1 = obj1[attr];
			let attr2 = obj2[attr];
			if (attr1 < attr2){
				result = -1;
			}
			else if (attr1  > attr2){
				result = 1;
			}
			else{
				result = 0;
			}
		}
		return result;
	}

	public static sortDesc(b1, b2): number {
		if (b1 > b2) return -1;
		else if (b1 < b2) return 1;
		else return 0;
	}

	/**
	 * according toobj1 obj2OfattrAttribute ranking
	 * No passattrAccording toobj1，obj2Comparative size
	 * @param obj1
	 * @param obj2
	 * @param attr
	 */
	public static sortDescAttr(obj1, obj2, attr?:string): number {
		let result: number;
		if(attr == undefined){
			result = Algorithm.sortDesc(obj1, obj2);
		}
		else{
			let attr1 = obj1[attr];
			let attr2 = obj2[attr];
			if (attr1 > attr2){
				result = -1;
			}
			else if (attr1  < attr2){
				result = 1;
			}
			else{
				result = 0;
			}
		}
		return result;
	}

	//Two points search
	//tab Table to retrieve
	// item What to search for
	// binFunc Functions for comparison，When pure numberstabThis parameter can be empty，The default retrieved location is the last inserted location
	public static binSearch(tab: any[], item: any, binFunc: Function = null): number {
		if (!tab || tab.length == 0) return 0;

		if (!binFunc)
			binFunc = Algorithm.sortAsc;
		let low = 0;
		let high = tab.length - 1;

		while (low <= high) {
			let mid = (high + low) >> 1;
			let val: any = tab[mid];
			if (binFunc(val, item) <= 0) {
				low = mid + 1;
			}
			else {
				high = mid - 1;
			}
		}
		return low;
	}

	public static test() {
		let arr = [];
		const MAX = 10;
		for (let i = 0; i < MAX; i++) {
			let r = Math.floor(Math.random() * 100000);
			let index = Algorithm.binSearch(arr, r);
			arr.splice(index, 0, r);
		}
		if (arr.length != MAX)
			debug.log(`test fail!count is ${arr.length}, except:${MAX}`);
		for (let val of arr) {
			debug.log(val);
		}

		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] > arr[i + 1]) {
				debug.log(`test fail!index:${i}`);
				break;
			}
		}
	}
}
