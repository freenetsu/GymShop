export type IntroduceProps = {
  title: string;
  description: string;
};

export const Introduce = (props: IntroduceProps) => {
  return (
    <div className="flex flex-col  text-white px-8 mx-20">
      <h1 className="text-4xl font-bold mb-4 ">{props.title} </h1>
      <p className="text-gray-400 text-base ">{props.description}</p>
    </div>
  );
};
