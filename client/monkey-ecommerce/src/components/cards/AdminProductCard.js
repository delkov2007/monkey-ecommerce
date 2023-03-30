import {
    DeleteOutlined, EditOutlined
} from '@ant-design/icons';
import { Card } from "antd";

const { Meta } = Card;

const AdminProductCard = ({
    product
}) => {
    const { title, description, images } = product;

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
                <DeleteOutlined key="delete" className="text-danger" />,
                <EditOutlined key="edit" className='text-warning' />,
            ]}
            bordered={true}
        >
            <Meta title={title} description={description && description.length > 20 ? description.substring(0, 20) + '...' : description} />
        </Card >
    );
};

export default AdminProductCard;