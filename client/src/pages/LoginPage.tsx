import LoginForm from "../components/Auth/LoginForm"


const LoginPage = () => {
  return (
    <section id= "login" className='min-h-screen flex'>

        {/* Left side section */}
        <div
            className='hidden md:block w-full md:max-w-1/2 bg-bg_color relative'
        >
            
            <h1 
                className='font-family-sans text-text_color_primary font-extrabold text-4xl absolute top-[283px] left-1/2 transform -translate-x-1/2'
            >
                Welcome
            </h1>
        </div>

        {/* right side section */}
        <div 
            className='w-full md:max-w-1/2 flex justify-center items-center'
        >
            <LoginForm />
        </div>
    </section>
  )
}

export default LoginPage