import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategoryList } from "../../../functions/category";
import { createSub } from "../../../functions/sub";

const SubCreate = ({
    setState
}) => {

    const user = useSelector(state => ({ ...state.user }));
    const [subName, setSubName] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        getCategoryList(user.token)
            .then(res => {
                setCategories(res.data);
            });
    }, []);

    useEffect(() => {
        if (
            (subName.length >= 2 && subName.length <= 50) && !!selectedCategoryId
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
        await createSub(user.token, payload)
            .then(res => {
                setSubName('');
                setSelectedCategoryId(0);
                toast.success('Sub category created successfully');
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
            <h4>Create Sub Category</h4>
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
                                categories && categories.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label>Sub Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Sub category name"
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
        </>
    );
};

export default SubCreate;