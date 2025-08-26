import RippleButton from "@/components/custom-ui/RippleButton";

interface AuthProps {
  remember?: boolean;
  isLoading?: boolean;
}

const GithubButton = ({ remember = false, isLoading }: AuthProps) => {
  const handleGithubLogin = () => {
    const isRemember = remember ?? false;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=Ov23liJYF8P8JVyV3xv2&redirect_uri=http://localhost:8080/api/auth/github/callback&state=${encodeURIComponent(isRemember)}&prompt=select_account`;
  };

  return (
    <RippleButton
      disabled={isLoading}
      onClick={() => handleGithubLogin()}
      className="flex w-full cursor-pointer items-center justify-center gap-3 border-1 border-[#E1E0E5] bg-[#27272A] text-white active:scale-95"
    >
      <img src="/svg/github.svg" alt="Github" className="h-5 w-5" />
      <span>Github</span>
    </RippleButton>
  );
};

export default GithubButton;
