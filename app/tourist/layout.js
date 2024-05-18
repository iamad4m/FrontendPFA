import DashboardTouristWrapper from "@/components/DashboardTouristWrapper";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  if (session && session.roles?.includes("tourist")) {
    return <DashboardTouristWrapper>{children}</DashboardTouristWrapper>;
  } else if (session && session.roles?.includes("administrator")) {
    redirect("/admin");
  } else {
    redirect("/");
  }
}
