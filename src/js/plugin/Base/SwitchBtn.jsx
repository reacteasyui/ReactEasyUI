import React from 'react';
/**
 @class SwitchBtn
 @extends React.Component
 @constructor
 @param [active=false] {Bool} 选项组的默认选中项 如：true:第一项，false：第二项
 @param [text=["上午","下午"]] {Array} 选项组的文本数组 如：["上午","下午"]
 @param [vals=[0,1] {Array} 选项组的值数组 如：[0,1]
 @return {Component} 返回SwitchBtn组件
 */
export default class SwitchBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            vals: props.vals || [0, 1]
        }
    }

    static defaultProps = {
        active: false,
        text: ["开", "关"]
    }

    onClick(select) {
        this.setState({active: select})
        if (this.props.onChange)
            this.props.onChange(select);
    }

    render() {
        // console.log(this.state.active);
        // console.log("val" + this.state.vals[this.state.active]);
        const {
            children, disabled, show, name, text, ...props
        } = this.props;
        return (
            <div className="flowBtn">
                <a href="javascript:;" className={this.state.active?"active":""}
                   onClick={()=>this.onClick(1)}><i className="iconfont icon-sanjiaoxuanzhong"></i>{text[0]}</a>
                <a href="javascript:;" className={this.state.active?"":"active"}
                   onClick={()=>this.onClick(0)}><i className="iconfont icon-sanjiaoxuanzhong"></i>{text[1]}</a>
                <input type="hidden" name={name} value={this.state.vals[this.state.active]}/>
            </div>
        )
    }

    componentWillReceiveProps(props) {
        let _this = this;
        _this.setState({
            active: props.active
        });
    }
}