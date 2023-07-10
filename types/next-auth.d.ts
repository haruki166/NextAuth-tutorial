//DefaultUserはNextAuthが提供するデフォルトのユーザー情報の型
import type { DefaultUser } from "next-auth";

//"next-auth"モジュールを拡張するための宣言
declare module "next-auth" {
  // Sessionインターフェースを拡張
  interface Session {
    //Sessionインターフェースにuserプロパティを追加
    user?: DefaultUser & {
      id: string;
    };
  }
}

//アンビエントモジュール（ambient module）宣言を使うと、モジュール単位で型情報を追加することができる