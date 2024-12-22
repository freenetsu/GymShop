export type PresentationProductProps = {
  title: string;
  description: string;
};

export const PresentationProduct = ({
  title,
  description,
}: PresentationProductProps) => {
  return (
    <div className="text-center py-6 bg-black">
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-gray-400 text-base">{description}</p>
    </div>
  );
};
