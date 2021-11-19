import { TYPES } from "../actions/crudAction";

export const crudInitialState = {
    db: null
};

export function crudReducer (state, action) {
switch (action.type) {
    case TYPES.READ_ALL_DATA: {
        return {
            ...state,
            db: action.payload.map(data => data)
        }
    }
    case TYPES.CREATE_DATA: {
        return {
            ...state,
            db: [ ...state.db, action.payload ]
        }
    }   
    case TYPES.UPDATE_DATA: {
        let newData = state.db.map(e => e.id === action.payload.id ? action.payload : e);
        return {
            ...state,
            db: newData
        }
    } 
    case TYPES.DELETE_DATA: {
        let newData = state.db.filter(e => e.id !== action.payload);
        return {
            ...state,
            db: newData
        }
    }
    case TYPES.NO_DATA: {
        return crudInitialState
    }
    default:
        return state
}
};