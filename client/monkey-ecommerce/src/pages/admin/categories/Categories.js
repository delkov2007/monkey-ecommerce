import {
    DeleteOutlined, EditOutlined
} from '@ant-design/icons';
import { Modal } from 'antd';
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteCategory, getCategoryList } from '../../../functions/category';
import CategoryCreate from "./CategoryCreate";

const Categories = () => {
    const user = useSelector(state => ({ ...state.user }));
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});

    const loadCategories = useCallback(() => {
        getCategoryList(user.token)
            .then(res => {
                setCategories(res.data);
            });
    }, [user]);

    const onDeleteCategory = (c) => {
        setOpenModal(true);
        setSelectedCategory(c);
    };

    const onDeleteCancel = () => {
        setOpenModal(false);
    };

    const onOkDeleteClick = () => {
        setLoading(true);
        const { name, slug } = selectedCategory;
        deleteCategory(slug, user.token)
            .then(res => {
                toast.success(`${name} deleted successfully`);
                loadCategories();
            })
            .catch(err => {
                toast.err(`Error deleting category ${name}`);
            })
            .finally(() => {
                setSelectedCategory({});
                setOpenModal(false);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        !!category && loadCategories();
    }, [category, loadCategories]);

    return (
        <div className="container mt-3">
            <CategoryCreate
                setState={setCategory}
            />
            <hr />
            {
                categories && categories?.map(c => (
                    <div className='d-flex justify-content-between alert alert-secondary' key={c._id}>
                        <div>
                            {c.name}
                        </div>
                        <div>
                            <span className="btn btn-sm float-right" onClick={() => onDeleteCategory(c)}>
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <span className="btn btn-sm float-right">
                                <EditOutlined className="text-warning" />
                            </span>
                        </div>
                    </div>
                ))
            }
            <Modal
                title="Delete Category"
                open={openModal}
                onOk={onOkDeleteClick}
                confirmLoading={loading}
                onCancel={onDeleteCancel}
            >
                <p>{`Are you sure that you want to delete category "${selectedCategory.name}"`}</p>
            </Modal>
        </div >
    );
};

export default Categories;