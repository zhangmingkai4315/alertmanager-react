import React,{Component} from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form';
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import validate,{getNewTimeFromOffset,getOffsetFromTimes,formatDateToISO} from './validate';
import Style from './style.css';

momentLocalizer()

class NewSilenceForm extends Component{
    state ={
        startsAt:(new Date()).toISOString()
    }
    renderDateTimePicker = ({input:{onChange,value},offset,label,showTime, meta: {touched,error}}) =>{
        return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-6">
            <DateTimePicker onChange={onChange}
                            format="YYYY-MM-DD HH:mm"
                            time = {showTime}
                            step={10}
                            value = {!value ? new Date(moment(new Date()).add(offset,'hours')) : new Date(value)}/>
            </div>
            <div className="col-sm-4"> 
                    {touched && error && <span className={Style.error}>{error}</span>}
                </div>
        </div>)
    }
    renderField = ({input, label,name, placeholder,type, meta: {touched,error}}) =>{
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">{label}</label>
                <div className="col-sm-6">
                    <input {...input} 
                            className="form-control" 
                            placeholder={placeholder}
                            name={name} 
                            type={type}/>
                </div>
                <div className="col-sm-4"> 
                    {touched && error && <span className={Style.error}>{error}</span>}
                </div>
            </div>
        )
    }
    renderMatcherItem = ({input,name, type,placeholder, meta: {touched,error}}) =>{
        return (
            <div className="col-sm-4" style={{"paddingLeft":0}}>
                <div className="col-sm-12">
                    <input {...input} 
                            name={name} 
                            style={{"width":"100%","margin-top": "10px"}} 
                            placeholder={placeholder} 
                            className="form-control" 
                            type={type} />
                </div>
                <div className="col-sm-12">
                    {touched && error && <span className={Style.error}>{error}</span>}
                </div>
            </div>
        )
    }
    renderMatchers = ({fields,meta:{error,submitFailed}}) =>{
        return (
        <div className={Style.matcherbox}>
            <div className="form-group row">
                <div className="col-sm-2">
                    <button className="btn btn-info" onClick={()=>fields.push()}>
                        <i className="fa fa-plus" aria-hidden="true"></i>新增matcher
                    </button>
                </div>
                <span className={Style.error}>{error}</span>
            </div>
            {fields.map((matcher, index)=>(
                <div className="form-inline row" key={index}>
                    <Field name={`${matcher}.name`} component={this.renderMatcherItem} placeholder="名称" type="text" />
                    <Field name={`${matcher}.value`} component={this.renderMatcherItem} placeholder="键值" type="text" />
                    <label className="col-sm-2 col-form-label" htmlFor="isRegex">使用正则匹配</label>
                    <div className="col-sm-1">
                        <Field name={`${matcher}.isRegex`} component="input" className="form-control form-check-input" type="checkbox" />
                    </div>
                    <div className="col-sm-1">
                         <button type="submit" 
                         onClick={()=>fields.remove(index)} 
                         className="btn btn-danger">
                         <i className="fa fa-trash" aria-hidden="true"></i> 删除</button>
                    </div>
                 </div> 
            ))}
        </div>
        )
    }
    handleStartTimeChange = (e,value)=>{
        this.setState({
            startsAt:value
        })
    }
    handleDurationChange = (e,value)=>{
        this.props.change('endsAt',getNewTimeFromOffset(this.state.startsAt,value))
    }
    handleEndTimeChange = (e,value)=>{
        this.props.change("duration",getOffsetFromTimes(this.state.startsAt,value));
    }
    componentDidMount(){
        const {initialize} = this.props;
        let initialValues={
            startsAt:new Date(moment(new Date())).toISOString(),
            duration:'2h',
            endsAt:new Date(moment(new Date()).add(2,'hours')).toISOString()
        }
        if(this.props.location && this.props.location.matchers){
            const matchers = this.props.location.matchers
            initialValues.matchers = []
            if(Array.isArray(matchers)){
                initialValues.matchers = initialValues.matchers.concat(matchers)
            }else{
                for(let k in matchers){
                    initialValues.matchers.push({
                        name:k,
                        value:matchers[k],
                        isRegex:false
                    })
                }
            }
        }
        console.log(initialValues)
        initialize(initialValues,false)
    }
    render(){
        const { handleSubmit,pristine,reset,submitting} = this.props

        return (
            <div className={Style.silence_box}>
                <form onSubmit={handleSubmit}>
                    <div className="col">
                        <h2 className={Style.title}>Silence</h2>
                        <Field name="startsAt" 
                               component={this.renderDateTimePicker}
                               onChange={this.handleStartTimeChange}
                               offset = {0}
                               normalize={formatDateToISO}
                               label="开始时间"/>
                        <Field name="duration" 
                               component={this.renderField} 
                               label="持续时间"
                               placeholder=""
                               onChange={this.handleDurationChange}
                               type="text"/>
                        <Field name="endsAt"
                               offset={2}
                               onChange={this.handleEndTimeChange}
                               component={this.renderDateTimePicker}
                               normalize={formatDateToISO}
                               label="结束时间"/>
                    </div>
                    <div className="col">
                        <h3 className={Style.title}>Matchers</h3>
                        <FieldArray name="matchers" component={this.renderMatchers}/>
                    </div>
                    <div className="col">
                        <h3 className={Style.title}>Information</h3>
                        <Field name="createdBy" 
                               component={this.renderField} 
                               label="创建人"
                               type="text"/>
                        <Field name="comment" 
                               component={this.renderField} 
                               label="备注信息"
                               type="text"/>
                    </div>
                    <div className="col">
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <button type="submit" className="btn btn-info" disabled={submitting}>
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i> 提交
                                </button>
                                <span> </span>
                                <button className="btn btn-warning" disabled={pristine || submitting } onClick={reset}>
                                <i className="fa fa-undo" aria-hidden="true"></i> 重置</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

NewSilenceForm = reduxForm({
    form:"new_silence",
    validate,
    
})(NewSilenceForm)

export default NewSilenceForm
