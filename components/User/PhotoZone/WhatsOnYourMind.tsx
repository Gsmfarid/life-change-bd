"use client";

import { useRef, useState } from "react";
import { MdOutlineClose, MdOutlinePhotoLibrary } from "react-icons/md";

import { useSession } from "next-auth/react";
import { Button } from "@/universal";
import Image from "next/image";
import { Axios } from "@/utils";
import { useCurrentUser } from "@/hooks";

const WhatsOnYourMind: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [postText, setPostText] = useState<string>("");
  const [postImage, setPostImage] = useState<string>("");

  const user = useCurrentUser();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      console.error("Invalid file type. Please choose a valid file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile) {
      try {
        setUploading(true);

        const formData = new FormData();

        formData.set("file", selectedFile);
        formData.append("upload_preset", "ebm0hyxo");

        const endpoint = process.env
          .NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string;

        const uploadRes = await Axios.post(endpoint, formData);

        if (!endpoint) {
          throw new Error(`Failed to upload file: ${endpoint}`);
        }
        // File uploaded
        const { url } = await uploadRes.data;

        await Axios.post("/photo-zone/post", { postImg: url, postText });

        // Reset the form
      } catch (error) {
        console.error("Error uploading file:", error);
        return;
      } finally {
        setUploading(false);
      }
    } else {
      console.error("No file selected for upload.");
      return;
    }
  };

  // const [input, setInput] = useState("");
  // const [loading, setLoading] = useState(false);

  // const [selectedFile, setSelectedFile] = useState(null);

  const fPicker = useRef(null);

  // const { data: session } = useSession();

  // const addImageToPost = (e: any) => {
  //   const reader = new FileReader();
  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0]);
  //   }

  //   reader.onload = (readerEvent) => {
  //       setSelectedFile(readerEvent.target.result);
  //   };
  // };

  // const sendPost = async () => {
  //   if (loading) return;

  //   setLoading(true);

  //   // const docRef = await addDoc(collection(db, "posts"), {
  //   //   id: session.user.uid,
  //   //   username: session.user.name,
  //   //   userImg: session.user.image,
  //   //   text: input,
  //   //   timestamp: serverTimestamp(),
  //   // });

  //   // const imageRef = ref(storage, `posts/${docRef.id}/image`);

  //   // if (selectedFile) {
  //   //   await uploadString(imageRef, selectedFile, "data_url").then(async () => {
  //   //     const downloadURL = await getDownloadURL(imageRef);
  //   //     await updateDoc(doc(db, "posts", docRef.id), {
  //   //       image: downloadURL,
  //   //     });
  //   //   });
  //   // }

  //   setLoading(false);
  //   setInput("");
  //   setSelectedFile(null);
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className={`px-4 py-6 bg-white rounded-[17px] shadow-md mt-5 ${
        uploading && "opacity-50"
      }`}
    >
      <div className="flex gap-4 border-b border-gray-300 pb-4">
        <Image
          width={40}
          height={40}
          className="w-10 h-10 object-cover rounded-full"
          src={user?.image || ""}
          alt={user?.firstName || ""}
        />

        <input
          className="outline-none border-none w-[100%] text-[18px] placeholder:text-gray-600"
          type="text"
          value={postText ? postText : ""}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
        />
      </div>
      {/* TODO: Add selected file thumbnail */}
      {postImage && (
        <div className="relative">
          {/* <img src={postImage} alt="pic" /> */}
          <p>{postImage}</p>
          <div
            className="bg-gray-300 text-gray-500 absolute top-0 right-0 m-[10px] text-[18px] h-[30px] w-[30px] rounded-full cursor-pointer grid place-items-center"
            onClick={() => {
              setPostImage("");
              // fPicker.current.value = "";
            }}
          >
            <MdOutlineClose />
          </div>
        </div>
      )}

      <div className="flex justify-between px-4 pt-6">
        {/* <div className="flex items-center gap-2 cursor-pointer">
          <IoVideocamSharp className="text-[#E42645] text-[30px]" />
          <p className="text-gray-500 font-medium">Live Video</p>
        </div> */}

        <label htmlFor="filePicker">
          <div className="flex items-center gap-2 cursor-pointer">
            <MdOutlinePhotoLibrary className="text-[#41B35D] text-[30px]" />
            <p className="text-gray-500 font-medium">Photo/video</p>
          </div>

          <input
            type="file"
            name="filePicker"
            id="filePicker"
            accept="image/*"
            onChange={handleFileChange}
            ref={fPicker}
            hidden
          />
        </label>
      </div>

      {/* <Button input={input} selectedFile={selectedFile} onClick={sendPost} /> */}
      <Button
        // disabled={!input.trim() && !selectedFile}
        disabled={uploading}
        type="submit"
        variant="primary"
        className="bg-primary w-full text-white py-2 px-5 rounded-lg mt-[30px] disabled:bg-gray-300 disabled:text-gray-500"
      >
        Post
      </Button>
    </form>
  );
};

export default WhatsOnYourMind;
