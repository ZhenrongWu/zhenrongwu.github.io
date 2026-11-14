import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

type Resolved = { status: number; file?: string; location?: string };

const isFile = (file: string): boolean => fs.existsSync(file) && fs.statSync(file).isFile();
const isDir = (file: string): boolean => fs.existsSync(file) && fs.statSync(file).isDirectory();

export function resolveGithubPagesPath(rootDir: string, pathname: string): Resolved {
  const decoded = decodeURIComponent(pathname);
  const target = path.join(rootDir, decoded);
  if (target !== rootDir && !target.startsWith(`${rootDir}${path.sep}`))
    return { status: 404, file: path.join(rootDir, "404.html") };

  if (decoded.endsWith("/")) {
    const index = path.join(target, "index.html");
    if (isFile(index)) return { status: 200, file: index };
  } else if (isFile(target)) {
    return { status: 200, file: target };
  } else if (isDir(target)) {
    return { status: 301, location: `${decoded}/` };
  } else if (isFile(`${target}.html`)) {
    return { status: 200, file: `${target}.html` };
  }
  return { status: 404, file: path.join(rootDir, "404.html") };
}

export function createGithubPagesServer(rootDir: string): http.Server {
  return http.createServer((req, res) => {
    const { pathname } = new URL(req.url ?? "/", "http://localhost");
    const resolved = resolveGithubPagesPath(rootDir, pathname);
    if (resolved.location) {
      res.writeHead(resolved.status, { Location: resolved.location });
      res.end();
      return;
    }
    const file = resolved.file!;
    const type = CONTENT_TYPES[path.extname(file)] ?? "application/octet-stream";
    res.writeHead(resolved.status, { "Content-Type": type });
    fs.createReadStream(file).pipe(res);
  });
}

const isDirectRun = process.argv[1] && import.meta.filename === path.resolve(process.argv[1]);

if (isDirectRun) {
  const rootDir = path.resolve(import.meta.dirname, "..", "..", "build");
  if (!isFile(path.join(rootDir, "index.html"))) {
    console.error(`找不到 ${rootDir}/index.html，請先執行 npm run build`);
    process.exit(1);
  }
  const port = Number(process.env.E2E_PORT ?? 4173);
  createGithubPagesServer(rootDir).listen(port, () => {
    console.log(`GitHub Pages 模擬伺服器：http://localhost:${port}`);
  });
}
