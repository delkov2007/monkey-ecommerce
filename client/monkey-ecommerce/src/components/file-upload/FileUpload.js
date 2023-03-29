import { Avatar, Badge } from 'antd';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { remove, upload } from '../../functions/upload';

const FileUpload = ({
    formValues,
    setFormValues,
    setLoading,
}) => {
    const images = formValues.images;
    const { user } = useSelector((state) => ({ ...state }));

    const onImagesUpload = (e) => {
        let files = e.target.files;
        if (files && files.length > 0) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        upload(user.token, { image: uri })
                            .then(res => {
                                images.push(res.data);
                                setFormValues({ ...formValues, images: images });
                            })
                            .catch(err => {
                                console.log(err && err.message);
                            })
                            .finally(() => {
                                if (i === files.length - 1) setLoading(false);
                            });
                    },
                    'base64');
            }
        }
    };

    const onImageRemove = (id) => {
        setLoading(true);
        remove(user.token, { public_id: id })
            .finally(() => {
                setLoading(false);
            })
            .then(res => {
                // console.log(res);
                if (res.status !== 204) return;
                const { images } = formValues;
                const filteredImages = images.filter(i => i.public_id !== id);
                setFormValues({ ...formValues, images: filteredImages });
            })
            .catch(err => {
                console.log(err && err.message);
            });
    };

    return (
        <>
            <div className="d-flex justify-content-start gap-3 mt-3">
                {formValues.images && formValues.images.map((image) => (
                    <Badge
                        key={image.public_id}
                        count={'X'}
                        onClick={() => onImageRemove(image.public_id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Avatar
                            size={100}
                            src={image.url}
                            shape="square"
                            className="flex-item"
                        />
                    </Badge>
                ))}
            </div>
            <div className='pt-3 pb-3'>
                <label className='btn btn-secondary'>
                    <span>Choose files</span>
                    <input
                        type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={onImagesUpload}
                    />
                </label>
            </div>
        </>

    );
};

export default FileUpload;