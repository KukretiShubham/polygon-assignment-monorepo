export default function Navbar() {
    return (
        <div className="w-full container mx-auto">
          <div className="absolute w-full flex items-center justify-between">
            <a href="#">
              <img src = "https://i.ibb.co/Wv67mcn/layer1-1.png" 
                className="flex items-center"/>
            </a>
            <div className="self-start flex w-1/2 justify-end content-center">
              <button className="m-1.5 bg-green-500 hover:bg-green-600 font-bold text-white rounded-lg p-2 shadow-lg">Connect Wallet</button>
            </div>
          </div>
      </div>
    )
  }