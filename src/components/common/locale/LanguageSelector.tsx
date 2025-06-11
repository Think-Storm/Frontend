"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constants/language";

export default function LanguageSelector() {
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (locale: string) => {
    router.push(`/${locale}`);
  };

  const currentLanguage = languages.find(
    (language) => language.code === currentLocale
  );

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]" aria-label="select language">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span className="text-base" aria-hidden="true">
              {currentLanguage?.flag}
            </span>
            <span className="text-sm">{currentLanguage?.name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-1">
              <span className="text-base" aria-hidden="true">
                {language.flag}
              </span>
              <span className="text-sm">{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
