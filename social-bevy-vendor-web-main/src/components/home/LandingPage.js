import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-between">
      <Section1 />
      <Section2 />
      <Section3 />
    </main>
  )
};

export default LandingPage;