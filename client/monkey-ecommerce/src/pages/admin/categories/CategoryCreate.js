import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../../functions/category";

const CategoryCreate = ({
    setState
}) => {

    const user = useSelector(state => ({ ...state.user }));
    const [categoryName, setCategoryName] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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
        await createCategory(user.token, payload)
            .then(res => {
                setCategoryName('');
                toast.success('Category created successfully');
                if (!!setState) setState(!!res);
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
        <>
            <h4>Create Category</h4>
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
        </>
    );
};

export default CategoryCreate;