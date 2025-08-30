import { ReactNode } from "react";
export default function SettingsForm({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col justify-center items-left gap-9">
      {children}
    </div>
  );
}

function SettingsFormHeader({
  title,
}: {
  title: string;
}) {
  return <div className="text-xl xl:text-2xl font-bold">{title}</div>;
}

function SettingsFormContent({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex-[3] flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

SettingsForm.Header = SettingsFormHeader;
SettingsForm.Content = SettingsFormContent;
