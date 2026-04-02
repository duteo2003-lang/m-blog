import { colors, container, spacing, typography } from '@/app/design-system/token';
import { cn } from '@/app/design-system/utils';
import Link from 'next/link';
import { ToolView } from '../types/tool.view';
import Image from 'next/image';

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
        "p-6 cursor-pointer rounded-lg shadow-sm border border-border-default group",
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
      <div className={cn(spacing.link, "flex gap-2 mt-4 items-baseline ")}>
        <div className="flex items-center gap-2">
          <Image src="/google-drive.png" alt="download" width={20} height={20} />
          <span className={cn(typography.body.base, colors.text.muted)}>Download links:</span>
        </div>
        <div className="flex gap-2 items-center ">
          {tool.url.map((url, index) => (
            <Link
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                colors.background.accent,
                "px-4 py-1 rounded-xl text-white",
                "hover:opacity-80 transition-opacity",
                "group-hover:scale-110 transition-all"
              )}
            >
              Link {index + 1}
            </Link>
          ))}
        </div>
      </div>
    </article >
  );
}