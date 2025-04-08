import NavBar from "../../../HomeComponent/navBar";
import Header from "../../../HomeComponent/header";
import DisplayProducts from "../../../HomeComponent/productList";
import Footer from "../../../HomeComponent/footer";


function Home() {
    return (
        <div>
            <NavBar />
            <Header/>
            <DisplayProducts/>
            <Footer/>
        </div>
    )
}

export default Home