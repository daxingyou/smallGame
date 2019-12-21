class DateStyle extends BaseClass {
	/**format */
	public format: string[] = [];
	/** Starting accuracy*/
	public from: number = 0;
	/**End accuracy */
	public to: number = 0;
	/**Whether to make up0 */
	public isFormatNum: boolean = false;

	public constructor(format: string[], from: number, to: number, isFormatNum: boolean) {
		super();
		this.format = format;
		this.from = from;
		this.to = to;
		this.isFormatNum = isFormatNum;
	}
}

/**
 * Created by yangsong on 2014/11/22.
 * DateTool class
 */
class DateUtils {
	/**Time format1 00:00:00 */
	public static TIME_FORMAT_1: number = 1;
	/**Time format2 yyyy-mm-dd h:m:s */
	public static TIME_FORMAT_2: number = 2;
	/**Time format3 00:00 */
	public static TIME_FORMAT_3: number = 3;
	/**Time format4 xxDays ago/xxHours ago/xxMinutes ago */
	public static TIME_FORMAT_4: number = 4;
	/**Time format5 xdayxhourxbranchxsecond */
	public static TIME_FORMAT_5: number = 5;
	/**Time format6 h:m:s */
	public static TIME_FORMAT_6: number = 6;
	/**Time format7 xxday/xxhour/<1hour */
	public static TIME_FORMAT_7: number = 7;
	/**Time format8 yyyy-mm-dd h:m */
	public static TIME_FORMAT_8: number = 8;
	/**Time format9 xhourxMinutexsecond */
	public static TIME_FORMAT_9: number = 9;
	/**Time format10 xbranchxsecond**/
	public static TIME_FORMAT_10: number = 10;
	/**Time format11xTimexbranchxsecond**/
	public static TIME_FORMAT_11: number = 11;
	/**Time format12 x:x:x**/
	public static TIME_FORMAT_12: number = 12;
	/**Time format13 xmonthxday（Zhou Ji）h:m**/
	public static TIME_FORMAT_13: number = 13;
	/**Time format14 xTimexbranch**/
	public static TIME_FORMAT_14: number = 14;
	/**Time format15 mm-dd h:m */
	public static TIME_FORMAT_15: number = 15;

	/**Milliseconds in a second */
	public static MS_PER_SECOND: number = 1000;
	/**Milliseconds in a minute */
	public static MS_PER_MINUTE: number = 60 * 1000;
	/**Milliseconds in an hour */
	public static MS_PER_HOUR: number = 60 * 60 * 1000;
	/**Milliseconds of the day */
	public static MS_PER_DAY: number = 24 * 60 * 60 * 1000;

	public static SECOND_PER_HOUR: number = 3600;//Seconds of an hour
	public static SECOND_PER_DAY: number = 86400;//Seconds of the day
	private static SECOND_PER_MONTH: number = 2592000;//One month(30day)Seconds
	private static SECOND_PER_YEAR: number = 31104000;//A year(360day)Seconds

	public static DAYS_PER_WEEK: number = 7;//Days of the week

