import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as taskAction from '../redux/actions/taskAction';
import { connect } from 'react-redux';


const Task = props => (
    <tr>
        <td> {props.exrecise.name}</td>
        <td>{(props.exrecise.date).toString().substring(0, 15)}</td>
        <td style={{ backgroundColor: props.exrecise.statusColor, color: '#3e3c3c' }}>{props.exrecise.status}</td>
        <td>
            <Link to={"/edit/" + props.exrecise.id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exrecise.id) }}>delete</a>
        </td>
    </tr >
)

function TaskList(props) {
    const [state, setState] = useState({
        filterType: 'All'
    });

    function deleteExercise(id) {
        props.dispatch(taskAction.deleteTask(id))
    }

    function taskList() {
        if (props.filterData.length > 0) {
            return props.filterData.map(task => {
                return <Task exrecise={task} deleteExercise={deleteExercise} key={task.id} />
            })
        }
        else {
            return props.tasks.map(task => {
                return <Task exrecise={task} deleteExercise={deleteExercise} key={task.id} />
            })
        }
    }

    function onFilterStatus(e) {
        setState({ ...state, filterType: e.target.value })
        props.dispatch(taskAction.filterTask(e.target.value));
    }

    return (
        <div>
            <h3 style={{float:'left'}}>Tasks</h3>
            <div style={{float:'right'}}>
              
            <select
                required
                value={state.filterType}
                onChange={onFilterStatus}>
                <option>All</option>
                <option>Completed</option>
                <option>Active</option>
                <option>Inprogress</option>
            </select>
            </div>
           
            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>task name</th>
                        <th>date</th>
                        <th>task status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList()}
                </tbody>
            </table>
        </div>
    )
}
function mapStateToProps(_data) {
    return ({
        tasks: _data.tasks.data,
        filterData: _data.tasks.filterdata
    })
}
export default connect(mapStateToProps)(TaskList)