import {  Helmet } from 'react-helmet-async';
import FeaturedTest from '../FeaturedTest/FeaturedTest';

const Home = () => {
    return (
        <div>
            <Helmet>

                 <title>ClarityHealth | Home</title>
                 

            </Helmet>
            <FeaturedTest></FeaturedTest>
            
            
        </div>
    );
};

export default Home;