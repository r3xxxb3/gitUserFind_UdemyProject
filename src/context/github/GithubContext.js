import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users : [],
        user: {},
        repos: [],
        isLoading : false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // get initial users (testing purpose)
    const fetchUsers = async () => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })
        
        const data = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: data,
        })
    }

    // Search Userss
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const headers = (GITHUB_TOKEN !== "" ? {
            headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
        }} : {})

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, headers)
        
        const { items } = await response.json()
        
        // console.log(data)
        
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Get Single User
    const getUser = async (login) => {
        setLoading()

        const headers = (GITHUB_TOKEN !== "" ? {
            headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
        }} : {})

        const response = await fetch(`${GITHUB_URL}/users/${login}`, headers)
        
        if(response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
            
            // console.log(data)
            
            dispatch({
                type: 'SET_USER',
                payload: data,
            })
        }

    }

    // get User Repos
    const getRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })

        const headers = (GITHUB_TOKEN !== "" ? {
            headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
        }} : {})

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, headers)
        
        const data = await response.json()
        
        // console.log(data)
        
        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
    }

    // set Loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    // set Clear
    const setClear = () => dispatch({type: 'SET_CLEAR'})

    return <GithubContext.Provider value={{
        users: state.users, 
        isLoading: state.isLoading,
        user: state.user,
        repos: state.repos,
        fetchUsers,
        searchUsers,
        getUser,
        getRepos,
        setClear,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext