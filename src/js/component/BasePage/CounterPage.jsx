import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Counter from "../../plugin/Base/Counter.jsx";

export default class CounterPage extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className="auto-complete-page">
                <h1>Counter</h1>
                <p>计数器，根据用户预设值范围，在预设值范围内进行增减操作;同时允许用户手动输入</p>
                <Demo title="实例" component={<Counter name="num" min={1} max={10} value={1} />}>
                    {`<Counter name="num" min={1} max={10} value={1} />`}
    </Demo>
                <Section title="参数" data={[
                    {name: "min", type: "number", default: null,  des: '最小值', required: true},
                    {name: "max", type: "number", default: null,  des: '最大值', required: true},
                    {name: "value", type: "number", default: null,  des: 'input值', required: true},
                    {name: "step", type: "number", default: '1',  des: '步长'},
                    {name: "name", type: "string", default: null,  des: 'name属性值', required: true}
                ]}/>
            </div>
        );
    }
}