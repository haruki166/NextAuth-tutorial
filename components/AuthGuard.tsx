import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

//ユーザーが認証済みかどうかを判断
//認証ガード（AuthGuard）として機能し、子要素を表示する前にユーザーの認証ステータスをチェック
const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
  // status には、authenticated・unauthenticated・loading のいずれかが格納されます
  const { status } = useSession(); //認証セッションのステータスを取得
  const router = useRouter();  //Next.jsのルーターオブジェクトを取得;

  //router（=ページ）もしくは status（=認証情報）に変更があった場合useEffect発火
  useEffect(() => {
    //status の中身が「unauthenticated」であるか検証
    if (status === "unauthenticated" && router.pathname != "/auth/signin")
      // status が unauthenticated の場合でも、現在のパス名が「/auth/signin」だった場合、リダイレクトは行いません
      router.push("/auth/signin");
  }, [router, status]);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "authenticated") return children;
};

export default AuthGuard;

//ページのURLやパラメータの情報が格納されている router というオブジェクト
//status という変数には、認証情報の取得状況・認証済みか否かという情報が格納
//loading（認証情報の取得中）・unauthenticated（非認証）・authenticated（認証済み）のいずれか
