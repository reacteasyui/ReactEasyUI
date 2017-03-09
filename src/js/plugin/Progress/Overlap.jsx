import React from 'react';

/**
 @class Overlap
 @extends React.Component
 @constructor
 @param [data] {Object} 传入的数据。例:data:{[
                            {
                                sets:['a'],
                                label:100
                            },
                            {
                                sets:['b'],
                                label:120
                            },
                            {
                                sets:['a','b'],
                                label:20
                            },
                        ]}
 @param [width] {String} 组件占父容器的百分比宽。例：'80%'
 @param [height] {String} 组件的高度。例'50px'
 @param [color] {Array} 组件的左右及重合部分的背景色。例['green','blue','red']
 @return {Component} 返回Overlap组件
 */

export default class Overlap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:props.data
        };
    }
    calPer(data){
        let _x = parseInt(data[0].label),_y = parseInt(data[1].label),_z = parseInt(data[2].label),Arr=[],circle=30,width=parseInt($('.overlapBody').css('width'));
        if(this.props.height){
            circle = parseInt(this.props.height)/2+5;
        }
        Arr.push(_x/(_x + _y)*100);
        Arr.push(_y/(_x + _y)*100);
        Arr.push(_z/(_x + _y)*100);
        Arr.push(((_x)/(_x + _y)-(circle/width))*100);
        Arr.push((_x-_z)/(_x + _y-_z)*100);
        Arr.push((_y-_z)/(_x + _y-_z)*100);
        Arr.push(_z/(_x + _y-_z)*100);
        return Arr;
    }
    render() {
        let _this = this,{width,height,color}= _this.props,_data = _this.state.data,allStyle=null,leftStyle=null,
            rightStyle=null,overlapStyle=null,wrapperStyle=null;/**/
        wrapperStyle={
            width:width || '100%',
            height:height || '50px'
        },
        allStyle = {
            width:'70%',
            height:'100%',
            position:'relative',
            float:'left'
        };
        leftStyle = {
            background:color?color[0]:'#01a6d6',
            width:_data?_this.calPer(_data)[0]+'%':'0%',
            height:'100%',
            float:'left'
        };
        rightStyle = {
            background:color?color[1]:'#7572f7',
            width:_data?_this.calPer(_data)[1]+'%':'0%',
            height:'100%',
            float:'left'
        },
        overlapStyle = {
            width:height?parseInt(height)+10+'px':'60px',
            height:height?parseInt(height)+10+'px':'60px',
            borderRadius:'50%',
            background:color&&color[2]?color[2]:'#ffa260',
            position:'absolute',
            left:_data?_this.calPer(_data)[3]+'%':'0%',
            top:'-5px'
        };
        return (<div className="overlap" style={wrapperStyle}>
            <div className="leftWord">
                <div>{_data?_data[0].sets[0]:null}</div>
                <div>{_data?_this.calPer(_data)[4].toFixed(1)+'%':null}</div>
            </div>
            <div className="overlapBody" style={allStyle}>
                <div style={leftStyle}></div>
                <div style={rightStyle}></div>
                <div className="center" style={overlapStyle}>
                    <div>重合</div>
                    <div>{_data?_this.calPer(_data)[6].toFixed(1)+'%':null}</div>
                </div>
            </div>
            <div className="rightWord">
                <div>{_data?_data[1].sets[0]:null}</div>
                <div>{_data?_this.calPer(_data)[5].toFixed(1)+'%':null}</div>
            </div>
        </div>);
    }

    componentDidMount(){
        let _this = this;
        _this.setState({
            data:_this.state.data
        })
    }
    componentWillReceiveProps(props){
        if(props&&props.data){
            this.setState({
                data:props.data
            })
        }
    }
}