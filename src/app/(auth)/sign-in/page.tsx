import { SignInCard } from "@/features/auth/components/sign-in-card";
import { getCurrent } from "@/features/auth/getCurrUser";

const SignIn = async () => {
    const user = await getCurrent();
    console.log("User", user);
    if (!user) return <SignInCard />;
};

export default SignIn;