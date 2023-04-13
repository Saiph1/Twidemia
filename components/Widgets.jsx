import { SearchIcon } from "@heroicons/react/outline";
import Widgets_item from "@/components/Widgets_item";
import { useState, useEffect } from "react";

export default function Widgets({ user, update_page }) {
  const [alluser, setalluser] = useState();
  const [load, setload] = useState(false);

  const [focus, setFocus] = useState(false);
  const [searchUserList, setSearchUserList] = useState([]);
  const [filteredList, setFilteredList] = new useState([]);

  useEffect(() => {
    fetch("/api/user/")
      .then((res) => res.json())
      .then((data) => {
        setalluser(data.data);
        console.log("fetched all user.");
        console.log(data.data);
      })
      .then(() => setload(true));
  }, [load]);

  useEffect(() => {
    fetch("/api/user/")
      .then((res) => res.json())
      .then((data) => {
        setSearchUserList(data.data);
        console.log("fetched all user for search list.");
        console.log(data.data);
        console.log(searchUserList);
      });
  }, [focus]);

  // https://contactmentor.com/build-reactjs-search-filter/
  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...searchUserList];

    // console.log("update list", updatedList);
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      // console.log("this is tiem", item.username);
      return (
        item.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
        query.toLowerCase()
      );
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

  if (load) {
    return (
      <div className="w-full xl:w-[360px] hidden lg:inline px-5 space-y-5 bg-white">
        <div className="sticky top-0 bg-white py-1.5 z-50">
          <div className="flex items-center p-3 rounded-full relative">
            <SearchIcon className="h-5 z-50 text-gray-500" />
            <input
              id="searchbar"
              type="text"
              placeholder="Search Twitter"
              className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
              onChange={filterBySearch}
              // onFocus={()=>setFocus(true)}
              // onBlur={(e)=>{e.preventDefault; document.getElementById("searchbar").value = ""; setFilteredList([])}}
              // onInput={() => setSearch(document.getElementById('input').value)}
            />
          </div>
          <div class="absolute bg-gray-400 width=500 shadow-2xl rounded-2xl">
            {filteredList.map((file, index) => (
              <Widgets_item
                key={index}
                update_page={update_page}
                single_userdata={filteredList[index]}
                load={load}
                viewerid={user}
              />
            ))}
            {/* {true? <div id="item-list">
              <ol>
                {filteredList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
          </div> : <div></div>} */}
          </div>
        </div>

        <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl ">
          <h4 className="font-bold text-xl px-4">Who to follow</h4>
          {alluser.map((file, index) =>
            alluser[index].userId != user ? (
              <Widgets_item
                key={index}
                update_page={update_page}
                single_userdata={alluser[index]}
                viewerid={user}
                load={load}
              />
            ) : (
              <></>
            )
          )}
        </div>

        {/* <SearchTable /> */}
      </div>
    );
  } else {
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
      </div>
    );
  }
}
