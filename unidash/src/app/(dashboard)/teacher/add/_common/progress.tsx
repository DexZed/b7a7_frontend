type Props = { step: number };

function Progress({ step }: Props) {
  const steplist = [
    {
      id: 1,
      title: "Department",
    },
    {
      id: 2,
      title: "Subject",
    },
    {
      id: 3,
      title: "Class",
    },
    {
      id: 4,
      title: "Summary",
    },
  ];
  return (
    <div>
      <ul className="steps w-full p-3">
        {steplist.map((s, i) => (
          <li
            key={s.id}
            className={`step ${i + 1 <= step ? "step-primary" : ""} text-xs md:text-sm lg:text-base`}
          >
            {s.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Progress;
