import { ReactNode } from "react";

export default function FooterForm({ children }: { children: ReactNode }) {
    return <div className="w-full flex flex-col lg:w-[400px] mt-3">{children}</div>;
}
