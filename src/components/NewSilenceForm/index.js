import React,{Component} from 'react'
import { Field, reduxForm } from 'redux-form';
import Style from './style.css';

class NewSilenceForm extends Component{
    renderMatchers = (matchers) =>{
        return matchers.map(m=>(
        <div className="form-inline row">
                <div className="col-sm-4">
                    <Field name="name" component="input"  placeholder="名称" style={{"width":"100%"}} className="form-control" type="text" />
                </div>
                <div className="col-sm-4">
                    <Field name="value" component="input" placeholder="键值" style={{"width":"100%"}} className="form-control" type="text" />
                </div>
                <label className="col-sm-1 col-form-label" htmlFor="isRegex">正则匹配</label>
                <div className="col-sm-3">
                    <Field name="isRegex" component="input" className="form-control form-check-input" type="checkbox" />
                </div>
                <div></div>
        </div>));
    }
    render(){
        const { handleSubmit ,matchers } = this.props
        return (
            <div className={Style.silence_box}>
                <form onSubmit={handleSubmit}>
                    <div className="col">
                        <h2 className={Style.title}>Silence</h2>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="startsAt">开始时间</label>
                            <div className="col-sm-6">
                                <Field name="startsAt" component="input" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="firstName">持续时间</label>
                            <div className="col-sm-6">
                                <Field name="start" component="input" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="endsAt">结束时间</label>
                            <div className="col-sm-6">
                                <Field name="endsAt" component="input" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <h3 className={Style.title}>Matchers</h3>
                        <div className={Style.matcherbox}>
                        {this.renderMatchers(matchers)}
                        </div>
                        
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <button className="btn btn-info" onClick={this.props.addMoreMatchBox}>新增matcher</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h3 className={Style.title}>Information</h3>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="createdBy">创建人信息</label>
                            <div className="col-sm-6">
                                <Field name="createdBy" component="input" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="comment">备注信息</label>
                            <div className="col-sm-6">
                                <Field name="comment" component="textarea" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <button type="submit" className="btn btn-info">提交</button>
                                <span> </span>
                                <button className="btn btn-warning">重置</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

NewSilenceForm = reduxForm({
    form:"new_silence"
})(NewSilenceForm)

export default NewSilenceForm
