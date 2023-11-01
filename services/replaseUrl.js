const replaseUrl = (url) => {   
    return url.split("").map(s=>(s==" ")? "_": s).join("");
}

export default replaseUrl;