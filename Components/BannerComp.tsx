export type BannerCompProps = {
  title: string;
  minTitle?: string;
  description: string;
};

export const BannerComp = (props: BannerCompProps) => {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-black to-gray-800 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] left-[-10%] w-[70%] h-[140%] bg-gray-700 rounded-full opacity-10 transform rotate-12"></div>
        <div className="absolute bottom-[-30%] right-[-5%] w-[60%] h-[120%] bg-gray-600 rounded-full opacity-10 transform -rotate-12"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-6xl font-bold mb-8 text-center">
          {props.title} <span className="text-gray-300">{props.minTitle}</span>
        </h1>
        <div className="text-center space-x-4">
          <p className="text-gray-400 text-base">{props.description}</p>
        </div>
      </div>
    </div>
  );
};
