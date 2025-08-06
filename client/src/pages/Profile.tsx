import Navbar from '../components/layout/Navbar';
import ProfileCard from '../components/Profile/ProfileCard';
import ProfileDetails from '../components/Profile/ProfileDetails';

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center lg:flex-row gap-6 mt-8 mx-4 lg:items-start">
        <ProfileCard />
        <ProfileDetails />
      </div>
    </>
  );
};

export default Profile;
