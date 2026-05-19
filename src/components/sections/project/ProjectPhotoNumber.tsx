import { chonburi } from "@/fonts";

type ProjectPhotoNumberProps = {
  current: number;
  total: number;
};

const formatPhotoNumber = (value: number) => String(value).padStart(2, "0");

const ProjectPhotoNumber = ({ current, total }: ProjectPhotoNumberProps) => {
  return (
    <p
      className={`${chonburi.className} pointer-events-none absolute bottom-5 left-5 z-20 scale-y-120 text-sm font-medium tracking-widest text-white uppercase md:bottom-8 md:left-8 md:text-base lg:text-4xl`}
    >
      FL. {formatPhotoNumber(current)} / {formatPhotoNumber(total)}
    </p>
  );
};

export default ProjectPhotoNumber;
