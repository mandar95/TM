import * as types from '../actions/actionType';

export default function taskReducer(state = {
    data: [{
        id: 1,
        name: 'TodoList',
        date: "Tue Sep 22 2020",
        status: 'Completed',
        statusColor: '#58b758'
    }],
    filterdata: []
}
    , action) {
    debugger
    switch (action.type) {
        
        case types.CREATE_TASK:
            return { ...state, data: [...state.data, { ...action.tasks }] }

        case types.UPDATE_TASK:
            var d = state.data.map(data => {
                if (data.id === action.tasks.id) {
                    return {
                        ...data,
                        name: action.tasks.name,
                        date: action.tasks.date,
                        status: action.tasks.status,
                        statusColor: action.tasks.statusColor
                    }
                }
                return data;
            });
            return { ...state, data: [...d] }

        case types.DELETE_TASK:
            if (action.taskid) {
                state.splice(action.taskid - 1, 1)
                return state
            }

        case types.FILTER_TASK:
            if (action.taskstatus != "All") {
                let data = state.data.filter(data => {
                    if (data.status == action.taskstatus) {
                        return {
                            ...data
                        }
                    }
                })
                return { ...state, filterdata: [...data] }
            }
            return { ...state, filterdata: [] }
        default: return state;
    }
}


