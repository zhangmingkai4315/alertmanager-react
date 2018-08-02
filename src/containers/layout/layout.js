import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Style from './style.css';
import EnterPanel from '../EnterPanel';
import { connect } from 'react-redux'

function Layout(components) {
    const { Content } = components
    class Component extends React.Component {
        render() {
            return (
                <div className={Style.inner_wrap}>
                    <div className={Style.content}>
                        <Header/>
                        <div className="container-fluid">
                             {this.props.alertmanterUrl && this.props.historyUrl ? <Content {...this.props}/> : <EnterPanel/>}
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
    Component.displayName = 'Layout';
    const mapStateToProps = (state) => {
        return {
            alertmanterUrl: state.global.apiUrl,
            historyUrl: state.global.historyUrl,
        }
    }
    return connect(mapStateToProps)(Component);
}

export default Layout;