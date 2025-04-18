import { redirect } from "next/navigation";

import { SignUpCard } from "@/components/sign-up-card";
import { getServerSession } from "next-auth";

const SignUp = async () => {
    const user = await getServerSession();
    if (!user) return <SignUpCard />;

    redirect("/");
};

export default SignUp;
