import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import Spinner from "../../../components/Spinner";
import { getProductListByCount } from "../../../functions/product";

const Products = () => {
    const user = useStore(state => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        loadProducts(100);
    }, []);

    const loadProducts = (count) => {
        setLoading(true);
        getProductListByCount(user.token, count)
            .then(res => {
                setProducts(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err && err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container pt-3">
            <h4>All Products</h4>
            {
                loading ? (<Spinner />) : (
                    <div className="row mt-3">
                        {
                            products && products.length && products.map(product => (
                                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                                    <AdminProductCard key={product._id} product={product} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Products;