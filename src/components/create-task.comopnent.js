import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as taskAction from '../redux/actions/taskAction';
import { connect } from 'react-redux';


function CreateTask(props) {
    const [state, setState] = useState({
        task: {
            name: '',
            status: 'Inprogress',
            statusColor: 'red',
            date: new Date()
        }
    });

    function onChangeTask(e) {
        if (e.target.value.match(/^[a-zA-Z]*$/)) {
            setState({
                ...state, task: { ...state.task, name: e.target.value }
            })
        }
        else {
            return false;
        }
    }

    function onChangeStatus(e) {
        setState({
            ...state, task: { ...state.task, status: e.target.value }
        })
    }
    function onChangeDate(date) {
        setState({
            ...state, task: { ...state.task, date: date }
        })
    }
    function onSubmit(e) {
        e.preventDefault();
        debugger
        var { ...task } = state.task
        task.id = props.tasks.data.length + 1;

        if (task.status == "Completed") {
            task.statusColor = "#58b758"
        }
        else if (task.status == "Active") {
            task.statusColor = "#fdfd58"
        }
        else {
            task.statusColor = "#f54949"
        }

        props.dispatch(taskAction.createTask(task))
        props.history.push("/")
    }


    return (
        <div>
            <h3>create new task</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Add Task</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        value={state.task.name}
                        onChange={onChangeTask}
                    />
                </div>
                <div className="form-group">
                    <label>Task Satus:</label>
                    <select
                        required
                        className="form-control"
                        value={state.task.status}
                        onChange={onChangeStatus}>
                        <option>Completed</option>
                        <option>Active</option>
                        <option>Inprogress</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <div>
                        <DatePicker
                            selected={state.task.date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="create task" className="btn btn-primary" />
                </div>
            </form>
        </div>

    )
}

function mapStateToProps(_data) {
    return ({
        tasks: _data.tasks
    }
    )
}

export default connect(mapStateToProps)(CreateTask);