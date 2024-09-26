import { useState } from "react"
import { assets, availableSizes, shoeSizes, categories, subCategories } from "../../assets/admin_assets/assets"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid'
import { storage } from "../../firebase"
import { addProduct } from "../../controllers/productController"

import { showErrorAlert } from '../../assets/ErrorHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"


const NewProduct = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [subCategory, setSubCategory] = useState(subCategories[0])
  const [basePrice, setBasePrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [pType, setPtype] = useState("Cloths")
  const [sizes, setSizes] = useState([])
  const [color, setColor] = useState("")
  const [colors, setColors] = useState([])
  const [bestSeller, setBestseller] = useState(true)
  const [images, setImages] = useState([null, null, null, null])

  const navigate = useNavigate()

  const handleSizeClick = (size) => {
    if (sizes.includes(size)) {
      // Remove size if it's already selected
      setSizes(sizes.filter((s) => s !== size));
    } else {
      // Add size if it's not selected
      setSizes([...sizes, size]);
    }
  };

  const uploadImage = async (img, index) => {
    if (!img) return alert("No image has been selected")
    const imgRef = ref(storage, `ecommerce/${img.name + v4()}`)
    uploadBytes(imgRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const updatedImages = [...images]
        updatedImages[index] = url
        setImages(updatedImages)
      })
    })
  };


  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      if (colors.length == 0) {
        throw Error("All fields are required")
      }
      const res = await addProduct(name, description, images, basePrice, salePrice,
        category, subCategory, sizes, bestSeller, colors)
      navigate('/admin/list')
    } catch (error) {
      showErrorAlert(error.message)
    }
  }

  return (
    <form className="flex flex-col w-full items-start gap-3 ">
      <ToastContainer />
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {images.map((img, index) => (
            <div className="flex gap-2">
              <label for={`image${index}`} className="flexCenter aspect-square overflow-hidden">
                <img className="w-20" src={img ? img : assets.upload_area} alt="upload" />
                <input type="file" id={`image${index}`} hidden onChange={(e) => { uploadImage(e.target.files[0], index) }} />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input className="w-full max-w-[500px] px-3 py-2 text-left" type="text" placeholder="Type here" required
          value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea className="w-full max-w-[500px] px-3 py-2 font-['Cairo']" type="text" placeholder="Write content here"
          value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select className="w-full px-3 py-2"
            value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select className="w-full px-3 py-2"
            value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            {subCategories.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <p className="mb-2">Product Base Price</p>
          <input className="w-full px-3 py-2 sm:w-[120px] text-left" type="Number" placeholder="25"
            value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
        </div>
        <div>
          <p className="mb-2">Product Sale Price</p>
          <input className="w-full px-3 py-2 sm:w-[120px] text-left" type="Number" placeholder="25"
            value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <select className="p-2 mb-4" onChange={(e) => {
          setPtype(e.target.value)
          setSizes([])
        }}>
          <option value="Cloths" selected>Cloths</option>
          <option value="Shoes">Shoes</option>
        </select>
        <div className="flex flex-wrap gap-3">
          {pType == "Cloths" ? <>
            {availableSizes.map((size) => (
              <div key={size}>
                <p
                  className={`px-3 py-1 cursor-pointer ${sizes.includes(size) ? "bg-blue-500 text-white" : "bg-slate-200"
                    }`}
                  onClick={() => handleSizeClick(size)} // Toggle selection on click
                >
                  {size}
                </p>
              </div>
            ))}</> : <>
            {shoeSizes.map((size) => (
              <div key={size}>
                <p
                  className={`px-3 py-1 cursor-pointer ${sizes.includes(size) ? "bg-blue-500 text-white" : "bg-slate-200"
                    }`}
                  onClick={() => handleSizeClick(size)} // Toggle selection on click
                >
                  {size}
                </p>
              </div>
            ))}</>}

        </div>
      </div>
      <div>
        <p className="mb-2">Product Colors</p>
        <input className="w-full px-3 py-2 sm:w-[120px] text-left" type="text" placeholder="Add color"
          value={color} onChange={(e) => setColor(e.target.value)} />
        <button className="p-2 bg-black text-white rounded-sm ml-1" type="button"
          onClick={() => {
            setColors([...colors, color])
            setColor("")
          }}>Add</button>
      </div>
      <div className="flex gap-2">
        {colors.map((c) => (
          <div
            key={c}>
            <p
              className={`px-3 py-1 cursor-pointer bg-slate-200`}
              onClick={() => {
                setColors(colors.filter(color => color !== c))
              }}
            >
              {c}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller"
          onChange={(e) => setBestseller(e.target.checked)} />
        <label className="cursor-pointer" for="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white"
        onClick={handleAddProduct}>ADD</button>
    </form>
  )
}

export default NewProduct