"use client";

import React, { ReactNode } from "react";

export default function AuthForm({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-9">
      {children}
    </div>
  );
}

function AuthFormHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex-[1] flex flex-col justify-center items-center gap-1">
      <h1 className="text-3xl font-semibold tracking-wide">{title}</h1>
      <p className="text-sm text-neutral-500 tracking-wide">{description}</p>
    </div>
  );
}

function AuthFormContent({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex-[3] flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

AuthForm.Header = AuthFormHeader;
AuthForm.Content = AuthFormContent;
