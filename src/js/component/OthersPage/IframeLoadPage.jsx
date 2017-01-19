import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import IframeLoad from "../../plugin/Others/IframeLoad.jsx";

export default class IframeLoadPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let _this = this;
        return(<div className="plugin-page">
            <h1>IframeLoad</h1>
            <p>iframe加载页面的组件</p>
            <h2>实例</h2>
            <Demo component={<IframeLoad
                url="https://react-bootstrap.github.io/components.html"
                height="200px"
            />}>
                {`<IframeLoad
    url="https://react-bootstrap.github.io/components.html"
    height="200px"
/>`}</Demo>
            <Section data={[
                    {name: "url", type: "string", required: true, des: "加载页面的地址"},
                    {name: "isLoading", type: "boolean", default: "true", des: '是否显示加载图标'},
                    {name: "width", type: "string", default: "100%", des: 'Iframe容器的宽'},
                    {name: "height", type: "string", default: "400px", des: 'Iframe容器的高'},
                ]}/>
        </div>);
    }
}