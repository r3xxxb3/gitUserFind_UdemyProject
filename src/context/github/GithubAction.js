const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Search Userss
export const searchUsers = async (text) => {
    // setLoading()

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
    
    return items
}

// Get Single User
export const getUser = async (login) => {
    // setLoading()

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
        
        return data
    }

}

// get User Repos
export const getRepos = async (login) => {
    // setLoading()

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
    
    return data
}