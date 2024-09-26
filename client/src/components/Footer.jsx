import { assets } from "../assets/frontend_assets/assets"

const Footer = () => {
  return (
    <>

      <div className="border-t pt-5 border-gray-400 flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-28 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32 sm:w-36" alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div><div><p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+213-0554265298</li>
            <li>yakerdev@gmail.com</li>
            <li className="cursor-pointer">
              <a href="https://www.instagram.com/younes.kezadri" target="_blank">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center font-['Cairo']">
        Jonaskr.dev.2024 جميع الحقوق محفوظة © @
        </p>
      </div>
    </>

  )
}

export default Footer
