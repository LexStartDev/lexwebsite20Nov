    $(document).ready(function(){
                $('.single-item').slick({
                    dots: true,
                    arrows: true,
                    // prevArrow: string(<button type="button" class="slick-prev">Previous</button>),
                    // nextArrow: string(<button type="button" class="slick-next">Next</button>),
                    autoplay: false,
                    autoplaySpeed: 2000, 
                    infinite: true, 
                    swipe: true,
                    slidesToShow: 1,
                    slidesToScroll: 1                
                })
            
            // $('.test-postitem').slick({
            //     arrows: true,
            //     dots: true
            // })

            
                // $('.off-item').slick({
                //     dots: false,
                //     arrows: true,
                //     autoplay: false,                    
                //     infinite: true, 
                //     slidesToShow: 3,
                //     slidesToScroll: 1
                    
                // })
            

            
                $('.cust-item').slick({
                    dots: false,
                    arrows: true,                    
                    autoplay: false,
                    // autoplaySpeed: 2000, 
                    infinite: true,             
                    
                })

            
                $('.post-item').slick({
                    dots: false,
                    arrows: true,                    
                    // prevArrow: string(<button type="button" class="slick-prev">Previous</button>),
                    // nextArrow: string(<button type="button" class="slick-next">Next</button>),
                    autoplay: false,
                    // autoplaySpeed: 2000, 
                    infinite: true, 
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // asNavFor: '.row-post2'
                })

                // $('.leader_slick').slick({
                //     // settings: "unslick",
                //     arrows: true,
                //     slidesToShow: 3,
                //     slidesToScroll: 1,
                //     autoplay: true,
                //     autoplaySpeed: 2000,
                //     responsive: [
                //         {
                //             breakpoint: 1920,
                //             settings: "unslick"
                //         },
                //         {
                //             breakpoint: 1600,
                //             settings: "unslick"
                //         },
                //         {
                //             breakpoint: 1440,
                //             settings: "unslick"
                //         },
                //         {
                //             breakpoint: 1400,
                //             settings: "unslick"
                //         },
                //         {
                //             breakpoint: 1366,
                //             settings: "unslick"
                //         },
                //         {
                //             breakpoint: 1280,
                //             settings: {
                //                 arrows: true,
                //                 dots: true,
                //                 slidesToShow: 2,
                //                 slidesToScroll: 1,
                //                 autoplay: false
                //             }
                //         },
                //         {
                //             breakpoint: 1024,
                //             settings: {
                //                 arrows: true,
                //                 slidesToShow: 2,
                //                 slidesToScroll: 1,
                //                 autoplay: false
                //             }
                //         },
                //         {
                //             breakpoint: 991,
                //             settings: {
                //             arrows: true,
                //             slidesToShow: 2,
                //             slidesToScroll: 1,
                //             autoplay: false
                //             }
                //         }
                        
                        
                //     ]
                //   })

                //   $('openings').slick({
                //     arrows: true,
                //     slidesToShow: 2,
                //     slidesToScroll: 1,
                //     autoplay: false
                //   })
            
            // $('.row-post2').slick({
            //     dots: false,
            //     arrows: false,      
            //     asNavFor: '.post-item',              
            //     centerMode: false,
            //     focusOnSelect: true,
            //     slidesToShow: 2,
            //     slidesToScroll: 1                   
            // })

        });


        