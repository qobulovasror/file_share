const genId = (len=5) => {
    return Date.now().toString(36).slice(4, 7)+Math.random().toString(36).substr(2).slice(0,3)
}

export default genId;