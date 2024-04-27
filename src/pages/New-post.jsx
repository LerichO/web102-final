import { useState } from "react"
import { supabase } from "../client"
import { useNavigate } from "react-router-dom"

import Header from "../components/Header"

function NewPostPage() {

    const navigate = useNavigate()

    const [newPost, setNewPost] = useState({
        title: "",
        subtitle: "",
        image_url: "",
    })

    const submitNewPost = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase
            .from("posts")
            .insert({ title: newPost.title, subtitle: newPost.subtitle, image_url: newPost.image_url})
        console.log(data,error)
        navigate("/")
    }

    return (
        <div className="h-screen">
            <Header />
            <div className="flex flex-col w-full px-48">
                <div id="content" className="w-full">
                    <div className="flex flex-col items-start justify-start">
                        <h1 className="text-4xl text-left"><b>Create your own post!</b></h1>
                        <p className="text-left">Add to the discussion with your own ideas</p>
                    </div>
                    <form className="flex flex-col gap-8 my-8 w-1/2" onSubmit={submitNewPost}>
                        <div className="flex flex-col gap-2 items-start w-full">
                            <label>Title</label>
                            <input className="w-full p-4 rounded-xl" type="text" placeholder="Title your post" name="title"
                                onChange={(e) => { setNewPost({ ...newPost, title: e.target.value}) }}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <label>Subtitle</label>
                            <input className="w-full h-24 p-4 rounded-xl" type="text" placeholder="Add a short subtitle" name="subtitle"
                                onChange={(e) => { setNewPost({ ...newPost, subtitle: e.target.value}) }}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <label>Image</label>
                            <input className="w-full p-4 rounded-xl" type="text" placeholder="Add an image url" name="image"
                                onChange={(e) => { setNewPost({ ...newPost, image_url: e.target.value}) }}
                            />
                        </div>
                        <button className="w-1/2 rounded-lg border border-transparent px-6 py-3 text-base font-semibold bg-[#1a1a1a] cursor-pointer transition duration-250 hover:border-gray-500"
                            >Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default NewPostPage