	public static YEAR_PER_YEAR: number = 1;//Number of years per year
	public static MONTH_PER_YEAR: number = 12;//Months per year
	public static DAYS_PER_MONTH: number = 30;//Day of Month 
	public static HOURS_PER_DAY: number = 24;//Hours per day
	public static MUNITE_PER_HOUR: number = 60;//Minutes per hour
	public static SECOND_PER_MUNITE: number = 60;//Seconds per minute
	public static SECOND_PER_SECOND: number = 1;//Seconds per second
	public static SECOND_2010: number = 1262275200;//1970year~2010year1month1day0Time0branch0Second time stamp(Company:second)
	/**Remainder ,Used to calculate time*/
	private static mod: number[] = [DateUtils.SECOND_PER_MUNITE, DateUtils.MUNITE_PER_HOUR, DateUtils.HOURS_PER_DAY, DateUtils.DAYS_PER_MONTH, DateUtils.MONTH_PER_YEAR, DateUtils.YEAR_PER_YEAR];
	/**Divisor Used to calculate time*/
	private static mul: number[] = [DateUtils.SECOND_PER_SECOND, DateUtils.SECOND_PER_MUNITE, DateUtils.SECOND_PER_HOUR, DateUtils.SECOND_PER_DAY, DateUtils.SECOND_PER_MONTH, DateUtils.SECOND_PER_YEAR];
	/**Days of the week */
	/**Hours of the day */
	/** Used in this gameMiniDateTimeStart date of time relative toflashtime(1970-01-01)Time difference（Millisecond） */
	public static MINI_DATE_TIME_BASE: number = Date.UTC(2010, 0) + new Date().getTimezoneOffset() * DateUtils.MS_PER_MINUTE;
	/**
	 * Time zone offset（Msec）<BR>
	 * At present, China adopts Zone 8，I.e. more coordinated time than the world（UTC）/Greenwich mean time（GMT）fast8Time zone for hours */
	public static TIME_ZONE_OFFSET: number = 8 * DateUtils.MS_PER_HOUR;

	/**Accuracy */
	public static TO_SECOND: number = 0;
	public static TO_MINUTE: number = 1;
	public static TO_HOUR: number = 2;
	public static TO_DAY: number = 3;
	public static TO_MONTH: number = 4;
	public static TO_YEAR: number = 5;
	/** nyearnmonthndaynTimenbranchnsecond */
	private static FORMAT_1: string[] = ["second", "branch", "Time", "day", "month", "year"];
	/** xx:xx:xx */
	private static FORMAT_2: string[] = [":", ":", ":", ":", ":", ":"];
	public static WEEK_CN: string[] = [`day`, `One`, `Two`, `Three`, `Four`, `Five`, `Six`];

