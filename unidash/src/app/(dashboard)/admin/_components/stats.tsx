"use client";
import { getDashboardStats } from "@/data access/adminData";
import { useSession } from "@/lib/authClient";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { DashboardStats } from "@/lib/types";
function AdminStats() {
  const user = useSession();
  const [stats, setStats] = useState<DashboardStats>();
  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getDashboardStats(
        user?.data?.session.token as string,
      );
      if (!stats.success) {
        redirect("/login");
      }
      setStats(stats.data);
    };
    fetchStats();
  }, [user]);
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
      <div className="flex w-full justify-around my-4">
        {Object.keys(stats).map((key) => (
          <div key={key} className="">
            <div className="card glass-morphism">
              <div className="card-body">
                <h2 className="card-title">{key}</h2>
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
