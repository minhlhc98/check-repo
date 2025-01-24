/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    eth?: any;
    coin98?: any;
  }
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}