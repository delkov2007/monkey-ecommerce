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
import { deleteSub, getSubList } from '../../../functions/sub';
import SubCreate from './SubCreate';

const {
    admin,
    subCategory
} = ROUTHING_PATHS;

const Subs = () => {
    const user = useSelector(state => ({ ...state.user }));
    const [subs, setSubs] = useState([]);
    const [createdSub, setCreatedSub] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedSub, setSelectedSub] = useState({});

    const [search, setSearch] = useState('');

    const loadSubs = () => {
        getSubList(user.token)
            .then(res => {
                setSubs(res.data);
            });
    };

    useEffect(() => {
        loadSubs();
    }, []);

    useEffect(() => {
        createdSub && loadSubs();
    }, [createdSub]);

    const onDeleteSub = (s) => {
        setOpenModal(true);
        setSelectedSub(s);
    };

    const onDeleteCancel = () => {
        setOpenModal(false);
    };

    const onOkDeleteClick = () => {
        setLoading(true);
        const { name, slug } = selectedSub;
        deleteSub(slug, user.token)
            .then(res => {
                toast.success(`${name} deleted successfully`);
                loadSubs();
            })
            .catch(err => {
                toast.err(`Error deleting sub category ${name}`);
            })
            .finally(() => {
                setSelectedSub({});
                setOpenModal(false);
                setLoading(false);
            });
    };

    const filtered = (search) => (sub) => sub.name.toLowerCase().includes(search);

    return (
        <div className="container mt-3">
            <SubCreate
                setState={setCreatedSub}
            />

            <LocalFilter
                search={search}
                setSearch={setSearch}
            />
            <hr />
            {
                subs && subs?.filter(filtered(search)).map(s => (
                    <div className='d-flex justify-content-between alert alert-secondary' key={s._id}>
                        <div>
                            {s.name}
                        </div>
                        <div>
                            <span className="btn btn-sm float-right" onClick={() => onDeleteSub(s)}>
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/${admin}/${subCategory}/${s.slug}`}>
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
                <p>{`Are you sure that you want to delete sub category "${selectedSub.name}"`}</p>
            </Modal>
        </div >
    );
};

export default Subs;