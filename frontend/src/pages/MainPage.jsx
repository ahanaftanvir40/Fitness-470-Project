import { useUserContext } from "../../context/userContext"

function MainPage() {

  const { user, isLoading } = useUserContext()








  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="flex flex-col items-center py-10 min-h-screen">
      <div className=' border-2 border-black text-center '>
        <h1 className="text-blue-400 text-2xl">
          Welcome to the Main Page {user.username}
        </h1>
      </div>
    </div>
  )
}

export default MainPage
