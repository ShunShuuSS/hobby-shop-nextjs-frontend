import Link from "next/link";
const ProfileNavigationOption = ({ children, link, addClass }) => {
  return (
    <>
      <li className="">
        <Link href={`${link}`}>
          <a
            className={`bg-white rounded hover:bg-blue-800 hover:text-white py-2 px-4 block whitespace-no-wrap ${addClass}`}
          >
            {children}
          </a>
        </Link>
      </li>
    </>
  );
};

export default ProfileNavigationOption;
