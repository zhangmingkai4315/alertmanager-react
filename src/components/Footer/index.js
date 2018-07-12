import React from 'react'
import Style from './style.css';
function Footer() {
    return (
        <div className={`${Style.footer} row`}>
                <div className="col-md-12">
                    <span className={Style.footer_title}>AlertManager-React</span>
                </div>
                <div className="col-md-12">
                    <span className={Style.footer_description}>A React Appication For AlertManager User.</span>
                    <span className={Style.pull_right}>
                        <a className={Style.link}
                        target="_blank"
                        rel="noopener noreferrer" 
                        href="https://github.com/zhangmingkai4315/alertmanager-react">
                            <span>Github</span>
                        </a>
                    </span>
                </div>
        </div>
    )
}

export default Footer
