import {
    DeleteOutlined, EditOutlined
} from '@ant-design/icons';
import { Card } from "antd";
import { Link } from 'react-router-dom';
import { ROUTHING_PATHS } from '../../common/constants/routing.constants';

const { Meta } = Card;

const AdminProductCard = ({
    product,
    onDeleteProduct
}) => {
    const { title, description, images, slug } = product;

    return (
        <Card
            cover={
                <img
                    alt={title}
                    src={images && images.length ? images[0].url : ''}
                    style={{ height: '300px' }}
                />
            }
            style={{ minHeight: '300px', minWidth: '300px', objectFit: 'cover', }}
            actions={[
                <DeleteOutlined key="delete" className="text-danger" onClick={() => onDeleteProduct(product)} />,
                <Link to={`/${ROUTHING_PATHS.admin}/${ROUTHING_PATHS.product}/${slug}`}>
                    <EditOutlined key="edit" className='text-warning' />
                </Link>
            ]}
            bordered={true}
        >
            <Meta title={title} description={description && description.length > 20 ? description.substring(0, 20) + '...' : description} />
        </Card >
    );
};

export default AdminProductCard;