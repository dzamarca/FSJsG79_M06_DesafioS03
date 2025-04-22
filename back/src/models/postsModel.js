import pool from '../../db/config.js'

export const getPostsModel = async()=>{
    const sqlQuery = 'SELECT * FROM posts'
    const response = await pool.query(sqlQuery)
    // console.log(response.rows)
    return response.rows
}

export const createPostModel = async(titulo, url, descripcion, likes)=>{
    const sqlQuery = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *'
    try {
        const values = [titulo, url, descripcion, likes]
        const response = await pool.query(sqlQuery, values)
        return response.rows
    } catch (error) {
        console.error(error)
    }
}

