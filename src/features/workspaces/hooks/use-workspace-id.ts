import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
  const params = useParams();
  return params.workspaceId as string;
<<<<<<< HEAD
};
=======
};
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8
