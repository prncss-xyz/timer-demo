// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var posts = defineCollection({
  directory: "src/posts",
  include: "**/*.md",
  name: "posts",
  schema: z.object({
    date: z.string(),
    title: z.string()
  })
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
