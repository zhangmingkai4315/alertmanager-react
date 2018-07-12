import React from 'react'
import Header from '../components/Header';
function Layout(components) {
    const { Content } = components
    class Component extends React.Component {
        render() {
            return (
                <div>
                    <Header/>
                    <div className="container-fluid">
                        <Content {...this.props}/>
                    </div>
                </div>
            );
        }
    }
    Component.displayName = 'Layout';

    return Component;
}

export default Layout;