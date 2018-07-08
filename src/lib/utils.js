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

export const getTagListFromMatchers = (matchers) => {
    console.log(matchers)
    let tagList = [];
    for (let m=0;m<matchers.length;m++) {
        const str = `${matchers[m]["name"]}="${matchers[m]["value"]}"`
        let className = "badge badge-info"
        if(matchers[m].isRegex){
            // regex only
            className="badge badge-primary";
        }
        tagList.push(
            <span
                key={m}
                className={className}
                style={{
                    marginRight: "5px",
                    marginBottom: "5px",
                    marginTop: "5px",
                    cursor: "pointer"
                }}>{str}</span>
        )
        if ((m+1) % 3 === 0) {
            tagList.push(
                <div key={m*-1}></div>
            )
        }
    }
    return tagList
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
