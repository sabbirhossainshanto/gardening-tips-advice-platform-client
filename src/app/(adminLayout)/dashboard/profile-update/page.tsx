import dynamic from "next/dynamic";

const ProfileUpdate = dynamic(
  () => import("@/src/components/ui/ProfileUpdate/ProfileUpdate"),
  {
    ssr: false,
  }
);

const UpdateProfile = () => {
  return <ProfileUpdate />;
};

export default UpdateProfile;
