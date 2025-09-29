const dummy = (blogs) => {
    return 1
}

const countBlog = (blogs) => {
    return blogs.length
}

const getLikes = (blogs) => {
    return blogs[0].likes
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog)=> {
        return blog.likes > favorite.likes ? blog : favorite
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    const mostLiked = blogs.reduce((favorite, blog)=> {
         return blog.likes > favorite.likes ? blog : favorite
    }, blogs[0])


    return {
        author:mostLiked.author,
        likes:mostLiked.likes
    }
}

module.exports = {
    dummy,
    countBlog,
    getLikes,
    favoriteBlog,
    mostBlogs
}