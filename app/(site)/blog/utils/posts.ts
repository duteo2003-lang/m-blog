import Slugger from 'github-slugger';
// Helper function to extract headings for the TOC
export const extractHeadings = (content: string) => {
  const slugger = new Slugger(); // Initialize a new slugger instance
  const headingLines = content.split("\n").filter((line) => line.match(/^#{2,3}\s/));
  
  return headingLines.map((line) => {
    const level = line.split(" ")[0].length;
    const text = line.replace(/^#+\s/, "").trim();
    
    // Use the slugger to generate the ID
    const id = slugger.slug(text); 
    
    return { level, text, id };
  });
};