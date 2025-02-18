
import MaxWidthWrapper from "./MaxWidthWrapper.tsx"

 

const Footer = () => {
  return (
    <footer className='bg-primary h-20 relative'>
      <MaxWidthWrapper>
        <div />

        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
          <div className='text-center md:text-left pb-2 md:pb-0'>
            <p className='text-sm text-white'>
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

     
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer