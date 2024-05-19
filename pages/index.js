import React from "react";
import Link from "next/link";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../styles/index.module.css";
import Share from "../components/Share";
import useToolsData from "../hooks/useToolsData";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const Home = () => {
  const toolsData = useToolsData();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        {/* Anything you add here will be added to this page only */}
        <title>PDF Online Tools | Free, Easy, and Quick Online PDF tools</title>
        <meta
          name="description"
          content="Convert, compress, and edit PDF files online with our free PDF tool. No downloads required. Easily convert PDF to Word, Excel, JPG, PNG, and more."
        />
        <meta
          name="Keywords"
          content="PDF tool, PDF converter, PDF editor, PDF compressor, online PDF tool, free PDF tool, PDF to Word, PDF to Excel, PDF to JPG, PDF to PNG, edit PDF online, compress PDF online."
        />
        {/* You can add your canonical here */}
        <link
          rel="canonical"
          href={`https://pdf.onlineprimetools.com/`}
          key="canonical"
        />
        {/* You can add your alternate links here, example: */}
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/en`}
          hrefLang="en"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/es`}
          hrefLang="es"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ar`}
          hrefLang="ar"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/zh`}
          hrefLang="zh"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/de`}
          hrefLang="de"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/fr`}
          hrefLang="fr"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/it`}
          hrefLang="it"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/pt`}
          hrefLang="pt"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ru`}
          hrefLang="ru"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/uk`}
          hrefLang="uk"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/id`}
          hrefLang="id"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/da`}
          hrefLang="da"
        />

        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/nl`}
          hrefLang="nl"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/hi`}
          hrefLang="hi"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ko`}
          hrefLang="ko"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ja`}
          hrefLang="ja"
        />
      </Head>

      <>
        <main>
          <header className="page_section header mb-0">
            <h1 className="title">{t("common:page_header_title")}</h1>
            <p className="description">{t("common:page_header_text")}</p>
          </header>
          <section className="page_section mt-0">
            <article className="container">
              <section
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <div className={styles.grid_container}>
                  {Object.keys(toolsData).map((key) => (
                    <Link
                      key={key}
                      className={styles.grid_item}
                      href={toolsData[key].href}
                      prefetch={false}
                    >
                      <div className={styles.grid_content}>
                        <div className={styles.grid_item_icon}>
                          {toolsData[key].icon}
                        </div>
                        <h2 className={styles.grid_item_title}>
                          {toolsData[key].title}
                        </h2>
                        <p className={styles.grid_item_description}>
                          {toolsData[key].description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </article>
          </section>

          <Share />
        </main>
      </>
    </>
  );
};
export default Home;
