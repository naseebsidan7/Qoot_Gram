import { useUserContext } from "@/context/AuthContext"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"
 
type GridPostListProps ={
  posts: Models.Document[],
  showUser?: boolean,
  showStatus?: boolean
}
const GridPostList = ({ posts, showUser = true, showStatus= true }: GridPostListProps) => {
  const{ user } = useUserContext()
 
  return (
    <ul className="grid-container">
        {posts?.map((post) => (
           <li key={post.$id} className="relative min-w-80">
              <Link to={`/posts/${post.$id}`} className="grid-post_link">
                 <img src={post?.imageUrl} alt="post" className=" " />
              </Link>

              <div className="grid-post_user">
                   { showUser && (
                      <div className="flex items-center justify-start gap-2 flex-1">
                           <img src={post.creator.imageUrl}
                                className="h-8 w-8 rounded-full"
                                alt="userImage" />
                                <p className="line-clamp-1">{post?.creator?.name}</p>
                      </div>
                   )}
                   { showStatus && <PostStats post={post} userId={user.id} />}
              </div>
           </li>
        ))}
    </ul>
  )
}

export default GridPostList