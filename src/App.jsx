import { useState } from 'react'
import './App.css'
import { Routes, Route, useRoutes } from 'react-router-dom'

import Home from './pages/Home'
import NewPostPage from './pages/New-post'
import PostPage from './pages/Post-page'

function App() {

  // let element = useRoutes({

  // })

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<NewPostPage />} />
        <Route path="/:post_id" element={<PostPage />}/>
      </Routes>
    </>
  )
}

export default App
