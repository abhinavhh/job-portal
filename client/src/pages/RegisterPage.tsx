
import SignUpForm from "../components/Auth/SIgnUpForm"


const RegisterPage = () => {
  return (
    <section id= "login" className='min-h-screen flex'>

        {/* Left side section */}
        <div
            className='hidden lg:block w-full lg:max-w-1/2 bg-bg_color relative'
        >
            
            <h1 
                className='font-family-sans text-text_color_primary font-extrabold text-4xl absolute top-[200px] left-1/2 transform -translate-x-1/2'
            >
                Welcome
            </h1>
        </div>

        {/* right side section */}
        <div 
            className='w-full flex justify-center items-center'
        >
            <SignUpForm />
        </div>
    </section>
  )
}

export default RegisterPage;