import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  //Prismaをデータベースとして使用してセッションやユーザー情報を管理
  adapter: PrismaAdapter(prisma),
  providers: [
    //使用する認証プロバイダーのリストを指定。ここではGitHubプロバイダーを使用
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  //セッションの暗号化に使用するシークレットキーを指定
  secret: process.env.SECRET,

  //セッションをどのように保管するのか設定。
  session: {
    strategy: "database", //セッションの保存場所
    maxAge: 60 * 60 * 24 * 30, // 30 days セッションの最大有効期限
    updateAge: 60 * 60 * 24, // 24 hours 更新の頻度
  },

  //クッキーのセキュリティ設定。本番環境ではセキュアなクッキーを使用するように設定
  useSecureCookies: process.env.NODE_ENV === "production",

  //カスタムの認証ページのパスを指定
  pages: {
    signIn: "auth/signin", //pages/auth/signin.tsx をログイン画面にする。
  },

  //、カスタムコールバック関数を指定
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, user }) {
      if (session?.user) session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);

////このコードは、Next.jsアプリケーションで認証機能を設定するための
//NextAuthの設定オプションを定義しています。
//Prismaを使用してデータベースに接続し、
//GitHubプロバイダーを使用してユーザーの認証を行います。
//また、セッションの管理やカスタムページの設定、
//コールバック関数の定義など、さまざまな認証関連の設定を行っています
