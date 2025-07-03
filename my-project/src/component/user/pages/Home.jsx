import Navbar from "../HomeComponent/navBar";
import Header from "../HomeComponent/header"
import DisplayProducts from "../HomeComponent/productList";
import Footer from "../HomeComponent/footer";
import { useEffect } from "react";


function Home() {

    useEffect(() => {
        console.log("Home loaded");
    }, []);


    return (
        <div>
            <Navbar />
            <Header />
            <DisplayProducts />
            <Footer />
        </div>
    )
}

export default Home