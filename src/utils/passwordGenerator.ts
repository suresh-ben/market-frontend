function generatePassword(length: number = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        password += randomChar;
    }
    return password;
}

export default generatePassword;