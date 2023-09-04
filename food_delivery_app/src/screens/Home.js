import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Crausal from '../components/Carousel'


export default function Home() {

    const [foodCat, setFoodcat] = useState([]);
    const [foodItem, setFooditem] = useState([]);
    const [search, setSearch] = useState("")

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/foodData', {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            }
        })

        response = await response.json();
        // console.log(response[0], response[1]);
        setFooditem(response[0]);
        setFoodcat(response[1])
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    {/* <Crausal /> */}
                    <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                        <div className="carousel-inner " id='carousel'>
                            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                                <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                    <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search"
                                    value={search} onChange={(e)=> setSearch(e.target.value)} />
                                    {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                                </div>
                            </div>
                            <div className="carousel-item active" >
                                <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>
                <div className='container'>
                    {
                        foodCat !== []
                            ?
                            foodCat.map((data) => {
                                return (<div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName
                                        }</div>
                                    <hr />
                                    {
                                        foodItem !== []
                                            ?
                                            foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                .map((filterItem) => {
                                                    return (
                                                        <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card foodName={filterItem.name}
                                                                options={filterItem.options[0]}
                                                                imageItems={filterItem.img}

                                                            >

                                                            </Card>
                                                        </div>
                                                    )
                                                })
                                            : <div>No data found </div>
                                    }
                                </div>

                                )
                            }) : <div>******________****** </div>
                    }
                </div>
                <div>
                    <Footer />
                </div>
            </div>

        </>
    )
}
