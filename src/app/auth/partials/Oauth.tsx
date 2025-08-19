import Image from "next/image";
import google from "@/assets/logos/google.svg";
import github from "@/assets/logos/github.svg";
import { useSupabase } from "@/services/supabase/supabase.hook";

export default function Oauth() {
  const { signInWithGoogle, signInWithGithub } = useSupabase();
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={signInWithGoogle}
      >
        <Image src={google} alt="google logo" className="w-5 h-5 mr-2" />
        <span className="text-gray-700 text-sm">Using Google</span>
      </button>
      <button
        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={signInWithGithub}
      >
        <Image src={github} alt="github logo" className="w-5 h-5 mr-2" />
        <span className="text-gray-700 text-sm">Using GitHub</span>
      </button>
    </div>
  );
}
