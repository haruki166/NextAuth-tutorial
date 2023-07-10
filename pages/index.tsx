import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import { CustomNextPage } from "@/types/custom-next-page";

const Home: CustomNextPage = () => {
  //この一行で認証情報を取得。
  const { data, status } = useSession();
  //data という変数には、認証済みであれば ユーザのオブジェクト。認証がなければNULL。
  //status という変数には、"authenticated"・"unauthenticated"・"loading" のいずれかが格納

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="" />
      </Head>
      <main>
        {/* ユーザーが存在しなければSignInボタン表示 */}
        {data?.user?.name || <Link href="/auth/signin">SignIn</Link>}
        {/* 認証情報がauthenticatedならログアウトボタン追加 */}
        {status === "authenticated" && (
          <button className="ml-5" onClick={() => signOut()}>
            SignOut
          </button>
        )}
        <Link href="/secret" className="ml-5">
          SecretPage
        </Link>
      </main>
    </>
  );
};

export default Home;
