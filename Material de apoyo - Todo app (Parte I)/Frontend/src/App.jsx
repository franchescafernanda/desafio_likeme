import React, { useState, useEffect } from "react"
import TodoForm from "./components/TodoForm"
import Todos from "./components/Todos"

const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts")
      if (!response.ok) {
        throw new Error("Error al obtener posts")
      }
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error:", error)
    }
  };

  const addPost = async (newPost) => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
      if (!response.ok) {
        throw new Error("Error al agregar post")
      }
      const data = await response.json()
      setPosts([...posts, data])
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="App">
      <h1>Like Me - Red Social</h1>
      <TodoForm addPost={addPost} />
      <Todos posts={posts} />
    </div>
  )
}

export default App
