
const footerData = {
  message:
    "This is a sample app using nextjs and contentful",
};

export default function Footer() {
  return (
    <footer className='bg-white'>
      <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>

        <p className='mt-8 text-center  text-lg text-gray-600'>
          {footerData.message} <br />
        </p>
      </div>
    </footer>
  );
}
