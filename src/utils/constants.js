export const SET_TABLE = 'SET_TABLE';
export const MERGE_TABLES = 'MERGE_TABLES';
export const PARSE_TABLES = 'PARSE_TABLES';
export const UPLOAD_FLOOR = 'UPLOAD_FLOOR';
export const UPLOAD_ORDERS = 'UPLOAD_ORDERS';

export const fetchCompletedService = async (table) => {
    await fetch('https://dizengoff-yosi.herokuapp.com/backend', {
        method: 'POST',
        body: JSON.stringify({
            Mobile: table.Mobile,
            Diners: table.Diners,
            tables: table.Table,
            start_time: table.Start,
            end_time: getTimeNow()
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => console.log(data))
        .catch(e => console.log(e.message))
}

export const getTimeNow = () => {
    const now = new Date();
    const timeNow = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' +
        (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' +
        (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds());
    return timeNow;
}

export const getMergeTables = (tables, diners) => {
    let isMerge = false;
    let merge = [];
    tables.forEach(table => {
        let mrgTables = [table.Table];
        let sumDiners = diners - Math.floor(table.Table / 100);
        table.Concat.forEach(cat => {
            if (!isMerge) {
                mrgTables.push(cat);
                sumDiners = sumDiners - Math.floor(cat / 100);
                if (sumDiners === 0) {
                    isMerge = true;
                    merge = [...mrgTables];
                }
            }
        })
    });
    return merge;
}

export const mergeTables = (tables, diners) => {
    const mrgTables = getMergeTables(tables, diners);

    const newTables = [];
    if (mrgTables.length > 1) {
        let newTable;
        tables.forEach(item => {
            let isNotMerge = true;
            mrgTables.forEach(tMerge => {
                if (item.Table === tMerge) {
                    isNotMerge = false;
                    if (!newTable) {
                        newTable = {
                            Table: mrgTables.reduce((acc, s) => s = acc + s),
                            Diners: Math.floor(mrgTables.reduce((acc, s) => s = acc + s) / 100),
                            Concat: [],
                            Disconcat: [...mrgTables],
                            isBusy: false,
                            Mobile: '',
                            Start: ''
                        }
                        newTables.push(newTable);
                    }
                }
            })
            if (isNotMerge) {
                newTables.push(item);
            }
        })
    }
    return newTables;
}

export const parseTables = tables => {
    const newTables = [];
    tables.forEach(item => {
        if (item.Disconcat) {
            const disconcat = item.Disconcat;
            for (let index = 0; index < disconcat.length; index++) {
                const concat = [...disconcat];
                concat.splice(index, 1);
                const newTable = {
                    Table: disconcat[index],
                    Diners: Math.floor(disconcat[index] / 100),
                    Concat: [...concat],
                    isBusy: false,
                    Mobile: '',
                    Start: ''
                };
                newTables.push(newTable);
            }
        } else {
            newTables.push(item);
        }
    })
    return newTables;
}