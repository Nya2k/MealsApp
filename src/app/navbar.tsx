export default function Navbar() {
    return (
        <div className="text-[#FFFFFF] h-12 md:h-14 bg-[#153448] text-xl font-serif font-semibold shadow-sm shadow-white fixed left-0 top-0 right-0 z-20">
            <header className="p-3 w-full flex items-center">
                <div className='xs:w-1/6 items-center justify-center flex'>
                    <a href="/" className='items-center w-fit ml-3'>Mom&apos;s Recipe</a>
                </div>
            </header>
        </div>
    )
}