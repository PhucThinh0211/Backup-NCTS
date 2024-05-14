export const banners: any[] = new Array(20)
  .fill(null)
  .map((_, index) => {
    return {
      id: index,
      title: `Banner ${index + 1}`,
    };
  });
