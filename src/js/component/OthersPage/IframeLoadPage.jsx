import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import IframeLoad from "../../plugin/Others/IframeLoad.jsx";

export default class IframeLoadPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="iframe-load-page">
                <h1>IframeLoad</h1>
                <p>iframe 加载页面的组件</p>
                <Demo title="实例" component={<IframeLoad
                    url="http://www.itbbb.com/jsfunction/jsfunction.html?reacteasyui"
                    height="300px"
                />}>
                    {`<IframeLoad
    url="http://www.itbbb.com/jsfunction/jsfunction.html"
    height="300px"
/>`}
                </Demo>
                <Section data={[
                    {name: "url", type: "string", required: true, des: "加载页面的地址"},
                    {name: "isLoading", type: "boolean", default: "true", des: '是否显示加载图标'},
                    {name: "width", type: "string", default: "100%", des: 'iframe 容器的宽'},
                    {name: "height", type: "string", default: "400px", des: 'iframe 容器的高'},
                ]}/>
            </div>);
    }
}