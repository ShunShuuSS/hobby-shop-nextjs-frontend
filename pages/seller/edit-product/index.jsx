/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";

const EditProductIndex = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/seller/edit-product") {
      router.push("/seller/manage-product");
    }
  }, [router.pathname]);

  return <></>;
};

export default EditProductIndex;
