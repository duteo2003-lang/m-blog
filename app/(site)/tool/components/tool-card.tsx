import { colors, container, spacing, typography } from '@/app/design-system/token';
import { cn } from '@/app/design-system/utils';
import Link from 'next/link';
import { ToolView } from '../types/tool.view';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  tool: ToolView;
}
export const revalidate = 300;
export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article
      className={cn(
        colors.background.surface,
        container.maxWidth.sm,
        "p-4 cursor-pointer rounded-lg shadow-sm border border-border-default group",
        "hover:shadow-xl transition-all hover:scale-105"
      )}
    >
      <h4>{tool.name}</h4>
      <p className={cn(
        typography.body.base,
        colors.text.muted
      )}>
        {tool.description}
      </p>
      <div className={cn(spacing.link, "flex gap-2 items-baseline mt-2")}>
        <div className="flex items-baseline gap-2">
          <Image src="/google-drive.png" alt="download" width={18} height={18} />
          <p className={cn(typography.body.base, colors.text.muted)}>Download links:</p>
        </div>
        <div className="flex gap-2  ">
          {tool.url.map((url, index) => (
            <Link
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-2 text-primary font-bold",
                "hover:opacity-80 transition-opacity",
                "group-hover:scale-110 transition-all"
              )}
            >
              Link {index + 1}
            </Link>
          ))}
        </div>
      </div>
      {/* tags */}
      <div className="flex gap-2 mt-2 flex-wrap">
        {tool.tags && tool.tags.length > 0 && tool.tags.map((tag) => (
          <Badge key={tag} className={cn(colors.background.accent, "px-2 rounded-xl text-white font-bold text-sm")}>
            {tag}
          </Badge>
        ))} </div>
    </article >
  );
}