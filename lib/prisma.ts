//PrismaClientのインスタンスを作成し、他のファイルで使用できるようにエクスポートするためのコード
//PrismaClientを使用してデータベースとの通信が可能になる
import { PrismaClient } from "@prisma/client";

//PrismaClientのインスタンスを保持するための変数prismaを宣言
let prisma: PrismaClient;

//環境変数NODE_ENVの値が"production"かどうかをチェック
if (process.env.NODE_ENV === "production") {
  //プロダクション環境の場合新しいPrismaClientのインスタンスを作成し変数prismaに代入
  prisma = new PrismaClient();
} else {
  //globalWithPrismaという変数を作成。これにより、グローバルスコープでのPrismaClientの共有が可能
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  //prismaプロパティが存在しない場合、新しいPrismaClientのインスタンスを作成して、prismaプロパティに代入
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  //PrismaClientのインスタンスをprisma変数に代入します。グローバルスコープでのPrismaClientの共有が確立
  prisma = globalWithPrisma.prisma;
}

export default prisma;
