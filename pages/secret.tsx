import React from "react";
import { CustomNextPage } from "../types/custom-next-page";

const Secret: CustomNextPage = () => {
  return <p>Secret</p>;
};

export default Secret;
//Secret コンポーネントは、AuthGuard コンポーネントによる検証が行われるようになる。
Secret.requireAuth = true;
