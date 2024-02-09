import { useState, useContext } from "react"
import GithubContext from "../../context/github/GithubContext"

function UserSearch() {
    const [text, setText] = useState('')
    const {users, searchUsers,setClear} = useContext(GithubContext)

    const handleChange = (e) => setText(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()

        if(text === ''){
            document.getElementById('alert-text').showModal()
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
            <dialog id="alert-text" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Please Enter Something in the Search Box !</h3>
                    <p className="py-4">Click anywhere outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default UserSearch