import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import sliderStyles from "../../styles/Slider.module.scss";

const Slider = () => {
    const [data,setData] = useState<any[]>([{}]);
    const [zIndex, setZIndex] = useState<number>(0);
    const currentInd = useRef<number>(0);

    async function slide( swiper:any ) {        
        setZIndex(2);
        if( swiper.translate < swiper.previousTranslate) {
            currentInd.current = currentInd.current + 1;
        } else {
            currentInd.current = currentInd.current - 1;
        }
        if(currentInd.current > 32){
            currentInd.current = 0;
        }
        if(currentInd.current < 0){
            currentInd.current = 32;
        }
        const url:string = process.env.NEXT_PUBLIC_FETCH_URL + `?limit=3` + `&skip=${currentInd.current}`;
        await axios.get(url).then((data) => {
            console.log(data.data.products);
            setZIndex(0);
            setData(data.data.products);
        });
    };

    useEffect(() => {
        const url:string = process.env.NEXT_PUBLIC_FETCH_URL + `?limit=3` + `&skip=0`;
        (async function() {
                await axios.get(url).then((data) => {
                    console.log(data);
                setData(data.data.products);
            })
        } ());
    }, []);

    return (
       <Box className={sliderStyles.main}>
        <Box sx={{
            width: "calc(100% - 50px)",
            height: "500px",
            zIndex: zIndex,
            position: "absolute",
            top: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.8,
            backgroundColor: "black",
        }}>
            <CircularProgress />
        </Box>
            <Swiper
                className={sliderStyles.swiper}
                spaceBetween={50}
                slidesPerView={3}
                modules={[Navigation, A11y]}
                navigation
                loop={true}
                onSlideChange={slide}
                >
                {data.map((e, i) => (
                    <SwiperSlide
                    key={i}
                    className={sliderStyles.swiperSlide}
                    >
                        <Typography
                        variant="h5">
                        {e.title}
                        </Typography>
                        <Typography>
                            {e.description}
                        </Typography>
                        <Typography>
                            price: ${e.price}
                        </Typography>
                    </SwiperSlide>
                ))}
            </Swiper>
       </Box>
    );
}

export default Slider;