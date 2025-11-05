import ProtectedRoute from '@/lib/auth/ProtectedRoute';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import ubuntu from '@/utils/ubuntu';

const SettingsLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <h1 className={`hidden md:flex text-2xl w-full font-semibold p-4 border-b border-gray-200 ${ubuntu.className}`}>
          Settings
        </h1>
        <div className="flex bg-white">
          <SettingsSidebar />
          <div className="flex-grow">
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SettingsLayout;
