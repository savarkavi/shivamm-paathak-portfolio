type ProjectGradientStripProps = {
  gradient: string;
};

const ProjectGradientStrip = ({ gradient }: ProjectGradientStripProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-5 bottom-5 z-20 h-5 w-48 border border-white/50 md:right-8 md:bottom-8 md:w-64"
      style={{ background: gradient }}
    />
  );
};

export default ProjectGradientStrip;
