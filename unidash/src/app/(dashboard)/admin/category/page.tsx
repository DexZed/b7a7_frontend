function CategoryPage() {
  return (
    <>
      <section className="flex min-h-screen flex-col gap-3 p-6">
        <h1 className="text-3xl font-semibold">
          Users Per Department And Subjects
        </h1>
        <div>
          <div className="tabs tabs-lift">
            <label className="tab">
              <input type="radio" name="Departments" defaultChecked />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 me-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
              Live
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
              Tab content 1
            </div>

            <label className="tab">
              <input type="radio" name="Subjects" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 me-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
              Laugh
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
              Tab content 2
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CategoryPage;
