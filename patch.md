# Dependency Patches

This project uses `pnpm patch` to fix a preload bug in the React Server Components (RSC) build pipeline.

## Why the Patches Exist

### The Issue

During production builds, the browser console (especially in Firefox) outputted warnings like:

> Preload of `https://.../assets/_layout-xxxx.css` was ignored due to unknown “as” or “type” values, or non-matching “media” attribute.

This also caused layout rendering jank (forced layout before stylesheets fully loaded, resulting in a Flash of Unstyled Content).

### The Root Cause

In React 19's Server Component serialization runtime (`react-server-dom-webpack`), the logic responsible for preloading stylesheets calls the `ReactDOM.preload` API with `"stylesheet"` as the resource type parameter:

```javascript
preload(srcSet, "stylesheet", { ... });
```

However, the HTML `as` attribute spec requires `"style"` for CSS preloads, not `"stylesheet"`. Because `"stylesheet"` is an invalid value, browsers discard the preload link entirely.

### Affected Packages

We patched two packages because `@vitejs/plugin-rsc` vendors its own copies of the `react-server-dom-webpack` files:

1. `react-server-dom-webpack`
2. `@vitejs/plugin-rsc`

The patches replace all occurrences of `preload(srcSet, "stylesheet"` with `preload(srcSet, "style"` in the compiled outputs.

---

## What to do on Package Upgrade

Since `pnpm` patches are pinned to exact dependency versions, upgrading `react-server-dom-webpack` or `@vitejs/plugin-rsc` will bypass the patch.

When upgrading:

1. **Verify if the bug was fixed upstream:**
   Build the project and run it in Firefox. Open the developer console:

   ```bash
   pnpm build
   ```

   If there are no preload console warnings, the issue has been resolved upstream. You can remove the patch from `package.json` under `pnpm.patchedDependencies` and delete the `.patch` file in the `patches/` directory.

2. **If the bug is still present:**
   You must re-apply the patch for the new version:

   ```bash
   # 1. Start the patching process for the new version
   pnpm patch react-server-dom-webpack

   # 2. Go to the temporary folder printed by the command and edit the files:
   # Locate all:
   #    preload(srcSet, "stylesheet", {
   # Replace with:
   #    preload(srcSet, "style", {

   # 3. Commit the patch
   pnpm patch-commit '/path/to/temp/folder'
   ```

   Repeat the same steps for `@vitejs/plugin-rsc` if necessary.
