import React from 'react';
import Demo from '../Demo.jsx';
import Section from '../Section.jsx';
import DateRangePicker from '../../plugin/Date/DateRangePicker.jsx';

export default class DateRangePickerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="date-range-picker-page">
                <h1>DateRangePicker</h1>
                <p>日期选择组件基础版本</p>
                <Demo title="实例" component={<DateRangePicker
                    todayIsMinDay
                    format="YYYY-MM-DD"
                    name="follow_time"
                />}>
                    {`<DateRangePicker
    todayIsMinDay
    format="YYYY-MM-DD"
    name="follow_time"
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "name", type: "string", default: "", des: "隐藏input的name值，用于可能存在的表单提交"},
                    {name: 'range', type: 'boollean', default: 'false', des: '设置true则日历为时间段选择，默认选择单日选择'},
                    {name: 'format', type: 'string', des: '设置日期格式,如 "YYYY-MM-DD"'},
                    {name: 'startTime', type: 'string', des: '默认起始日期，如 "2016-07-11"'},
                    {name: 'endTime', type: 'string', des: '默认截止日期，如 "2016-07-18"'},
                    {name: 'todayIsMinDay', type: 'boolean', default: 'false', des: '今天之前的日期不可选'},
                    {name: 'maxDate', type: 'string', des: '最大可选日期'},
                    {name: 'minDate', type: 'string', des: '最小可选日期'},
                    {name: 'isButtonHide', type: 'boolean', default: 'false', des: '是否隐藏快捷操作按钮'},
                ]}/>
                <Section title="回调方法" method="onSelected(startTime, endTime)" data={[
                    {name: 'startTime', type: 'string', des: '选中的起始日期，如 "2016-07-11"'},
                    {name: 'endTime', type: 'string', des: '选中的截止日期，如 "2016-07-18"'},
                ]}/>
            </div>
        );
    }
}