export default function Home() {
  return (
      <div className="flex flex-col justify-center mt-4 px-5">
        <div className="border-b-2 border-[#948979] border-opacity-30 py-2">
          <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#605441]">Breakfast</h1>
        </div>
        <div className="flex gap-4 flex-row overflow-x-scroll w-full py-3">
          <div className="bg-[#ffffff] min-w-56 max-w-64 border-2 border-[#948979] rounded shadow-lg p-4">
              <img src="https://www.themealdb.com/images/media/meals/ytpstt1511814614.jpg" alt="image" className="rounded"></img>
              <div className="flex flex-row text-sm opacity-50 mt-1">
                <p className="w-1/2 text-left">Breakfast</p>
                <p className="w-1/2 text-right">Russian</p>
              </div>
              <p className="w-full text-center mt-3 text-base">Stuffed Bell Peppers with Quinoa and Black Beans</p>
          </div>
          
          
        </div>
      </div>
  )
}