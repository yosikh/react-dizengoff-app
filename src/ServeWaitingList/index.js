import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mergeTablesAction, parseTablesAction, setTableAction } from '../redux/action';
import { getTimeNow } from '../utils/constants';
import './style.css';

const ServeWaitingList = () => {
    const floor = useSelector(state => state.floor);
    const orders = useSelector(state => state.orders);
    const dispatch = useDispatch();

    const [listOrders, setListOrders] = useState(orders);
    const [indexOrder, setIndexOrder] = useState(0);

    useEffect(() => {
        const timerID = setTimeout(() => {
            if (listOrders.length === 0) {
                if (floor.findIndex(table => table.isBusy) === -1) {
                    dispatch(parseTablesAction());
                }
                return;
            }

            const list = JSON.parse(JSON.stringify(listOrders));
            const orderServiced = list[indexOrder];
            const index = floor.findIndex(table => table.Diners === orderServiced.Diners && !table.isBusy);
            if (index !== -1) {
                dispatch(setTableAction({
                    ...floor[index],
                    isBusy: true,
                    Mobile: orderServiced.Mobile,
                    Start: getTimeNow()
                }));
                list.splice(indexOrder, 1);
                setListOrders(list);
            } else {
                if (floor.findIndex(table => table.isBusy) === -1 && orderServiced.Diners === 8) {
                    dispatch(mergeTablesAction());
                    return;
                }
                setIndexOrder(indexOrder + 1);
            }
            list.length <= indexOrder + 1 && setIndexOrder(0);

        }, 5000);


        return () => {
            clearTimeout(timerID);
        }
    }, [indexOrder, listOrders, floor, dispatch])

    return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '75%',
                    width: '17%',
                    marginTop: '25em',
                }}>
                {listOrders.map((item, index) =>
                    <p className="text" key={index}>
                        {item.Mobile + ', ' + item.Diners}
                    </p>
                )}
            </div>

    )
}

export default ServeWaitingList;