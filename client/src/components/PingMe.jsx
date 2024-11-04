import { useState } from "react";
export default function PingMe() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex items-center justify-center container">
      <div className="drop p-4 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold text-center mb-4">Ping Me</h1>
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Problem subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="flex gap-x-2 my-2">
            <span className="relative flex-grow aspect-square w-full">
              <input
                type="file"
                multiple
                className="absolute inset-0 z-10 opacity-0 cursor-pointer"
              />
              <span className="flex items-center justify-center drop h-full">
                Add images
              </span>
            </span>
            <textarea
              placeholder="Brief description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-0"
            >
            </textarea>
          </div>
          <button className="btn">Submit</button>
        </div>
      </div>
    </div>
  );
}
