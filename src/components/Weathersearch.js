import React, { useReducer, useState } from 'react'

import "../css/Weather_search.css"
import Addcard from './Addcard'
import Card from './Card'

const Weathersearch = () => {

    const [deletearr, setdeletearr] = useState([])

    const reducer = (state , action)=>{
        if (action.type === "add") {
            return ([...state , {place : action.payload}])
        }
        else if (action.type === "delete") {
            console.log(action.payload);
            setdeletearr([{index : action.payload , place : state[action.payload].place}])
            return state.filter((sta , index)=>index!==action.payload)
        }

        else if (action.type === "clear") {
            // setdeletearr(state.map((sat , index)=>({...sat , index : index})));
            state = [];
            return state
        }

        else if(action.type === "undo"){
            console.log(deletearr[deletearr.length - 1].index)
            const ind = deletearr[deletearr.length - 1].index;
            const place = deletearr[deletearr.length - 1].place;
            setdeletearr(deletearr.filter((del)=>del.index!==ind))
            return [
                ...state.slice(0, ind),
                {place : place},
                ...state.slice(ind)
            ];;
        }
    }

    const [state, dispatch] = useReducer(reducer, [])

    // console.log(state);
    // console.log(deletearr)
    // console.log(state.splice(1,1));

    const [placename, setplacename] = useState("")
    const [temperature, settemperature] = useState(null)
    const [humidity, sethumidity] = useState(null)
    const [wind, setwind] = useState(null)
    const [place, setplace] = useState("")
    const [img, setimg] = useState("")
    const [cond, setcond] = useState("")
    
    const weathersearch = async(e)=>{
        e.preventDefault();
        const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${placename}&units=metric&appid=45f89f08e9beaa33055f2be0c500f21f`)
        const result = await data.json();
        if (result.cod === '404') {
            return alert(result.message)
        }
        settemperature(result.main.temp);
        sethumidity(result.main.humidity);
        setwind((result.wind.speed)*(3.6));
        setplace(result.name + " , " + result.sys.country)
        setimg(`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`)
        setcond(result.weather[0].main)
    }

    return (
        <>
        <div className="search_container">
            <form className="searchbar" onSubmit={weathersearch}>
                <input type="search" name="search" id="search" placeholder="enter the name of the place" value={placename} onChange={(e)=>setplacename(e.target.value)}/>
                <button type="submit" id="search_place">find</button>
            </form>
        </div>
        {temperature && <Card place={place} temperature={Math.round(temperature)}  wind={Math.round(wind)} humidity={humidity} cond={cond} img={img} dispatch={dispatch} state={state}/>}
        <div className="added_container">
            <div className="head">
                <h1>Added places</h1>
                <div className="buttons">
                    {deletearr.length>0 && <button className="undo" onClick={()=>dispatch({type : "undo"})}>Undo</button>}
                    <button className="clear" onClick={()=>dispatch({type : "clear"})} >Clear all</button>
                </div>
            </div>
            {state && state.map((sta , index)=>{
                return <Addcard key={index} place={sta.place} index={index} dispatch={dispatch} />
            })}
            {/* <Addcard /> */}
        </div>
        </>
    )
}

export default Weathersearch
