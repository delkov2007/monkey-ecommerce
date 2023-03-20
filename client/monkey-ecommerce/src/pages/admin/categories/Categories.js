import {
    DeleteOutlined, EditOutlined
} from '@ant-design/icons';
import { Modal } from 'antd';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTHING_PATHS } from '../../../common/constants/routing.constants';
import LocalFilter from '../../../components/LocalFilter';
import { deleteCategory, getCategoryList } from '../../../functions/category';
import CategoryCreate from "./CategoryCreate";

const {
    admin,
    category
} = ROUTHING_PATHS;

const Categories = () => {
    const user = useSelector(state => ({ ...state.user }));
    const [categories, setCategories] = useState([]);
    const [createdCategory, setCreatedCategory] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});

    const [search, setSearch] = useState('');

    const loadCategories = () => {
        getCategoryList(user.token)
            .then(res => {
                setCategories(res.data);
            });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadCategories();
    }, [createdCategory]);

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

    const filtered = (search) => (category) => category.name.toLowerCase().includes(search);

    return (
        <div className="container mt-3">
            <CategoryCreate
                setState={setCreatedCategory}
            />

            <LocalFilter
                search={search}
                setSearch={setSearch}
            />
            <hr />
            {
                categories && categories?.filter(filtered(search)).map(c => (
                    <div className='d-flex justify-content-between alert alert-secondary' key={c._id}>
                        <div>
                            {c.name}
                        </div>
                        <div>
                            <span className="btn btn-sm float-right" onClick={() => onDeleteCategory(c)}>
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/${admin}/${category}/${c.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
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