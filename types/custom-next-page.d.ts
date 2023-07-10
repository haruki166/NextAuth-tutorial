//NextPageはNext.jsのページコンポーネントの型
import { NextPage } from "next";

//Next.jsのNextPageを拡張したカスタムのページ型CustomNextPageを定義
//NextPage 型にrequireAuth?: boolean | undefined;が追加された
//「新しい型 CustomNextPage」が生成されます。
export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};
//CustomNextPageという名前の型をエクスポート。この型は、NextPageを拡張したもの