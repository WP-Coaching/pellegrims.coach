import type { ReactNode } from "react";
import { Heading, Text } from "./typography";

type Item = { title: string; description: ReactNode };

type TitledListProps = { items: readonly Item[] } & (
  | { variant: "highlight"; label: string }
  | { variant: "grid" | "numbered"; label?: never }
);

const listClasses = {
  highlight: "mt-4 flex flex-col gap-4",
  grid: "grid gap-x-12 gap-y-7 sm:grid-cols-2",
  numbered:
    "grid list-decimal gap-7 pl-6 marker:font-semibold marker:text-primary-800 md:grid-cols-3 md:gap-12",
};

export function TitledList({ items, variant, label }: TitledListProps) {
  const List = variant === "numbered" ? "ol" : "ul";
  const list = (
    <List
      role={variant === "numbered" ? undefined : "list"}
      className={listClasses[variant]}
    >
      {items.map(({ title, description }) =>
        variant === "highlight" ? (
          <li key={title}>
            <strong className="block">{title}</strong>
            {description}
          </li>
        ) : (
          <li
            key={title}
            className={
              variant === "grid" ? "border-t-2 border-primary-200 pt-5" : "pl-1"
            }
          >
            <Heading level="h3" variant="card" weight="semibold">
              {title}
            </Heading>
            <Text
              className={
                variant === "grid" ? "mt-3 max-w-prose" : "mt-2 max-w-prose"
              }
            >
              {description}
            </Text>
          </li>
        )
      )}
    </List>
  );

  return variant === "highlight" ? (
    <div className="border-l-2 border-primary-200 pl-5 sm:pl-7">
      <p className="font-semibold text-primary-900">{label}</p>
      {list}
    </div>
  ) : (
    list
  );
}
