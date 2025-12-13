import { redirect } from "next/navigation";
import { supabaseServer } from "@/app/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome back, {user.email}</p>
    </div>
  );
}
