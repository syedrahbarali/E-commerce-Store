const Container = ({ children, classNmae = "", ...props }) => {
  return (
    <div className={`w-[90%]  md:w-[80%] mx-auto ${classNmae}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
