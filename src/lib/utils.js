import React from 'react';
import { FormattedRelative,FormattedDate,FormattedTime } from 'react-intl'

export const isURL = (url)=>{
    if(url && /^(http|https):\/\/[^ "]+$/.test(url)){
        return true
    }
    return false
}

export const getTimeFromNow = (time) =>{
    return <FormattedRelative value={new Date(time)}/>
}

export const getFormatTime = (time) =>{
    return  (<div><FormattedDate month='2-digit' day='2-digit' value={new Date(time)} />
            <FormattedTime 
                  value={new Date(time)} /></div>)
}
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

export const getTagListFromMatchers = (matchers,insert=true) => {
    let tagList = [];
    for (let m=0;m<matchers.length;m++) {
        const str = `${matchers[m]["name"]}="${matchers[m]["value"]}"`
        let className = "badge badge-info"
        if(matchers[m].isRegex){
            // regex only
            className="badge badge-success";
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
        if (insert && ((m+1) % 3 === 0)) {
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
