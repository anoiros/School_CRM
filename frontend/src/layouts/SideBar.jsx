import React from 'react';

const SideBar = ({ SideBarList }) => {

    const handleClick = async(item) => {
        window.location.pathname = item;
    }

    return (
    <ul className="h-auto w-full p-0">
        {
        SideBarList.map((item, index) => {
            return(
            <li key = {index} className={
                "w-full h-16 border border-black list-none m-0 flex flex-row" + 
                "text-white justify-center items-center font-roboto hover:cursor-pointer hover:bg-[#374151]"  
                + " " + (window.location.pathname.startsWith(item.path) ? "bg-[#374151]" : "")
            } 
            onClick={() =>handleClick(item.path)}>
                <div className="flex-[0_0_30%] grid place-items-center">
                    {item.icon}
                </div>
                {" "}
                <div className="flex-[0_0_70%]">
                    {item.title}
                </div>
            </li>
            )
        })}
    </ul>
    );
};

export default SideBar;
