import React from "react"
import Header from "../../../components/ManagerHeader"
import Sidebar from "../../../components/ManagerSidebar";
import CreateRequest from "./components/CreateRequest";

export default function Index(): React.JSX.Element {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Header />

            <div className="h-[calc(100%-4rem)] flex bg-gray-300">
                <Sidebar />
                <div className="w-full p-10">
                    <CreateRequest />
                </div>
            </div>
        </div>
    )
}
