import React from "react";
import HomeContent from "@/components/Home/Content";

export default function Home({ params }: any) {
  return (
    <main className="min-h-screen p-12 md:p-24">
      <HomeContent params={params} />
    </main>
  );
}
