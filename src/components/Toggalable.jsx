import { useState, forwardRef, useImperativeHandle } from "react";
import Proptypes from 'prop-types'

const Toggalable = forwardRef((props, ref) =>{
    const [visibility, setVisibility] = useState()
    const showButton = {display: visibility? "none": ""}
    const showCancel = {display: visibility? "": "none"}

    Toggalable.displayName = "Toggalable"

    const toggleVisibility = () =>{
        setVisibility(!visibility)
    }

    useImperativeHandle(ref, ()=>{return {toggleVisibility}})

    return(
        <div>
            <div style={showButton}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showCancel} className="toggableContent">
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

Toggalable.propTypes = {
    buttonLabel : Proptypes.string.isRequired
}

export default Toggalable