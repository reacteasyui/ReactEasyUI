import React from 'react';
/**
 * 带删除按钮的输入框
 @class DelIconInput
 @extends React.Component
 @constructor
 @param delShow {Bool} 是否展示删除图标
 @param name {String} 组件对应的表单名称
 @param defaultValue {String} 默认值
 @return {Component} 返回DelIconInput组件
 */
export default class DelIconInput extends React.Component {
    constructor(props){
        super(props);
        this.state={
            delShow:props.delShow
        }
        this.clueID = "clueInt_" + ~~(Math.random() * 100000);
    }
    onBlur(){
        this.setState({delShow:document.getElementById(this.clueID).value.length>0})
    }
    onFocus(){
        this.setState({delShow:true})
    }
    delName(){
        document.getElementById(this.clueID).value="";
    }
    render(){
        const {
            name,defaultValue,...props
        } = this.props;
        return(<div className="delIconInput">
            <input type="text" className="form-control _text _textFocus"
                   {...props} name={name} id={this.clueID}
                   defaultValue={defaultValue}
                   onBlur={this.onBlur.bind(this)}
                   onFocus={this.onFocus.bind(this)}
            />
            <div className={`delIcon ${this.state.delShow ? "": "hide"}`} onClick={this.delName.bind(this)}>×</div>
        </div>)
    }
}