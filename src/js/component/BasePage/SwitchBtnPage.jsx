import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import SwitchBtn from "../../plugin/Base/SwitchBtn.jsx";

export default class SwitchBtnPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="switch-btn-page">
                <h1>SwitchBtn</h1>
                <p>开关组件</p>
                <Demo title="实例" component={<SwitchBtn
                    name="clue_time"
                    text={["On","Off"]}
                    active="true"
                />}>
                    {`<SwitchBtn
    name="clue_time"
    text={["On","Off"]}
    active="true"
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "name", type: "string", default: "", des: "隐藏input的name值，用于可能存在的表单提交"},
                    {name: 'text', type: 'array', default: '["开","关"]', des: '选项组的文本数组 如：["上午","下午"]'},
                    {name: 'vals', type: 'array', default: '[0,1]', des: '选项组的值数组 如：[0,1]'},
                    {name: 'active', type: 'boolean', default: 'false', des: '选项组的默认选中项 如：true:第一项，false：第二项'},
                ]}/>
            </div>
        );
    }
}