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
className使用hover-btn作hover动效,类名q-btn-[*]为按钮重写样式,data-shadecolor为动画遮罩层颜色`}
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
className使用click-btn作click动效,类名q-btn-[*]为按钮重写样式,data-shadecolor为动画遮罩层颜色`} </Demo>

<Demo title="按钮-动画效果-click-实例" component={<div>
<a className="shape-circle shape-circle-click" > 
    ×
</a>
<a className="shape-square" data-shadecolor="#000"> 
    <span>×</span>
</a>
    </div>}>
                    {`
<a className="shape-circle shape-circle-click" >×</a>
<a className="shape-square" data-shadecolor="#000"> 
    <span>×</span>
</a>
className必须包含实例中所写，可以基础上添加className,data-shadecolor为动画颜色;
注：动画border样式需写在:before中`}
    </Demo>
                    
            </div>
        );
    }
}