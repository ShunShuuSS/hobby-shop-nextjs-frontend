import Link from "next/link";
import ProfileNavigationOption from "./ProfileNavigationOption.Components";
const ProfileNavigation = () => {
  return (
    <>
      <ul className="absolute hidden group-hover:block pt-[3rem] w-[15rem] right-0">
        <div className={`border border-black rounded`}>
          <ProfileNavigationOption link={`/profile`}>
            Lihat Profil
          </ProfileNavigationOption>
          <ProfileNavigationOption link={`/profile`}>
            Lihat Profil
          </ProfileNavigationOption>
          <ProfileNavigationOption link={`/profile`}>
            Buka Toko
          </ProfileNavigationOption>
          <ProfileNavigationOption link={`/transaction`}>
            Transaksi
          </ProfileNavigationOption>
          <ProfileNavigationOption link={`/`}>Keluar</ProfileNavigationOption>
        </div>
      </ul>
    </>
  );
};

export default ProfileNavigation;
