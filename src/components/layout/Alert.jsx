import { useContext } from "react"
import AlertContext from "../../context/alert/AlertContext"

function Alert() {
    const { alert, removeAlert } = useContext(AlertContext)

    const reAlert = () => {
        removeAlert()
    }

    return alert != null && (
        <>
            <dialog id="alert-text" className="modal modal-bottom sm:modal-middle" open>
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-accent"><strong>{alert.msg}</strong></h3>
                    <p className="py-4">Click anywhere outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop bg-base-100" style={{opacity: 0.9}}>
                    <button onClick={reAlert}>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Alert