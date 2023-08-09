import { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';


import styles from './Company.module.css'


export default function Company() {
    const [slidePerView, setSlidePerView] = useState(2)
    const data = [
        { id: '1', image: 'https://placehold.co/650x400' },
        { id: '2', image: 'https://placehold.co/650x400' },
        { id: '3', image: 'https://placehold.co/650x400' },
        { id: '4', image: 'https://placehold.co/650x400' }
    ]

    useEffect(() => {

        function handleResize() {
            if (window.innerWidth < 720) {
                setSlidePerView(1);
            } else {
                setSlidePerView(2)
            }
        }

        handleResize()

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])

    return (
        <>
            <Swiper className={styles.company_slider}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={slidePerView}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {
                    data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <img src={item.image}
                                alt="Slider"
                                className={styles.slide_item}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <h2 className={styles.company_galeria}>Galeria</h2>

        </>
    )
}