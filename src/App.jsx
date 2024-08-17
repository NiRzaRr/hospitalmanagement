import React from "react"
import Header from "./components/header"
import { Outlet } from 'react-router-dom'
import Footer from "./components/footer"
import bgimg from  "./backgroundimg.jpg"

function App() {
  return (
    
    
      <div className="flex flex-col h-dvh w-full items-center gap-5 ">
        <img src={bgimg} alt="bg" className="h-full -z-10 object-fill absolute w-full" />
        <Header />
         <main className=" h-5/6 box-border shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px] w-[93%] md:w-[90%] lg:w-[85%] backdrop-blur-[3px] bg-slate-400/[0.3]">
          <Outlet />
        </main>
        <div className=" h-[7%] mb-0 bg-slate-600/[0.4] w-screen overflow-hidden p-0.5">
        <Footer />
        </div>
      </div>
    
  )
}

export default App
