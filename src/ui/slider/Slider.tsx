'use client'

import styles from './slider.module.css'
import Icon from '../icon/Icon'
import Image from 'next/image'
import type { IPhoto } from '@/types/photos.type'
import useEmblaCarousel from 'embla-carousel-react'

//delete
import photo1 from '@/assets/1.jpg' 
import photo2 from '@/assets/2.jpg' 
import photo3 from '@/assets/3.jpg' 
import photo4 from '@/assets/4.jpg' 
import photo5 from '@/assets/5.jpg'
import { useCallback, useEffect, useState } from 'react'

const data: IPhoto[] = [ //delete
    {
        id: "1",
        src: photo1,
        alt: "photo_1",
        position: 1,
    },
    {
        id: "2",
        src: photo2,
        alt: "photo_2",
        position: 2,
    },
    {
        id: "3",
        src: photo3,
        alt: "photo_3",
        position: 3,
    },
    {
        id: "4",
        src: photo4,
        alt: "photo_4",
        position: 4,
    },
    {
        id: "5",
        src: photo5,
        alt: "photo_5",
        position: 5,
    },
    {
        id: "6",
        src: photo3,
        alt: "photo_3",
        position: 3,
    },
    {
        id: "7",
        src: photo4,
        alt: "photo_4",
        position: 4,
    },
    {
        id: "8",
        src: photo5,
        alt: "photo_5",
        position: 5,
    },
]

interface Props {
    style?: React.CSSProperties
}

export default function Slider({style={}}: Props) {

    const [ emblaRef, emblaApi ] = useEmblaCarousel({ loop: false, slidesToScroll: 'auto' })
    
    const [prevDisabled, setPrevDesabled] = useState<boolean>(emblaApi ? !emblaApi.canScrollPrev() : true)
    const [nextDisabled, setNextDesabled] = useState<boolean>(emblaApi ? !emblaApi.canScrollNext() : false)

    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return

        setPrevDesabled(!emblaApi.canScrollPrev())
        setNextDesabled(!emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        
        emblaApi.on("select", onSelect)

        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <div className={styles.slider} style={style}>
            <button className={styles.arrow} disabled={prevDisabled} onClick={scrollPrev}>
                <Icon name="arrow" size={40} style={{transform: "rotate(90deg)"}}/>
            </button>
            <div className={styles.sliderBody} ref={emblaRef}>
                <div className={styles.sliderContainer}>
                    {
                        data.map(photo =>  {
                            return (
                                <div className={styles.slide} key={photo.id}>
                                    <Image src={photo.src} alt={photo.alt}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button className={styles.arrow} disabled={nextDisabled} onClick={scrollNext}>
                <Icon name="arrow" size={40} style={{transform: "rotate(-90deg)"}}/>
            </button>
        </div>
    )
}