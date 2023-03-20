import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTHING_PATHS } from "../../../common/constants/routing.constants";
import { getCategory, updateCategory } from "../../../functions/category";

const {
    admin,
    category
} = ROUTHING_PATHS;

const CategoryUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => ({ ...state.user }));
    const [categoryName, setCategoryName] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const getCategoryBySlug = () => {
        getCategory(params.slug, user.token)
            .then(res => {
                setCategoryName(res.data.name);
            });
    };

    useEffect(() => {
        getCategoryBySlug();
    }, []);

    useEffect(() => {
        if (categoryName.length >= 2 && categoryName.length <= 50) {
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
    }, [categoryName]);

    const onCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const onCategoryFormSubmit = async (e) => {
        e.preventDefault();
        //
        setIsLoading(true);
        const payload = {
            name: categoryName
        };
        await updateCategory(params.slug, user.token, payload)
            .then(res => {
                toast.success('Category updated successfully');
                setCategoryName('');
                navigate(`/${admin}/${category}`);
            })
            .catch(err => {
                console.log(err);
                toast.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="container mt-3">
            <h4>Update Category</h4>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category name"
                        autoFocus
                        required
                        value={categoryName}
                        onChange={onCategoryNameChange}
                    />
                    <Button
                        type="primary"
                        className="mt-3 w-100"
                        size="large"
                        onClick={onCategoryFormSubmit}
                        disabled={isDisabled}
                        loading={isLoading}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CategoryUpdate;