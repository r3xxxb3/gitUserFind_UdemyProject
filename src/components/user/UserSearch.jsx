import { useState, useContext } from "react"
import GithubContext from "../../context/github/GithubContext"
import AlertContext from "../../context/alert/AlertContext"

function UserSearch() {
    const [text, setText] = useState('')
    const { users, searchUsers, setClear } = useContext(GithubContext)
    const { alert, setAlert } = useContext(AlertContext)

    const handleChange = (e) => setText(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()

        if(text === ''){
            setAlert('Please Enter Something !', 'error')
        }else{
            searchUsers(text)

            setText('')
        }
    }

    const handleClear = () => {
        setClear()
    }

    return (
        <>
            <div className="grid sm:grid-cols-1 xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-8 mb-8 gap-8">
                <div className={users.length > 0 ? "col-span-7" : "col-span-8"}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <div className="relative ">
                                <input type="text" placeholder="Search User" className="w-full pr-40 bg-base-200 input input-lg text-white" value={text} onChange={handleChange} />
                                <button type="submit" className="absolute bg-base-100 top-0 right-0 rounded-l-none w-36 btn btn-outline btn-accent btn-lg">
                                    Go
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {users.length > 0 && (
                <div className="w-auto">
                    <button onClick={handleClear} className="btn btn-ghost btn-lg">Clear</button>
                </div>
                )}
            </div>
        </>
    )
}

export default UserSearch