import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations("HomePage")


  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col justify-center items-center p-4">
        <h1>
         {t('title')}
        </h1>
      </div>
    </div>
  );
}
