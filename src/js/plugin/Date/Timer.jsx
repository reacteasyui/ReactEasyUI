import React from 'react';

/**
 @class Overlap
 @extends React.Component
 @constructor
 @param [color] {String} 时间的字体颜色。
 @param [fontSize] {String} 时间的字体大小
 @param [margin] {String} 日期与时间的间隔大小
 @param [timeInterval] {String} 调用回调函数的时间间隔,必须为1000的倍数，如3000
 @param [callback] {Object} 当走过的时间为timeInterval的倍数时，调用callback函数。callback接受的参数为调用callback的次数
 @return {Component} 返回Overlap组件
 */

export default class Overlap extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            date: "--",//$.date().format("yyyy-MM-dd"),
            time: "--",//$.date().format("hh:mm:ss"),
            timeInterval: props.timeInterval,
        };
        this.isStart = true;
    }

    static defaultProps = {
        timeInterval: 0
    }

    timeRun() {
        let _this = this, _timing = 0, _timeInterval = _this.state.timeInterval;
        this.timer = setInterval(()=> {
            let _now = new Date(),
                _date = _now.format("yyyy-MM-dd"),
                _time = _now.format("hh:mm:ss");
            _timing += 1000;

            _this.setState({
                date: _date,
                time: _time
            }, ()=> {
                if (_timeInterval && _timing % _timeInterval == 0 && this.isStart) {
                    _this.props.callback(_timing / _timeInterval);
                }
            })
        }, 1000)
    }

    render() {
        let _this = this, {color, fontSize, margin}=_this.props;
        const style = {
                color: color ? color : '#000',
                fontSize: fontSize ? fontSize : '12px'
            },
            marginStyle = {
                marginRight: margin ? margin : '5px'
            };
        return (<div className="timer" style={style}>
            <span style={marginStyle}>
                {_this.state.date}
            </span>
            <span>
                {_this.state.time}
            </span>
        </div>);
    }

    componentDidMount() {
        let _this = this;
        _this.timeRun();
        //当产生任何点击的时候停止回调
        $(document).on("click", ()=> {
            this.isStart = false;
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
}