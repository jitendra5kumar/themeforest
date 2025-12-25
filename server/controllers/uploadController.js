const cloudinary = require('../utils/cloudinary');

const uploadImage = async (req, res) => {
  try {
    const { file, url, folder = 'uploads' } = req.body || {};

    if (!file && !url) {
      return res.status(400).json({ message: 'Provide a file (base64/data URI) or url' });
    }

    const uploadResult = await cloudinary.uploader.upload(file || url, {
      folder,
      resource_type: 'image',
    });

    res.json({ url: uploadResult.secure_url, publicId: uploadResult.public_id });
  } catch (error) {
    console.error('Upload error', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};

module.exports = { uploadImage };
