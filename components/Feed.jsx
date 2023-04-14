import Input from "./Input";

export default function Feed({ users, tweets }) {
  return (
    // <div className=" border-l border-r border-gray-200 xl:min-w-[700px] flex-grow max-w-xl mr-12">
    <div className="w-full">
      <div className="flex py-4 px-3 sticky top-0 z-20 bg-white border-b-[1px] border-gray-200 header-shadow-bottom">
        <h4 className="sm:text-xl font-semibold cursor-pointer">Home</h4>
      </div>
      <Input />
    </div>
  );
}
