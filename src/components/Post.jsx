import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import ReactTimeAgo from 'react-time-ago'

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

function Post(props) {

    const [voteCount, setVoteCount] = useState(0)

    useEffect(() => {
        const initVoteCount = async () => {
            try {
                const {data, error} = await supabase
                    .from("posts")
                    .select()
                    .eq("id", props.id)
                    .single()
                setVoteCount(data.upvotes)
            }
            catch (error) {
                console.log(error)
            }
        }

        initVoteCount()
    }, [])

    const upVote = async () => {

        await setVoteCount(voteCount + 1)
        const {data, error} = await supabase
            .from("posts")
            .update({ upvotes: voteCount})
            .eq('id', props.id)

    }

    return (
        <div className="flex flex-col bg-[#1a1a1a] h-auto min-h-96 max-w-80 rounded-xl gap-4 hover:border-gray-500">
            <Link to={`/${props.id}`} className="h-3/4">
                <img src={props.img} className="rounded-t-xl object-cover object-cover h-full" />
            </Link>
            <div className="p-4 flex flex-col gap-4">
                <h2 className="text-2xl flex justify-start"><b>{props.title}</b></h2>
                <div className="flex flex-row justify-between mb-8">
                    <div className="flex flex-row justify-start items-center gap-1">
                        <button className="max-h-6" onClick={upVote}>
                            <ThumbUpOutlinedIcon />
                        </button>
                        <p className="text-xl"><b>{voteCount}</b></p>
                    </div>
                    <p>Posted <ReactTimeAgo date={props.time} locale="en-US"/></p>
                </div>

            </div>
        </div>
    )
}

export default Post;