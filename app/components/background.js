'use client'
import './background.css'
import { useEffect } from "react"

export default function Background() {
    useEffect(() => {
        const maxX = window.innerWidth, maxY = window.innerHeight, size = 75
        const numX = Math.ceil(maxX/size) + 1, numY = Math.ceil(maxY/size) + 1
        const values = numX * numY
        console.log(`zzz bg`, values, numX, numY, maxX, maxY, size)
        const background = document.querySelector('#background')
        for(let i=0; i<values; i++) {
            const el = document.createElement('div')
            el.className = "cell"
            el.style.width = `${size}px`
            el.style.height = `${size}px`
            background.appendChild(el)
            // el.addEventListener('mousemove', (e) => {
            //     if(el.style.backgroundColor !== 'green') {
            //         el.style.backgroundColor = 'green'
            //         setTimeout(() => {
            //             el.style.backgroundColor = 'transparent'
            //         }, 2000)
            //     }
            // })
        }
    }, [])

    return (
        <div id="background" className="flex flex-wrap" />
    )
}