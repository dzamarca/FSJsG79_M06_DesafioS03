import {getPostsModel, createPostModel} from '../models/postsModel.js'

export const getAllPosts = async(req,res)=>{
    try {
        const posts = await getPostsModel()
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR =>',error)
    }
}

export const createPost = async (req, res) =>{
    try {
        const {titulo, url, descripcion, likes} = req.body
        const newPost = await createPostModel(titulo, url, descripcion, likes)
        res.status(201).json({post: newPost})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR =>',error)
    }
}