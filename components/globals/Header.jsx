import Image from 'next/image';
import LiftedWPBanner from '../../public/images/site-banner.jpg';

const profile = {
  name: 'Junior Teudjio',
  role: 'CEO & Tech-Lead',
  companyURL: 'https://lifted.site',
  companyName: 'lifted.site',
  email: 'junior@lifted.site',
  message:
    "Hey there, If you ever need my services on a similar project, I'd love to help!",
  callToActionURL: 'https://lifted.site/contact',
  callToActionMessage: 'Book a Call With Me',
  coverImage: LiftedWPBanner,
};

export default function Header() {
  return (
    <div>
      <div className='mb-8'>
        <div className='relative h-60 w-full lg:h-64'>
          <Image
            className='object-cover scale-105'
            src={profile.coverImage}
            layout='fill'
            alt={`services offered by ${profile.companyName} - Headless Commerce & CMS Experts`}
          />
        </div>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
            <div className='mt-4 sm:mt-12 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
