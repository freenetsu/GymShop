import LoginGoogle from "@/Components/AuthComponents/LoginGoogle";
import LoginGithub from "../../Components/AuthComponents/LoginGithub";

const SignIn = () => {
  return (
    <div className="w-full flex mt-20 justify-center bg-black min-h-screen text-white">
      <section className="flex flex-col w-[400px] p-6  rounded-lg shadow-md">
        <h1 className="text-3xl w-full text-center font-bold mb-6 text-white">
          Sign in
        </h1>
        <LoginGithub />
        <LoginGoogle />
      </section>
    </div>
  );
};

export default SignIn;
