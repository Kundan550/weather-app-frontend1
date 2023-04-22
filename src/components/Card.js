import React from 'react'

const Card = (props) => {
    return (
        <div className="card">
            <div className="card_head">
                <div className="day">Today</div>
                {console.log(props.state.find((sta)=>sta.place===props.place))}
                {props.state.find((sta)=>sta.place===props.place)!==undefined?<div className="add">added</div>:<div className="add" onClick={()=>props.dispatch({type : "add" , payload : props.place})}>add</div>}
            </div>
            <div className="card_body">
                <div className="city">{props.place}</div>
                <div className="condition">
                    <div className="temperature">{props.temperature}℃</div>
                    <img src={props.img} alt="" className="temp_logo"/>
                </div>
                <ul className="other_condition">
                    <li className="preci">{props.humidity}%</li>
                    <li className="humidity">{props.cond}</li>
                    <li className="wind_speed">{props.wind}km/h</li>
                </ul>
            </div>
        </div>
    )
}

export default Card
