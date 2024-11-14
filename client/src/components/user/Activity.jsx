import { useEffect, useState } from "react";
import axios from "axios";

function Post({ name, time, image, description }) {
  const [liked, setLiked] = useState(false);
  const imageUrl = image ? `http://localhost:5000/${image}` : 'https://placehold.co/50';

  return (
    <div className="bg-light-green/50 drop-shadow-sm p-4 rounded-xl shadow-lg my-4 mx-4 md:mx-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src="https://placehold.co/50"
            alt="Profile"
            className="w-12 h-12 object-cover shadow-lg rounded-full mr-4"
          />
          <h4 className="font-bold">{name}</h4>
        </div>
        <p className="font-extrabold">. . .</p>
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

export default function Activity() {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newPost, setNewPost] = useState({
    description: "",
    image: null,
  });

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      const response = await axios.get('http://localhost:5000/activity', {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is included
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleImageChange = (e) => {
    setNewPost({ ...newPost, image: e.target.files[0] });
  };

  const handleShare = async () => {
    const formData = new FormData();
    formData.append("description", newPost.description);
    if (newPost.image) formData.append("image", newPost.image);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/activity", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPosts([
          {
            ...result,
            image: URL.createObjectURL(newPost.image),
            time: "Just now",
          },
          ...posts,
        ]);
        setShowPopup(false);
        setNewPost({ description: "", image: null });
      } else {
        console.error("Error sharing post:", response.statusText);
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  return (
    <div className="container mb-20 lg:mb-10">
      <div className="text-2xl font-bold text-center">Activity</div>
      {posts.map((post, index) => <Post {...post} key={index} />)}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed top-14 right-2 bg-medium-green font-medium px-4 py-2 rounded-lg shadow-lg"
      >
        Create a Post
      </button>
      {showPopup && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="drop p-4 w-11/12 lg:w-3/12">
            <h3 className="mb-2 text-lightest-green">New Post</h3>
            <textarea
              placeholder="Write something..."
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="file-upload"
            />
            <button
              className="btn"
              onClick={() => document.getElementById("file-upload").click()}
            >
              Upload an Image
            </button>
            {newPost.image && (
              <img
                src={URL.createObjectURL(newPost.image)}
                alt="Preview"
                className="mx-auto"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={handleShare}
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
