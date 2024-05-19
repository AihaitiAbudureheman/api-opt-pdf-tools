import React, { useRef, useEffect } from "react";
import { Facebook, Twitter, Reddit } from "react-bootstrap-icons";
import { useTranslation } from "next-i18next";
import styles from "../styles/Share.module.css";

const Share = React.memo(function Share() {
  const { t } = useTranslation();

  const mountedRef = useRef();
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);


  return (
    <>
      <section className="page_section">
        <article className={`container banner ${styles.share_section}`}>
          {/* ShareThis BEGIN */}
          {/* <div className="sharethis-inline-share-buttons"></div> */}
          {/* ShareThis END */}
          <section>
            <div className={`${styles.share_buttons}`}>
              <div className={`${styles.share_btn}`} onClick={() => share(0)}>
                <Facebook />
              </div>

              <div className={`${styles.share_btn}`} onClick={() => twitter()}>
                <Twitter />
              </div>

              <div className={`${styles.share_btn}`} onClick={() => share(1)}>
                <Reddit />
              </div>
            </div>
          </section>
          <section>
            <div className={`${styles.share_text}`}>
              <p>
                <strong>
                  <b>{t("common:share_thanks")}</b>
                </strong>
              </p>
              <p>{t("common:share_with_friends")}</p>
            </div>
          </section>
        </article>
      </section>
    </>
  );
});

export default Share;
