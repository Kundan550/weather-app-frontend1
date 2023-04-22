import React from 'react'

import "../css/Header.css"

const Header = () => {
    return (
        <div className="header">
            <div className="head">
                <img src="https://demo.themezy.com/system/resources/demo_themes/000/000/128//images/logo@2x.png" alt="weather app" className="logo"/>
                <div className="logoname">
                    weather
                </div>
            </div>
        </div>
    )
}

export default Header
