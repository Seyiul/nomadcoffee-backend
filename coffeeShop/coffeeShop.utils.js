export const processCategories = (keyword) => {
  const categories = keyword.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
  return categories.map((category) => ({
    where: { name: category },
    create: { name: category, slug: category },
  }));
};
