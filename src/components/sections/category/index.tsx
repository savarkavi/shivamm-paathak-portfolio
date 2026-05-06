import CategoryGallery from "./CategoryGallery";
import CategoryFooter from "./CategoryFooter";

type CategoryProps = {
  categoryName: string;
};

const Category = ({ categoryName }: CategoryProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <CategoryGallery />
      <CategoryFooter categoryName={categoryName} />
    </div>
  );
};

export default Category;
