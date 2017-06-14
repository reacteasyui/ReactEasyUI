import React from 'react';
import Demo from "../Demo.jsx";
import '../../plugin/Base/Button.js';

export default class CounterPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <h1>button动效集合</h1>
                <p>使用</p>
                <p>1. 引入Button.js;<br/>
                2. 引入Button.scss;</p>
                <Demo title="按钮-动画效果-hover-实例" component={<div>
                    <a href="javascript:;" className="hover-btn q-btn-green" >
                        <span>+</span>
                    </a>
                    &nbsp;&nbsp;
                    <div className="hover-btn q-btn-gray">
                        <span>gray</span>
                    </div>
                    &nbsp;
                    &nbsp;
                    <button className="hover-btn q-btn-red" >
                        <span>get Started</span>
                    </button>
                    </div>
                }>
                    {`
<a href="javascript:;" className="hover-btn q-btn-green" data-shadecolor="#29e320">
    <span>+</span>
</a>
<div className="hover-btn q-btn-gray" data-shadecolor="#bababa">
    <span>gray</span>
</div>
<button className="hover-btn q-btn-red" data-shadecolor="#f00">
    <span>get Started</span>
</button>
调用方法：
$(".hover-btn").addAnimate({
    type:'hover',//鼠标事件 hover| click
    animate:'square',//动画种类 square | circle | circle-border
    //shadeColor:''//遮罩颜色 默认不传时，自动计算颜色
});`}
    </Demo>
    <Demo title="按钮-动画效果-hover-实例" component={<div>
<a className="shape-circle shape-circle-hover" > 
    ×
</a>
<a className="shape-circle-border-rotate" > ×</a>
        </div>}>
                    {`
<a className="shape-circle shape-circle-hover" > ×</a>
<a className="shape-circle-border-rotate" > ×</a>
className必须包含实例中所写，可以基础上添加className;
注：动画border样式需写在:before中`}
    </Demo>
                
                <Demo title="按钮-动画效果-click-实例" component={<div>
                    <a href="javascript:;" className="click-btn q-btn-green" data-shadecolor="#29e320">
                        <span>+</span>
                    </a>
                    &nbsp;&nbsp;
                    <div className="click-btn q-btn-gray" data-shadecolor="#bababa">
                        <span>gray</span>
                    </div>
                    &nbsp;
                    &nbsp;
                    <button className="click-btn q-btn-red" data-shadecolor="#f00">
                        <span>get Started</span>
                    </button>
                    </div>
                }>
                    {`
<a href="javascript:;" className="click-btn q-btn-green" data-shadecolor="#29e320">
    <span>+</span>
</a>
<div className="click-btn q-btn-gray" data-shadecolor="#bababa">
    <span>gray</span>
</div>
<button className="click-btn q-btn-red" data-shadecolor="#f00">
    <span>get Started</span>
</button>
调用方法：
$(".click-btn").addAnimate({
    type:'click',//鼠标事件 hover| click
    animate:'square',//动画种类 square | circle | circle-border
    //shadeColor:''//遮罩颜色 默认不传时，自动计算颜色
});`} </Demo>

<Demo title="按钮-动画效果-click-实例" component={<div>
<a className="shape-circle shape-circle-click" > 
    ×
</a>
<a className="shape-square btn-close" data-shadecolor="#000">
    <span>×</span>
</a>
    </div>}>
                    {`
<a className="shape-circle shape-circle-click" >×</a>
调用方法：
$(".shape-circle").addAnimate({
    type:'click',//鼠标事件 hover| click
    animate:'circle-border',//动画种类 square | circle | circle-border
});
<a className="shape-square btn-close" data-shadecolor="#000">
    <span>×</span>
</a>
调用方法：
$(".shape-square").addAnimate({
    type:'click',//鼠标事件 hover| click
    animate:'circle',//动画种类 square | circle | circle-border
    shadeColor:'#000'//遮罩颜色
});
注：动画border样式需写在:before中`}
    </Demo>
                    
            </div>
        );
    }
    componentDidMount(){
        $(".hover-btn").addAnimate({
            type:'hover',
            animate:'square'
        });
        $(".click-btn").addAnimate({
            type:'click',
            animate:'square'
        });
        $(".shape-circle-click").addAnimate({
            type:'click',
            animate:'circle-border'
        });
        $(".shape-square").addAnimate({
            type:'click',
            animate:'circle'
        });
    }
}