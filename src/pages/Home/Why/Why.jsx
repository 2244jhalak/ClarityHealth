import High from '../../../assets/high.png'
import Member from '../../../assets/member.webp'
import Discount from '../../../assets/discount.png'

const Why = () => {
    return (
        <div className='my-10'>
            <h2 className='text-center text-3xl font-semibold'>Why Choose Us?</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 px-10">
            <div className="text-center py-5">
                <div className='flex items-center justify-center'>
                <img className='text-center w-56' src={High} alt="" />
                </div>
                <h2 className="text-2xl font-semibold">High Engagement Promotions</h2>
            </div>
            <div className="text-center py-5">
                <div className='flex items-center justify-center'>
                <img className='text-center w-56' src={Member} alt="" />
                </div>
                <h2 className="text-2xl font-semibold">Membership Plans</h2>
            </div>
            <div className="text-center py-5">
                <div className='flex items-center justify-center'>
                <img className='text-center w-56' src={Discount} alt="" />
                </div>
                <h2 className="text-2xl font-semibold">Effective Discount</h2>
            </div>
            
            
        </div>
        </div>
    );
};

export default Why;