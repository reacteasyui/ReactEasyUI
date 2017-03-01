import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import FreeCheckBox from "../../plugin/Base/FreeCheckBox.jsx";

export default class FreeCheckBoxPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="free-check-box-page">
                <h1>FreeCheckBox</h1>
                <p>允许全不选的单选按钮组</p>
                <Demo title="实例" component={<FreeCheckBox/>}>
                    {`<FreeCheckBox/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "name", type: "string", default: "", des: "隐藏input的name值，用于可能存在的表单提交"},
                    {name: "text", type: "array", default: "['是','否']", des: "选项的描述文字"},
                    {name: "value", type: "array", default: "[0,1,2]", des: "数据对应的value，0对应全部不选，1对应选中第一项，2对应选中第二项"},
                    {name: "selectValue", type: "number", default: "0", des: "默认选中状态"}
                ]}/>
            </div>
        );
    }
}