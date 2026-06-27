import { CFLayout } from "@/components/layout/CFLayout";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";

export default function Custom404() {
  return (
    <CFLayout>
      <section className="mx-auto w-full max-w-3xl rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          <Icon name="file-question" className="h-7 w-7" />
        </div>

        <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
          页面不存在
        </h1>
        <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-300">
          当前地址没有对应的模板页面。你可以返回首页查看已生成的 Cloudflare 自定义页面。
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          返回首页
        </Link>
      </section>
    </CFLayout>
  );
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
