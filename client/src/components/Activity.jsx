import { useEffect, useState } from "react";

function Post({ name, time, image, description }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-light-green/50 drop-shadow-sm p-4 rounded-xl shadow-lg my-4 mx-4 md:mx-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src={image}
            alt="Profile"
            className="w-12 h-12 object-cover shadow-lg rounded-full mr-4"
          />
          <h4 className="font-bold">{name}</h4>
        </div>
        <p className="font-extrabold">. . .</p>
      </div>
      <img
        src={image}
        alt="Post"
        className="w-full h-64 object-cover rounded-lg shadow-lg my-4"
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

export default function Activity({ posts }) {
  const [showPopup, setShowPopup] = useState(false);
  const [newPost, setNewPost] = useState({ text: "", image: null });

  const handleImageChange = (e) => {
    setNewPost({ ...newPost, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [showPopup]);

  return (
    <div className="container mb-20 lg:mb-10">
      <div className="text-2xl font-bold text-center">Activity</div>
      {posts.map((post) => <Post {...post} key={post.name} />)}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed top-14 right-2 bg-medium-green font-medium px-4 py-2 rounded-lg shadow-lg"
      >
        Create a Post
      </button>
      {showPopup && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="drop p-4 w-11/12">
            <h3 className="mb-2 text-lightest-green">New Post</h3>
            <textarea
              placeholder="Write something..."
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            >
            </textarea>
            <label htmlFor="file-upload" className="hidden">
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <button
              className="btn"
              onClick={() => document.getElementById("file-upload").click()}
            >
              Upload an Image
            </button>
            {newPost.image && (
              <img
                src={newPost.image}
                alt="Preview"
                className="mx-auto"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setShowPopup(false)}
                className="btn"
              >
                Share
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
