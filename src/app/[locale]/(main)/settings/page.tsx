import { Button } from "@/components/ui/button";

export default function settings() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 mt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl xl:text-5xl font-bold">Settings</h1>
        <div className="flex space-x-3">
          <Button
            variant="gradient"
            size="gradient"
            textClassName="text-sm sm:text-base"
            className="hidden sm:block"
          >
            Save Changes
          </Button>
          <Button
            variant="gradient"
            size="gradient"
            textBgWhite
            textClassName="!text-black !bg-white"
          >
            Delete Account
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-gray-200 rounded-lg px-2 py-2 my-8 max-w-sm">
          <Button variant="white" className="text-base">
            Personal Info
          </Button>
          <Button variant="transparent" className="text-base">
            Account Settings
          </Button>
        </div>
      </div>
      <div>
        <div className="text-xl xl:text-2xl font-bold">Edit Profile</div>
      </div>
    </div>
  );
}
