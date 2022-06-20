import { SET_TABLE, MERGE_TABLES, mergeTables, PARSE_TABLES, parseTables, UPLOAD_FLOOR, UPLOAD_ORDERS } from "../utils/constants";

let initState = {
    floor: [],
    orders: []
}

const floorReducer = (state = initState, action) => {

    switch (action.type) {

        case SET_TABLE:
            const tables = [];
            state.floor.forEach(table => table.Table === action.payload.Table ?
                tables.push(action.payload) : tables.push(table));
            return { ...state, floor: tables };

        case MERGE_TABLES:
            return { ...state, floor: mergeTables(state.floor, 8) };

        case PARSE_TABLES:
            return { ...state, floor: parseTables(state.floor) };

        case UPLOAD_FLOOR:
            return { ...state, floor: JSON.parse(action.payload) };

        case UPLOAD_ORDERS:
            return { ...state, orders: JSON.parse(action.payload) };

        default:
            return state;

    }
}

export default floorReducer;