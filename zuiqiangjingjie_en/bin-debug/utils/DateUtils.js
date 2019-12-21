var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var DateStyle = (function (_super) {
    __extends(DateStyle, _super);
    function DateStyle(format, from, to, isFormatNum) {
        var _this = _super.call(this) || this;
        /**format */
        _this.format = [];
        /** Starting accuracy*/
        _this.from = 0;
        /**End accuracy */
        _this.to = 0;
        /**Whether to make up0 */
        _this.isFormatNum = false;
        _this.format = format;
        _this.from = from;
        _this.to = to;
        _this.isFormatNum = isFormatNum;
        return _this;
    }
    return DateStyle;
}(BaseClass));
__reflect(DateStyle.prototype, "DateStyle");
/**
 * Created by yangsong on 2014/11/22.
 * DateTool class
 */
var DateUtils = (function () {
    function DateUtils() {
    }
    /**
     * Get time formatted string
     * @second second
     * @style Formatting style, for example :DateUtils.STYLE_1
     *  */
    DateUtils.getFormatTimeByStyle = function (second, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        if (second < 0) {
            second = 0;
            debug.log("Wrong input parameters!Negative time:" + second);
        }
        if (style.from > style.to) {
            debug.log("Wrong input parameters!toParameter must be greater than or equal tofromparameter,Please check.styleParameter value");
            return "";
        }
        second = second >> 0;
        var result = "";
        for (var i = style.to; i >= style.from; i--) {
            var time = second / this.mul[i]; //In total
            var timeStr = "";
            if (i != style.to)
                time = time % this.mod[i]; //Surplus
            if (style.isFormatNum && time < 10)
                timeStr = "0" + (time >> 0).toString(); //repair0
            else
                timeStr = (time >> 0).toString();
            result += (timeStr + style.format[i]);
        }
        return result;
    };
    /**
     * Get time formatted string
     * @ms Millisecond
     * @style Formatting style, for example :DateUtils.STYLE_1
     *  */
    DateUtils.getFormatTimeByStyle1 = function (ms, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        return this.getFormatTimeByStyle(ms / this.MS_PER_SECOND);
    };
    /**
     * holdMiniDateTimeConvert to distance1970-01-01Millisecond count
     * @param mdt from2010Seconds from the beginning of
     * @return from1970Milliseconds since
     */
    DateUtils.formatMiniDateTime = function (mdt) {
        return DateUtils.MINI_DATE_TIME_BASE + (mdt & 0x7FFFFFFF) * DateUtils.MS_PER_SECOND;
    };
    /**Time to convert to server***/
    DateUtils.formatServerTime = function (time) {
        return (time - DateUtils.MINI_DATE_TIME_BASE) / DateUtils.MS_PER_SECOND;
    };
    /**
     * Format string based on seconds
     * @param  {number} second            Seconds
     * @param  {number=1} type            Time format type（Reference resourcesDateUtils.TIME_FORMAT_1, DateUtils.TIME_FORMAT_2...)
     * @param  {showLength}    showLength    Display length（One time unit is one length，And only intypebyDateUtils.TIME_FORMAT_5In case of）
     * @returns string
     */
    DateUtils.getFormatBySecond = function (second, type, showLength) {
        if (type === void 0) { type = 1; }
        if (showLength === void 0) { showLength = 2; }
        var str = "";
        var ms = second * 1000;
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
    };
    /**
     * Get to specified date00：00Seconds
     * **/
    DateUtils.getRenainSecond = function (ms) {
        var tmpDate = ms ? new Date(ms) : new Date();
        //tmpDate.setDate(tmpDate.getDate()+1);
        var ptime = (DateUtils.getTodayZeroSecond(tmpDate) + 60 * 60 * 24) - tmpDate.getTime() / 1000;
        // debug.log("ptime = " + ptime);
        return ptime.toFixed(0);
    };
    /**
     * Seconds passed today
     * **/
    DateUtils.getTodayPassedSecond = function () {
        var tmpDate = new Date();
        var tdyPassTime = ((Date.now() - (new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime())) / 1000).toFixed(0);
        return parseInt(tdyPassTime);
    };
    /**
     * Get the specified date00:00Seconds of time
     * @parma Millisecond
     * @returns {number}
     */
    DateUtils.getTodayZeroSecond = function (tdate) {
        var tmpDate = tdate ? tdate : new Date();
        return parseInt(((new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime()) / 1000).toFixed(0));
    };
    /**
     * Get the first day of the week
     * **/
    DateUtils.showWeekFirstDay = function () {
        var Nowdate = new Date();
        var day = Nowdate.getDay();
        day = day ? day : 7;
        var WeekFirstDay = new Date(Nowdate - (day - 1) * 86400000);
        // var M=Number(WeekFirstDay.getMonth())+1
        // return WeekFirstDay.getYear()+"-"+M+"-"+WeekFirstDay.getDate();
        return WeekFirstDay;
    };
    /**
     * Get the last day of the week
     * @param Millisecond difference
     */
    DateUtils.showWeekLastDay = function () {
        var Nowdate = new Date();
        var WeekFirstDay = DateUtils.showWeekFirstDay();
        var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
        // var M=Number(WeekLastDay.getMonth())+1
        // return WeekLastDay.getYear()+"-"+M+"-"+WeekLastDay.getDate();
        return WeekLastDay;
    };
    /**
     * Find out the current time from next Monday morning0Still bad
     * @param Millisecond difference
     * **/
    DateUtils.calcWeekFirstDay = function () {
        // var lastDay = showWeekLastDay().getDay();
        // lastDay = lastDay > 0?lastDay:7;
        var Nowdate = new Date();
        var curDay = Nowdate.getDay();
        curDay = curDay > 0 ? curDay : 7;
        var difday = 7 - curDay; //use
        var hours = Nowdate.getHours();
        var minutes = Nowdate.getMinutes();
        var seconds = Nowdate.getSeconds();
        // debug.log("difday = "+difday);
        // debug.log("hours = "+hours);
        // debug.log("minutes = "+minutes);
        // debug.log("seconds = "+seconds);
        var sum = difday * 86400 * 1000 + 86400 * 1000 - (hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000);
        return new Date(sum);
    };
    /**
     * format1  00:00:00
     * @param  {number} sec Msec
     * @returns string
     */
    DateUtils.format_1 = function (ms) {
        var n = 0;
        var result = "##:##:##";
        n = Math.floor(ms / DateUtils.MS_PER_HOUR);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_HOUR;
        n = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_MINUTE;
        n = Math.floor(ms / 1000);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        return result;
    };
    /**
     * format2  yyyy-mm-dd h:m:s
     * @param  {number} ms        Msec
     * @returns string            Return to oneself1970year1month1Number0Time point corresponding to the start of point
     */
    DateUtils.format_2 = function (ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //Month returned from0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    };
    /**
     * format3  00:00
     * @param  {number} ms        Msec
     * @returns string            branch:second
     */
    DateUtils.format_3 = function (ms) {
        var str = this.format_1(ms);
        var strArr = str.split(":");
        return strArr[1] + ":" + strArr[2];
    };
    /**
     * format4  xxDays ago，xxHours ago，xxMinutes ago
     * @param  {number} ms        Millisecond
     * @returns string
     */
    DateUtils.format_4 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return Math.floor(ms / this.MS_PER_MINUTE) + "Minutes ago";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "Hours ago";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "Days ago";
        }
    };
    /**
     * format5 XdayXhourXbranchXsecond
     * @param  {number} ms                Millisecond
     * @param  {number=2} showLength    Display length（One time unit is one length）
     * @returns string
     */
    DateUtils.format_5 = function (ms, showLength) {
        if (showLength === void 0) { showLength = 2; }
        var result = "";
        var unitStr = ["day", "Time", "branch", "second"];
        var arr = [];
        var d = Math.floor(ms / this.MS_PER_DAY);
        arr.push(d);
        ms -= d * this.MS_PER_DAY;
        var h = Math.floor(ms / this.MS_PER_HOUR);
        arr.push(h);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        arr.push(m);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        arr.push(s);
        for (var k in arr) {
            if (arr[k] > 0) {
                result += this.formatTimeNum(arr[k], Number(k)) + unitStr[k];
                showLength--;
                if (showLength <= 0)
                    break;
            }
        }
        return result;
    };
    /**
     * format6  h:m:s
     * @param  {number} ms        Millisecond
     * @returns string            Return to oneself1970year1month1Number0Time point corresponding to the start of point（Excluding mm / DD / yyyy）
     */
    DateUtils.format_6 = function (ms) {
        var date = new Date(ms);
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return this.formatTimeNum(hours) + ":" + this.formatTimeNum(minute) + ":" + this.formatTimeNum(second);
    };
    /**
     * format7  Xday/Xhour/<1hour
     * @param  {number} ms        Millisecond
     * @returns string
     */
    DateUtils.format_7 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return "<1hour";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "hour";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "day";
        }
    };
    //8:yyyy-mm-dd h:m
    DateUtils.format_8 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //Month returned from0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute;
    };
    /**
     * format9  xhourxMinutexsecond
     * @param  {number} ms        Millisecond
     * @returns string
     */
    DateUtils.format_9 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "hour" + m + "Minute" + s + "second";
    };
    /**
     * format10  xbranchxsecond
     * @param  {number} ms        Millisecond
     * @returns string
     */
    DateUtils.format_10 = function (ms) {
        // let h: number = Math.floor(ms / this.MS_PER_HOUR);
        // ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return m + "branch" + s + "second";
    };
    DateUtils.format_11 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "Time" + m + "branch" + s + "second";
    };
    DateUtils.format_12 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return DateUtils.formatTimeNum(h) + ":" + DateUtils.formatTimeNum(m) + ":" + DateUtils.formatTimeNum(s);
    };
    /**xmonthxday（Zhou Ji）h:m */
    DateUtils.format_13 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //Month returned from0-11；
        var week = date.getDay();
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return month + "month" + day + "day(week" + this.WEEK_CN[week] + ") " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
    };
    /**Time branch */
    DateUtils.format_14 = function (time) {
        var date = new Date(time);
        var hours = date.getHours();
        var minute = date.getMinutes();
        return hours + "Time" + minute + "branch";
    };
    //15:yyyy-mm-dd h:m
    DateUtils.format_15 = function (time) {
        var date = new Date(time);
        var month = date.getMonth() + 1; //Month returned from0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return DateUtils.formatTimeNum(month) + "-" + DateUtils.formatTimeNum(day) + " " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
    };
    /**
     * Format time to two digits
     * @param  {number} t Number of time
     * @returns String
     */
    DateUtils.formatTimeNum = function (t, k) {
        return t >= 10 ? t.toString() : (k == 0 ? t.toString() : "0" + t);
    };
    /**
     * Check whether the time is greater than the current time+Days
     * @param  timetime
     * @param  daysDays
     * @returns String
     */
    DateUtils.checkTime = function (time, days) {
        var currentDate = new Date().getTime();
        var t = (time > (currentDate + days * this.MS_PER_DAY));
        return t;
    };
    /**
     * Format current time
     * @param  timetime
     * @returns String 2018year12month12day（Tuesday） 12:12
     */
    DateUtils.formatFullTime = function (time) {
        var format;
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var weekDay = date.getDay();
        var hour = date.getHours();
        var hourStr;
        if (hour < 10) {
            hourStr = "0" + hour;
        }
        else {
            hourStr = hour.toString();
        }
        var min = date.getMinutes();
        var minStr;
        if (min < 10) {
            minStr = "0" + min;
        }
        else {
            minStr = min.toString();
        }
        var weekDayStr;
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
    };
    /**
     *Convert string time to milliseconds
     * 2018.3.14-0:0
     * */
    DateUtils.formatStrTimeToMs = function (str) {
        var date = new Date();
        var strList = str.split(".");
        date.setFullYear(strList[0]);
        date.setMonth((+strList[1]) - 1);
        var strL2 = strList[2].split("-");
        date.setDate(strL2[0]);
        var strL3 = strL2[1].split(":");
        date.setHours(strL3[0]);
        date.setMinutes(strL3[1]);
        date.setSeconds(0);
        return date.getTime();
    };
    /**Time format1 00:00:00 */
    DateUtils.TIME_FORMAT_1 = 1;
    /**Time format2 yyyy-mm-dd h:m:s */
    DateUtils.TIME_FORMAT_2 = 2;
    /**Time format3 00:00 */
    DateUtils.TIME_FORMAT_3 = 3;
    /**Time format4 xxDays ago/xxHours ago/xxMinutes ago */
    DateUtils.TIME_FORMAT_4 = 4;
    /**Time format5 xdayxhourxbranchxsecond */
    DateUtils.TIME_FORMAT_5 = 5;
    /**Time format6 h:m:s */
    DateUtils.TIME_FORMAT_6 = 6;
    /**Time format7 xxday/xxhour/<1hour */
    DateUtils.TIME_FORMAT_7 = 7;
    /**Time format8 yyyy-mm-dd h:m */
    DateUtils.TIME_FORMAT_8 = 8;
    /**Time format9 xhourxMinutexsecond */
    DateUtils.TIME_FORMAT_9 = 9;
    /**Time format10 xbranchxsecond**/
    DateUtils.TIME_FORMAT_10 = 10;
    /**Time format11xTimexbranchxsecond**/
    DateUtils.TIME_FORMAT_11 = 11;
    /**Time format12 x:x:x**/
    DateUtils.TIME_FORMAT_12 = 12;
    /**Time format13 xmonthxday（Zhou Ji）h:m**/
    DateUtils.TIME_FORMAT_13 = 13;
    /**Time format14 xTimexbranch**/
    DateUtils.TIME_FORMAT_14 = 14;
    /**Time format15 mm-dd h:m */
    DateUtils.TIME_FORMAT_15 = 15;
    /**Milliseconds in a second */
    DateUtils.MS_PER_SECOND = 1000;
    /**Milliseconds in a minute */
    DateUtils.MS_PER_MINUTE = 60 * 1000;
    /**Milliseconds in an hour */
    DateUtils.MS_PER_HOUR = 60 * 60 * 1000;
    /**Milliseconds of the day */
    DateUtils.MS_PER_DAY = 24 * 60 * 60 * 1000;
    DateUtils.SECOND_PER_HOUR = 3600; //Seconds of an hour
    DateUtils.SECOND_PER_DAY = 86400; //Seconds of the day
    DateUtils.SECOND_PER_MONTH = 2592000; //One month(30day)Seconds
    DateUtils.SECOND_PER_YEAR = 31104000; //A year(360day)Seconds
    DateUtils.DAYS_PER_WEEK = 7; //Days of the week
    DateUtils.YEAR_PER_YEAR = 1; //Number of years per year
    DateUtils.MONTH_PER_YEAR = 12; //Months per year
    DateUtils.DAYS_PER_MONTH = 30; //Day of Month 
    DateUtils.HOURS_PER_DAY = 24; //Hours per day
    DateUtils.MUNITE_PER_HOUR = 60; //Minutes per hour
    DateUtils.SECOND_PER_MUNITE = 60; //Seconds per minute
    DateUtils.SECOND_PER_SECOND = 1; //Seconds per second
    DateUtils.SECOND_2010 = 1262275200; //1970year~2010year1month1day0Time0branch0Second time stamp(Company:second)
    /**Remainder ,Used to calculate time*/
    DateUtils.mod = [DateUtils.SECOND_PER_MUNITE, DateUtils.MUNITE_PER_HOUR, DateUtils.HOURS_PER_DAY, DateUtils.DAYS_PER_MONTH, DateUtils.MONTH_PER_YEAR, DateUtils.YEAR_PER_YEAR];
    /**Divisor Used to calculate time*/
    DateUtils.mul = [DateUtils.SECOND_PER_SECOND, DateUtils.SECOND_PER_MUNITE, DateUtils.SECOND_PER_HOUR, DateUtils.SECOND_PER_DAY, DateUtils.SECOND_PER_MONTH, DateUtils.SECOND_PER_YEAR];
    /**Days of the week */
    /**Hours of the day */
    /** Used in this gameMiniDateTimeStart date of time relative toflashtime(1970-01-01)Time difference（Millisecond） */
    DateUtils.MINI_DATE_TIME_BASE = Date.UTC(2010, 0) + new Date().getTimezoneOffset() * DateUtils.MS_PER_MINUTE;
    /**
     * Time zone offset（Msec）<BR>
     * At present, China adopts Zone 8，I.e. more coordinated time than the world（UTC）/Greenwich mean time（GMT）fast8Time zone for hours */
    DateUtils.TIME_ZONE_OFFSET = 8 * DateUtils.MS_PER_HOUR;
    /**Accuracy */
    DateUtils.TO_SECOND = 0;
    DateUtils.TO_MINUTE = 1;
    DateUtils.TO_HOUR = 2;
    DateUtils.TO_DAY = 3;
    DateUtils.TO_MONTH = 4;
    DateUtils.TO_YEAR = 5;
    /** nyearnmonthndaynTimenbranchnsecond */
    DateUtils.FORMAT_1 = ["second", "branch", "Time", "day", "month", "year"];
    /** xx:xx:xx */
    DateUtils.FORMAT_2 = [":", ":", ":", ":", ":", ":"];
    DateUtils.WEEK_CN = ["day", "One", "Two", "Three", "Four", "Five", "Six"];
    /**xhourxbranchxsecond */
    DateUtils.STYLE_1 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_HOUR, false);
    /** xdayxhourxMinutexsecond */
    DateUtils.STYLE_2 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_DAY, false);
    /** 00:00:00 */
    DateUtils.STYLE_3 = new DateStyle(DateUtils.FORMAT_2, DateUtils.TO_SECOND, DateUtils.TO_HOUR, true);
    /** xbranchxsecond */
    DateUtils.STYLE_4 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_MINUTE, true);
    return DateUtils;
}());
__reflect(DateUtils.prototype, "DateUtils");
//# sourceMappingURL=DateUtils.js.map