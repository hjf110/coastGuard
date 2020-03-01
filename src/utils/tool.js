const tool = {
    /**
     * 根据时间的值获取时间
     * @param type 1:年月日 2:年月日时分秒
     * @param e
     * @returns {string}
     */
    getTime(type, e) {
        let date;
        if (e) {
            date = new Date(e);
        } else {
            date = new Date(); //现在
        }
        let y = date.getFullYear();
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        if (type == 1) return y + '-' + M + '-' + d;
        if (type == 2) return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s + '';
        return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s + '';
    },
    /**
     * 对象数组去重
     * @param arr 要去重的数组
     * @param key 根据哪个元素去重
     * @returns {*}
     */
    ObjListQc(arr, key) {
        let obj = {};
        arr = arr.reduce((item, next) => {
            obj[next[key]] ? '' : obj[next[key]] = true && item.push(next);
            return item;
        }, []);
        return arr;
    },
    /**
     * 日期相加
     * @param interval
     * @param number
     * @param date
     * @returns {*}
     * @constructor
     */
    DateAdd(interval, number, date) {
        switch (interval) {
            case 'y': {
                date.setFullYear(date.getFullYear() + number);
                return date;
                break;
            }
            case 'q': {
                date.setMonth(date.getMonth() + number * 3);
                return date;
                break;
            }
            case 'm': {
                date.setMonth(date.getMonth() + number);
                return date;
                break;
            }
            case 'w': {
                date.setDate(date.getDate() + number * 7);
                return date;
                break;
            }
            case 'd': {
                date.setDate(date.getDate() + number);
                return date;
                break;
            }
            case 'h': {
                date.setHours(date.getHours() + number);
                return date;
                break;
            }
            case 'm': {
                date.setMinutes(date.getMinutes() + number);
                return date;
                break;
            }
            case 's': {
                date.setSeconds(date.getSeconds() + number);
                return date;
                break;
            }
            default: {
                date.setDate(d.getDate() + number);
                return date;
                break;
            }
        }
    },
    /**
     * 判断是否是PC端
     * @returns {boolean}
     * @constructor
     */
    IsPC() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ['Android', 'iPhone',
            'SymbianOS', 'Windows Phone',
            'iPad', 'iPod'];
        let flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    faultDays(faultDate, completeTime) {
        let stime = Date.parse(new Date(faultDate));
        let etime = Date.parse(new Date(completeTime));
        // 两个时间戳相差的毫秒数
        let usedTime = etime - stime;
        // 计算相差的天数
        let days = Math.floor(usedTime / (24 * 3600 * 1000));
        // 计算天数后剩余的毫秒数
        let leave1 = usedTime % (24 * 3600 * 1000);
        // 计算出小时数
        let hours = Math.floor(leave1 / (3600 * 1000));
        // 计算小时数后剩余的毫秒数
        let leave2 = leave1 % (3600 * 1000);
        // 计算相差分钟数
        let minutes = Math.floor(leave2 / (60 * 1000));
        let time = days + '天' + hours + '时' + minutes + '分';
        return [days,hours,minutes];
    },
    /**
     ** list 排序
     *
     * list  :  要排序的数组
     * attr  :  根据对象的哪个参数进行排序
     * rev   :  降序还是升序(true为升序,,false为降序)
     * @param list 要排序的数组
     * @param attr 根据对象的哪个参数进行排序
     * @param rev 降序还是升序(true为升序,,false为降序)
     */
    tosort(list, attr, rev){
        list.sort(this.sortby(attr, rev));
    },
    sortby(attr, rev){
        if (rev == undefined) {
            rev = 1;
        } else {
            rev = (rev) ? 1 : -1;
        }
        
        return (a, b) => {
            if (attr != null && attr != "" && attr != undefined) {
                a = a[attr];
                b = b[attr];
            } else {
                a = a;
                b = b;
            }
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 0;
        }
        
    }
    
};
export default tool;
