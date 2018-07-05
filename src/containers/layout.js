import React from 'react'
import Header from '../components/Header';
// import PropTypes from 'prop-types';
function Layout(components) {
    const { Content } = components
    class Component extends React.Component {
        render() {
            return (
                <div className="container-fluid full-size">
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