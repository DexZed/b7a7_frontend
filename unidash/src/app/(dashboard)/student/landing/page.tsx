import Banner from "@/components/banner";
import ClassesList from "../_component/classesList";

function StudentLandingPage() {
  return (
    <>
      <section className="min-h-screen flex flex-col p-4">
        <Banner description="Here's to all the student with big dreams." />
        <ClassesList />
      </section>
    </>
  );
}

export default StudentLandingPage;
