import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox'



const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-8 lg:gap-16">
      <img src={assets.about_img} alt="About Us" className="w-full md:w-1/2 lg:w-[450px] mx-auto md:mx-0" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laudantium deleniti eveniet minima hic alias ad quam autem obcaecati incidunt ullam iusto rerum magnam odit ex aspernatur ipsam, illo nemo.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo non doloribus adipisci itaque officia, aspernatur, necessitatibus illo qui ad corporis officiis, eos soluta ab quibusdam? Accusamus adipisci suscipit nemo dolorum.</p>
          <b className='text-gray-800 underline'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consectetur id ex inventore sunt. Quo similique aliquam quam corporis beatae.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, a!</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, a!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Best Customer Support:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, a!</p>
        </div>
      </div>

      <NewsLetterBox />

    </div>
  )
}

export default About
