import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { useLanguage } from "@/contexts/LanguageContext";

// Flag SVG components
const IndonesianFlag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 16">
    <rect fill="#FF0000" height="8" width="24" />
    <rect fill="#FFFFFF" height="8" width="24" y="8" />
  </svg>
);

const AmericanFlag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 16">
    <rect fill="#B22234" height="16" width="24" />
    <rect fill="#FFFFFF" height="1" width="24" y="1" />
    <rect fill="#FFFFFF" height="1" width="24" y="3" />
    <rect fill="#FFFFFF" height="1" width="24" y="5" />
    <rect fill="#FFFFFF" height="1" width="24" y="7" />
    <rect fill="#FFFFFF" height="1" width="24" y="9" />
    <rect fill="#FFFFFF" height="1" width="24" y="11" />
    <rect fill="#FFFFFF" height="1" width="24" y="13" />
    <rect fill="#3C3B6E" height="8" width="10" />
    <g fill="#FFFFFF">
      <circle cx="1.5" cy="1.5" r="0.3" />
      <circle cx="3" cy="1.5" r="0.3" />
      <circle cx="4.5" cy="1.5" r="0.3" />
      <circle cx="6" cy="1.5" r="0.3" />
      <circle cx="7.5" cy="1.5" r="0.3" />
      <circle cx="9" cy="1.5" r="0.3" />
      <circle cx="2.25" cy="2.5" r="0.3" />
      <circle cx="3.75" cy="2.5" r="0.3" />
      <circle cx="5.25" cy="2.5" r="0.3" />
      <circle cx="6.75" cy="2.5" r="0.3" />
      <circle cx="8.25" cy="2.5" r="0.3" />
      <circle cx="1.5" cy="3.5" r="0.3" />
      <circle cx="3" cy="3.5" r="0.3" />
      <circle cx="4.5" cy="3.5" r="0.3" />
      <circle cx="6" cy="3.5" r="0.3" />
      <circle cx="7.5" cy="3.5" r="0.3" />
      <circle cx="9" cy="3.5" r="0.3" />
      <circle cx="2.25" cy="4.5" r="0.3" />
      <circle cx="3.75" cy="4.5" r="0.3" />
      <circle cx="5.25" cy="4.5" r="0.3" />
      <circle cx="6.75" cy="4.5" r="0.3" />
      <circle cx="8.25" cy="4.5" r="0.3" />
      <circle cx="1.5" cy="5.5" r="0.3" />
      <circle cx="3" cy="5.5" r="0.3" />
      <circle cx="4.5" cy="5.5" r="0.3" />
      <circle cx="6" cy="5.5" r="0.3" />
      <circle cx="7.5" cy="5.5" r="0.3" />
      <circle cx="9" cy="5.5" r="0.3" />
      <circle cx="2.25" cy="6.5" r="0.3" />
      <circle cx="3.75" cy="6.5" r="0.3" />
      <circle cx="5.25" cy="6.5" r="0.3" />
      <circle cx="6.75" cy="6.5" r="0.3" />
      <circle cx="8.25" cy="6.5" r="0.3" />
    </g>
  </svg>
);

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    {
      key: "id",
      label: "Bahasa Indonesia",
      flag: IndonesianFlag,
      shortLabel: "ID",
    },
    {
      key: "en",
      label: "English",
      flag: AmericanFlag,
      shortLabel: "EN",
    },
  ];

  const currentLanguage = languages.find((lang) => lang.key === language);
  const CurrentFlag = currentLanguage?.flag || IndonesianFlag;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          aria-label="Change language"
          className="min-w-8 w-8 h-8 sm:min-w-10 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          variant="light"
        >
          <CurrentFlag className="w-4 h-3 sm:w-5 sm:h-4 rounded-sm border border-gray-200 dark:border-gray-600" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        selectedKeys={[language]}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0] as string;

          if (selectedKey && (selectedKey === "id" || selectedKey === "en")) {
            setLanguage(selectedKey);
          }
        }}
      >
        {languages.map((lang) => {
          const FlagComponent = lang.flag;

          return (
            <DropdownItem
              key={lang.key}
              className="text-sm"
              startContent={
                <FlagComponent className="w-5 h-4 rounded-sm border border-gray-200 dark:border-gray-600" />
              }
            >
              {lang.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
