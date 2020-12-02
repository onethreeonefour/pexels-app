import React, { useState, useEffect } from 'react'
import { API_KEY } from '../../Config'
function Landing() {

    const [Curated, setCurated] = useState();
    const [NextPage, setNextPage] = useState();

    useEffect(() => {
        fetch("https://api.pexels.com/v1/curated?per_page=20?page=1", {
            headers: {
                Authorization: `${API_KEY}`
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setCurated(res.photos)
                setNextPage(res.next_page)
            })
    }, []);


    return (

        <div>
            <div className="hero-container">
                <h1>Be Inspired.</h1>
                <h3>Find Your Next Photo For Your Project</h3>
                <input className="search-input" placeholder="Search For Free Images & Videos"></input>
                <button className="search-button">Search</button>

                <div className='curated-images-container'>
                    {Curated ? Curated.map((el, index) => {
                        return <div key={index} className="image-container">
                            <img src={el.src.large} alt="curated" ></img>
                            <a className='photographer' href={el.photographer_url}>{el.photographer}</a>
                        </div>
                    })
                        : <span></span>}
                </div>

            </div>

        </div>
    )
}

export default Landing
