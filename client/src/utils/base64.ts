function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string); // Cast to string
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export { convertToBase64 };
