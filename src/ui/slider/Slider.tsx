'use client'

import styles from './slider.module.css'
import Icon from '../icon/Icon'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import useColors from '@/hooks/useColors'

import { useCallback, useEffect, useState } from 'react'
import { IPhotoPreview } from '@/types/general.type'

interface Props {
    previews: IPhotoPreview[],
    onRemove: (preview: IPhotoPreview) => void
    style?: React.CSSProperties
}

export default function Slider({previews, onRemove, style={}}: Props) {

    const { MAIN_COLOR } = useColors()

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
            {
                previews.length > 5 && 
                <button type='button' className={styles.arrow} disabled={prevDisabled} onClick={scrollPrev}>
                    <Icon name="arrow" size={40} style={{transform: "rotate(90deg)"}}/>
                </button>
            }
            <div className={styles.sliderBody} ref={emblaRef}>
                <div className={styles.sliderContainer}>
                    {
                        previews.map((photo, index) =>  {
                            return (
                                <div className={styles.slide} key={index}>
                                    <div className={styles.remove} onClick={() => onRemove(photo)}>
                                        <Icon name='trash' size={15} stroke={MAIN_COLOR}/>
                                    </div>
                                    <Image src={photo.url} width={150} height={150} alt={`preview_№${index}`}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                previews.length > 5 && 
                <button type='button' className={styles.arrow} disabled={nextDisabled} onClick={scrollNext}>
                    <Icon name="arrow" size={40} style={{transform: "rotate(-90deg)"}}/>
                </button>
            }
        </div>
    )
}