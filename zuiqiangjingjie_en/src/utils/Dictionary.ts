class Dictionary {
	private _keys:any[] = [];
    private _values:any[] = [];
	
	/**
	 * Get a list of all child elements。
	 */
	public get values():any[] {
		return this._values;
	}
	
	/**
	 * Get a list of all child element key names。
	 */
	public get keys():any[] {
		return this._keys;
	}
	
	/**
	 * Sets a value for the specified key name。
	 * @param   key Key name。
	 * @param   value value。
	 */
	public setKeyValue(key:any, value:any):void {
		var index:number = this._keys.indexOf(key);
		if (index >= 0) {
			this._values[index] = value;
			return;
		}
		this._keys.push(key);
		this._values.push(value);
	}
	
	/**
	 * Returns the value of the specified key name。
	 * @param   key Key name object。
	 * @return Specify the value of the key name。
	 */
	public getValue(key:any):any {
		var index:number = this._keys.indexOf(key);
		return index < 0 ? null : this._values[index];
	}
	
	/**
	 * Remove the value of the specified key name。
	 * @param   key Key name object。
	 * @return Remove successfully。
	 */
	public remove(key:any):Boolean {
		var index:number = this._keys.indexOf(key);
		if (index >= 0) {
			this._keys.splice(index, 1);
			this._values.splice(index, 1);
			return true;
		}
		return false;
	}
	
	/**
	 * Clear the list of key names and key values for this object。
	 */
	public clear():void {
		this._values.length = 0;
		this._keys.length = 0;
	}
}