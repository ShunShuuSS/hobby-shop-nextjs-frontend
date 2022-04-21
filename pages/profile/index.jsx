import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import CardAddress from "../../src/components/profile/CardAddress.Components";
import ProfileTab from "../../src/components/profile/ProfileTab.Components";
import Tabs from "../../src/components/profile/Tabs.Components";
import UserContext from "../../src/context/user.context";

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [TabsToggle, setTabsToggle] = useState(1);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken !== "") {
        setUserData(userContext.UserInfo);
      }
    }
  }, [userContext.CompleteLoad]);

  const UserDetail = ({ children, index }) => {
    return (
      <div className={`flex`}>
        <div className={`w-[8rem]`}>
          {index}
          <span className={`float-right`}>:&nbsp;</span>
        </div>
        <div className={`w-auto`}>{children}</div>
      </div>
    );
  };

  return (
    <>
      <ProfileTab>
        <div className={`w-[20%]`}>
          <img src="/test1.jpg" className={`w-full rounded-md`} alt="" />
        </div>
        <div className={`w-[75%] block relative`}>
          <UserDetail index={`Nama`}>{userData.user_name}</UserDetail>
          <UserDetail index={`Jenis Kelamin`}>
            {userData.user_gender == "Male"
              ? "Pria"
              : userData.user_gender == "Female"
              ? "Perempuan"
              : "Tidak diketahui"}
          </UserDetail>

          <UserDetail index={`Tanggal Lahir`}>
            {moment(userData.user_date_of_birth).format("DD MMMM YYYY")}
          </UserDetail>
          <UserDetail index={`Nomor HP`}>
            {"(+62) " + userData.user_hp}{" "}
          </UserDetail>
          <UserDetail index={`Email`}>{userData.user_email}</UserDetail>
          <div className={`flex bottom-0 left-0`}>
            <div>
              <Link href={`/profile/reset-password`}>
                <div
                  className={`h-[3rem] w-[10rem] bottom-0 left-0 flex border rounded-md absolute hover:bg-gray-400`}
                >
                  <button
                    type="button"
                    className={`m-auto flex cursor-pointer`}
                  >
                    Ubah password
                  </button>
                </div>
              </Link>
            </div>

            <div>
              <Link href={`/profile/address`}>
                <div
                  className={`h-[3rem] w-[10rem] right-0 bottom-0 flex border rounded-md absolute hover:bg-gray-400`}
                >
                  <button
                    type="button"
                    className={`m-auto flex cursor-pointer`}
                  >
                    Ubah Data Diri
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </ProfileTab>

      {/* <div className={`${TabsToggle === 2 ? "" : "hidden"}`}>
        <div className={`w-full border rounded-b-md`}>
          <div className={`m-5`}>
            <CardAddress></CardAddress>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProfilePage;
