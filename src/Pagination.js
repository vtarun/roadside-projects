import React, {useState, useEffect} from 'react'


const Button = function({children, ...props}) {
    return <button type="button" {...props}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-1 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{children}</button>
    
}
const Pagination = () => {
    const [pIndex, setPageIndex] = useState(1);
    const [products, setProducts] = useState([]);
    function handleCLick(index){
        console.log(index);
        setPageIndex(prev => prev+index);
        
    }
    const fetchData = async () => {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const responseData = await response.json();
        
        setProducts(responseData.products);
    }
    useEffect(() => {
        fetchData();
    },[]);

  return (
    <main>
      {
        products.length > 0 && 
        <div className='flex justify-start flex-wrap'>
            {
                products.slice((pIndex-1)*10, pIndex*10).map((product) => {
                    return (<span key={product.id}>
                        <span>
                            <img src={product.thumbnail} className='w-1/4' alt={product.title}/>
                        </span>
                        <span>{product.title}</span>
                    </span>)
                })
            }
        </div>
      }
      <div className="flex justify-center gap-1">
        <Button onClick={() => handleCLick(-1)} disabled={pIndex === 1}>Previous</Button>
        {products && products.length > 0 && 
            Array(products.length / 10).fill(0).map((_, index) => <div className={`min-w-6 text-center ${(pIndex === index+1) ? 'text-cyan-50 bg-black' : 'text-black bg-white cursor-pointer'}`} key={index+1}>
                <span onClick={() => setPageIndex(index+1)}>{index +1}</span>
            </div>)
        }
        <Button onClick={() => handleCLick(+1)} disabled={pIndex*10 === products.length}>Next</Button>
      </div>
    </main>
  )
}

export default Pagination
