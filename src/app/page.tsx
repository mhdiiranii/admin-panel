import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("HomePage");
  const listItems: string[] = t.raw("listItems");
  const skills :string [] = t.raw('skills')
  return (
    <div className="flex flex-col px-10 gap-10">
      <div className="w-full flex py-10 flex-col">
        <div className="flex flex-col gap-10">
          <div className=" flex flex-col w-auto items-center">
            <div className="flex w-auto flex-col gap-2">
              <h1 className="text-6xl font-bold">{t("h1")}</h1>
              <p className="border-b text-xs font-light">{t("top-p-1")}</p>
            </div>
          </div>
          <div className="w-full  flex justify-center">
            <p className="w-3/5 bg-amber-100 rounded-lg p-4">{t("top-p-2")}</p>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg shadow-[0_0px_20px_1px_rgba(0,0,0,0.2)] py-10 flex justify-around">
        <ol className="list-disc  flex font-medium flex-col justify-center gap-2">
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
        <div className=" flex justify-center items-center">
          <Image width={200} height={200} alt="attention" src={"/svg/attention.svg"} />
        </div>
      </div>
      <div className="flex flex-col gap-6 py-10">
        <h3 className="text-2xl font-bold">{t("technology")}</h3>
        <div className="grid grid-cols-6 gap-4">
          {skills.map((item,index)=>(
            <span className="px-4 py-2 flex rounded-lg justify-center items-center bg-amber-100" key={index}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
