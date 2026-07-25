globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { H as HTTPError, d as defineHandler, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/assets/about-XoQrNT4C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae5-Ra/ggNvieJemONGxlR8O0htV+Qc"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 2789,
    "path": "../public/assets/about-XoQrNT4C.js"
  },
  "/assets/auth-S6UVTT6T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"de8-PQ+o5ZVEni4J2PPAnr0rAjlcUcE"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 3560,
    "path": "../public/assets/auth-S6UVTT6T.js"
  },
  "/assets/admin-Bmt4816f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"33a8-bD4HPpZoysfqCVV6H/z1sCwTQZQ"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 13224,
    "path": "../public/assets/admin-Bmt4816f.js"
  },
  "/assets/contact-BscTaW9y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ed4-r2gtplhn2uX+0YjzbMYAJgLJLk8"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 3796,
    "path": "../public/assets/contact-BscTaW9y.js"
  },
  "/assets/cart-BhYbLQHS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e79-tHGLcJ+LmEAZtXxGFT/kQMGBO4M"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 3705,
    "path": "../public/assets/cart-BhYbLQHS.js"
  },
  "/assets/account-CspmQ6q7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aeb-N0ivrz0NV4uZJviPiXO2+bbYACo"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 6891,
    "path": "../public/assets/account-CspmQ6q7.js"
  },
  "/assets/footer-CMn_GHuh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1dbd-TPB0Z05BUECPePUku2EHsSRzW2o"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 7613,
    "path": "../public/assets/footer-CMn_GHuh.js"
  },
  "/assets/checkout-D__FueI0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1647-T3A6ktlyWSfdo83M01B0OuwWZFg"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 5703,
    "path": "../public/assets/checkout-D__FueI0.js"
  },
  "/assets/heart-k3rsUDaI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104-Ol+5j+QishkLzP99+lPc2r2mhjA"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 260,
    "path": "../public/assets/heart-k3rsUDaI.js"
  },
  "/assets/hero-CgTjP3du.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"34-r8x5zitHj9y6/mYJARkFs81h0Iw"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 52,
    "path": "../public/assets/hero-CgTjP3du.js"
  },
  "/assets/hoodie-1-DWKrpRvR.jpg": {
    "type": "image/jpeg",
    "etag": '"6880-2ONo3ZAjchCQ/U3qv9cEJ0YWZBA"',
    "mtime": "2026-07-19T16:39:28.665Z",
    "size": 26752,
    "path": "../public/assets/hoodie-1-DWKrpRvR.jpg"
  },
  "/assets/hero-mrMV1U44.jpg": {
    "type": "image/jpeg",
    "etag": '"13057-rsiQB+6XylWzGs2BUh1mqkO/8do"',
    "mtime": "2026-07-19T16:39:28.665Z",
    "size": 77911,
    "path": "../public/assets/hero-mrMV1U44.jpg"
  },
  "/assets/image-CrmhDCSq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"172-nubo30EryyyamyNeEoGP3oFRXuQ"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 370,
    "path": "../public/assets/image-CrmhDCSq.js"
  },
  "/assets/hoodie-2-CWWGzvF6.jpg": {
    "type": "image/jpeg",
    "etag": '"88ee-ukIZjxQ9IbNdqiSOfeavdfC0/U0"',
    "mtime": "2026-07-19T16:39:28.664Z",
    "size": 35054,
    "path": "../public/assets/hoodie-2-CWWGzvF6.jpg"
  },
  "/assets/hoodie-3-D3fhENKs.jpg": {
    "type": "image/jpeg",
    "etag": '"b291-6XbyDBBSDoiVpOSq6u85pYnwUfE"',
    "mtime": "2026-07-19T16:39:28.664Z",
    "size": 45713,
    "path": "../public/assets/hoodie-3-D3fhENKs.jpg"
  },
  "/assets/index-CDB3AQJG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2497-mLqrsEN0hV3k5Mf3ij9uvzNhoRg"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 9367,
    "path": "../public/assets/index-CDB3AQJG.js"
  },
  "/assets/logo-BsFfkolV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"34-QwXE9lBvRvjR/rWesVs5jr0gipA"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 52,
    "path": "../public/assets/logo-BsFfkolV.js"
  },
  "/assets/minus-C14RPq0t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"77-5x/l00dalVCQVi5kEAjTkiDb97Q"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 119,
    "path": "../public/assets/minus-C14RPq0t.js"
  },
  "/assets/pants-1-C-VUHkNf.jpg": {
    "type": "image/jpeg",
    "etag": '"666d-s2mTLg2r9krslSb+PQkp1yHJhVU"',
    "mtime": "2026-07-19T16:39:28.665Z",
    "size": 26221,
    "path": "../public/assets/pants-1-C-VUHkNf.jpg"
  },
  "/assets/package-RotIZgKP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-4/ZxOJd0NicMs/J7Z5+8G18mKYI"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 374,
    "path": "../public/assets/package-RotIZgKP.js"
  },
  "/assets/plus-C7mWNcwS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9b-uo0myXJUKtj7ck6bgx/PbfkCYW8"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 155,
    "path": "../public/assets/plus-C7mWNcwS.js"
  },
  "/assets/logo-BuGfNlFz.png": {
    "type": "image/png",
    "etag": '"16315-emu42/zv7UxSHo5yt1J5sEwqq8g"',
    "mtime": "2026-07-19T16:39:28.651Z",
    "size": 90901,
    "path": "../public/assets/logo-BuGfNlFz.png"
  },
  "/assets/pants-2-CMJ_uQL8.jpg": {
    "type": "image/jpeg",
    "etag": '"4ff5-h7k5Zco1xslPk+33167oVsl5KoE"',
    "mtime": "2026-07-19T16:39:28.665Z",
    "size": 20469,
    "path": "../public/assets/pants-2-CMJ_uQL8.jpg"
  },
  "/assets/product-card-BeN-cHgB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5cc-dD8y97n0t+4f9UuOqfF1o7FToLg"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 1484,
    "path": "../public/assets/product-card-BeN-cHgB.js"
  },
  "/assets/index-CBGUMh4G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a05ee-oS+mFJVePCQAkELNcVGsl52Y5FY"',
    "mtime": "2026-07-19T16:39:28.668Z",
    "size": 656878,
    "path": "../public/assets/index-CBGUMh4G.js"
  },
  "/assets/shop-1pbDEMSa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10bf-PDgQPIz0LxSAHxZcviwLtYksETI"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 4287,
    "path": "../public/assets/shop-1pbDEMSa.js"
  },
  "/assets/styles-DUco05t0.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"14dad-iXqCVf1kFpClBfqKHlN9TlDIEiM"',
    "mtime": "2026-07-19T16:39:28.665Z",
    "size": 85421,
    "path": "../public/assets/styles-DUco05t0.css"
  },
  "/assets/trash-2-BipP1RiO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14a-5ujVwGecJgbNxk++lqkKH9v60Gc"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 330,
    "path": "../public/assets/trash-2-BipP1RiO.js"
  },
  "/assets/truck-DOwGOHxJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"273-iQ3JYckXpw+bF9Erv2To0F1Fwtk"',
    "mtime": "2026-07-19T16:39:28.666Z",
    "size": 627,
    "path": "../public/assets/truck-DOwGOHxJ.js"
  },
  "/assets/products._id-DI3GAgVM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b42-ZvmDKd5giPclxr5FLWT5rX0XePw"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 6978,
    "path": "../public/assets/products._id-DI3GAgVM.js"
  },
  "/assets/use-auth-CZe5ta1r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18d-3O2xqFQMcaHSIEC45N6ZVDjBBS4"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 397,
    "path": "../public/assets/use-auth-CZe5ta1r.js"
  },
  "/assets/useQuery-DDlXwWdV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2276-vjlZhuZZFtwd3EqA1XoBQGDjPTc"',
    "mtime": "2026-07-19T16:39:28.667Z",
    "size": 8822,
    "path": "../public/assets/useQuery-DDlXwWdV.js"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _T0BxGA = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_lanHK9 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_lanHK9 };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_T0BxGA)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