	/**xhourxbranchxsecond */
	public static STYLE_1: DateStyle = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_HOUR, false);
	/** xdayxhourxMinutexsecond */
	public static STYLE_2: DateStyle = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_DAY, false);
	/** 00:00:00 */
	public static STYLE_3: DateStyle = new DateStyle(DateUtils.FORMAT_2, DateUtils.TO_SECOND, DateUtils.TO_HOUR, true);
	/** xbranchxsecond */
	public static STYLE_4: DateStyle = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_MINUTE, true);

	public constructor() {
	}

	/**
	 * Get time formatted string
	 * @second second
	 * @style Formatting style, for example :DateUtils.STYLE_1
	 *  */
	public static getFormatTimeByStyle(second: number, style: DateStyle = DateUtils.STYLE_1): string {
		if (second < 0) {
			second = 0;
			debug.log("Wrong input parameters!Negative time:" + second);
		}
		if (style.from > style.to) {
			debug.log("Wrong input parameters!toParameter must be greater than or equal tofromparameter,Please check.styleParameter value");
			return "";
		}
		second = second >> 0;
		let result: string = "";
		for (let i: number = style.to; i >= style.from; i--) {
			let time: number = second / this.mul[i];//In total
			let timeStr: string = "";
			if (i != style.to)
				time = time % this.mod[i];//Surplus
			if (style.isFormatNum && time < 10)
				timeStr = "0" + (time >> 0).toString();//repair0
			else
				timeStr = (time >> 0).toString();
			result += (timeStr + style.format[i]);
		}
		return result;
	}

	/**
	 * Get time formatted string
	 * @ms Millisecond
	 * @style Formatting style, for example :DateUtils.STYLE_1
	 *  */
	public static getFormatTimeByStyle1(ms: number, style: DateStyle = DateUtils.STYLE_1): string {
		return this.getFormatTimeByStyle(ms / this.MS_PER_SECOND);
	}

	/**
	 * holdMiniDateTimeConvert to distance1970-01-01Millisecond count
	 * @param mdt from2010Seconds from the beginning of
	 * @return from1970Milliseconds since
	 */
	public static formatMiniDateTime(mdt: number): number {
		return DateUtils.MINI_DATE_TIME_BASE + (mdt & 0x7FFFFFFF) * DateUtils.MS_PER_SECOND;
	}

	/**Time to convert to server***/
	public static formatServerTime(time: number): number {
		return (time - DateUtils.MINI_DATE_TIME_BASE) / DateUtils.MS_PER_SECOND;
	}


	/**
	 * Format string based on seconds
	 * @param  {number} second            Seconds
	 * @param  {number=1} type            Time format type（Reference resourcesDateUtils.TIME_FORMAT_1, DateUtils.TIME_FORMAT_2...)
	 * @param  {showLength}    showLength    Display length（One time unit is one length，And only intypebyDateUtils.TIME_FORMAT_5In case of）
	 * @returns string
	 */
	public static getFormatBySecond(second: number, type: number = 1, showLength: number = 2): string {
		let str: string = "";
		let ms: number = second * 1000;
		switch (type) {
			case this.TIME_FORMAT_1:
				str = this.format_1(ms);
				break;
			case this.TIME_FORMAT_2:
				str = this.format_2(ms);
				break;
			case this.TIME_FORMAT_3:
				str = this.format_3(ms);
				break;
			case this.TIME_FORMAT_4:
				str = this.format_4(ms);
				break;
			case this.TIME_FORMAT_5:
				str = this.format_5(ms, showLength);
				break;
			case this.TIME_FORMAT_6:
				str = this.format_6(ms);
				break;
			case this.TIME_FORMAT_7:
				str = this.format_7(ms);
				break;
			case this.TIME_FORMAT_8:
				str = this.format_8(ms);
				break;
			case this.TIME_FORMAT_9:
				str = this.format_9(ms);
				break;
			case this.TIME_FORMAT_10:
				str = this.format_10(ms);
				break;
			case this.TIME_FORMAT_11:
				str = this.format_11(ms);
				break;
			case this.TIME_FORMAT_12:
				str = this.format_12(ms);
				break;
			case this.TIME_FORMAT_13:
				str = this.format_13(ms);
				break;
			case this.TIME_FORMAT_14:
				str = this.format_14(ms);
				break;
			case this.TIME_FORMAT_15:
				str = this.format_15(ms);
				break;
		}
		return str;
	}

	/**
	 * Get to specified date00：00Seconds
	 * **/
	public static getRenainSecond(ms?: number): string {
		let tmpDate = ms ? new Date(ms) : new Date();
		//tmpDate.setDate(tmpDate.getDate()+1);
		let ptime = (DateUtils.getTodayZeroSecond(tmpDate) + 60 * 60 * 24) - tmpDate.getTime() / 1000;
		// debug.log("ptime = " + ptime);
		return ptime.toFixed(0);
	}

	/**
	 * Seconds passed today
	 * **/
	public static getTodayPassedSecond(): number {
		let tmpDate = new Date();
		let tdyPassTime = ((Date.now() - (new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime())) / 1000).toFixed(0);
		return parseInt(tdyPassTime);
	}

	/**
	 * Get the specified date00:00Seconds of time
	 * @parma Millisecond
	 * @returns {number}
	 */
	public static getTodayZeroSecond(tdate?: any): number {
		let tmpDate = tdate ? tdate : new Date();
		return parseInt(((new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime()) / 1000).toFixed(0));
	}

	/**
	 * Get the first day of the week
	 * **/
	public static showWeekFirstDay(): any {
		let Nowdate: any = new Date();
		let day = Nowdate.getDay();
		day = day ? day : 7
		let WeekFirstDay = new Date(Nowdate - (day - 1) * 86400000);
		// var M=Number(WeekFirstDay.getMonth())+1
		// return WeekFirstDay.getYear()+"-"+M+"-"+WeekFirstDay.getDate();
		return WeekFirstDay;
	}

	/**
	 * Get the last day of the week
	 * @param Millisecond difference
	 */
	public static showWeekLastDay() {
		let Nowdate = new Date();
		let WeekFirstDay = DateUtils.showWeekFirstDay();
		let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
		// var M=Number(WeekLastDay.getMonth())+1
		// return WeekLastDay.getYear()+"-"+M+"-"+WeekLastDay.getDate();
		return WeekLastDay;
	}

	/**
	 * Find out the current time from next Monday morning0Still bad
	 * @param Millisecond difference
	 * **/
	public static calcWeekFirstDay() {
		// var lastDay = showWeekLastDay().getDay();
		// lastDay = lastDay > 0?lastDay:7;
		let Nowdate = new Date();
		let curDay = Nowdate.getDay();
		curDay = curDay > 0 ? curDay : 7;
		let difday = 7 - curDay;//use
		let hours = Nowdate.getHours();
		let minutes = Nowdate.getMinutes();
		let seconds = Nowdate.getSeconds();
		// debug.log("difday = "+difday);
		// debug.log("hours = "+hours);
		// debug.log("minutes = "+minutes);
		// debug.log("seconds = "+seconds);
		let sum = difday * 86400 * 1000 + 86400 * 1000 - (hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000);
		return new Date(sum);
	}

	/**
	 * format1  00:00:00
	 * @param  {number} sec Msec
	 * @returns string
	 */
	private static format_1(ms: number): string {
		let n: number = 0;
		let result: string = "##:##:##";

		n = Math.floor(ms / DateUtils.MS_PER_HOUR);
		result = result.replace("##", DateUtils.formatTimeNum(n));
		if (n) ms -= n * DateUtils.MS_PER_HOUR;

		n = Math.floor(ms / DateUtils.MS_PER_MINUTE);
		result = result.replace("##", DateUtils.formatTimeNum(n));
		if (n) ms -= n * DateUtils.MS_PER_MINUTE;

		n = Math.floor(ms / 1000);
		result = result.replace("##", DateUtils.formatTimeNum(n));
		return result;
	}

	/**
	 * format2  yyyy-mm-dd h:m:s
	 * @param  {number} ms        Msec
	 * @returns string            Return to oneself1970year1month1Number0Time point corresponding to the start of point
	 */
	private static format_2(ms: number): string {
		let date: Date = new Date(ms);
		let year: number = date.getFullYear();
		let month: number = date.getMonth() + 1; 	//Month returned from0-11；
		let day: number = date.getDate();
		let hours: number = date.getHours();
		let minute: number = date.getMinutes();
		let second: number = date.getSeconds();
		return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
	}

	/**
	 * format3  00:00
	 * @param  {number} ms        Msec
	 * @returns string            branch:second
	 */
	private static format_3(ms: number): string {
		let str: string = this.format_1(ms);
		let strArr: string[] = str.split(":");
		return strArr[1] + ":" + strArr[2];
	}

	/**
	 * format4  xxDays ago，xxHours ago，xxMinutes ago
	 * @param  {number} ms        Millisecond
	 * @returns string
	 */
	private static format_4(ms: number): string {
		if (ms < this.MS_PER_HOUR) {
			return Math.floor(ms / this.MS_PER_MINUTE) + "Minutes ago";
		}
		else if (ms < this.MS_PER_DAY) {
			return Math.floor(ms / this.MS_PER_HOUR) + "Hours ago";
		}
		else {
			return Math.floor(ms / this.MS_PER_DAY) + "Days ago";
		}
	}

	/**
	 * format5 XdayXhourXbranchXsecond
	 * @param  {number} ms                Millisecond
	 * @param  {number=2} showLength    Display length（One time unit is one length）
	 * @returns string
	 */
	private static format_5(ms: number, showLength: number = 2): string {
		let result: string = "";
		let unitStr: string[] = ["day", "Time", "branch", "second"];
		let arr: number[] = [];

		let d: number = Math.floor(ms / this.MS_PER_DAY);
		arr.push(d);
		ms -= d * this.MS_PER_DAY;
		let h: number = Math.floor(ms / this.MS_PER_HOUR);
		arr.push(h);
		ms -= h * this.MS_PER_HOUR;
		let m: number = Math.floor(ms / this.MS_PER_MINUTE);
		arr.push(m);
		ms -= m * this.MS_PER_MINUTE;
		let s: number = Math.floor(ms / 1000);
		arr.push(s);

		for (let k in arr) {
			if (arr[k] > 0) {
				result += this.formatTimeNum(arr[k], Number(k)) + unitStr[k];
				showLength--;
				if (showLength <= 0) break;
			}
		}

		return result;
	}

	/**
	 * format6  h:m:s
	 * @param  {number} ms        Millisecond
	 * @returns string            Return to oneself1970year1month1Number0Time point corresponding to the start of point（Excluding mm / DD / yyyy）
	 */
	private static format_6(ms: number): string {
		let date: Date = new Date(ms);
		let hours: number = date.getHours();
		let minute: number = date.getMinutes();
		let second: number = date.getSeconds();
		return this.formatTimeNum(hours) + ":" + this.formatTimeNum(minute) + ":" + this.formatTimeNum(second);
	}

	/**
	 * format7  Xday/Xhour/<1hour
	 * @param  {number} ms        Millisecond
	 * @returns string
	 */
	private static format_7(ms: number): string {
		if (ms < this.MS_PER_HOUR) {
			return "<1hour";
		}
		else if (ms < this.MS_PER_DAY) {
			return Math.floor(ms / this.MS_PER_HOUR) + "hour";
		}
		else {
			return Math.floor(ms / this.MS_PER_DAY) + "day";
		}
	}

	//8:yyyy-mm-dd h:m
	private static format_8(time: number): string {
		var date: Date = new Date(time);
		var year: number = date.getFullYear();
		var month: number = date.getMonth() + 1; 	//Month returned from0-11；
		var day: number = date.getDate();
		var hours: number = date.getHours();
		var minute: number = date.getMinutes();
		return year + "-" + month + "-" + day + " " + hours + ":" + minute;
	}

	/**
	 * format9  xhourxMinutexsecond
	 * @param  {number} ms        Millisecond
	 * @returns string
	 */
	private static format_9(ms: number): string {
		let h: number = Math.floor(ms / this.MS_PER_HOUR);
		ms -= h * this.MS_PER_HOUR;
		let m: number = Math.floor(ms / this.MS_PER_MINUTE);
		ms -= m * this.MS_PER_MINUTE;
		let s: number = Math.floor(ms / 1000);

		return h + "hour" + m + "Minute" + s + "second";
	}

	/**
	 * format10  xbranchxsecond
	 * @param  {number} ms        Millisecond
	 * @returns string
	 */
	private static format_10(ms: number): string {
		// let h: number = Math.floor(ms / this.MS_PER_HOUR);
		// ms -= h * this.MS_PER_HOUR;
		let m: number = Math.floor(ms / this.MS_PER_MINUTE);
		ms -= m * this.MS_PER_MINUTE;
		let s: number = Math.floor(ms / 1000);

		return m + "branch" + s + "second";
	}

	private static format_11(ms: number): string {
		let h: number = Math.floor(ms / this.MS_PER_HOUR);
		ms -= h * this.MS_PER_HOUR;
		let m: number = Math.floor(ms / this.MS_PER_MINUTE);
		ms -= m * this.MS_PER_MINUTE;
		let s: number = Math.floor(ms / 1000);

		return h + "Time" + m + "branch" + s + "second";
	}

	private static format_12(ms: number): string {
		let h: number = Math.floor(ms / this.MS_PER_HOUR);
		ms -= h * this.MS_PER_HOUR;
		let m: number = Math.floor(ms / this.MS_PER_MINUTE);
		ms -= m * this.MS_PER_MINUTE;
		let s: number = Math.floor(ms / 1000);
		return DateUtils.formatTimeNum(h) + ":" + DateUtils.formatTimeNum(m) + ":" + DateUtils.formatTimeNum(s);
	}

	/**xmonthxday（Zhou Ji）h:m */
	private static format_13(time: number): string {
		let date: Date = new Date(time);
		let year: number = date.getFullYear();
		let month: number = date.getMonth() + 1; 	//Month returned from0-11；
		let week: number = date.getDay();
		let day: number = date.getDate();
		let hours: number = date.getHours();
		let minute: number = date.getMinutes();
		return month + "month" + day + "day(week" + this.WEEK_CN[week] + ") " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
	}

	/**Time branch */
	private static format_14(time: number): string {
		let date: Date = new Date(time);
		let hours: number = date.getHours();
		let minute: number = date.getMinutes();
		return hours + "Time" + minute + "branch";
	}

	//15:yyyy-mm-dd h:m
	private static format_15(time: number): string {
		var date: Date = new Date(time);
		var month: number = date.getMonth() + 1; 	//Month returned from0-11；
		var day: number = date.getDate();
		var hours: number = date.getHours();
		var minute: number = date.getMinutes();
		return DateUtils.formatTimeNum(month) + "-" + DateUtils.formatTimeNum(day) + " " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
	}

	/**
	 * Format time to two digits
	 * @param  {number} t Number of time
	 * @returns String
	 */
	private static formatTimeNum(t: number, k?: number): string {
		return t >= 10 ? t.toString() : (k == 0 ? t.toString() : "0" + t);
	}

	/**
	 * Check whether the time is greater than the current time+Days
	 * @param  timetime
	 * @param  daysDays
	 * @returns String
	 */
	public static checkTime(time: number, days: number): boolean {
		let currentDate = new Date().getTime();
		let t = (time > (currentDate + days * this.MS_PER_DAY)) as boolean;
		return t;
	}

	/**
	 * Format current time
	 * @param  timetime
	 * @returns String 2018year12month12day（Tuesday） 12:12
	 */
	public static formatFullTime(time: number): string {
		let format: string;
		let date: Date = new Date(time);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let weekDay = date.getDay();
		let hour = date.getHours();
		let hourStr;
		if (hour < 10) {
			hourStr = "0" + hour;
		}
		else {
			hourStr = hour.toString();
		}
		let min = date.getMinutes();
		let minStr;
		if (min < 10) {
			minStr = "0" + min;
		}
		else {
			minStr = min.toString();
		}
		let weekDayStr;
		switch (weekDay) {
			case 1:
				weekDayStr = "Monday";
				break;
			case 2:
				weekDayStr = "Tuesday";
				break;
			case 3:
				weekDayStr = "Wednesday";
				break;
			case 4:
				weekDayStr = "Thursday";
				break;
			case 5:
				weekDayStr = "Friday";
				break;
			case 6:
				weekDayStr = "Saturday";
				break;
			case 0:
				weekDayStr = "Sunday";
				break;
		}
		format = year + "years" + month + "month" + day + "day（" + weekDayStr + "） " + hourStr + ":" + minStr;
		return format;
	}

	/**
	 *Convert string time to milliseconds
	 * 2018.3.14-0:0
	 * */
	public static formatStrTimeToMs(str: string): number {
		let date: Date = new Date();
		let strList: any[] = str.split(".");
		date.setFullYear(strList[0]);
		date.setMonth((+strList[1]) - 1);

		let strL2: any[] = strList[2].split("-");
		date.setDate(strL2[0]);

		let strL3: any[] = strL2[1].split(":");
		date.setHours(strL3[0]);
		date.setMinutes(strL3[1]);
		date.setSeconds(0);

		return date.getTime();
	}
}


