import React, { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Box, Typography } from '@mui/material'; // Añadimos Typography aquí
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Slide {
  id: number;
  image: string;
  title?: string;
  subtitle?: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const slideStyles: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: { xs: 300, sm: 400, md: 500 },
      position: 'relative',
      overflow: 'hidden',
      '& .swiper': {
        height: '100%'
      },
      '& .swiper-pagination-bullet': {
        backgroundColor: 'white',
        opacity: 0.5,
        width: 12,
        height: 12,
        margin: '0 8px !important'
      },
      '& .swiper-pagination-bullet-active': {
        backgroundColor: '#1976d2',
        opacity: 1
      },
      '& .swiper-button-next, & .swiper-button-prev': {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: 50,
        height: 50,
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.5)'
        },
        '&::after': {
          fontSize: 24
        }
      }
    }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box sx={{ 
              position: 'relative',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={slide.image} 
                alt={`Slide ${slide.id}`} 
                style={slideStyles}
              />
              
              {(slide.title || slide.subtitle) && (
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center',
                  padding: 3
                }}>
                  {slide.title && (
                    <Typography 
                      variant="h3" 
                      component="h1" 
                      sx={{ 
                        fontWeight: 700,
                        mb: 2,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                      }}
                    >
                      {slide.title}
                    </Typography>
                  )}
                  {slide.subtitle && (
                    <Typography 
                      variant="h5" 
                      component="p" 
                      sx={{ 
                        maxWidth: 800,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                        fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' }
                      }}
                    >
                      {slide.subtitle}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlider;