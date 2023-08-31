import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Crausal from '../components/Carousel'


export default function Home() {
    return (
        <>
            <div>
                <div> 
                <Navbar />
                </div>
                <div>
                    <Crausal/>
                    
                </div>
                <div>
                    <Card />
                </div>
                <div>  
                <Footer />
                </div>
            </div>

        </>
    )
}
