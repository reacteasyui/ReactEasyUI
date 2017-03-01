import React from "react";
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Schedule from "../../plugin/Date/Schedule.jsx";

export default class SchedulePage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCallBack(selectedDates,selectedValue) {
        console.log('您选择了'+selectedValue);
    }
    handleTipsMsg() {
        alert('每月最多可选择4个日期');
    }

    render() {
        return (
            <div className="schedule-page">
                <h1>Schedule</h1>
                <p>简单的日历组件</p>
                <Demo title="实例" component={<Schedule
                    minDate={$.date()}
                    currentDate={$.date()}
                    maxDate={$.date().addMonths(3)}
                    fontFlag='休'
                    selectedCount={4}
                    selectedDates={['2017-01-06','2017-01-28']}
                    callback={this.handleCallBack.bind(this)}
                    tipsMsg = {this.handleTipsMsg.bind(this)}
                />}>
                    {`<Schedule
    minDate={$.date()}
    currentDate={$.date()}
    maxDate={$.date().addMonths(3)}
    fontFlag='休'
    selectedCount={4}
    selectedDates={['2017-01-06','2017-01-28']}
    callback={this.handleCallBack.bind(this)}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: 'minDate', type: 'date',default: '', des: '可查看的最小日期'},
                    {name: 'currentDate', type: 'date',default: '当前日期', des: '当前日期'},
                    {name: 'maxDate', type: 'date', des: '可查看的最大日期'},
                    {name: 'fontFlag', type: 'string', des: '选中状态所显示的字符标识'},
                    {name: 'selectedCount', type: 'number | string',default: '0', des: '每月最多可选择的日期天数，默认无限制'},
                    {name: 'selectedDates', type: 'array',des: '默认选中的日期'},
                ]}/>
            </div>);
    }
}