export const useScroll = (ref) => {
    const scrollLeft = () => {
      ref.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    };
  
    const scrollRight = () => {
      ref.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    };
  
    return { scrollLeft, scrollRight };
  };
  