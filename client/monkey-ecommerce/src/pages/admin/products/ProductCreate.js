import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { brands, categories, colors, shipping } from "../../../common/constants/nomenclature.constants";
import { getCategoryList, getCategorySubs } from "../../../functions/category";
import { createProduct } from "../../../functions/product";
import { getSubList } from "../../../functions/sub";

const initialFormValues = {
    title: '',
    description: '',
    price: 0,
    category: '',
    subs: [],
    shipping: '',
    quantity: 0,
    images: [],
    color: '',
    brand: ''
};

const ProductCreate = () => {
    const baseCategoryList = [...categories];
    const user = useSelector(state => ({ ...state.user }));
    const [formValues, setFormValues] = useState(initialFormValues);
    const [categoryList, setCategoryList] = useState([]);
    const [subList, setSubList] = useState([]);

    useEffect(() => {
        getCategoryList(user.token)
            .then((cat) => {
                baseCategoryList
                    .push(...cat.data.map(c => ({ value: c._id, label: c.name, slug: c.slug })));
                setCategoryList(baseCategoryList);
            });

    }, [user.token]);

    useEffect(() => {
        setFormValues({ ...formValues, ['subs']: [...initialFormValues.subs] });
        const category = categoryList.find(c => c.value === formValues.category);
        if (!category) return;
        getCategorySubs(category.slug, user.token)
            .then(res => {
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
        const subs = formValues.subs;
        setFormValues({ ...formValues, ['subs']: [...subs, value] });
    };

    const onDeselectSubcategories = (value) => {
        const subs = formValues.subs;
        setFormValues({ ...formValues, ['subs']: subs.filter(s => s !== value) });
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

    const onCreateProduct = (e) => {
        e.preventDefault();
        console.log(formValues);
        createProduct(user.token, formValues)
            .then(res => {
                toast.success(`Product '${res.data.title}' created successfully`);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.response.data.err);
            });
    };

    return (
        <div className="container mt-3">
            <h4 className="pt-3">Create Product</h4>
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
                        value={formValues.subs}
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
                        defaultValue={formValues.shipping}
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
                        defaultValue={formValues.color}
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
                        defaultValue={formValues.brand}
                        onSelect={onSelectBrand}
                        options={brands}
                    />
                </div>

                <Button
                    type="primary"
                    className="mt-3 w-100"
                    size="large"
                    onClick={onCreateProduct}
                >
                    Create Product
                </Button>

            </form>
        </div>
    );
};

export default ProductCreate;