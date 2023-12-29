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
        { id: '1', image: 'https://images.pexels.com/photos/8548197/pexels-photo-8548197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '2', image: 'https://images.pexels.com/photos/15991570/pexels-photo-15991570/free-photo-of-a-tall-building-with-a-green-roof-and-a-clock-tower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '3', image: 'https://images.pexels.com/photos/7523831/pexels-photo-7523831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '4', image: 'https://images.pexels.com/photos/17483921/pexels-photo-17483921/free-photo-of-silos-behind-barbed-wire-in-town.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
    ]

    useEffect(() => {

        function handleResize() {
            if (window.innerWidth < 720) {
                setSlidePerView(1);
            } else {
                setSlidePerView(4)
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
            <h2 className={styles.company_galeria}>Galeria</h2>
            <p className={styles.company_galeria_desc}>Nossa empresa tem a missão de melhorar a vida das pessoas com a tecnologia.</p>
            <Swiper className={styles.company_slider}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={slidePerView}
                //navigation
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


        </>
    )
}