const imageToBase64 = async (image: File): Promise<string> => {
    const reader = new FileReader()
    reader.readAsDataURL(image)

    return await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    })
}

export default imageToBase64