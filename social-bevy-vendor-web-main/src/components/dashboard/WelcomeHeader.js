import Image from "next/image";
import ubuntu from "@/utils/ubuntu";

const WelcomeHeader = ({ vendorName }) => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-400 h-32 p-8 pt-12 md:m-4 md:rounded flex items-center justify-between">
      <div>
        <p className="text-gray-200 text-xs mb-0.5">SOCIAL BEVY VENDOR</p>
        <h2 className={`text-2xl font-medium text-white ${ubuntu.className}`}>Welcome, {vendorName}!</h2>
      </div>
      <div>
        <Image
          src="/images/logo.png"
          alt="Social Bevy Logo"
          width={100}
          height={100}
        />
      </div>
    </div>
  )
};

export default WelcomeHeader;