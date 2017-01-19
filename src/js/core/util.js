/**
 * Created by shiyang on 2016/11/3.
 */
//工具类
// 图表工具
export class Util {
    /*数字动画*/
    static fnNumberAnimate(type) {
        let _this = this,
            _type = type.replace(/Num/gi, '_num'),
            eleNum = '#' + _type,
            startNumber = $(eleNum).html().replace(/,/g, ''),
            endNumber = _this.state[type];
        $(eleNum).changeNumber({
            startNumber: startNumber,
            endNumber: endNumber
        });
    }
}


// 图表工具
export class Charts {
    static setDataZoomEnd(itemCount, num) {
        return itemCount > num ? 100 / (itemCount / (num - 1)) : 100;
    }
}


export class Customer {
    constructor(user) {
        this.user = user;
        //console.log(this.user);
    }

    has(id, content) {
        if (this.user && this.user.auth_item && this.user.auth_item.contains(id)) {
            return content;
        }
        return null;
    }

    hasOne(ids) {
        if (this.user && this.user.auth_item) {
            if (typeof ids != "number") {
                for (let i = 0; i < ids.length; i++) {
                    if (this.user.auth_item.contains(ids[i])) {
                        return true;
                    }
                }
            }
            else {
                return this.user.auth_item.contains(ids);
            }
        }
        return false;
    }
}