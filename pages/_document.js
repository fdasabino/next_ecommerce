import { Head, Html, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
        href="https://fonts.googleapis.com/css?family=Titillium+Web:200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Red+Hat+Display:300,regular,500,600,700,800,900,300italic,italic,500italic,600italic,700italic,800italic,900italic&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand:300,regular,500,600,700&display=swap"
        rel="stylesheet"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
