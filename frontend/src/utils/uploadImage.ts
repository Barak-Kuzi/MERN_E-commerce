const URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mern_e-commerce');

    const response = await fetch(URL, {
        method: 'POST',
        body: formData
    });

    const resData = await response.json();

    return resData;
}

export default uploadImage;