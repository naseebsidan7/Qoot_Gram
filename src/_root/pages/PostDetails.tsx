import GridPostList from "@/components/shared/GridPostList"
import PostStats from "@/components/shared/PostStats"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useDeletePost, useGetPostById, useGetUserPosts } from "@/lib/react-query/quriesAndMutations"
import { timeAgo } from "@/lib/utils"
import { Loader } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

const PostDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()

  const { data: post, isPending } = useGetPostById(id || '')
  const { data: userPosts, isLoading: isUserPostsLoading } = useGetUserPosts(post?.creator.$id)
  
  const relatedPosts = userPosts?.documents.filter(
    (userpost) => userpost.$id !== id
  )

  const { mutate: deletePost } = useDeletePost()
  const handleDeletePost = () =>{
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  }

  return (
    <div className="post_details-container">
          <div className="hidden md:flex max-w-5xl w-full">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="shad-button_ghost">
              <img
                src={"/assets/icons/back.svg"}
                alt="back"
                width={24}
                height={24}
              />
              <p className="small-medium lg:base-medium">Back</p>
            </Button>
          </div>
          
      {isPending ? <Loader /> : (

        <div className="post_details-card">
          <img src={post?.imageUrl} className="post_details-img" alt="post" />

          <div className="post_details-info">
            <div className="flex-between w-full">

              <Link to={`/profile/${post?.creator?.$id}`} className="flex items-center gap-3">
                <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="creator" className="rounded-full w-9 h-9 lg:h-12 lg:w-12" />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator?.name || 'Creator Name'}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className='subtle-semibold lg:small-regular'>{timeAgo(post?.$createdAt || '')}</p> -
                    <p className="subtle-semibold lg:small-regular">{post?.location || 'Post Location'}</p>
                  </div>
                </div>
              </Link>

              <div className="flex-center sm:gap-1 gap-0  ">    
                 <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'} `}>
                   <img src="/assets/icons/edit.svg" height={24} width={24} alt="edit" />
                 </Link>
                 <Button onClick={handleDeletePost} variant='ghost' className={` ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'} `} >
                      <img src="/assets/icons/delete.svg" height={24} width={24} alt="delete" />
                 </Button>
              </div>
            </div>
            
            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                <p>{post?.caption || ''}</p>
                <ul className="flex gap-2 mt-2"> 
                    {post?.tags.map((tag: string) => (
                        <li key={tag} className="text-light-3">
                            #{tag}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full">
                 <PostStats post={post} userId={user.id} />
            </div>

          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
           <hr className="border w-full border-dark-4/80 "/>
           <h3 className="body-bold md:h3-bold my-10">
              More Related Posts
           </h3>

           {isUserPostsLoading || !relatedPosts? (
              <Loader/>
           ): (
              <GridPostList posts={relatedPosts} />
           )}
      </div>
    </div>
  )
}

export default PostDetails