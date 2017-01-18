import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import DelIconInput from "../../plugin/Base/DelIconInput.jsx";

export default class DelIconInputPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="del-icon-input-page">
                <h1>DelIconInput</h1>
                <p>具有清空按钮的输入框</p>
                <Demo title="实例" component={<DelIconInput
                    name="user_name"
                    maxLength="12"
                    required
                    defaultValue="Name"
                />}>
                    {`<DelIconInput
    name="user_name"
    maxLength="12"
    required
    defaultValue="Name"
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: 'name', type: 'string', default: '', des: '组件对应的表单名称'},
                    {name: 'delShow', type: 'boolean', default: '', des: '是否展示删除图标'},
                    {name: 'defaultValue', type: 'string', default: '', des: '默认值'},
                ]}/>
            </div>
        );
    }
}