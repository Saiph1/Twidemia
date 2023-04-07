import { SearchIcon } from "@heroicons/react/outline";
import Widgets_item from "@/components/Widgets_item"
import { useState, useEffect } from "react";

export default function Widgets({users, update_page}) {
  const [alluser, setalluser] = useState();
  const [load, setload] = useState(false); 
  
  const [focus, setFocus] = useState(false);
  const [searchUserList, setSearchUserList] = useState([]);
  const [filteredList, setFilteredList] = new useState([]);


  useEffect(()=>{
    fetch("/api/user/")
    .then((res)=>res.json())
    .then((data)=>{setalluser(data.data); console.log("fetched all user."); console.log(data.data)})
    .then(()=>setload(true))
  }, [load]);


  useEffect(() => {
    fetch("/api/user/")
    .then((res)=>res.json())
    .then((data)=>{
      setSearchUserList(data.data); 
      console.log("fetched all user for search list."); 
      // console.log(data.data);
      // console.log(searchUserList);
    })
  }, [focus])


const filterBySearch = (event) => {
  // Access input value
  const query = event.target.value;
  // Create copy of item list
  var updatedList = [...searchUserList];

  // console.log("update list", updatedList);
  // Include all elements which includes the search query
  updatedList = updatedList.filter((item) => {
    // console.log("this is tiem", item.username);
    return (item.username.toLowerCase().indexOf(query.toLowerCase()) !== -1) && (query.toLowerCase());
  });
  // Trigger render with updated values
  setFilteredList(updatedList);
  console.log(filteredList);
  // setFilteredList()
};

  


  // const filterBySearch = (event) => {
  //   // Access input value
  //   const query = event.target.value;
  //   // Create copy of item list
  //   var updatedList = [...itemList];
  //   // Include all elements which includes the search query
  //   updatedList = updatedList.filter((item) => {
  //     return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //   });
  //   // Trigger render with updated values
  //   setFilteredList(updatedList);
  // };
  
  if (load){
    return (
      <div className="xl:w-[600px] hidden lg:inline ml-3 space-y-5">
        <div className="sticky top-0 bg-white py-1.5 z-50">
          <div className="flex items-center p-3 rounded-full relative">
            <SearchIcon className="h-5 z-50 text-gray-500" />
            <input
              type="text"
              placeholder="Search Twitter"
              className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
              onChange={filterBySearch}
              onFocus={()=>setFocus(true)}
              onBlur={()=>setFocus(false)}
              // onInput={() => setSearch(document.getElementById('input').value)}
            />
          </div>
          {focus?  filteredList.map((file, index)=> <Widgets_item key={index} single_userdata={filteredList[index]} load={load}/>) :  <div></div>} 
          {/* {true? <div id="item-list">
              <ol>
                {filteredList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
          </div> : <div></div>} */}
        </div>

        <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl ">
          <h4 className="font-bold text-xl px-4">Who to follow</h4>
          {alluser.map((file, index)=> <Widgets_item key={index} update_page={update_page} single_userdata={alluser[index]} load={load}/>)}
        </div>

        {/* <SearchTable /> */}
      </div>
    );
  }
  else {
    return (
      <div className="xl:w-[600px] hidden lg:inline ml-3 space-y-5">
        <div className="sticky top-0 bg-white py-1.5 z-50">
          <div className="flex items-center p-3 rounded-full relative">
            <SearchIcon className="h-5 z-50 text-gray-500" />
            <input
              type="text"
              placeholder="Search Twitter"
              className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
            />
          </div>
        </div>
        <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl p-2 justify-center">
          <h4 className="font-bold text-xl px-4">Who to follow</h4>
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      </div>
    )
  }
  
}
