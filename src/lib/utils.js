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


export const getTagListFromLables = (labels)=>{
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
        tagList.push(
            <span
                key={counter}
                className="badge badge-info"
                style={{
                marginRight: "5px",
                marginBottom: "5px",
                marginTop: "5px"
            }}>{k}={labels[k]}</span>
        )

    }
    return tagList
}
