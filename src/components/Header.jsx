import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function Header () {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    const submitSearch = (e) => {
        e.preventDefault();

        const queryString = `?${search.trim() && `search=${search.trim()}&`}`.slice(0, -1);
        navigate(`/${queryString}`);
    }

    return (
        <div className="p-8 px-12 flex flex-row w-screen justify-between items-center bg-[#242424]">
            <Link to="/">
                <div className="flex flex-col justify-items-center">
                    <h1><b>ndhub▷</b></h1>
                    <p>Discover your next jam</p>
                </div>
            </Link>
            <form className="flex w-2/5 gap-4" onSubmit={submitSearch}>
                <input className="h-full w-full p-4 rounded-xl" type="text" placeholder="Search for a post" name="search"
                    onChange={(e) => {setSearch(e.target.value)}}
                />
                <button className="min-w-[60px] w-auto rounded-lg border border-transparent px-6 py-3 text-base font-semibold bg-[#1a1a1a] cursor-pointer transition duration-250 hover:border-gray-500 flex flex-row gap-4">
                    <SearchOutlinedIcon />
                </button>
            </form>
            <Link to="/create-post" className="rounded-lg border border-transparent px-6 py-3 text-base font-semibold bg-[#1a1a1a] cursor-pointer transition duration-250 hover:border-gray-500 flex flex-row gap-4">
                <AddCircleOutlineOutlinedIcon />
                <p>Create a post</p>
            </Link>
        </div>
    )
}

export default Header