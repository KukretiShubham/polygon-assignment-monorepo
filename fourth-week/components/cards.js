import {getpost} from "../function/function";
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Card()
{
    const [posts, updatePosts] = useState([])
    useEffect(() => {
        findpost()
      }, [])
    async function findpost() {
        const data = await getpost()
        const items = await Promise.all(data.map(async i => {
          const meta = await axios.get(i.posturi)
          let item = {
            owner: i.creator,
            message: meta.data.message,
            image: meta.data.image,
          }
          return item
        }))
        updatePosts(items)
        console.log(posts)
      }
    return(
        <div className="flex justify-center">
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                    posts.map((post, i) => (
                        <div key={i} className="border shadow rounded-xl overflow-hidden">
                        <p className="">Posted by: {post.owner}</p>
                        <img src={post.image} className="rounded-2xl max-h-80 object-contain" />
                        <div className="p-4 bg-black">
                            <p className="text-2xl font-bold text-white">{post.message}</p>
                        </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}