'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import ubuntu from "@/utils/ubuntu";

const Section1 = () => {
  const router = useRouter();

  return (
    <section className="relative h-[65vh] min-h-[800px] w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/stock1.webp"
          alt="Background"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Red Overlay */}
      <div className="absolute inset-0 z-10 bg-red-500 opacity-60"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full text-center md:text-left px-4">
        <div className="md:order-2 md:ml-4">
          <h1 className={`text-white text-5xl font-bold mb-2 ${ubuntu.className}`}>Welcome to the<br/> Hive of Excitement!</h1>
          <p className="text-white text-xl mb-4">Being a Social Bee Vendor has many benefits!</p>
          <button onClick={() => router.push('/signup')} className="hidden md:inline-block bg-black text-white px-6 py-2 rounded-md text-lg">Sign Up Now</button>
        </div>
        <Image
          src="/images/bee2.png"
          alt="Bevy Bee"
          width={300}
          height={300}
          className="mb-4 md:mb-0 md:order-1"
        />
      </div>
      {/* Mobile Buttons */}
      <div className="absolute flex flex-col items-center justify-center bottom-8 w-full md:hidden z-30 mx-auto px-8">
        <button onClick={() => router.push('/signup')} className="bg-red-600 border-2 border-white text-white px-6 py-2 rounded-md text-lg mb-2 max-w-xl w-full">Sign Up Now</button>
        <button onClick={() => router.push('/login')} className="bg-black text-white px-6 py-2 rounded-md text-lg max-w-xl w-full">Login</button>
      </div>
    </section>
  )
}

export default Section1;