import React, { useEffect, useState } from 'react'

const Addcard = (props) => {

    const [temperature, settemperature] = useState(null)
    const [humidity, sethumidity] = useState(null)

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.place}&units=metric&appid=aa918e78a5a4b22fc8b38db4e353619d`).then((data)=>data.json()).then((result)=>{
            settemperature(result.main.temp);
            sethumidity(result.main.humidity);
        });
    },)

    return (
        <div className="place_card">
                <div className="place_name">{props.place}</div>
                <div className="temperature">{temperature}℃</div>
                <div className="humidity">{humidity}%</div>
                <div className="buttons">
                    {/* <button className="update">Update</button> */}
                    <button className="delete" onClick={()=>props.dispatch({type : "delete" , payload : props.index})}>Delete</button>
                </div>
            </div>
    )
}

export default Addcard
