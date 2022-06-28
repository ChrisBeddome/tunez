import "/styles/reset.scss";
import "/styles/global.scss";

import Layout from "/components/layouts/Primary";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps}></Component>
    </Layout>
  );
}
