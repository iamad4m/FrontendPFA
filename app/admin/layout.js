import AdminNavbar from "@/components/AdminNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  if (session && session.roles?.includes("administrator")) {
    return (
      <>
        <AdminNavbar />
        <>{children}</>
      </>
    );
  } else if (session && session.roles?.includes("tourist")) {
    redirect("/tourist");
  } else {
    redirect("/");
  }
}
