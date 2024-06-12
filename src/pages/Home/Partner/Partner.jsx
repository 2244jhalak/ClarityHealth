import { Helmet } from "react-helmet-async"
import Num1 from "../../../assets/1.png"
import Num2 from "../../../assets/2.png"
import Num3 from "../../../assets/3.png"
import Num4 from "../../../assets/4.png"
import Num5 from "../../../assets/5.png"
import Num6 from "../../../assets/6.png"

const Partner = () => {
    return (
        <div className="my-10">
            <Helmet>
        <title>ClarityHealth | Our Partner</title>
        
      </Helmet>
            <h2 className="text-3xl font-semibold text-center my-5">Our Healthcare Partner</h2>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2">
                <div><img src={Num1} alt="" /></div>
                <div><img src={Num2} alt="" /></div>
                <div><img src={Num3} alt="" /></div>
                <div><img src={Num4} alt="" /></div>
                <div><img src={Num5} alt="" /></div>
                <div><img src={Num6} alt="" /></div>
            </div>
            
        </div>
    );
};

export default Partner;