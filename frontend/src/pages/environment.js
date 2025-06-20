let IS_PROD = true;
const server = IS_PROD ?
    "https://quickpost1.onrender.com" :

    "http://localhost:8080"


export default server;