
import useBanners from "../../../hooks/useBanners";


const Banner = () => {
    const [banners]=useBanners();
   

        const banner = banners.filter(banner=>banner.isActive==='true')
       
    
    console.log(banner);
    
    
    
    return (
        <div>
            {
                banner.map(item=><img key={item._id} className="w-full" src={item.image} alt="" />)
            }
            
            
            
        </div>
    );
};

export default Banner;