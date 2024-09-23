import PostForm from "@/components/forms/PostForm"

 
const CreatePost = () => {
  return (
    <div className="flex flex-1">
       <div className="common-container">
          <div className="flex-start max-w-5xl gap-3 w-full justify-start">
                <img src="/assets/icons/add-post.svg" 
                     height={36} width={36}
                     alt="add-post" />
                <h2 className="h3-bold md:h2-bold text-left w-full">Create post</h2>
          </div>

          <PostForm action="create"/>
       </div>
    </div>
  )
}

export default CreatePost