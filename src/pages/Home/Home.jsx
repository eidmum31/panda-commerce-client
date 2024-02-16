import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';

const Home = () => {
    const [products,setProducts]=useState(null);
    
    useEffect(()=>{
        const disconnect=()=>fetch('http://127.0.0.1:3000/products').then(res=>res.json()).then(data=>setProducts(data))
        return ()=>disconnect();
    },[])
    return (
        <div style={{margin:"0 auto"}} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mx-auto'>
           {
            products&&products.map(product=><Card product={product} key={product._id}></Card>)
           }
        </div>
    );
};

export default Home;