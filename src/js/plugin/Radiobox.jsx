import React from 'react';

export default class Radiobox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
        //console.log(props.checked);
    }

    static defaultProps = {
        disabled: false,
        checked: false
    }

    
    onChange(e) {
        if (this.props.change) {
            this.props.change(this.state.checked);
        }
        var _this = $(e.target);
        //所有项先变成没选中
        $('.' + this.props.name + 'No_radio').addClass("active");
        $('.' + this.props.name + 'Yes_radio').removeClass("active");
        //当前项选中
        _this.nextAll('.' + this.props.name + 'Yes_radio').addClass("active")
            .nextAll('.' + this.props.name + 'No_radio').removeClass("active");

    }

    render() {

        const {
            children, disabled, name, ...props
        } = this.props;
        return (
            <label className="_radio">
                <input type="radio" {...props}  disabled={disabled} name={name}
                       onChange={this.onChange.bind(this)}/>
                <i className={`iconfont icon-iconfontdanxuankuangweixuanzhong ${name}No_radio ${this.state.checked?"":"active"} ${disabled?"disabled":""}`}></i>
                <i className={`iconfont icon-btndanxuankuangxuanzhong ${name}Yes_radio ${this.state.checked?"active":""} ${disabled?"disabled":""}`}></i>
                {children}
            </label>
        )
    }

    componentWillReceiveProps(props) {
        let _this = this;
        _this.setState({
            checked: props.checked
        });
    }

}