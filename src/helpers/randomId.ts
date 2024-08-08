

const generateRandomId = () => {
    return `${generateRandomString(8)}-${generateRandomString(4)}-${generateRandomString(4)}-${generateRandomString(4)}-${generateRandomString(12)}`;
}

function generateRandomString(length: number) {
    const characters = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export {
    generateRandomId
}