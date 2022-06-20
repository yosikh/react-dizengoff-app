import { SET_TABLE, MERGE_TABLES, PARSE_TABLES, UPLOAD_FLOOR, UPLOAD_ORDERS } from "../utils/constants";

export const setTableAction = table => ({
    type: SET_TABLE,
    payload: table
})

export const mergeTablesAction = () => ({
    type: MERGE_TABLES,
})

export const parseTablesAction = () => ({
    type: PARSE_TABLES,
})

export const uploadFloorAction = floor => ({
    type: UPLOAD_FLOOR,
    payload: floor
})

export const uploadOrdersAction = orders => ({
    type: UPLOAD_ORDERS,
    payload: orders
})
