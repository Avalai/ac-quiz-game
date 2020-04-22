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
    </Head>
  )
}

  export default PageHead