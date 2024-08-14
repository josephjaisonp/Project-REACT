import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useCart } from "./context";

function ProdutDetail(){
    const [data,setData]=useState<any>()
    const {id}=useParams()
    console.log(id);
    const {addToCart}=useCart() 

    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/products/${id}`).then((response)=>{
            setData(response.data)
        })
    },[])
    console.log(data);

    const handleAddToCart=()=>{
        addToCart({...data,quantity:1})
        
    }
    
    return(
        <>
        <div className="">
            <div className="flex">
                <div className="h-5">
                    <img src={data?.image} alt="" />
                </div>
                <div>
                    <h1><strong>${data?.price}</strong></h1>
                    <div>
                        <h1>{data?.title}</h1>
                    </div>
                    <div>
                        <h1><strong>{data?.description}</strong></h1>
                    </div>
                    <button onClick={handleAddToCart}
                     className="bg-blue-300 p-3 hover:bg-blue-500" >
                        Add to Cart
                    </button>
                </div>
            </div>
            
        </div>
        </>
    )

}
export default ProdutDetail;

