"use client";
import { useRouter } from "next/navigation";
export default function NotFound(){
   
  const router = useRouter();
    return(
        <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found !</h1>
      <p className="text-gray-500 mb-8">
        The page you are looking for might be in another castle.
      </p>
      <button
        className="text-indigo-600 hover:text-indigo-500 font-semibold"
        onClick={() => router.push('/')}
      >
        Go back to Home
      </button>
    </div>
    )
}