import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { getCurrent } from "@/features/auth/getCurrUser";

const SignUp = async () => {
  const user = await getCurrent();
    if (!user) return <SignUpCard />;
    
    //TODO: Verify User
};

export default SignUp;
