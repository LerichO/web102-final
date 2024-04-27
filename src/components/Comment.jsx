import { useState, useEffect } from "react"
import { supabase } from "../client"

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

function Comment(props) {

    const [voteCount, setVoteCount] = useState(0)

    useEffect(() => {
        const initVoteCount = async () => {
            try {
                const {data, error} = await supabase
                    .from("comments")
                    .select()
                    .eq("id", props.id)
                    .single()
                setVoteCount(data.comment_upvotes)
            }
            catch (error) {
                console.log(error)
            }
        }

        initVoteCount()
    }, [])


    const upVote = async () => {
        await setVoteCount(voteCount + 1)
        const { data, error } = await supabase
            .from("comments")
            .update({ comment_upvotes: voteCount + 1})
            .eq('id', props.id)

    }

    return (
        <div className="p-4 bg-[#121212] rounded-xl flex flex-col gap-2">
            <div className="flex flex-row gap-8 items-center">
                <b className="text-2xl">{props.user}</b>
                -
                <p>{props.text}</p>
            </div>
            <div className="flex flex-row justify-start items-center gap-1 pl-4">
                <button className="max-h-6" onClick={upVote}>
                    <ThumbUpOutlinedIcon />
                </button>
                <p className="text-xl"><b>{voteCount}</b></p>
            </div>
        </div>
    )
}

export default Comment