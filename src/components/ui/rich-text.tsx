"use client";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/typography";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { CheckIcon } from "@/components/ui/icons";

export type RichTextNode = {
  type?: string;
  text?: string;
  children?: RichTextNode[];
};

export type RichTextValue = {
  root?: {
    children?: RichTextNode[];
  };
};

type RichTextProps = {
  content?: RichTextValue | null;
  className?: string;
  paragraphClassName?: string;
  quoteClassName?: string;
  listClassName?: string;
  listItemClassName?: string;
};

const getNodeText = (node: RichTextNode): string => {
  if (node.type === "text") {
    return node.text ?? "";
  }

  return (node.children ?? []).map(getNodeText).join("").trim();
};

export function RichText({
  content,
  className,
  paragraphClassName,
  quoteClassName,
  listClassName,
  listItemClassName,
}: RichTextProps) {
  const nodes = content?.root?.children ?? [];

  return (
    <div className={cn("space-y-6", className)}>
      {nodes.map((node, index) => {
        const key = `${node.type ?? "node"}-${index}`;

        if (node.type === "paragraph") {
          return (
            <Text key={key} color="muted" className={paragraphClassName}>
              {getNodeText(node)}
            </Text>
          );
        }

        if (node.type === "quote") {
          return (
            <blockquote
              key={key}
              className={cn(
                "bg-primary-50/70 rounded-lg border border-primary-100 px-4 py-3 text-sm italic text-primary-800",
                quoteClassName
              )}
            >
              {getNodeText(node)}
            </blockquote>
          );
        }

        if (node.type === "list") {
          return (
            <ul key={key} className={cn("space-y-3", listClassName)}>
              {(node.children ?? []).map((item, itemIndex) => (
                <li
                  key={`${key}-item-${itemIndex}`}
                  className={cn("flex items-center gap-3", listItemClassName)}
                >
                  <IconWrapper
                    size="sm"
                    variant="solid"
                    className="flex-shrink-0"
                  >
                    <CheckIcon className="h-3 w-3 text-white" />
                  </IconWrapper>
                  <Text as="span" variant="small" color="muted">
                    {getNodeText(item)}
                  </Text>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <div key={key}>
            <Text as="span" color="muted">
              {getNodeText(node)}
            </Text>
          </div>
        );
      })}
    </div>
  );
}
