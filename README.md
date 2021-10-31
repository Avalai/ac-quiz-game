## This Project

This is a flash card game where the user tries to guess the name of a given character from the Animal Crossing games.

It is using data from the [Nookipedia Wiki](https://nookipedia.com/wiki/Main_Page), a wiki for everything Animal Crossing.

It is built using [React](https://reactjs.org/), [Next.js](https://nextjs.org/), and [Material UI](https://mui.com/), and hosted through [Vercel](https://vercel.com/).

## Development

1. Clone repo
1. Create a `.env.local` file and add a key:
  ```
  NEXT_PUBLIC_NOOKIPEDIA_KEY={key}
  ```
  I am automatically populating this key when published through Vercel, but it will not work locally if you don't have a [Nookipedia API](https://api.nookipedia.com/) key.
1. `npm run dev` to start the local server