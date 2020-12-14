import React, { useState, useEffect } from 'react'
import { API_KEY } from '../../Config'
import { Colours } from './Data'
function Landing() {

    const [Background, setBackground] = useState();
    const [Count, setCount] = useState(0);



    useEffect(() => {


        fetch(`https://api.pexels.com/v1/search?query=nature&color=blue&per_page=20`, {
            headers: {
                Authorization: `${API_KEY}`
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setBackground(res)
            })

    }, []);

    return (
        <div>
            {Background && Background.photos.length > 0 ? <div className="hero-container" style={{ backgroundImage: `url(${Background.photos[Count].src.original})` }}>
                <div>
                    <div className="colours-container">
                        {Colours.map((el, index) => { return <div className="colours" style={{ backgroundColor: `${el.colour}` }} key={index}></div> })}
                    </div>
                    <div className="action-container">
                        <p>Photographer: {Background.photos[Count].photographer} </p>
                    </div>
                </div>
            </div> : <span></span>}

        </div >
    )
}

export default Landing
