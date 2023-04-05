import Input from "./Input";

export default function Feed() {
  return (
    <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-4 px-3  sticky top-0 z-50 bg-white border-b border-gray-200">
            <h4 className="sm:text-xl font-semibold cursor-pointer">Home</h4>
        </div>
        <Input />
    </div>
  );
}
