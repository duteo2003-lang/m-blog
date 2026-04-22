import { Badge } from "@/components/ui/badge";
import { TagIcon } from "lucide-react";
import Link from "next/link";

interface TagListProps {
    tags: string[];
}
const TagList = ({ tags }: TagListProps) => {
    if (tags.length === 0) return null;
    return (
        <ul className="flex flex-wrap gap-2">
            <TagIcon className="w-4 h-4" />
            {tags.map((tag) => (
                <Badge asChild key={tag} className="uppercase cursor-pointer">
                    <Link href={`/blog?tag=${tag}`}>{tag}</Link>
                </Badge>
            ))}
        </ul>
    );
};

export default TagList;