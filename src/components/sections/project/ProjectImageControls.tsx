import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type ProjectImageControlsProps = {
  onPrevious: () => void;
  onNext: () => void;
};

const buttonClassName =
  "flex size-10 items-center justify-center border border-white/60 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black";

const ProjectImageControls = ({
  onPrevious,
  onNext,
}: ProjectImageControlsProps) => {
  return (
    <>
      <div className="absolute top-1/2 right-5 z-20 flex -translate-y-1/2 flex-col gap-3 md:hidden">
        <button
          type="button"
          aria-label="Previous project image"
          className={buttonClassName}
          onClick={onPrevious}
        >
          <FaArrowUp aria-hidden="true" size={14} />
        </button>
        <button
          type="button"
          aria-label="Next project image"
          className={buttonClassName}
          onClick={onNext}
        >
          <FaArrowDown aria-hidden="true" size={14} />
        </button>
      </div>

      <button
        type="button"
        aria-label="Previous project image"
        className={`${buttonClassName} absolute top-8 left-1/2 z-20 hidden -translate-x-1/2 md:flex`}
        onClick={onPrevious}
      >
        <FaArrowUp aria-hidden="true" size={14} />
      </button>
      <button
        type="button"
        aria-label="Next project image"
        className={`${buttonClassName} absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:flex`}
        onClick={onNext}
      >
        <FaArrowDown aria-hidden="true" size={14} />
      </button>
    </>
  );
};

export default ProjectImageControls;
