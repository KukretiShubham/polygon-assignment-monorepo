import { useRef, useState } from "react"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import {XIcon} from "@heroicons/react/outline";
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
import {postToparrot} from "../function/function";
import { useRouter } from 'next/router'

export default function Post() {
    const [formInput, updateFormInput] = useState({ chirp: "" })
    const [fileUrl, setFileUrl] = useState(null)
    const filePickerRef = useRef(null);
    const router = useRouter()
    async function onChange(e) {
        const file = e.target.files[0]
        try {
          const added = await client.add(
            file,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          )
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          setFileUrl(url)
          console.log("File URL => ",url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
      async function createPost() {
        const { chirp } = formInput
        if (!chirp && !fileUrl)
        {
          console.log("Nothing to upload")
          return
        }
        /* first, upload to IPFS */
        const data = JSON.stringify({
          message: chirp, image: fileUrl
        })
        try {
          const added = await client.add(data)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
          console.log("Final post URL => ",url)
          makepost(url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
    const makepost = async (uri) => {
        const receipt = await postToparrot(uri);
        console.log(receipt);
        router.push('/')
      }
    return (
        <div className="flex justify-center my-auto items-center  ">
            <div className="w-1/3 flex flex-col pb-4">
                <div className="border-green-500 mt-4 border-2 rounded p-4">
                    <textarea
                        placeholder="Chirpp.. your thoughts here"
                        className="w-full border-0 focus:ring-0 rounded tracking-wide"
                        onChange={e => updateFormInput({ ...formInput, chirp: e.target.value })}
                    />
                    <input
                        type="file"
                        name="Asset"
                        className="invisible"
                        ref={filePickerRef}
                        onChange={onChange}
                    />
                    {
                        fileUrl && (
                            <div className="relative">
                            <div
                                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                                onClick={() => setFileUrl(null)}
                            >
                                <XIcon className="text-white h-5" />
                            </div>
                            <img
                                src={fileUrl}
                                alt=""
                                className="rounded-2xl max-h-80 object-contain"
                            />
                            </div>
                        )
                    }
                    <button type="button"onClick={()=> filePickerRef.current.click()} className="inline-flex justify-center p-0 text-green-500 rounded cursor-pointer hover:text-gray-900 hover:bg-green-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            <div className="flex justify-end">
                <button onClick={createPost} className="bg-green-500 hover:bg-green-600 w-28 mt-4 text-white font-bold p-2 rounded-full ">
                    Chirp
                </button>
            </div>
        </div>
    </div>
    )
  }