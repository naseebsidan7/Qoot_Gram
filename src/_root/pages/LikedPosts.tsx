import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/quriesAndMutations"

 
const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser()
  
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  console.log(currentUser)
  return (
    <>
      {currentUser?.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
      <GridPostList posts={currentUser?.liked} showStatus={false} />
    </>
  )
}

export default LikedPosts