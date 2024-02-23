import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users : [],
        user: {},
        repos: [],
        isLoading : false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // get initial users (testing purpose)
    // const fetchUsers = async () => {
    //     // setLoading()

    //     const response = await fetch(`${GITHUB_URL}/users`, {
    //         headers: {
    //             Authorization: `token ${GITHUB_TOKEN}`,
    //         }
    //     })
        
    //     const data = await response.json()
    //     dispatch({
    //         type: 'GET_USERS',
    //         payload: data,
    //     })
    // }

    // not used after refactoring the functions to GithubAction
    // Every dispatch will be called from the component

    // set Loading 
    // const setLoading = () => dispatch({type: 'SET_LOADING'})

    // set Clear
    // const setClear = () => dispatch({type: 'SET_CLEAR'})

    return <GithubContext.Provider value={{
        ...state,
        dispatch,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext