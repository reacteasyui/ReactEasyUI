import React from 'react';
/**
 @class ProgressBar
 @extends React.Component
 @constructor
 @param num {Number} 考核项的值 如：百分比型：0.6 || 数值型 ：90
 @param [rate=true] {Bool} 进度条数值的类型 如：true:百分比型，false：数值型
 @param [goalNum] {Number} 目标值（有目标值时，达标显示奖杯）
 @return {Component} 返回ProgressBar组件
 */
export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * 是否达标
             @property goal
             @type Bool
             @default false
             */
            goal: false,
            num: props.num,
            goalNum: props.goalNum,
            rate: props.rate
        }
    }

    static defaultProps = {
        rate: true,
        goalShow: false
    }

    setGoal() {
        let num = this.state.num, goalNum = this.state.goalNum;
        this.state.rate ? this.setState({goal: ~~num >= 100}) : this.setState({goal: ~~num >= (~~goalNum)})
    }

    render() {
        let showNum = null, styles = null, bg = null;
        const num = this.state.num,
            goalNum = this.state.goalNum;
        if (this.state.rate) {
            showNum = num + "%";
            styles = {
                width: (num * 0.8) + "%",
                maxWidth:'80%'
            };

        } else {
            showNum = this.state.num,
                styles = {
                    width: ~~(parseFloat(num) * 0.8 * 200 / 3 / goalNum) + "%",
                    maxWidth:80+"%"
                };
        }
        return (
            <div className="progressBar">
                <div className={`allProgress ${this.props.singleBar?"hide":""}`}></div>
                <span className="showNum">
                    <i className={`iconfont icon-jiangbeikuai ${this.state.goal && !this.props.singleBar?"":"hide"}`}></i>
                    <span className={this.props.singleBar ? "nomalColor" : (this.state.goal ? "goalColor" : (this.state.num==0?"zeroColor":"nomalColor"))}><em className="none">当前完成</em>{showNum}<em className="none"></em></span>
                </span>
                <div className={`doneProgress ${this.props.singleBar ? "nomalBg" : (this.state.goal ? "goalBg" : "nomalBg")}`} style={styles}></div>

                <div className={`goalNum ${this.props.goalShow?"":"hide"}`}>目标值{goalNum}<i
                    className="iconfont icon-triangle-down"></i></div>
            </div>
        )
    }

    componentWillMount() {
        this.setGoal();
    }

    componentWillReceiveProps(props) {
        const {
            num, goalNum, rate
        } = props;
        let _this = this;
        _this.setState({
            num: props.num,
            goalNum: props.goalNum,
            rate: props.rate
        }, ()=> {
            _this.setGoal();
        });
    }
}