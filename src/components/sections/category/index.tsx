import CategoryGallery from "./CategoryGallery";
import CategoryFooter from "./CategoryFooter";
import { type CategoryProject } from "@/sanity/lib/queries";

type CategoryProps = {
  categoryName: string;
  projects: CategoryProject[];
};

const Category = ({ categoryName, projects }: CategoryProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {projects.length > 0 ? (
        <CategoryGallery projects={projects} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-xl text-white uppercase tracking-wider">
            No projects found for this category
          </p>
        </div>
      )}
      <CategoryFooter categoryName={categoryName} />
    </div>
  );
};

export default Category;
