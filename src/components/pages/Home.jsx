import UserResult from "../user/UserResult"
import UserSearch from "../user/UserSearch"

function Home() {
  return (
    // <div>
    //     <h1 className="text-6xl">
    //         {/* {process.env.REACT_APP_GITHUB_TOKEN} get value from env */}
    //         Welcome
    //     </h1>
    // </div>
    <>
      <UserSearch/>
      <UserResult/>
    </>
  )
}

export default Home