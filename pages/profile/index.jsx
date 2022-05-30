import axios from "axios";
import { checkCookies } from "cookies-next";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import CardAddress from "../../src/components/profile/CardAddress.Components";
import ProfileTab from "../../src/components/profile/ProfileTab.Components";
import Tabs from "../../src/components/profile/Tabs.Components";
import UserContext from "../../src/context/user.context";

const ProfilePage = () => {
  const [loadPage, setLoadPage] = useState(true);
  const [userData, setUserData] = useState([]);
  const [TabsToggle, setTabsToggle] = useState(1);
  const [userPhoto, setUserPhoto] = useState("");
  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (checkCookies("user_token") == false) {
      router.push("/login");
    } else {
      if (userContext.CompleteLoad === true) {
        if (userContext.UserToken !== "") {
          loadUserPhoto();
          setUserData(userContext.UserInfo);
        }
      }
    }
  }, [userContext.CompleteLoad]);

  const loadUserPhoto = () => {
    setUserPhoto(
      `http://localhost:5000/` +
        userContext.UserInfo.user_photo +
        `_150` +
        `.webp`
    );
  };
  const uploadUserPhoto = async (e) => {
    let formData = new FormData();

    if (e.target && e.target.files[0]) {
      formData.append("user_photo", e.target.files[0]);
    }

    const uploadNewProfilePhoto = (
      await axios.post(`api/user/editPhotoUser`, formData, {
        headers: {
          Authorization: `Bearer ${userContext.UserToken}`,
        },
      })
    ).data.data;

    if (uploadNewProfilePhoto.affectedRows) {
      setUserPhoto(URL.createObjectURL(e.target.files[0]));
      console.log(uploadNewProfilePhoto);
    }
  };

  const handleUploadImage = (e) => {
    uploadUserPhoto(e);
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
      <>
        <ProfileTab>
          <div className={`w-[20%]`}>
            <div
              className={`relative w-full h-[14rem] group outline-style-1 rounded-md bg-white`}
            >
              {userPhoto !== "" ? (
                <>
                  <img
                    src={userPhoto}
                    className={`object-cover w-full h-full rounded-md group-hover:opacity-30 hover:transition`}
                    alt=""
                  />

                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2
              opacity-0 group-hover:opacity-100`}
                  >
                    <label
                      htmlFor="input-file"
                      className={`group-hover:cursor-pointer`}
                    >
                      <img
                        id={`edit-icon`}
                        className={`h-[5rem]`}
                        src="/assets/profile/editing.png"
                        alt=""
                      />
                    </label>

                    <input
                      type="file"
                      id={`input-file`}
                      className={``}
                      onChange={handleUploadImage}
                      accept={`image/*`}
                      hidden
                    />
                  </div>
                </>
              ) : (
                <svg
                  role="status"
                  className="w-[20%] h-[20%] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 absolute top-[40%] left-[40%]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </div>
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
                    className={`h-[3rem] w-[10rem] bottom-0 left-0 flex border rounded-md absolute hover:bg-gray-400 cursor-pointer`}
                  >
                    <button type="button" className={`m-auto flex`}>
                      Ubah password
                    </button>
                  </div>
                </Link>
              </div>

              <div>
                <Link href={`/profile/address`}>
                  <div
                    className={`h-[3rem] w-[10rem] right-0 bottom-0 flex border rounded-md absolute hover:bg-gray-400 cursor-pointer`}
                  >
                    <button type="button" className={`m-auto flex`}>
                      Ubah Data Diri
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </ProfileTab>
      </>
    </>
  );
};

export default ProfilePage;
