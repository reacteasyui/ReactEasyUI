import React from 'react';
import Demo from '../Demo.jsx';
import Section from '../Section.jsx';
import {DateChooser, MODE} from '../../plugin/Date/DateChooser.jsx';

export default class DateChooserPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="date-chooser-page">
                <h1>DateChooser</h1>
                <p>日期选择组件增强版本，提供多种模式</p>
                <Demo title="实例" des='模式为「天」的日期选择组件实例' component={<DateChooser
                    mode="day"
                    opens="right"
                />}>
                    {`<DateChooser
    mode="day"
    opens="right"
/>`}
                </Demo>
                <Demo des='模式为「星期」的日期选择组件实例' component={<DateChooser
                    mode="week"
                />}>
                    {`<DateChooser
    mode="week"
/>`}
                </Demo>
                <Demo des='模式为「月」的日期选择组件实例' component={<DateChooser
                    mode="month"
                />}>
                    {`<DateChooser
    mode="month"
/>`}
                </Demo>
                <Demo des='模式为「年」的日期选择组件实例' component={<DateChooser
                    mode="year"
                />}>
                    {`<DateChooser
    mode="year"
/>`}
                </Demo>
                <Demo des='模式为「范围」的日期选择组件实例' component={<DateChooser
                    mode="range"
                    opens="right"
                />}>
                    {`<DateChooser
    mode="range"
    opens="right"
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: 'mode', type: 'string', default: 'day', des: '可选 "day", "week", "month", "year", "range"'},
                    {name: 'range', type: 'boollean', default: 'false', des: '设置true则日历为时间段选择，默认选择单日选择'},
                    {name: 'format', type: 'string', des: '设置日期格式,如 ”YYYY-MM-DD"'},
                    {name: 'startTime', type: 'string', des: '默认起始日期，如 "2016-07-11"'},
                    {name: 'endTime', type: 'string', des: '默认截止日期，如 "2016-07-18"'},
                    {name: 'todayIsMinDay', type: 'boolean', default: 'false', des: '今天之前的日期不可选'},
                    {name: 'maxDate', type: 'string', des: '最大可选日期'},
                    {name: 'minDate', type: 'string', des: '最小可选日期'},
                    {name: 'isButtonHide', type: 'boolean', default: 'false', des: '是否隐藏快捷操作按钮'},
                ]}/>
                <Section title="回调方法" method="onDateChanged(start, end)" data={[
                    {name: 'startTime', type: 'string', des: '选中的起始日期，如 "2016-07-11"'},
                    {name: 'endTime', type: 'string', des: '选中的截止日期，如 "2016-07-18"'},
                ]}/>
            </div>
        );
    }
}