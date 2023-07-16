import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI'
import { useNavigate } from 'react-router-dom'

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these courses:",courses);
        // will write api for payment gateway 
        buyCourse(token, courses, user, navigate, dispatch)
    }

  return (
    <div className='min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 '>
        <p className='mb-1 text-sm font-medium text-richblack-300'>Total</p>
        <p className='mb-6 text-3xl font-medium text-yellow-100'>₹  {total}</p>
        <IconBtn
            text="Buy Now "
            onclick={handleBuyCourse}
            customClass={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmount