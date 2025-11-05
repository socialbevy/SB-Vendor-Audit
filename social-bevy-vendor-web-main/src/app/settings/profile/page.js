"use client"

import { useRouter } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";
import EditProfileForm from "@/components/forms/EditProfileForm";
import ubuntu from "@/utils/ubuntu";

const ProfilePage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/settings');
  };

  return (
    <div className="mt-16 md:mt-0 w-full">
      <div className="border-b border-gray-300 md:hidden">
        <BackButton onClick={handleBack}>Back</BackButton>
      </div>
      <div className="p-2 md:p-4">
        <h1 className={`text-2xl font-bold md:px-0 md:mb-4 ${ubuntu.className}`}>Profile</h1>
        <EditProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
