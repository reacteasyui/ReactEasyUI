import React from 'react';
import * as BS from 'react-bootstrap';

/**
 @class Alert
 @extends React.Component
 @constructor
 @param show {Boolean} 弹出框的显隐,通常通过父组件的 state 值控制
 @param [dismissAfter] {Number} 多长时间之后关闭，单位：ms
 @return {Component} 返回Alert组件
 */

export default class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        show: false,
        bsStyle: "info" //"success", "warning", "danger", "info"
    }

    handleAlertDismiss() {
        if(this.props.onClose){
            this.props.onClose();
        }
    }
    
    //onDismiss={this.handleAlertDismiss.bind(this)}

    render() {
        const {
            children, show, ...props
        } = this.props;

        if (show) {
            return (<div>
                <BS.Alert {...props}>
                    {children}
                </BS.Alert>
            </div>);
        }
        return null;
    }
}