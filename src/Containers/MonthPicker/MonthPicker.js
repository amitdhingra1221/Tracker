import React, { Component } from 'react';
import moment from 'moment';
import axios from '../../axios-teamdata';

class MonthPicker extends Component {
    state = {
        month: moment().format("MMM YYYY")
    }

    decreaseMonth = () => {
        //no need to clone the state because the state directly needs to be changed here
        const prevMonth = moment(this.state.month).subtract(1, 'months');
        const previousMonth = moment(prevMonth).format("MMM YYYY")
        this.setState({month: previousMonth})
    }
 
    increaseMonth = () => {

        const futureMonth = moment(this.state.month).add(1, 'months');
        const nextMonth = moment(futureMonth).format("MMM YYYY")
        this.setState({month: nextMonth})
    }
        

    // _filterByMonth = () => {
    //     const month = this.state.month.clone()
    //     this._runFilter({
    //       minDate: month.startOf('month').format(),
    //       maxDate: month.endOf('month').format(),
    //     })
    //   }
    
    render() { 
        return(
            <div>
                <br/>
                <p>Select Month</p>
                <h3>
                    <span onClick={this.decreaseMonth}>{' < '}</span>
                    <span>{this.state.month}</span>
                    <span onClick={this.increaseMonth}>{' > '}</span>
                </h3>
            </div>
        );
    }
}

export default MonthPicker;