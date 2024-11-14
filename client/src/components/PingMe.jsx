import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PingMe() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    images.forEach(file => formData.append("images", file));
  
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      const response = await fetch("http://localhost:5000/pingme", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is included
        },
        body: formData,
      });
  
      if (response.ok) {
        toast.success("Ping Me request submitted successfully");
      } else {
        toast.error("Failed to submit Ping Me request");
      }
    } catch (error) {
      console.error("Error submitting Ping Me request:", error);
      toast.error("An error occurred");
    }
  };
  

  return (
    <div className="flex items-center justify-center container">
      <ToastContainer />
      <div className="drop p-4 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold text-center mb-4">Ping Me</h1>
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Problem subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="flex gap-x-2 my-2">
            <textarea
              placeholder="Brief description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-0"
            ></textarea>
            <span className="relative flex-grow aspect-square w-full">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 z-10 opacity-0 cursor-pointer"
              />
              <span className="flex items-center justify-center drop h-full">
                Add images
              </span>
            </span>
          </div>
          <button onClick={handleSubmit} className="btn">Submit</button>
        </div>
      </div>
    </div>
  );
}
