/**
 * Created by yangsong on 15-1-20.
 */
class DeviceUtils {

	/**
	 * Is currentHtml5Edition
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsHtml5(): boolean {
		return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
	}

	/**
	 * Is it currentlyNativeEdition
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsNative(): boolean {
		return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
	}

	/**
	 * Is it on the phone
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsMobile(): boolean {
		return egret.Capabilities.isMobile;
	}

	/**
	 * Is it in?PCupper
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsPC(): boolean {
		return !egret.Capabilities.isMobile;
	}

	/**
	 * Whether it isQQBrowser
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsQQBrowser(): boolean {
		return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
	}

	/**
	 * Whether it isIEBrowser
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsIEBrowser(): boolean {
		return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
	}

	/**
	 * Whether it isFirefoxBrowser
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsFirefoxBrowser(): boolean {
		return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
	}

	/**
	 * Whether it isChromeBrowser
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsChromeBrowser(): boolean {
		return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
	}

	/**
	 * Whether it isSafariBrowser
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsSafariBrowser(): boolean {
		return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
	}

	/**
	 * Whether it isOperaBrowser
	 * @returns {boolean}
	 * @constructor
	 */
	public static get IsOperaBrowser(): boolean {
		return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
	}
}