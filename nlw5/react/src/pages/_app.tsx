import { Header } from "../components/Header";
import { Player } from "../components/Player";

import "../styles/globals.scss";
import styles from "../styles/app.module.scss";
import { PlayerProvider } from "../contexts/PlayerContext";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default MyApp;
