import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext()

export const AlertProvider = ({children}) => {
    const initialState = null
    const [state, dispatch] = useReducer(alertReducer, initialState)

    // Setting alert context using reducer
    const setAlert = (msg, type) => {
        dispatch({
            type: 'SET_ALERT',
            payload: {msg, type},
        })
        setTimeout(() => {dispatch({ type: 'REMOVE_ALERT'})}, 30000)
    }

    // Remove Alert
    const removeAlert = () => {
        dispatch({
            type: 'REMOVE_ALERT'
        })
    }

    return <AlertContext.Provider value={{alert: state, setAlert, removeAlert}}>
        {children}
    </AlertContext.Provider>
}

export default AlertContext