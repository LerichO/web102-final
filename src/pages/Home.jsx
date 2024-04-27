import { Link, useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../client"

import Header from "../components/Header"
import Filter from "../components/Filter"
import Post from "../components/Post"


function Home () {

    const location = useLocation();
    const search = new URLSearchParams(location.search).get('search');

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                // perform text search
                if (search && search != "") {
                    const {data, error} = await supabase.from("posts").select()
                        .textSearch('title', search, {
                            type: 'plain',
                            config: 'english'
                        })
                    console.log("query:", search, data)
                    setPosts(data)
                }
                else {
                    const { data, error } = await supabase.from("posts").select()
                    console.log(data)
                    setPosts(data)    
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [search])

    return (
        <div className="h-screen">
            <Header />
            <div className="flex flex-row w-full"> 
                <Filter />
                <div id="content" className="w-full">
                    <div className="flex flex-col items-start justify-start">
                        <h1 className="text-4xl text-left"><b>Home Feed</b></h1>
                        <p className="text-left">See the latest and most popular posts about your favorite indie bands!</p>
                    </div>
                    <div className="flex flex-wrap gap-8 my-8 w-full">
                        {posts.map((post) => (
                            <Post id={post.id} title={post.title} img={post.image_url} time={post.created_at}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home