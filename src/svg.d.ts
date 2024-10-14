// Create a file named 'svg.d.ts' in your project
declare module '*.svg' {
    const content: any;
    export default content;
  }