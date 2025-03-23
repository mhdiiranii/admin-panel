import HeaderDesign from "./headerDesign";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
 
  return (
    <>
      <HeaderDesign session={session}/>
    </>
  );
}
