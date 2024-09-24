import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/quriesAndMutations";
import { Models } from "appwrite";

 
const Home = () => {
 

   const { data: posts, isLoading: isPostLoading, isError: isErrorPosts } = useGetRecentPosts()
   const { data: creators, isLoading: isUsersLoading, isError: isErrorCreators } = useGetUsers(10)


   if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-1">
       
        <div className="home-container">
      
            <div className="home-posts">

            <div className="flex  w-full items-center max-w-5xl  flex-between">
                      <h2 className="h3-bold md:h2-bold w-full text-left">Home Feed</h2>
                      <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                        <p className="small-medium md:base-medium text-light-2">All</p>
                        <img
                          src="/assets/icons/filter.svg"
                          width={20}
                          height={20}
                          alt="filter"
                        />
                      </div>
              </div> 
               {isPostLoading && !posts ? (
                 <Loader />
               ):(
                 <ul className="flex flex-col flex-1 gap-9 w-full">
                     {posts?.documents.map((post: Models.Document) => (
                        <PostCard post={post} key={post?.$createdAt}/>
                     ))}
                 </ul>
               )}
            </div>
        </div>
    
        
        <div className="home-creators">
            <h3 className="h3-bold text-light-1">Top Creators</h3>
            {isUsersLoading && !creators ? (
                 <Loader />
               ):(
                  <ul className="grid 2xl:grid-cols-2 gap-6">
                      {creators?.documents.map((creator) => (
                        <li key={creator?.$id}>
                            <UserCard user={creator} />
                        </li>
                      ))}
                  </ul>
              )}
        </div>
    </div>
  )
}

export default Home