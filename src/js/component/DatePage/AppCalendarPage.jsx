import React from 'react';
import Demo from '../Demo.jsx';
import Section from '../Section.jsx';
import AppCalendar from '../../plugin/Date/AppCalendar.jsx';

export default class AppCalendarPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-calendar-page">
                <h1>AppCalender</h1>
                <p>用于移动端的日历组件</p>
                <div id="app-calendar-demo"></div>   // App 日历挂载点
                <Demo title="实例" component={<AppCalendar
                    type="multiple"
                    format="MM月dd日"
                    maxDate={$.date().format("yyyy-MM-dd")}
                    el="#app-calendar-demo"
                />}>
                    {`<AppCalendar
    type="multiple"
    format="MM月dd日"
    maxDate={$.date().format("yyyy-MM-dd")}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: 'type', type: 'string', des: '日历类型，单日期选择: single，日期范围选择：multiple'},
                    {name: 'display', type: 'number', des: '首次加载月个数'},
                    {name: 'currentDate', type: 'date', des: '当前日期'},
                    {name: 'canBeSelected', type: 'string', des: '日期可使用范围，用~分隔'},
                    {name: 'formate', type: 'string', des: '日期格式'},
                    {name: 'maxDate', type: 'string', des: '最大可选日期'},
                    {name: 'minDate', type: 'string', des: '最小可选日期'},
                    {name: 'el', type: 'string', default: '<body>', des: '父元素 id，如 "#demo"，日历将插入到父元素结尾；如不指定，日历将插入到 </body> 前'},
                ]}/>
            </div>
        );
    }
}