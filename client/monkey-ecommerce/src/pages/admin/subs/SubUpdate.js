import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTHING_PATHS } from "../../../common/constants/routing.constants";
import { getCategoryList } from "../../../functions/category";
import { getSub, updateSub } from "../../../functions/sub";

const {
    admin,
    subCategory
} = ROUTHING_PATHS;

const SubUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => ({ ...state.user }));
    const [subName, setSubName] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    const getSubBySlug = () => {
        getSub(params.slug, user.token)
            .then(res => {
                setSubName(res.data.name);
                setSelectedCategoryId(res.data.parent);
            });
    };

    const getCategories = () => {
        getCategoryList(user.token)
            .then(res => {
                setCategories(res.data);
            });
    };

    useEffect(() => {
        getSubBySlug();
        getCategories();
    }, []);

    useEffect(() => {
        if (
            (subName.length >= 2 && subName.length <= 50) && selectedCategoryId
        ) {
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
    }, [subName, selectedCategoryId]);

    const onSubNameChange = (e) => {
        setSubName(e.target.value);
    };

    const onSelectCategoryChange = (e) => {
        e.preventDefault();
        setSelectedCategoryId(e.target.value);
    };

    const onSubFormSubmit = async (e) => {
        e.preventDefault();
        //
        setIsLoading(true);
        const payload = {
            name: subName,
            parent: selectedCategoryId
        };
        await updateSub(params.slug, user.token, payload)
            .then(res => {
                toast.success('Category updated successfully');
                setSubName('');
                setSelectedCategoryId('');
                navigate(`/${admin}/${subCategory}`);
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
            <h4>Update Sub Category</h4>
            <form>
                <div className="form-group">
                    <div className="mb-2">
                        <label >Select Category</label>
                        <select
                            name="category"
                            className="form-control"
                            value={selectedCategoryId}
                            onChange={onSelectCategoryChange}
                        >
                            <option value={''}>--Select Category--</option>
                            {
                                categories && categories.map(s => (
                                    <option key={s._id} value={s._id}>{s.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label>Sub Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Category name"
                            autoFocus
                            required
                            value={subName}
                            onChange={onSubNameChange}
                        />
                    </div>

                    <Button
                        type="primary"
                        className="mt-3 w-100"
                        size="large"
                        onClick={onSubFormSubmit}
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

export default SubUpdate;