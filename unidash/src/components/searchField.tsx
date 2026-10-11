import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
};

function SearchField({
  value,
  onChange,
  className,
  placeholder = "Search",
}: Props) {
  return (
    <div className={cn("", className)}>
      <div className="join">
        <div>
          <label className="input validator join-item glass-morphism">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Search"
            />
          </label>
          <div className="validator-hint hidden">Start typing...</div>
        </div>
        <button
          type="submit"
          className="btn btn-ghost btn-outline glass-morphism  ml-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchField;
