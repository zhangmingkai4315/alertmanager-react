import moment from "moment";

const durationRegex = new RegExp(/^\d+[h,d,m]{1}$/);
const groupDurationRegex = new RegExp(/^(\d+)([h,d,m]{1})$/)
export const checkDurationFormat = (date)=>{
     if(!durationRegex.test(date)){
        return false
    }
    return true
}

export const getNewTimeFromOffset=(date,offset)=>{
    if(!checkDurationFormat(offset)){
        return moment(date).toISOString()
    }
    var matchGroup = offset.match(groupDurationRegex)
    if(matchGroup && matchGroup.length>2){
        let number = matchGroup[1]
        let unit = matchGroup[2] 
        switch(unit){
            case 'd':
            case 'D':
                return moment(date).add(parseInt(number,10),"days").toISOString()            
            case 'h':
            case 'H':
                return moment(date).add(parseInt(number,10),"hours").toISOString()
            case 'm':
            case 'M':
                return moment(date).add(parseInt(number,10),"minutes").toISOString()
            default:
                return moment(date).toISOString()
        }
    }
    return moment(date).toISOString()
}
export const formatDateToISO=(value)=>{
    return value && moment(value).toISOString()
}
export const getOffsetFromTimes = (start,end) =>{
    const duration = moment.duration(moment(end).diff(moment(start)))
    if (duration.asDays()>1){
        return parseInt(Math.round(duration.asDays()),10)+"d"
    }else if(duration.asHours()>1){
        return parseInt(Math.round(duration.asHours()),10)+"h"
    }else if(duration.asMinutes()>1){
        return parseInt(Math.round(duration.asMinutes()),10)+"m"
    }else{
        return ''
    }
}
const validate = values => {
    const errors = {}
    if(!values.startsAt){
        errors.startsAt = "必填"
    }
    if(!values.endsAt){
        errors.endsAt = "必填"
    }
    if(moment(values.startsAt).isAfter(moment(values.endsAt))){
        errors.startsAt = "不得晚于结束时间 "
    }
    if(!values.createdBy){
        errors.createdBy = "必填"
    }
    if(values.duration){
        if(!checkDurationFormat(values.duration)){
            errors.duration="Example: '10m','2h','3d'"
        }
    }
    if(!values.comment){
        errors.comment = "必填"
    }
    if(!values.matchers|| !values.matchers.length){
        errors.matchers = {_error:"至少填写一项匹配"};
    }else{
        const matchersArrayErrors = [];
        values.matchers.forEach((matcher,index)=>{
            const matcherErrors = {}
            if(!matcher || !matcher.name){
                matcherErrors.name = "必填"
                matchersArrayErrors[index] = matcherErrors;
            }
            if(!matcher || !matcher.value){
                matcherErrors.value = "必填"
                matchersArrayErrors[index] = matcherErrors;
            }

        })
        if(matchersArrayErrors.length){
            errors.matchers = matchersArrayErrors;
        }
    }
    return errors
}

export default validate