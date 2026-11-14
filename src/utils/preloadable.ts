import { createElement, lazy, useState, type ComponentType } from "react";

export type Preloadable<P extends object> = ComponentType<P> & {
  preload: () => Promise<void>;
};

export function preloadable<P extends object>(
  factory: () => Promise<{ default: ComponentType<P> }>
): Preloadable<P> {
  let loaded: ComponentType<P> | undefined;
  let pending: Promise<void> | undefined;

  const preload = (): Promise<void> => {
    pending ??= factory().then((module) => {
      loaded = module.default;
    });
    return pending;
  };

  const LazyComponent = lazy(async () => {
    await preload();
    return { default: loaded! };
  });

  const PreloadableComponent = (props: P) => {
    const [renderDirectly] = useState(() => loaded !== undefined);
    return renderDirectly ? createElement(loaded!, props) : createElement(LazyComponent, props);
  };

  return Object.assign(PreloadableComponent, { preload });
}
