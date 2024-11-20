import { useState } from "react";

export default function Post({
  name,
  time,
  image,
  description,
  id,
  deleteEnabled = false,
  onDelete,
}) {
  const [liked, setLiked] = useState(false);

  const imageUrl = image
    ? `http://localhost:5000/${image}`
    : "https://placehold.co/50";

  async function handleDelete(postId) {
    try {
      const response = await fetch(`http://localhost:5000/activity/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Post deleted successfully:", postId);
        if (onDelete) onDelete(postId);
      } else {
        console.error("Failed to delete post:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div className="drop p-4 my-4 mx-4 w-full md:w-8/12">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src="https://placehold.co/50"
            alt="Profile"
            className="w-12 h-12 object-cover shadow-lg rounded-full mr-4"
          />
          <h4 className="font-bold">{name}</h4>
        </div>
        {deleteEnabled && (
          <button
            onClick={() => handleDelete(id)}
            className="font-medium bg-medium-green shadow-lg px-3 py-1 rounded"
          >
            Delete
          </button>
        )}
      </div>
      <img
        src={imageUrl}
        alt="Post"
        className="w-full h-64 object-contain rounded-lg shadow-lg my-4"
      />
      <div className="mt-4 ml-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <img
              src={liked ? "/heart-solid.svg" : "/heart-regular.svg"}
              alt="Like"
              className="w-6 cursor-pointer shadow-lg"
              onClick={() => setLiked(!liked)}
            />
            <img src="/comment-solid.svg" alt="Comment" className="w-6" />
            <img src="/paper-plane-solid.svg" alt="Share" className="w-5" />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-start">
          <p className="">{description}</p>
          <p className="text-sm text-medium-green">{time}</p>
        </div>
      </div>
    </div>
  );
}
