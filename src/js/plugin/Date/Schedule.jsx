import React from 'react';
import ScheduleDate from './schedule.js';

export default class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.ScheduleID = "scheduleDateDiv_" + ~~(Math.random() * 100000);
        this.scheduleDate = null;
    }
    render(){
        return(
            <div id={this.ScheduleID} className="_sceduleDate"></div>
        );
    }
    componentDidMount(){
        console.log('aa');
        this.scheduleDate = new ScheduleDate({
            scheduleID:'#'+this.ScheduleID,
            minDate: $.date(),
            currentDate:$.date(),
            maxDate:$.date().addMonths(3),
            fontFlag:'休',
            //selectedCount:4,
            //selectedDates:['2017-01-06','2017-01-28'],
            callback:function(schedule){
                console.log(schedule.settings.selectedDates);
            }
        });
    }
}