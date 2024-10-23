import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../components/Scene"), { ssr: false });

const Page = () => {
  return (
    <main>
      <Scene />
    </main>
  );
};

export default Page;
