import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import pageStyles from "../styles/Page.module.css";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "terms"])),
    },
  };
}

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        {/* Anything you add here will be added to this page only */}
        <title>Terms Of Use</title>
        <meta name="description" content="" />
        <meta name="Keywords" content="" />
        <meta name="robots" content="noindex,nofollow" />
        {/* Anything you add here will be added this page only */}
        {/* You can add your canonical here */}
        <link rel="canonical" href="https://pdf.onlineprimetools.com/terms-of-use" />
        {/* You can add your alternate here */}
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/en/terms-of-use`}
          hrefLang="en"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/es/terms-of-use`}
          hrefLang="es"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ar/terms-of-use`}
          hrefLang="ar"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/zh/terms-of-use`}
          hrefLang="zh"
        />{" "}
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/de/terms-of-use`}
          hrefLang="de"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/fr/terms-of-use`}
          hrefLang="fr"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/it/terms-of-use`}
          hrefLang="it"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/pt/terms-of-use`}
          hrefLang="pt"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ru/terms-of-use`}
          hrefLang="ru"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/uk/terms-of-use`}
          hrefLang="uk"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/id/terms-of-use`}
          hrefLang="id"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/da/terms-of-use`}
          hrefLang="da"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/nl/terms-of-use`}
          hrefLang="nl"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/hi/terms-of-use`}
          hrefLang="hi"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ko/terms-of-use`}
          hrefLang="ko"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ja/terms-of-use`}
          hrefLang="ja"
        />
      </Head>

      <main>
        <header className="page_section header mb-0">
          <h1 className="title">{t("common:terms")}</h1>
        </header>
        <section className="page_section mt-0">
          <article className="container">
            <section>
              <div className={pageStyles.paragraph_text}>
                <p>{t("terms:paragraph_01")}</p>
                <p>{t("terms:paragraph_02")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_01")}</h2>
                <p>
                  {t("terms:paragraph_03")}
                  <a href="https://pdf.onlineprimetools.com/privacy-policy" target="_blank">{t("terms:paragraph_04")}</a>
                </p>
         
                <p>{t("terms:paragraph_05")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_02")}</h2>
                <p>{t("terms:paragraph_06")}</p>
                <p>
                  {t("terms:paragraph_07")}
                  <a href="https://pdf.onlineprimetools.com/privacy-policy" target="_blank">{t("terms:paragraph_08")}</a>
                </p>

                <p>{t("terms:paragraph_09")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_03")}</h2>
                <p>{t("terms:paragraph_10")}</p>
                <p>{t("terms:paragraph_11")}</p>
                <p>{t("terms:paragraph_12")}</p>
                <p>{t("terms:paragraph_13")}</p>
                <p>{t("terms:paragraph_14")}</p>
                <p>{t("terms:paragraph_15")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_04")}</h2>
                <p>{t("terms:paragraph_16")}</p>


                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_05")}</h2>
                <p>{t("terms:paragraph_17")}</p>
                <p>{t("terms:paragraph_18")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_06")}</h2>
                <ul>
                  <li>{t("terms:section_list_item_01")}</li>
                  <li>{t("terms:section_list_item_02")}</li>
                  <li>{t("terms:section_list_item_03")}</li>
                  <li>{t("terms:section_list_item_04")}</li>
                  <li>{t("terms:section_list_item_05")}</li>
                </ul>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_07")}</h2>
                <p>{t("terms:paragraph_19")}</p>
                <p>{t("terms:paragraph_20")}</p>
                <a>{t("terms:paragraph_21")}</a>
                <p>{t("terms:paragraph_22")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_08")}</h2>
                <p>{t("terms:paragraph_23")}</p>
                <p>{t("terms:paragraph_24")}</p>
                <p>{t("terms:paragraph_25")}</p>
                <p>{t("terms:paragraph_26")}</p>
                <p>{t("terms:paragraph_27")}</p>
                <p>{t("terms:paragraph_28")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_09")}</h2>
                <p>{t("terms:paragraph_29")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_10")}</h2>
                <p>{t("terms:paragraph_30")}</p>
                <p>{t("terms:paragraph_31")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_11")}</h2>
                <p>{t("terms:paragraph_32")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_12")}</h2>
                <p>{t("terms:paragraph_33")}</p>
                <p>{t("terms:paragraph_34")}</p>
                <p>{t("terms:paragraph_35")}</p>
                <p>{t("terms:paragraph_36")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_13")}</h2>
                <p>{t("terms:paragraph_37")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_14")}</h2>
                <p>{t("terms:paragraph_38")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_15")}</h2>
                <p>{t("terms:paragraph_39")}</p>
                <p>{t("terms:paragraph_40")}</p>
                <p>{t("terms:paragraph_41")}</p>

                <h2 className="mt-5 mb-2 fw-bold">{t("terms:title_16")}</h2>
                <p>{t("terms:paragraph_42")}</p>
                <p>{t("terms:paragraph_43")}</p>
                <a href="https://onlineprimetools.com/" target="_blank">{t("terms:paragraph_44")}</a>
              </div>
            </section>
          </article>
        </section>
      </main>
    </>
  );
};

export default TermsOfUse;
