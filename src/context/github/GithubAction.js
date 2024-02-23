import axios from "axios"
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const headers = (GITHUB_TOKEN !== "" ? {
    Authorization: `token ${GITHUB_TOKEN}`,
} : {})

const github = axios.create({
    baseURL: GITHUB_URL, 
    headers: headers,
})

// Search Userss
export const searchUsers = async (text) => {
    // setLoading()

    const params = new URLSearchParams({
        q: text
    })

    const response = await github.get(`/search/users?${params}`)
    return  response.data.items

    // before using axios
    // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, headers)
    // const { items } = await response.json()    
    // return items
}

export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`),
    ])
    
    const result = { user: user.data, repos: repos.data }
    // console.log(result)
    return result
}

// Before combining get user and get repos
// Get Single User
// export const getUser = async (login) => {
//     // setLoading()

//     const headers = (GITHUB_TOKEN !== "" ? {
//         headers: {
//         Authorization: `token ${GITHUB_TOKEN}`,
//     }} : {})

//     const response = await fetch(`${GITHUB_URL}/users/${login}`, headers)
    
//     if(response.status === 404) {
//         window.location = '/notfound'
//     } else {
//         const data = await response.json()
        
//         // console.log(data)
        
//         return data
//     }

// }

// // get User Repos
// export const getRepos = async (login) => {
//     // setLoading()

//     const params = new URLSearchParams({
//         sort: 'created',
//         per_page: 10,
//     })

//     const headers = (GITHUB_TOKEN !== "" ? {
//         headers: {
//         Authorization: `token ${GITHUB_TOKEN}`,
//     }} : {})

//     const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, headers)
    
//     const data = await response.json()
    
//     // console.log(data)
    
//     return data
// }