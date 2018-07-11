import React from 'react'
import Style from './style.css'
class AutoRefresh extends React.Component {
    state = {
        timer:null,
        selected:0,
    }
    componentWillUnmount(){
        if(this.state.timer){
            clearInterval(this.state.timer);
        }
    }
    updateTimer = (e) => {
        const timeInterval =  parseInt(e.target.value,10) *1000
        if(this.state.timer){
            clearInterval(this.state.timer);
        }
        if(timeInterval>0){
            const timer = setInterval(this.props.onRefresh,timeInterval);
            this.setState({timer,selected:timeInterval})
        }
    }
    render(){
        return (
            <div>
                <select onChange={this.updateTimer} className={`custom-select ${Style.custom} ${this.state.selected>0 ? Style.enabled:""}`} defaultValue="0">
                    <option value="0">关闭自动刷新</option>
                    <option value="10">10秒</option>
                    <option value="30">30秒</option>
                    <option value="60">1分钟</option>
                    <option value="120">2分钟</option>
                    <option value="300">5分钟</option>
                    <option value="600">10分钟</option>
                </select>
            </div>)
    }
}

export default AutoRefresh
