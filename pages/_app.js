import "/styles/reset.scss";
import "/styles/global.scss";

import PrimaryLayout from "/components/layouts/Primary";

export default function App({ Component, pageProps }) {
const Layout = (Component.getLayout && Component.getLayout()) || PrimaryLayout
  return (
    <Layout>
      <Component {...pageProps}></Component>
    </Layout>
  );
}
