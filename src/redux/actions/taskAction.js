import * as types from './actionType'

export function createTask(tasks) {
    return {
        type: types.CREATE_TASK,
        tasks
    }
}

export function updateTask(tasks) {
    return {
        type: types.UPDATE_TASK,
        tasks
    }
}


export function deleteTask(taskid) {
    return {
        type: types.DELETE_TASK,
        taskid
    }
}

export function filterTask(taskstatus) {
    return {
        type: types.FILTER_TASK,
        taskstatus
    }
}