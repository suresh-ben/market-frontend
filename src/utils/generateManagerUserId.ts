function generateManagerUserId() {
    const chars = '0123456789';
    let userId = 'man';
    for (let i = 0; i < 4; i++) {
        const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        userId += randomChar;
    }
    return userId;
}

export default generateManagerUserId;