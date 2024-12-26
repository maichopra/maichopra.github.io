import { getCollection, type CollectionEntry } from "astro:content";
import { tagTypes } from "../library/types";

// Define a union type from the tagTypes array
export type TagType = (typeof tagTypes)[number];

/**
 * Fetch documents with at least one matching tag from the provided array of tags.
 */
export async function getDocsByTags(
  tags: TagType[] // Use the derived union type for input
): Promise<CollectionEntry<"docs">[]> {
  // Fetch all documents from the 'docs' collection
  const docs = await getCollection("docs");

  // Filter documents by checking if their `tags` array includes any of the provided tags
  return docs.filter((doc) => {
    const docTags: TagType[] = doc.data.tags || []; // Ensure `tags` from the document is typed correctly
    return tags.some((tag) => docTags.includes(tag)); // Check if any tag matches
  });
}

interface SplitDocs {
  articles: CollectionEntry<"docs">[];
  guides: CollectionEntry<"docs">[];
  reference: CollectionEntry<"docs">[];
}

/**
 * Fetch and split documents by folder (articles, guides, reference)
 * based on an array of tags.
 */
export async function getSplitDocsByTags(tags: TagType[]): Promise<SplitDocs> {
  // Fetch all documents from the 'docs' collection
  const docs = await getCollection("docs");
  // Filter documents by tags
  const filteredDocs = docs.filter((doc) => {
    const docTags: TagType[] = doc.data.tags || []; // Ensure `tags` from the document is typed correctly
    return tags.some((tag) => docTags.includes(tag)); // Check if any tag matches
  });

  // Split documents based on their folder structure
  return {
    articles: filteredDocs.filter((doc) => doc.id.startsWith("articles/")),
    guides: filteredDocs.filter((doc) => doc.id.startsWith("guides/")),
    reference: filteredDocs.filter((doc) => doc.id.startsWith("reference/")),
  };
}

export function generateHeadings(splitDocs: SplitDocs) {
  const headings = [];

  if (splitDocs.articles.length > 0) {
    headings.push({ slug: "articles", text: "Articles", depth: 3 });
  }

  if (splitDocs.guides.length > 0) {
    headings.push({ slug: "guides", text: "Guides", depth: 3 });
  }

  if (splitDocs.reference.length > 0) {
    headings.push({ slug: "reference", text: "Reference", depth: 3 });
  }

  return headings;
}
