import { useState, useEffect } from "react"
import { supabase } from "../client"
import { useParams, useNavigate } from "react-router-dom"
import ReactTimeAgo from 'react-time-ago'

import Header from "../components/Header"
import Comment from "../components/Comment"

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

function PostPage() {
    let params = useParams();
    const navigate = useNavigate();

    const [newComment, setNewComment] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [commentsList, setCommentsList] = useState([])
    const [voteCount, setVoteCount] = useState(0)
    const [post, setPost] = useState({
        id: 0,
        created_at: "",
        title: "",
        subtitle: "",
        image_url: "",
        upvotes: 0,
        comments: []
    })

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select()
                    .eq("id", params.post_id)
                    .single()
                setPost(data)
                setVoteCount(data.upvotes)
            }
            catch (error) {
                console.error(error)
            }

        }

        const fetchComments = async () => {
            try {
                const { data, error } = await supabase
                    .from("comments")
                    .select()
                    .eq("post_id", params.post_id)
                setCommentsList(data)
            }
            catch(error) {

            }
        }

        fetchPost()
        fetchComments()
    }, [newComment])

    const upVote = async () => {

        await setVoteCount(voteCount + 1)
        const { data, error } = await supabase
            .from("posts")
            .update({ upvotes: voteCount})
            .eq('id', post.id)

    }

    const submitComment = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase 
            .from("comments")
            .insert({ user: newUsername, text: newComment, post_id: post.id })
        console.log(data, error)
        setNewComment("")
        setNewUsername("")
    }

    return (
        <div className="h-screen">
            <Header />
            <div className="flex flex-col w-full px-24">
                <div className="flex flex-col items-start justify-start mb-12">
                    <h1 className="text-4xl text-left"><b>{post.title}</b></h1>
                </div>
                <div id="content" className="w-full flex flex-row justify-between gap-12">
                    <div className="flex flex-col justify-start items-start">
                        <img src={post.image_url} className="max-w-lg mb-12" />
                        <p className="text-2xl">{post.subtitle}</p>
                        <div className="flex flex-row justify-between my-8">
                            <div className="flex flex-row justify-start items-center gap-1">
                                <button className="max-h-6" onClick={upVote}>
                                    <ThumbUpOutlinedIcon />
                                </button>
                                <p className="text-xl"><b>{voteCount}</b></p>
                            </div>
                            {/* <p>Posted <ReactTimeAgo date={post.created_at} locale="en-US"/></p> */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 w-full">
                        <form onSubmit={submitComment}>
                            <label className="flex flex-col justify-start gap-2">
                                <h2 className="text-2xl">Submit a new comment to the discussion!</h2>
                                <div className="flex flex-row w-full gap-4">
                                    <input className="w-1/4 p-4 rounded-xl" type="text" placeholder="Username" name="username"
                                        onChange={(e) => { setNewUsername(e.target.value) }}
                                    />
                                    <input className="w-3/4 p-4 rounded-xl" type="text" placeholder="New comment" name="comment"
                                        onChange={(e) => { setNewComment(e.target.value) }}
                                    />
                                    <button className="min-w-[60px] w-auto rounded-lg border border-transparent px-6 py-3 text-base font-semibold bg-[#1a1a1a] cursor-pointer transition duration-250 hover:border-gray-500 flex flex-row gap-4">
                                        <SendOutlinedIcon />
                                    </button>

                                </div>

                            </label>
                        </form>
                        {!commentsList ? <></> : commentsList.map((comment) => (
                            <Comment id={comment.id} user={comment.user} text={comment.text} />
                        ))}
                    </div>

                </div>
            </div>
        </div>

    )

}

export default PostPage