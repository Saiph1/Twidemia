import { useRouter } from "next/router";
import Link from "next/link"; 

export default function Widgets_item({single_userdata, update_page=()=>{}, viewerid=""}) {
  const router = useRouter(); 
  return(
    <div className="flex items-center px-4 py-2 hover:bg-gray-200">
      <img className="rounded-full" width="40" src={"/default.png"} alt="img" />
      <div className="truncate ml-4 leading-5">
        
        <Link href={"/profile/"+single_userdata.userId}>
          <h4 className="font-bold hover:underline text-[14px] truncate cursor-pointer" onClick={()=>update_page()}>
            {single_userdata.username}
          </h4>
        </Link>
        <h5 className="text-[13px] text-gray-500 truncate">@{single_userdata.userId}</h5>
      </div>
      <button className={!single_userdata.followerlist.map(item=>(item.userId === viewerid)).includes(true)? 
      "ml-auto bg-white text-black border-2 rounded-full text-sm px-3.5 py-1.5 font-bold hover:bg-gray-400 hover:text-black px-5"
      :
      "ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold hover:bg-gray-400 hover:text-black"
      
      }>
        {!single_userdata.followerlist.map(item=>(item.userId === viewerid)).includes(true)?"Follow":"Unfollow"}
      </button>
    </div>
  )
}



