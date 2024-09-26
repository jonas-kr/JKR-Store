import { useState, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom';
import ProductCard from "../../components/Product"
import { getProducts } from "../../controllers/productController"
import { categories, subCategories } from '../../assets/admin_assets/assets'
import { useCart } from "../../context/CartContext"

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const collections = () => {
  const { search, setSearch } = useCart()
  const query = useQuery();
  const title = query.get('title') || "";

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [rlvnt, setRlvnt] = useState(true)
  const [lth, setLth] = useState(false)
  const [htl, setHtl] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const [pname, setPname] = useState("")

  document.title = `Collections`

  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({
        category, subCategory
        , page: 1, limit: 12, title, bestSeller: "", lth, rlvnt, htl
      })
      setProducts(res.products)
    }
    getData()
  }, [category, subCategory, lth, rlvnt, htl, title])

  return (
    <main className="font-['Cairo']">
      {search && (<div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <Link to={`/collections/?title=${pname}`}>
            <img className="w-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANlSURBVHgBzVi9ctpAEF6JxiWdx5WVNxAeF3SWu3R2myq8gSnTIbqUdpnOrjKpEspUyLVt0CPIFXShTIYB8i3eE8dxQsKAhm9GoPvb+7R7t7d7Dm2I8/PzYDqdXjmO489mMw9VntacoD5Bfey6buf5+TmiLeAU6eT7fhWTNfF6g6dKxZHgifAx7TiOE9oQzp5I2dDu9XrhJgMyyYGYB2JdWjYbwWQjmO4e2ojwH/f7/VdtjI+/U4y7Rr8A7Z4hNsG4y6JadDKI+UKsqpGK8BeCzCMVBMQ0QLBlkBwJwThvvJNHjDWFJ4SsO3onILIJmS1afGwhgo4hhE3Z14jxzrt8z2K2EPSgwa6mRSZYWyfbXSosa2xnxBgsh+WxXKnizdblTUd55M7OzkKSxS+m3BkxkyBeR1LFlrrJ6l/hH1H5T1UJAV8g6DftAcPhcHR8fPwP832UKh/lb6j/a/ada04WqyKWbLP4iwDyb2X3M6pZ2lNmDWhBLqQSgHnaWrFp6+PIWdmVAQn82AcqCVjnf0g2oLiWSG93+RBXBayDiMrFvXqBaa/MRpejC1UA0V9UIjB3etrAar7Z7krYo/BKJWIymaQnhOUcnm+ItLLIebdLGH7UM9tdOmAcPLlEFWq12imVCIn/FBKz3dUOYuuO2ScqlYqnzZ2Y7exK0k0AXxNQiQAh3ceubEZ2wh2t3KByEagXEF3xsa4cGSqEqWIZBFQCcHQ1aBGiJbbwX+3WW1XBMT+Vg5Y2Z2TrMCcH03KINJKOAb6qSXuEyPdUmfNaW795sMmB3snJyREt1kAdAeAPDgxpx5DA9jtej4QYJ08dW9/UCbP2LPG9RzsmZuYpINbO6p+SQ6eRJb7fGUFbki7zUS45ITjPyA2C/W3XII+XlNNbmtx1G+vGFc746e0GKXx5eXmgguAoG9pp8dWEqpPrDF1u5h3K2rsSIwlOSeLhe5IOPiB5enpKPXu9XvfG4zFfjV3Qm0NfyklVLozXzxgb5hHMvQIDyZYhaGNIHsy+9I7XdobcFYKVPMFwJ49wKw9sCkxQNUxShNRXvH7iPFjPTUXu3K9KVQB35gwGg0j1KXR5qANh1QUEXksE4+lmF1fEazPms7LIjdQ6DW5Mbh/IIphr1jKQZeKDIMewETwYcgydIJ+5/wFYW/TpXDoMoAAAAABJRU5ErkJggg==" alt="search" />
          </Link>
          <input className="flex-1 border-none outline-none bg-inherit text-sm" type="text" placeholder="البحث" value={pname} onChange={(e) => { setPname(e.target.value) }} />
        </div>
        <img className="inline w-3 cursor-pointer" onClick={() => { setSearch(false) }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFkSURBVHgBpdW/ToNAHAfwO64QR8Zu4ubIn8VRRyd1dJIESBjxCazvAQm+Qd9ANjeY3Tp2NCwMBPD3S0BJS487+k2a3pVfP/lxHEAJJAgCs+s6PY7jjJyRKIr0siwfNU3LGKJt2xbwu+s4Ds3zPCMLEoahUVXVF6XUBc9UoNPL4SCM33zf3xDJIFrX9ScMjd7RGXT4bdv2FczNvu5WpvMJdAcd3zOcFEWxXYKfQO/SNN2xoUgW56E4Z+NiUXwOPYJFcBEUQ8mJeJ6XwtfLXyGl76vVKhVBufAUDvmBjz6HYhgPnliWCxEUo5CZqKq66Tv9/5OibHnobMejC7U+OHQzt8+ZAGrgHE8fLmAGw+u+hLvPFVEU1zRJkieYfgx1vGcLE0WHNRW9iZgMOkQEZ7KoKM6WoCI4XYqOc3iHgvGqNE2jn4NiYLe4ZLRbYFs+4Btkb1mWDpM9oM+y6BBcFnRguMYH1i/jdovSfDk2aAAAAABJRU5ErkJggg==" alt="search" />
      </div>)}
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-6 md:pt-10 border-t'>
        <div className="min-w-60">
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2"
            onClick={() => { setIsOpened((prev) => !prev) }}>FILTERS
            <img className="h-3 sm:hidden " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAYAAACJ8xqgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEJwAABCcASbNOjQAAAGASURBVEhLrZa7cYQwFEX5RiRbwpawLoEEhtAVeN2BOzCuxHYFJMzwSWjBJVCCIzLA74KQWRAgBGcG0GOGw9WHERrIsizM8/y9Kw6iJ0lyN03zk9Wh53kfrK2EQbywNgjxAtZWwqiq6pmuP32paUh7RKrjFEXRxXGcgpo31KCu69cgCL5YKU0nBGdJuRBQV6/UZUiv/Z390gchEEnbtn3yfZ+P8xoGu3IoTUmpXGqW/Z1OWNBa5UOxxizhwDRp0zS/uq67W0kXhUBFuioEe6WbQiCSYqIw3qjHzCZFxHSi6HO90FHgRajHSCUcmCallCWldcdJdwnBlnS3EKxJlYQgjuObZVkFxhP1IJWaFBG2bWu0fFj1j5IQXSZZRMdDOqUunzoppy4bGRmQEk5lJFr8njeFe2RgVbhXBhaFKjIgFKrKwEw4lQGaUbVNCnuzQHaXlQEuHG30U9k3K6Xouiz6a1CRAf1MGTDOlAGDlgR/mDaityMyDi2VME3TE36JNe0PEvQ33QXCa5oAAAAASUVORK5CYII=" alt="filter" />
          </p>
          {
            isOpened && <div>
              <div className="border border-gray-300 px-5 py-3 mt-6 sm:hidden">
                <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                <div className="flex flex-col gap-2 font-light text-gray-700">
                  <select className="p-2 rounded-md" onChange={(e) => { setCategory(e.target.value) }}>
                    <option value="">All Categories</option>
                    {categories && categories.map((c) => (
                      <option value={c} key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="border border-gray-300 px-5 py-3 my-5 sm:hidden">
                <p className="mb-3 text-sm font-medium">TYPE</p>
                <div className="flex flex-col gap-2 font-light text-gray-700">
                  <select className="p-2 rounded-md" onChange={(e) => { setSubCategory(e.target.value) }}>
                    <option value="">All Subcategories</option>
                    {subCategories && subCategories.map((s) => (
                      <option value={s} key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          }
          <div className="border border-gray-300 px-5 py-3 mt-6 hidden sm:block text-right">
            <p className="mb-3 text-sm font-medium">التصنيفات</p>
            <div className="flex flex-col gap-2 font-light text-gray-700">
              <select className="p-2 rounded-md" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                <option value="">All Categories</option>
                {categories && categories.map((c) => (
                  <option value={c} key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="border border-gray-300 px-5 py-3 my-5 hidden sm:block text-right">
            <p className="mb-3 text-sm font-medium">النوع</p>
            <div className="flex flex-col gap-2 font-light text-gray-700">
              <select className="p-2 rounded-md" value={subCategory} onChange={(e) => { setSubCategory(e.target.value) }}>
                <option value="">All Subcategories</option>
                {subCategories && subCategories.map((s) => (
                  <option value={s} key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <div className="flex justify-between flex-row-reverse text-base sm:text-2xl mb-4">
            <div className="inline-flex flex-row-reverse gap-2 items-center mb-3">
              <p className="text-gray-500">
              جميع <span className="text-gray-700 font-medium">المجموعات</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700">
              </p>
            </div>
            <select className="border-2 border-gray-300 text-sm px-2"
              onChange={(e) => {
                const selectedOption = e.target.value;
                if (selectedOption === "Relevant") {
                  setRlvnt(true);
                  setHtl(false);
                  setLth(false);
                } else if (selectedOption === "Low to High") {
                  setRlvnt(false);
                  setHtl(false);
                  setLth(true);
                } else if (selectedOption === "High to Low") {
                  setRlvnt(false);
                  setHtl(true);
                  setLth(false);
                }
              }}>
              <option value="Relevant">Sort by: Relavent</option>
              <option value="Low to High">Sort by: Low to High</option>
              <option value="High to Low">Sort by: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 font-sans">
            {products && products.map((p) => (<ProductCard props={p} key={p.id} />))}
          </div>
        </div>
      </div>
    </main>

  )
}

export default collections