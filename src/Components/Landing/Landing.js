import React, { useState, useEffect } from 'react'
import { API_KEY } from '../../Config'
import { Colours } from './Data'
import ProgressiveImage from "react-progressive-graceful-image";

function Landing() {

    const [Background, setBackground] = useState();
    const [Count, setCount] = useState(0);
    const [Query, setQuery] = useState("Flowers");
    const [ColoursChart, setColoursChart] = useState(Colours);
    const [ColourSelection, setColorSelection] = useState(0);
    const [NextPage, setNextPage] = useState();

    useEffect(() => {
        fetch(`https://api.pexels.com/v1/search?query=${Query}&color=${ColoursChart[ColourSelection].colour}&per_page=20`, {
            headers: {
                Authorization: `${API_KEY}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setNextPage(res.next_page)
                setBackground(res)
            })

    }, [ColourSelection]);

    const getNextImages = () => {
        fetch(NextPage, {
            headers: {
                Authorization: `${API_KEY}`
            }
        })
            .then(res => res.json())
            .then(res => {

                setNextPage(res.next_page)
                setBackground(res);
            })
    }

    const nextImage = () => {
        if (Count >= 18) {
            setCount(0)
            getNextImages()
        }
        else {
            setCount(Count + 1)
        }

    }
    const prevImage = () => {
        setCount(Count - 1)
    }

    const colourSelect = (e) => {
        setColorSelection(e.target.id)
        setCount(0)
    }

    const onChangeSearch = (e) => {
        setQuery(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        setCount(0)
        e.preventDefault();
        fetch(`https://api.pexels.com/v1/search?query=${Query}&color=${ColoursChart[ColourSelection].colour}&per_page=20`, {
            headers: {
                Authorization: `${API_KEY}`
            }
        })
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                if (res.total_results <= 0) {

                    setQuery("No Results Found")
                }
                else {
                    setBackground(res)
                }

            })
    }

    return (
        <div>
            {Background && Background.photos.length > 0 ? <div className="hero-container" style={{ backgroundColor: `${ColoursChart[ColourSelection].colour}` }}>
                <div>
                    <div className="wallpaper-container">
                        {Background.photos[Count].width > Background.photos[Count].height ?
                            <ProgressiveImage src={Background.photos[Count].src.original} placeholder={Background.photos[Count].src.landscape} >
                                {(src, loading) => <img style={{ opacity: loading ? 0.3 : 1 }} src={src} className="landscape" alt="wallpaper" />}
                            </ProgressiveImage>
                            :
                            <ProgressiveImage src={Background.photos[Count].src.original} placeholder={Background.photos[Count].src.large} >
                                {(src, loading) => <img style={{ opacity: loading ? 0.3 : 1 }} src={src} className="portrait" alt="wallpaper" />}
                            </ProgressiveImage>
                        }

                    </div>
                    <div className="colours-container">
                        {ColoursChart.map((el, index) => {
                            return <div className="colours" style={{ backgroundColor: `${el.colour}` }} key={index} id={index} onClick={colourSelect}>
                            </div>
                        })}
                    </div>
                    <div className="action-container">
                        <h2>The Wall Engine</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={Query} onChange={onChangeSearch} required />
                        </form>
                        <div className='action-buttons'>
                            {Count <= 0 ? <button style={{ backgroundColor: 'black' }}>🡠</button> : <button onClick={prevImage}>🡠</button>}
                            <button onClick={nextImage}>🡢</button>
                        </div>
                        <h2>
                            <span className="pexels">Powered By Pexels</span>
                        </h2>
                    </div>
                    <div className="photographer-container">
                        <p>Photographer: {Background.photos[Count].photographer} </p>
                    </div>
                </div>
            </div> : <span></span>}

        </div >
    )
}

export default Landing
