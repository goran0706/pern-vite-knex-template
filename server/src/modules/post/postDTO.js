const getPostDTO = (userId, post) => {
  return { ...post, userId: userId };
};

export default getPostDTO;
