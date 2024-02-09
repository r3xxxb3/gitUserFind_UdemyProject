import { useEffect, useContext } from "react"
import UserItem from "./UserItem"
import Loading from "../shared/Loading"
import GithubContext from "../../context/github/GithubContext"

function UserResult() {
    const {users, isLoading, fetchUsers} = useContext(GithubContext)
    console.log(users)
    useEffect(() => {
        fetchUsers()
    }, [])

    if(!isLoading){
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    } else {
        return (
            <Loading/>
        )
    }
}

export default UserResult