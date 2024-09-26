import { useState, useEffect } from "react"
import { assets } from "../../assets/frontend_assets/assets"
import Product from "../../components/Product"
import { getProducts } from "../../controllers/productController"

const Home = () => {
  const [latest, setLatest] = useState([])
  const [bestseller, setBestseller] = useState([])

  document.title = `Home`

  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({
        category: "", subCategory: "", page: 1, limit: 10, title: "", bestSeller: ""
        , lth: false, rlvnt: true, htl: false
      })
      const res1 = await getProducts({
        category: "", subCategory: "", page: 1, limit: 5, title: "", bestSeller: true
        , lth: false, rlvnt: true, htl: false
      })
      setLatest(res.products)
      setBestseller(res1.products)
    }
    getData()
  }, [])

  return (
    <section className="font-['Cairo']">
      <div className='flex flex-col sm:flex-row border border-gray-400'>
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141]">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              <p className=" font-medium text-sm md:text-base font-['Cairo']">أفضل مبيعاتنا</p>
            </div>
            <h1 className=" text-3xl sm:py-3 lg:text-5xl leading-relaxed">أحدث المنتجات</h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">تسوق الآن</p>
              <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p></div></div>
        </div>
        <img src={assets.home_img} alt="hero" width="1200" height="600" className='w-full sm:w-1/2' />
      </div>
      <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <div className="inline-flex flex-row-reverse gap-2 items-center mb-3">
            <p className="text-gray-500">أحدث <span className="text-gray-700 font-medium">المجموعات</span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            ارتدِ المستقبل، واحتضن الحاضر، واحترم الماضي بتصميماتنا الخالدة.</p>
        </div>
        {latest ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
         lg:grid-cols-5 gap-4 gap-y-6 transition-opacity ease-in duration-500 opacity-100 font-sans">
          {latest.map(p => (<Product props={p} key={p.id} />))}
        </div> : <div className="opacity-0"></div>}

      </div>
      <div className="my-20 sm:my-10">
        <div className="text-center py-8 text-3xl">
          <div className="inline-flex flex-row-reverse gap-2 items-center mb-3">
            <p className="text-gray-500">أفضل <span className="text-gray-700 font-medium">المبيعات</span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            اختياراتنا المفضلة، المفضلة لديك على الإطلاق - اكتشف القطع التي يتحدث عنها الجميع!</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 transition-opacity ease-in duration-500 opacity-100 font-sans">
          {bestseller && bestseller.map(p => (<Product props={p} key={p.id} />))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center mt-20 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
          <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="exchange" />
          <p className=" font-semibold">سياسة التبديل السهل</p>
          <p className=" text-gray-400">نحن نقدم سياسة تبادل خالية من المتاعب</p>
        </div>
        <div>
          <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="quality" />
          <p className=" font-semibold">سياسة الإرجاع خلال 7 أيام</p>
          <p className=" text-gray-400">نحن نقدم سياسة إرجاع مجانية لمدة 7 أيام</p>
        </div>
        <div>
          <img src={assets.support_img} className="w-12 m-auto mb-5" alt="support" />
          <p className=" font-semibold">أفضل دعم للعملاء</p>
          <p className=" text-gray-400"> نحن نقدم خدمة دعم العملاء على مدار 24/7</p>
        </div>
      </div>
    </section>
  )
}

export default Home