import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTableAction } from '../redux/action';
import { fetchCompletedService } from '../utils/constants';
import './style.css';

const Table = ({ item }) => {
    const dispatch = useDispatch();

    const [nameClass, setNameClass] = useState('');
    const [isClick, setIsClick] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleClick = () => {
        if (item.isBusy) {
            setIsClick(!isClick);
        }
    }

    useEffect(() => {
        setNameClass('item img-' + item.Diners);
        if (item.isBusy) {
            setNameClass('item img-' + item.Diners + '-red');
            if (startTime > 60) {
                setNameClass('item img-' + item.Diners + '-orange');
                if (startTime > 90 && !isCompleted) {
                    fetchCompletedService(item);
                    setIsCompleted(!isCompleted);
                    dispatch(setTableAction({
                        ...item,
                        isBusy: false,
                        Mobile: '',
                        Start: ''
                    }));
                }
            }
        } else {
            setStartTime(0);
            setIsCompleted(false);
        }

        const timerID = setTimeout(() => {
            setStartTime(startTime + 1);
        }, 1000);
        return () => {
            clearTimeout(timerID);
        }
    }, [startTime, isCompleted, item, dispatch])

    return (
        <div
            className={nameClass}
            onClick={handleClick}
        >
            {isClick &&
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '0.75em'
                }}>
                    <p>{item.Mobile}</p>
                    <p>{item.Diners}</p>
                    <p>{item.Start}</p>
                </div>
            }
        </div>
    )
}

export default Table;