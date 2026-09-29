import { ReactNode } from "react";

type Props = { children: ReactNode };

function layout({ children }: Props) {
  return <main>{children}</main>;
}

export default layout;
