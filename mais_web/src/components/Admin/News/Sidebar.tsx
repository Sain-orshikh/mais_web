import { IoIosAdd } from "react-icons/io";
import { useAtom } from "jotai";
import { isMenuOpen } from "../../../store/ThemeAtom";
import NewsBlock from "../../ui/NewsBlock";

const Sidebar = () => {
  const [ismenuOpen] = useAtom(isMenuOpen);

  // Sample news items - in a real app these would come from state/props
  const newsItems = [
    { id: 1, title: "Latest Updates" },
    { id: 2, title: "Company News" },
    { id: 3, title: "Events Calendar" },
  ];

  const handleSettingsClick = (id: number) => {
    console.log(`Settings clicked for news item ${id}`);
    // Handle settings logic here
  };

  return (
    <div className={`fixed top-0 w-[10%] mt-20 border-l border-b bg-white min-h-full z-20 p-4 ${ismenuOpen ? "hidden" : "block"}`}>
        <div className="flex flex-row justify-between items-center mb-4">
            <span>News tabs</span>
            <button className="rounded-full hover:bg-gray-200 p-1">
                <IoIosAdd className='text-2xl' />
            </button>
        </div>
        
        <div className="mt-4 space-y-2">
          {newsItems.map((item) => (
            <NewsBlock
              key={item.id}
              title={item.title}
              onSettingsClick={() => handleSettingsClick(item.id)}
            />
          ))}
        </div>
    </div>
  )
}

export default Sidebar