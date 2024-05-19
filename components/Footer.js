import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ArrowUpRightSquareFill } from "react-bootstrap-icons";
import styles from "../styles/Footer.module.css";

const Footer = React.memo(function Footer() {
  const { t } = useTranslation();

  const mountedRef = useRef();
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleButtonClick = () => {
    window.open('https://onlineprimetools.com', '_blank');
  };

  return (
    <footer className={`${styles.page_footer}`}>
      <div className={`container text-center mb-0`}>
        <div className="row mb-4">
          <div className="col-lg-12">
          <Link href="/" className={`${styles.footer_logo}`}>
              <h3>
                <span className={`${styles.footer_logo_info_left}`}>PDF</span>
                <span className={`${styles.footer_logo_info_right}`}></span>
              </h3>
              <span className={`${styles.footer_logo_info_by}`}>POWETED BY </span>
              <button className={`${styles.footer_logo_info_goto}`} onClick={handleButtonClick}>OnlinePrimeTools.com <ArrowUpRightSquareFill/></button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul className={`${styles.footer_menu}`}>
              <li>
                <Link href="/about" prefetch={false}>
                  {t("common:about")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" prefetch={false}>
                  {t("common:privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" prefetch={false}>
                  {t("common:terms")}
                </Link>
              </li>
              <li>
                <Link href="/contacts" prefetch={false}>
                  {t("common:contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 py-3 d-flex justify-content-center">
            <p className={`text-center ${styles.copyright}`}>
              Copyright &copy;{" "}
              <Link href="/" target="_blank">
                ONLINE PRIME TOOLS 2024
              </Link>
              . {t("common:all_rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
