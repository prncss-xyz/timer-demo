// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_Root_getConfig } from './pages/_root';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_PostsSlug_getConfig } from './pages/posts/[slug]';
// prettier-ignore
import type { getConfig as File_PostsIndex_getConfig } from './pages/posts/index';
// prettier-ignore
import type { getConfig as File_Qr_getConfig } from './pages/qr';

// prettier-ignore
type Page =
| ({ path: '/_root' } & GetConfigResponse<typeof File_Root_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/posts/[slug]' } & GetConfigResponse<typeof File_PostsSlug_getConfig>)
| ({ path: '/posts' } & GetConfigResponse<typeof File_PostsIndex_getConfig>)
| ({ path: '/qr' } & GetConfigResponse<typeof File_Qr_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
