import React, { useEffect, useState } from 'react'
// import ReactDOM from 'react-dom'
import './index.css'
import Progress from './progress'

const callFakeAPI = delay =>
    new Promise(resolve => {
        setTimeout(resolve, delay)
    })

const Nprogress = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        ; (async () => {
            await callFakeAPI(80)
            setIsLoading(false)
        })()
        return function () {

        }
    }, [])

    return (
        <React.Fragment>
            <Progress isAnimating={isLoading} />
            {/* <h1>{isLoading ? 'Loading...' : 'Loaded!'}</h1> */}
        </React.Fragment>
    )
}

export default Nprogress