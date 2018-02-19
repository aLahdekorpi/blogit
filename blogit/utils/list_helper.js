const dummy = (blogs) => {
    return 1;
  }
  
const totalLikes = (blogs) => {
    const summa = (total, blog) => { return total + blog.likes}
    return blogs.reduce(summa, 0)
    };

 const favouriteBlog = (blogs) => {
    const biggestAmountOfLikes = Math.max.apply(Math,blogs.map(x => {return x.likes;}))
    return blogs.find(x => { return x.likes === biggestAmountOfLikes;})
 }   

module.exports = {
        dummy,
        totalLikes,
        favouriteBlog
      }