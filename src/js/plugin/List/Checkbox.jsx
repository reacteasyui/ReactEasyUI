import React from "react";

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            value:props.value
        };
        this.checkboxID = "checkbox_" + ~~(Math.random() * 100000);
    }

    static defaultProps = {
        disabled: false,
        checked: 0
    };

    onChange(e) {
        this.setState({
            checked: ~~!this.state.checked
        }, ()=> {
            if (this.props.change) {
                this.props.change(this.state.checked);
            }
        });
    }

    render() {
        const {
            children, disabled, name, labelText, ...props
        } = this.props;

        return (
            <label className="re-check-item">
                <input type="checkbox" disabled={disabled} checked={this.state.checked} value={this.state.value} onChange={this.onChange.bind(this)} id={this.checkboxID}/>
                <input type="hidden" name={name} value={this.state.checked}/>
                <i className={`re-icon re-icon-unchecked ${this.state.checked ? '' : 'active'} ${disabled ? 'disabled' : ''}`}></i>
                <i className={`re-icon re-icon-checked ${this.state.checked ? 'active' : ''} ${disabled ? 'disabled' : ''}`}></i>
                <label htmlFor={this.checkboxID} className={`${this.props.labelText ? '' : 'hide'}`}>{labelText}</label>
                {children}
            </label>
        )
    }

    componentWillReceiveProps(props) {
        let _this = this;
        _this.setState({
            checked: props.checked,
            value:props.value
        });
    }
}




