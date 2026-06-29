type StepCardProps = {
  title: string;
  items: string[];
  currentIndex: number;
};

export function StepCard({ title, items, currentIndex }: StepCardProps) {
  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body gap-4 p-4 sm:gap-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="card-title">{title}</h2>
          <div className="badge badge-primary badge-outline shrink-0">{currentIndex + 1} / {items.length}</div>
        </div>

        <div className="overflow-x-auto pb-1">
          <ul className="steps min-w-max w-full">
            {items.map((item, index) => (
              <li className={`step min-w-32 ${index <= currentIndex ? "step-primary" : ""}`} key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
