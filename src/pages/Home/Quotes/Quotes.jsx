import { Helmet } from "react-helmet-async";


const Quotes = () => {
    return (
        <div className="my-10 text-center">
            <Helmet>
        <title>ClarityHealth | Quotes</title>
        
      </Helmet>
            <h2 className="text-center text-3xl font-semibold my-5">Famous Quotes For Health</h2>
            <ul>
                <li>1.Take care of your body. It is the only place you have to live.<span className="font-bold">-Jim Rohn</span></li>
                <li>2.The greatest wealth is health.<span className="font-bold">-Virgil</span></li>
                <li>Good health and good sense are two of life’s greatest blessings.<span className="font-bold">-Publilius Syrus</span></li>
                <li>3.Take care of your body. It is the only place you have to live.<span className="font-bold">-Jim Rohn</span></li>
                <li>4.Health is not valued till sickness comes.<span className="font-bold">-Thomas Fuller</span></li>
                <li>5.Healthy citizens are the greatest asset any country can have.<span className="font-bold">-Winston Churchill</span></li>
                
            </ul>
            
        </div>
    );
};

export default Quotes;