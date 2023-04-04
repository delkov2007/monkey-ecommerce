import { Button, Input, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { brands, categories, colors, shipping } from "../../../common/constants/nomenclature.constants";
import { ROUTHING_PATHS } from "../../../common/constants/routing.constants";
import FileUpload from "../../../components/file-upload/FileUpload";
import { getCategoryList, getCategorySubs } from "../../../functions/category";
import { getProduct, updateProduct } from "../../../functions/product";

const { admin, products } = ROUTHING_PATHS;

const initialFormValues = {
    title: '',
    description: '',
    price: 0,
    category: '',
    sub: [],
    shipping: '',
    quantity: 0,
    images: [],
    color: '',
    brand: ''
};

const ProductUpdate = () => {
    const user = useSelector(state => ({ ...state.user }));
    const params = useParams();
    const navigate = useNavigate();
    const baseCategoryList = [...categories];
    const [formValues, setFormValues] = useState(initialFormValues);
    const [categoryList, setCategoryList] = useState([]);
    const [subList, setSubList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        setLoading(true);

        getProduct(params.slug, user.token)
            .then(res => {
                const product = res.data;
                const productValues = {
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    category: product.category._id,
                    sub: product.sub?.map(s => s._id) || [],
                    shipping: product.shipping,
                    quantity: product.quantity,
                    images: product.images,
                    color: product.color,
                    brand: product.brand
                };
                setFormValues(productValues);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });

        getCategoryList(user.token)
            .then((cat) => {
                baseCategoryList
                    .push(...cat.data.map(c => ({ value: c._id, label: c.name, slug: c.slug })));
                setCategoryList(baseCategoryList);
            });
    }, [params.slug, user.token]);

    useEffect(() => {
        const category = categoryList.find(c => c.value === formValues.category);
        if (!category) return;
        getCategorySubs(category.slug, user.token)
            .then(res => {
                if (firstLoad) {
                    setFirstLoad(false);
                } else {
                    setFormValues({ ...formValues, ['sub']: [...initialFormValues.sub] });
                }
                setSubList(res.data.map(s => ({ value: s._id, label: s.name })));
            })
            .catch(err => {
                toast.error(err.message);
            });
    }, [formValues.category]);

    const onFormChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const onSelectCategory = (value) => {
        setFormValues({ ...formValues, ['category']: value });
    };

    const onSelectSubcategories = (value) => {
        const sub = formValues.sub;
        setFormValues({ ...formValues, ['sub']: [...sub, value] });
    };

    const onDeselectSubcategories = (value) => {
        const sub = formValues.sub;
        setFormValues({ ...formValues, ['sub']: sub.filter(s => s !== value) });
    };

    const onSelectShipping = (value) => {
        setFormValues({ ...formValues, ['shipping']: value });
    };

    const onSelectColor = (value) => {
        setFormValues({ ...formValues, ['color']: value });
    };

    const onSelectBrand = (value) => {
        setFormValues({ ...formValues, ['brand']: value });
    };

    const onUpdateProduct = (e) => {
        e.preventDefault();
        console.log(formValues);
        updateProduct(params.slug, user.token, formValues)
            .then(res => {
                toast.success(`Product '${res.data.title}' updated successfully`);
                navigate(`/${admin}/${products}`);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.response.data.err);
            });
    };


    return (
        <div className="container mt-3">
            <h4 className="pt-3">Update Product {loading && <Spin size="default" />} </h4>
            <FileUpload
                formValues={formValues}
                setFormValues={setFormValues}
                setLoading={setLoading}
            />
            <form>
                <div className="form-group">
                    <label htmlFor="productTitle">Title</label>
                    <Input
                        id="productTitle"
                        name="title"
                        size="large"
                        type="text"
                        showCount
                        maxLength={50}
                        placeholder="Title"
                        className="w-100"
                        value={formValues.title}
                        onChange={onFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productDescription">Description</label>
                    <TextArea
                        id="productDescription"
                        name="description"
                        rows={4}
                        className="form-control"
                        placeholder="Description"
                        value={formValues.description}
                        onChange={onFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice">Price</label>
                    <Input
                        id="productPrice"
                        name="price"
                        size="large"
                        type="number"
                        placeholder="Price"
                        className="w-100"
                        value={formValues.price}
                        onChange={onFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productCategories">Category</label>
                    <Select
                        id="productCategories"
                        name="category"
                        size="large"
                        placeholder="--Please Select--"
                        className="w-100"
                        value={formValues.category}
                        onSelect={onSelectCategory}
                        options={categoryList}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productSubCategories">Sub Categories</label>
                    <Select
                        id="productSubCategories"
                        name="subs"
                        mode="multiple"
                        size="large"
                        placeholder="--Please Select--"
                        className="w-100"
                        value={formValues.sub}
                        onSelect={onSelectSubcategories}
                        onDeselect={onDeselectSubcategories}
                        options={subList}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productShipping">Shipping</label>
                    <Select
                        id="productShipping"
                        name="shipping"
                        size="large"
                        className="w-100"
                        value={formValues.shipping}
                        onSelect={onSelectShipping}
                        options={shipping}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productQuantity">Quantity</label>
                    <Input
                        id="productQuantity"
                        name="quantity"
                        size="large"
                        type="number"
                        placeholder="Quantity"
                        className="w-100"
                        value={formValues.quantity}
                        onChange={onFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productColor">Color</label>
                    <Select
                        id="productColor"
                        name="color"
                        size="large"
                        className="w-100"
                        options={colors}
                        value={formValues.color}
                        onSelect={onSelectColor}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productBrand">Brand</label>
                    <Select
                        id="productBrand"
                        name="brand"
                        size="large"
                        className="w-100"
                        value={formValues.brand}
                        onSelect={onSelectBrand}
                        options={brands}
                    />
                </div>

                <Button
                    type="primary"
                    className="mt-3 w-100"
                    size="large"
                    onClick={onUpdateProduct}
                >
                    Update Product
                </Button>

            </form>
        </div>
    );
};

export default ProductUpdate;