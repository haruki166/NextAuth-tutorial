import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextComponentType } from "next";
import { Session } from "next-auth";

import { SessionProvider } from "next-auth/react";
import AuthGuard from "../components/AuthGuard";

//Next.js が提供する AppProps という型を拡張する
////ページコンポーネントにsessionプロパティとrequireAuthプロパティを追加////
export type CustomAppProps = AppProps<{ session: Session }> & {
  Component: NextComponentType & { requireAuth?: boolean };
};
//pageProps に session プロパティを追加
//Component に requireAuth プロパティを追加

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    //SessionProviderにsessionを渡して全ページ・コンポーネントでセッション情報を取得できるようにした。
    <SessionProvider session={session}>
      <Layout>
        {/* Component.requireAuth の値によって条件分岐を行う。 */}
        {Component.requireAuth ? (
          //AuthGuard コンポーネントで囲むことで、認証情報の検証が行われる。
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}
