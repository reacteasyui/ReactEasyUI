import React from 'react';
import ReactDOM from 'react-dom';
/**
 @class AutoComplete
 @extends React.Component
 @constructor
 @param min {number} 允许最小值
 @param max {number} 允许最大值
 @param value {number} input值
 @param step {number} 步长，默认为1
 @param name {string} input name属性值
 @return {Component} 返回Counter组件
 */

export default class Counter extends React.Component{
    constructor(props){
        super(props);
        this.counterID = 'counter_' + ~~(Math.random() * 100000);
        this.state = {
            min: props.min,
            max:props.max,
            value:props.value,
            step:props.step || 1,
            name:props.name,
            testNum:true,
        }
    }

    changeValue(n){
        if(this.state.value <= this.state.min && n == -1){
            return ;
        }
        if(this.state.value >= this.state.max && n == 1){
            return;
        }
        this.setState({
            value:parseInt(this.state.value)+n*this.state.step
        });
    }
    change(event){
        this.setState({
            value:event.target.value,
            testNum:/^\d+$/g.test(event.target.value)
        });
    }
    
    render(){
        return (
            <div className="counter" id={this.counterID}>
                <span className={`desc ${this.state.value <= this.state.min || !this.state.testNum ? 'disabled' : ''}`} onClick={()=>this.changeValue(-1)}>-</span>
                <input type="text" onChange={this.change.bind(this)} className={`num ${this.state.value > this.state.max || this.state.value < this.state.min || !this.state.testNum ? 'err' : ''}`} name={this.state.name} value={this.state.value}/>
                <span className={`add ${this.state.value >= this.state.max || !this.state.testNum ? 'disabled' : ''}`} onClick={()=>this.changeValue(1)}>+</span>
            </div>
        );
    }

    componentWillReceiveProps(props){
        this.setState({
            min: props.min,
            max:props.max,
            value:props.value,
            step:props.step || 1,
            name:props.name
        });
    }
}