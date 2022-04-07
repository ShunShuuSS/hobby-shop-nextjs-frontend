import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import CardAddress from "../src/components/profile/CardAddress.Components";
import Tabs from "../src/components/profile/Tabs.Components";
import LoginContext from "../src/context/login.context";
import UserContext from "../src/context/user.context";

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [TabsToggle, setTabsToggle] = useState(1);
  const loginContext = useContext(LoginContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (loginContext.UserToken) {
      UserInfo();
    }
  }, [loginContext.UserToken]);

  const UserInfo = async () => {
    try {
      const userInfo = (
        await axios.get(`api/auth/info`, {
          headers: {
            Authorization: `Bearer ${loginContext.UserToken}`,
          },
        })
      ).data.data;

      if (userInfo) {
        setUserData(userInfo);
        // userContext.UserInfo(userInfo);
      }
    } catch (error) {}
  };

  const test = () => {
    console.log("clicked");
  };

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
      <div>
        <div className={`flex border rounded-t-md h-[3.5rem] w-full`}>
          <div onClick={() => setTabsToggle(1)}>
            <Tabs addClass={`${TabsToggle === 1 ? "bg-gray-400" : ""}`}>
              Data Pribadi
            </Tabs>
          </div>
          <div onClick={() => setTabsToggle(2)}>
            <Tabs addClass={`${TabsToggle === 2 ? "bg-gray-400" : ""}`}>
              Alamat
            </Tabs>
          </div>
        </div>
        <div className={`${TabsToggle === 1 ? "" : "hidden"}`}>
          <div className={`w-full border rounded-b-md`}>
            <div className={`m-5 flex justify-between`}>
              <div className={`w-[20%]`}>
                <img src="/test1.jpg" className={`w-full`} alt="" />
              </div>
              <div className={`w-[75%] block relative`}>
                <UserDetail index={`Nama`}>{userData.user_name}</UserDetail>
                <UserDetail index={`Jenis Kelamin`}>
                  {userData.user_gender}
                </UserDetail>
                <UserDetail index={`Tanggal Lahir`}>
                  {userData.user_date_of_birth}
                </UserDetail>
                <UserDetail index={`Nomor HP`}>
                  {"(+62) " + userData.user_hp}{" "}
                </UserDetail>
                <UserDetail index={`Email`}>{userData.user_email}</UserDetail>
                <div
                  className={`h-[3rem] w-[10rem] bottom-0 left-0 flex border rounded-md absolute hover:bg-gray-400`}
                >
                  <div className={`m-auto flex`}>Ubah password</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${TabsToggle === 2 ? "" : "hidden"}`}>
          <div className={`w-full border rounded-b-md`}>
            <div className={`m-5`}>
              <CardAddress></CardAddress>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
