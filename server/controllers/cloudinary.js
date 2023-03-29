const cloudinary = require('cloudinary');

//config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.upload = async (req, res) => {
    let result = await cloudinary.v2.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    });

    res.json({
        public_id: result.public_id,
        url: result.secure_url
    });
};

exports.remove = (req, res) => {
    let image_id = req.body.public_id;
    cloudinary.v2.uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({ err: err });
        res.status(204).json();
    });
};