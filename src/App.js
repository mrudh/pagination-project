import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if(data && data.products) {
      setProducts(data.products);
    }
    
  };
console.log(products);

  useEffect (() => {
    fetchProducts();
  },[]);

  const selectedPageHandler = (selectPage) => {
    if(selectPage >= 1 && selectPage <= products.length/10 && selectPage !== page){
      setPage(selectPage);
    }
  }

  return (
    <div>
      {products.length > 0  && (<div className='products'>
        {
          products.slice(page*10-10, page*10).map((prod) => {
            return (
              <span className='products__single' key={prod.id}>
                <img src={prod.thumbnail} alt={prod.name}/>
                <span>{prod.title}</span>
              </span>
            );
          })
        }
        </div>)}
        {
          products.length > 0 && <div className='pagination'>
            <span onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? '' : 'pagination__disable'}>◀</span>
            {
              [...Array(products.length/10)].map((_,i) => {
                return <span key={i} 
                onClick={() => selectedPageHandler(i+1)}
                className={page === i+1 ? 'pagination__selected' : ''}>{i+1}</span>
              })
            }
            <span onClick={() => selectedPageHandler(page+1)}
            className={page<products.length/10 ? '' : 'pagination__disable'}>▶</span>
          </div>
        }
    </div>
  );
}

export default App;
