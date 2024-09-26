import { assets } from "../../assets/frontend_assets/assets"

const Contact = () => {
    document.title = `Contact`
    return (
        <div>
            <div className="text-center text-2xl pt-10 border-t">
                <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">CONTACT <span className="text-gray-700 font-medium">US</span></p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
            </div>
            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
                <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="contact" />
                <div className="flex flex-col justify-center items-start gap-6">
                    <p className="font-semibold text-xl text-gray-600">Our Store</p>
                    <p className=" text-gray-500">Cite Koraichi <br /> Reghaia, Alger Algeria</p>
                    <p className=" text-gray-500">Tel: 0554265298 <br /> Email: yakerdev@gmail.com</p>
                    <p className="font-semibold text-xl text-gray-600">Careers at JKR STORE</p>
                    <p className=" text-gray-500">Learn more about our teams and job openings.</p>
                    <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
                </div>

            </div>
        </div>
    )

}

export default Contact