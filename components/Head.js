import Head from 'next/head'

function PageHead() {
  return (
    <Head>
      <title>Guess the Villager - Animal Crossing</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1.0, width=device-width" />

      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

      <meta property="og:url" content="https://ac-quiz-game.now.sh/" />
      <meta property="og:title" content="Guess the Villager" />
      <meta property="og:description" content="Test your knowledge of Animal Crossing villagers!" />
      <meta property="og:image" content="guess-the-villager_banner.jpg" />
      <meta name="twitter:image" content="guess-the-villager_banner.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@avalai" />
      <meta name="twitter:image:alt" content="Some lesser-known villagers from the Animal crossing series" />

      <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
      <link rel="manifest" href="manifest.json" />
      <link rel="mask-icon" href="safari-pinned-tab.svg" color="#7cc9c3" />
      <meta name="apple-mobile-web-app-title" content="Guess the Villager" />
      <meta name="application-name" content="Guess the Villager" />
      <meta name="msapplication-TileColor" content="#7cc9c3" />
      <meta name="msapplication-config" content="browserconfig.xml" />
      <meta name="theme-color" content="#7cc9c3" />
    </Head>
  )
}

  export default PageHead