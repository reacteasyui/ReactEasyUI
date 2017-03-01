import React from "react";
/**
 @class Ring
 @extends React.Component
 @constructor
 @param [goalNum] {Number} 展示项的值
 @param [diameter] {Number} 圆环或饼形图的直径
 @param [ringWidth] {Number} 圆环的宽度
 @param [colorIndex] {Number} 圆形图的颜色数组的下标
 @param [topWord] {String} 圆环内部显示内容上半部分
 @param [bottomWord] {String} wordIndex={2}圆环内部显示内容下半部分
 @return {Component} 返回Ring组件
 */
export default class Ring extends React.Component{
    constructor(props){
        super(props);
        this.colorPalette = ['#009BF7', '#FEBD57', '#FE4D4D', '#FEBD57', '#9A25FF', '#43a647'];
        this.state={
            goalNum:0,
            name:props.name || '',
            transferNum:props.goalNum || 0,
            diameter:props.diameter || 100,
            ringWidth:props.ringWidth || 10,
            colorIndex:props.colorIndex || 0,
            topWord:props.topWord || null,
            bottomWord:props.bottomWord || null,
            isPie:props.isPie || false,
            color:props.color || null
        }
    }


    render(){
        let _this = this,goalNum=this.state.goalNum,diameter=this.state.diameter,ringWidth=this.state.ringWidth,colorIndex=this.state.colorIndex;
        let styleRing=null,styleLeft = null,styleRight = null,styleHold1=null,styleHold2=null,styleCover=null,styleBg=null;
        styleBg={
            background:_this.state.color?_this.state.color:_this.colorPalette[colorIndex]
        };
        styleRing={
            width:(diameter-1)+'px',
            height:(diameter-1)+'px',
        };
        if(this.state.isPie){
            styleCover={
                display:'none'
            };
        }else{
            styleCover={
                width:(diameter-ringWidth*2)+'px',
                height:(diameter-ringWidth*2)+'px',
                top:ringWidth+'px',
                left:ringWidth+'px'
            };
        }

        if(goalNum<=50){
            styleHold1={
                clip:'rect(0px'+' '+(diameter)+'px'+' '+(diameter)+'px'+' '+((diameter/2)-2)+'px)'
            };
            styleHold2={
                clip:'rect(0px'+' '+(diameter/2)+'px'+' '+(diameter)+'px 0px)'
            };
            styleLeft = {
                transform:'rotate('+(goalNum/100*360)+'deg)',
                WebkitTransform:'rotate('+(goalNum/100*360)+'deg)',
                clip:'rect(0px'+' '+(diameter)+'px'+' '+(diameter)+'px'+' '+((diameter/2)-2)+'px)'
            };
            styleRight = {
                transform:'rotate(0deg)',
                WebkitTransform:'rotate(0deg)',
                clip:'rect(0px'+' '+(diameter/2)+'px'+' '+(diameter)+'px 0px)'
            }
        }else if(goalNum>50 && goalNum<=100){
            styleHold1={
                clip:'rect(0px'+' '+(diameter)+'px'+' '+(diameter)+'px'+' '+((diameter/2)-2)+'px)'
            };
            styleHold2={
                clip:'rect(0px'+' '+((diameter/2)-2)+'px'+' '+(diameter)+'px 0px)'
            };
            styleLeft = {
                transform:'rotate(180deg)',
                WebkitTransform:'rotate(180deg)',
                clip:'rect(0px'+' '+(diameter)+'px'+' '+(diameter)+'px'+' '+((diameter/2)+2)+'px)'
            };
            styleRight = {
                transform:'rotate('+((goalNum-50)/100*360)+'deg)',
                WebkitTransform:'rotate('+((goalNum-50)/100*360)+'deg)',
                clip:'rect(0px'+' '+(diameter/2)+'px'+' '+(diameter)+'px 0px)'
            }
        }else{
            styleHold1={
                clip:'rect(0px'+' '+(diameter)+'px'+' '+(diameter)+'px'+' '+((diameter/2)-2)+'px)'
            };
            styleHold2={
                clip:'rect(0px'+' '+((diameter/2)-2)+'px'+' '+(diameter)+'px 0px)'
            };
            styleLeft = {
                transform:'rotate(180deg)',
                WebkitTransform:'rotate(180deg)',
                clip:'rect(0px'+' '+(diameter)+'px'+' '+(diameter)+'px'+' '+((diameter/2)+2)+'px)'
            };
            styleRight = {
                transform:'rotate(180deg)',
                WebkitTransform:'rotate(180deg)',
                clip:'rect(0px'+' '+(diameter/2)+'px'+' '+(diameter)+'px 0px)'
            }
        }
        return (
            <div className="re-app-ring" style={styleRing}>
                <div className="re-ring-hold re-ring-hold1" style={styleHold1}>
                    <div className="re-ring-pie re-ring-pie1" style={styleLeft}></div>
                </div>
                <div className="re-ring-hold re-ring-hold2" style={styleHold2}>
                    <div className="re-ring-pie re-ring-pie2" style={styleRight}></div>
                </div>
                <div className="re-ring-bg" style={styleBg}> </div>
                <div className="re-ring-cover" style={styleCover}>
                    {
                        _this.state.topWord?(<div className="re-top-word">{_this.state.topWord}</div>):null
                    }
                    {
                        _this.state.bottomWord?(<div className="re-bottom-word">{_this.state.bottomWord}</div>):null
                    }
                </div>
            </div>
        );
    }

    componentWillReceiveProps(props) {
        let _this = this;
        _this.setState({
            goalNum:props.goalNum
        });
    }
    componentWillMount(){
        let _this = this;
        _this.setState({
            goalNum:_this.state.goalNum
        })
    }
    componentDidMount(){
        let _this = this;
        _this.setState({
            goalNum:_this.state.transferNum
        })
    }
}