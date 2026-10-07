"use client";
import { getDashboardStats } from "@/data access/adminData";
import { useSession } from "@/lib/authClient";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { DashboardStats } from "@/lib/types";
function AdminStats() {
  const { data: session, isPending } = useSession();
  console.log(session);
  const [stats, setStats] = useState<DashboardStats>();
  useEffect(() => {
    if (isPending || !session) return;

    const token = session.session.token;
    const fetchStats = async () => {
      const stats = await getDashboardStats(token);
      setStats(stats.data);
    };
    fetchStats();
  }, [session, isPending]);

  if (!stats) {
    return (
      <div className="flex w-full justify-around my-4">
        <div className="card glass-morphism">
          <div className="card-body">
            <h2 className="card-title">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap w-full justify-around my-4 gap-2">
        {Object.keys(stats).map((key) => (
          <div key={key} className="">
            <div className="card glass-morphism w-40">
              <div className="card-body flex flex-col justify-center items-center">
                <h2 className="card-title capitalize">{key}</h2>
                <p>{(stats as any)[key]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminStats;
