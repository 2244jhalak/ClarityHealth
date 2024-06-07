
import { Link } from "react-router-dom";
import useBanners from "../../../hooks/useBanners";


const Banner = () => {
    const [banners]=useBanners();
   

        const banner = banners.filter(banner=>banner.isActive==='true')
       
    
    console.log(banner);
    
    
    
    return (
        <div>
            {
                banner.map(item=>
                    <div key={item._id} className="hero lg:h-[600px]" style={{backgroundImage: `url(${item.image})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">{item.title} ({item.rate}% off)</h1>
      <p className="mb-5">Use Promo Code: <span className="font-extrabold text-2xl">{item.code}</span></p>
      <Link to='/allTests' className="btn btn-outline text-white">All Tests</Link>
    </div>
  </div>
</div>
                )
            }
            
            
            
        </div>
    );
};

export default Banner;