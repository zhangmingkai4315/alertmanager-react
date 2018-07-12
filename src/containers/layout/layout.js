import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Style from './style.css';

function Layout(components) {
    const { Content } = components
    class Component extends React.Component {
        render() {
            return (
                <div className={Style.inner_wrap}>
                    <div className={Style.content}>
                        <Header/>
                        <div className="container-fluid">
                            <Content {...this.props}/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
    Component.displayName = 'Layout';

    return Component;
}

export default Layout;