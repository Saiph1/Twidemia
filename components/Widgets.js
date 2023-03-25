import { SearchIcon } from "@heroicons/react/outline";

export default function Widgets() {
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-3 space-y-5">
        <div className="sticky top-0 bg-white py-1.5 z-50">
            <div className="flex items-center p-3 rounded-full relative">
                <SearchIcon className="h-5 z-50 text-gray-500" />
                 <input type="text" placeholder="Search Twitter" className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "/>
            </div>
        </div>

        <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl ">
            <h4 className="font-bold text-xl px-4">Who to follow</h4>
            
            <div className="flex gap-4 items-center px-4 py-2 cursor-pointer hover:bg-gray-200"> 
                <img className="rounded-full" width="40" src={"https://i.imgur.com/3hUCHfOb.jpg"} alt="img"/>
                <div className="truncate ml-4 leading-5"> 
                    <h4 className="font-bold hover:underline text-[14px] truncate">User Name</h4>
                    <h5 className="text-[13px] text-gray-500 truncate">@userID</h5>
                </div> 
                <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Follow</button>
            </div> 
        </div>







    </div>
  )
}
