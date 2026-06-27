import {
  PageWrapper,
  getStaticProps as getStaticPropsHelper,
} from "@/components/cf/ui/PageWrapper";

import { type PageType, directories, types } from "@/config/routes";

interface DynamicPageProps {
  pageType: PageType;
  type: string;
}

export default function DynamicPage({ pageType, type }: DynamicPageProps) {
  return <PageWrapper pageType={pageType} type={type} />;
}

export async function getStaticPaths() {
  const paths = directories.flatMap((directory) =>
    types[directory].map((type) => ({
      params: { directory, type },
    })),
  );

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = ({
  params,
}: { params: { directory: PageType; type: string } }) => {
  const validDirectories: PageType[] = directories;
  if (!validDirectories.includes(params.directory)) {
    return {
      notFound: true,
    };
  }

  const result = getStaticPropsHelper(params.directory, { type: params.type });

  return {
    ...result,
    props: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ...((result as any).props || {}),
      pageType: params.directory,
    },
  };
};
