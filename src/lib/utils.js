import React from 'react';

export const getAlertClass = (severity) => {
    try {
        switch (severity) {
            case 'critical':
                return "table-danger"
            case 'warning':
                return "table-warning"
            default:
                return ""
        }
    } catch (err) {
        return '';
    }
}


export const getTagListFromLables = (labels,clickHandler)=>{
    let tagList = [];
    let counter = 0;
    for (let k in labels) {
        counter++;
        if (counter % 4 === 0) {
            tagList.push(
                <div key={counter}></div>
            )
            continue
        }
        const str = `${k}="${labels[k]}"`
        tagList.push(
            <span
                key={counter}
                className="badge badge-info"
                onClick={()=>clickHandler(str)}
                style={{
                marginRight: "5px",
                marginBottom: "5px",
                marginTop: "5px",
                cursor: "pointer"
            }}>{str}</span>
        )

    }
    return tagList
}
