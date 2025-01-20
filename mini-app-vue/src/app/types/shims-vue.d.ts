/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare const __HTML_PARSER_API__: string;
