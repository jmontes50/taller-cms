import axios from "axios"

const URL = `https://webinar-cms-blogs.herokuapp.com`

const getBlogs = async () => {
    try {
        const { data } = await axios.get(`${URL}/posts`)
        return data.data.data
    } catch (error) {
        throw error
    }
}

const getAuthors = async () => {
    try {
        const { data } = await axios.get(`${URL}/autores`)
        return data.content
    } catch (error) {
        throw error
    }
}

const crearPost = async (post, token) => {
    console.log("post",post)
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
        //.post(URL, DATA, HEADERS)
        let { data } = await axios.post(`${URL}/posts`, post, { headers })
        console.log(data)
        return data
    } catch (error) {
        throw error
    }
}

export {
    getBlogs,
    getAuthors,
    crearPost
}