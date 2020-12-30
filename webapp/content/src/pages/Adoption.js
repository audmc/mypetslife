import React from "react";
import AdoptionPage from "../components/AdoptionPage/AdoptionPage";
import NavbarTop from "../components/NavbarTop/NavbarTop";
import Footer from "../components/Footer/Footer"

export default function adoption(props) {
        return (
        <>
            <NavbarTop/>
            <AdoptionPage/>
            <div className="vh-90 position-relative">
                <Footer/>
            </div>
        </>
    );
}