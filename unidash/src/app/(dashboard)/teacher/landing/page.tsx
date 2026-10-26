"use client";
import { useSession } from "@/lib/authClient";
import { redirect } from "next/navigation";
import Banner from "@/components/banner";
import CardContainer, { CardActions, CardBody } from "@/components/card";
import Link from "next/link";

function TeacherLandingPage() {
  const { data: session, isPending } = useSession();
  if (isPending)
    return (
      <Banner
        headingClass="skeleton w-50"
        descriptionClass="skeleton w-96"
        description=""
      />
    );
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <section className="min-h-screen flex flex-col">
        <Banner
          headingClass={isPending ? "skeleton w-50" : ""}
          descriptionClass={isPending ? "skeleton w-96" : ""}
          description="Manage your students, courses, and assignments all in one place."
        />
        <div className="flex flex-col justify-center  items-center gap-4 p-4">
          <div className="flex gap-2 flex-wrap items-center justify-center m-4">
            <CardContainer>
              <CardBody>
                <h3 className="text-3xl">Departments</h3>
                <p>See the departments you belong to.</p>
                <CardActions className="justify-end">
                  <Link
                    href={`/teacher/departments/`}
                    className="btn btn-ghost btn-outline glass-morphism"
                  >
                    See All
                  </Link>
                </CardActions>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardBody>
                <h3 className="text-3xl">Classes</h3>
                <p>See the classes taught by you.</p>
                <CardActions className="justify-end">
                  <Link
                    href={`/teacher/classes/`}
                    className="btn btn-ghost btn-outline glass-morphism"
                  >
                    See All
                  </Link>
                </CardActions>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardBody>
                <h3 className="text-3xl">Subjects</h3>
                <p>See the subjects you specialise in.</p>
                <CardActions className="justify-end">
                  <Link
                    href={`/teacher/subjects/`}
                    className="btn btn-ghost btn-outline glass-morphism"
                  >
                    See All
                  </Link>
                </CardActions>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardBody>
                <h3 className="text-3xl">Create</h3>
                <p>Add a new department, class or subject.</p>
                <CardActions className="justify-end">
                  <Link
                    href={`/teacher/add/`}
                    className="btn btn-ghost btn-outline glass-morphism"
                  >
                    Create
                  </Link>
                </CardActions>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>
    </>
  );
}

export default TeacherLandingPage;
