import { ROUTES } from "@/app/common/constant";
import { slugify } from "@/app/common/utils/common-util";
import { Badge } from "@/components/ui/badge";
import { TagIcon } from "lucide-react";
import Link from "next/link";

interface TagListProps {
    tags: string[];
}
const TagList = ({ tags }: TagListProps) => {
    if (tags.length === 0) return null;
    return (
        <ul className="flex flex-wrap gap-2 items-center">
            <TagIcon className="size-4 text-muted-foreground" />
            {tags.map((tag) => (
                <li key={tag}>
                    <Badge asChild className="uppercase cursor-pointer">
                        <Link href={`${ROUTES.BLOG}?tag=${slugify(tag)}`}>{tag}</Link>
                    </Badge>
                </li>
            ))}
        </ul>
    );
};

export default TagList;