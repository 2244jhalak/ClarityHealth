import {  Helmet } from 'react-helmet-async';
import FeaturedTest from '../FeaturedTest/FeaturedTest';
import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <div>
            <Helmet>

                 <title>ClarityHealth | Home</title>
                 

            </Helmet>
            <Banner></Banner>
            <FeaturedTest></FeaturedTest>
            
            
        </div>
    );
};

export default Home;