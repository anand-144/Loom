import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Info and Image Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Contact Image */}
        <img src={assets.contact_img} alt="Contact us" className="w-full md:max-w-[480px]" />

        {/* Contact Details */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-500">Our Store</p>
          <p className="text-gray-600">1234 Forever St, Example City, EX 12345</p>
          <p className="text-gray-600">
            Tel: (455) 4849-384-334 <br /> Email: admin@forever.com
          </p>
          <p className="font-semibold text-xl text-gray-500">Careers at Forever</p>
          <p className="text-gray-500">Learn More About Our Team</p>
          <Link to='/Team'>
            <button className="border border-black px-8 py-4 text-md hover:bg-black hover:text-white transition-all duration-500">
              Team
            </button>
          </Link>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
