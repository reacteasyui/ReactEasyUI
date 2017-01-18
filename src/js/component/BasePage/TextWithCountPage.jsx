import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import TextWithCount from "../../plugin/Base/TextWithCount.jsx";

export default class TextWithCountPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-with-count-page">
                <h1>TextWithCount</h1>
                <p>带计数功能的文本框</p>
                <Demo title="实例" component={<TextWithCount
                    maxLength={20}
                />}>
                    {`<TextWithCount
    maxLength={20}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "name", type: "string", default: "", des: "隐藏input的name值，用于可能存在的表单提交"},
                    {name: "maxLength", type: "number", default: "", des: "文本框最大输入长度", required: true},
                    {name: "defaultValue", type: "string", default: "", des: "默认输入文字"},
                    {name: "mode", type: "string", default: "text", des: "可选 text 或 textarea"},
                ]}/>
            </div>
        );
    }
}