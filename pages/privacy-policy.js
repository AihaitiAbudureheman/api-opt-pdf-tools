import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import pageStyles from "../styles/Page.module.css";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "privacy"])),
    },
  };
}

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        {/* Anything you add here will be added to this page only */}
        <title>Privacy Policy</title>
        <meta name="description" content="" />
        <meta name="Keywords" content="" />
        <meta name="robots" content="noindex,nofollow" />
        {/* Anything you add here will be added this page only */}
        {/* You can add your canonical here */}
        <link rel="canonical" href="https://pdf.onlineprimetools.com/privacy-policy" />
        {/* You can add your alternate here */}
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/en/privacy-policy`}
          hrefLang="en"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/es/privacy-policy`}
          hrefLang="es"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ar/privacy-policy`}
          hrefLang="ar"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/zh/privacy-policy`}
          hrefLang="zh"
        />{" "}
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/de/privacy-policy`}
          hrefLang="de"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/fr/privacy-policy`}
          hrefLang="fr"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/it/privacy-policy`}
          hrefLang="it"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/pt/privacy-policy`}
          hrefLang="pt"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ru/privacy-policy`}
          hrefLang="ru"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/uk/privacy-policy`}
          hrefLang="uk"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/id/privacy-policy`}
          hrefLang="id"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/da/privacy-policy`}
          hrefLang="da"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/nl/privacy-policy`}
          hrefLang="nl"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/hi/privacy-policy`}
          hrefLang="hi"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ko/privacy-policy`}
          hrefLang="ko"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ja/privacy-policy`}
          hrefLang="ja"
        />
      </Head>

      <main>
        <header className="page_section header mb-0">
          <h1 className="title">{t("common:privacy")}</h1>
        </header>
        <section className="page_section mt-0">
          <article className="container">
            <section>
              <div className={pageStyles.paragraph_text}>
                <p>{t("privacy:paragraph_01")}</p>
                <p>{t("privacy:paragraph_02")}</p>
                <p>{t("privacy:paragraph_03")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_01")}</h2>
                <p>{t("privacy:paragraph_04")}</p>
                <ul>
                  <li>{t("privacy:section_list_item_01")}</li>
                  <li>{t("privacy:section_list_item_02")}</li>
                </ul>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_02")}</h2>
                <p>{t("privacy:paragraph_05")}</p>
                <p>{t("privacy:paragraph_06")}</p>
                <ul>
                  <li>{t("privacy:section_list_item_03")}</li>
                  <li>{t("privacy:section_list_item_04")}</li>
                </ul>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_03")}</h2>
                <p>{t("privacy:paragraph_07")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_04")}</h2>
                <p>{t("privacy:paragraph_08")}</p>
                <p>{t("privacy:paragraph_09")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_05")}</h2>
                <p>{t("privacy:paragraph_10")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_06")}</h2>
                <p>{t("privacy:paragraph_11")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_07")}</h2>
                <p>{t("privacy:paragraph_12")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_08")}</h2>
                <ul>
                  <li>{t("privacy:section_list_item_05")}</li>
                  <li>{t("privacy:section_list_item_06")}</li>
                </ul>
                <p>
                  {t("privacy:paragraph_13")}
                  <a className="link-underline-primary" href="https://policies.google.com/privacy?hl=en" target="_blank">{t("privacy:paragraph_14")}</a>
                  </p>
                

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_09")}</h2>
                <p>{t("privacy:paragraph_15")}</p>
                <ul>
                  <li>{t("privacy:section_list_item_07")}</li>
                </ul>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_10")}</h2>
                <p>{t("privacy:paragraph_16")}</p>
                <ul>
                  <li>{t("privacy:section_list_item_08")}</li>
                </ul>

                <h2 className="mt-5 mb-2 fw-bold">{t("privacy:title_11")}</h2>
                <p>{t("privacy:paragraph_17")}</p>
                <p>{t("privacy:paragraph_18")}</p>
                <a href="https://onlineprimetools.com/" target="_blank">{t("privacy:paragraph_19")}</a>
              </div>
            </section>
          </article>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
