import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { isMobile } from "react-device-detect";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Selecto from "react-selecto";
import {
  GearFill,
  HeartFill,
  AwardFill,
  ShieldFillCheck,
  Infinity as InfinityIcon,
  LightningChargeFill,
  FileEarmarkPdf,
  ArrowRight,
  Images,
  CardImage,
  Check2Circle,
  ExclamationTriangle,
} from "react-bootstrap-icons";
import useUploadStats from "../hooks/useUploadStats";
import useDocuments from "../hooks/useDocuments";
import usePages from "../hooks/usePages";
import useToolsData from "../hooks/useToolsData";

import DocumentPreviewSelectable from "../components/DocumentPreviewSelectable";
import ProcessingFilesFormStep from "../components/ProcessingFilesFormStep";
import UploadingFilesFormStep from "../components/UploadingFilesFormStep";
import DownloadFilesFormStep from "../components/DownloadFilesFormStep";
import UploadAreaFormStep from "../components/UploadAreaFormStep";
import EditFilesFormStep from "../components/EditFilesFormStep";
import AvailableTools from "../components/AvailableTools";
import Steps from "../components/Steps";
import Features from "../components/Features";
import Share from "../components/Share";
import styles from "../styles/UploadContainer.module.css";
import {
  saveNewFiles,
  uploadFiles,
  downloadFiles,
  handlePDFToImageFileSelection,
} from "../helpers/utils.js";
import Option from "../components/Option";
import SelectOptionFormStep from "../components/SelectOptionFormStep";
import Alerts from "../components/Alerts";
import pageStyles from "../styles/Page.module.css";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pdf-to-jpg"])),
    },
  };
}

const PDFToJPGPage = () => {
  const { PDFToJPGTool } = useToolsData();
  const mountedRef = useRef(false);
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);
  const [formStep, updateFormStep] = useState(0);
  //loadedfilesCount is used to count the files currently being loaded to show progress spinner while loading the files //
  const [loadedfilesCount, setLoadedFilesCount] = useState(0);
  const [requestSignal, setRequestSignal] = useState();
  const [scrollOptions, setScrollOptions] = useState({});
  const [extractionOption, setExtractionOption] = useState(1);
  const { t } = useTranslation();

  const {
    currentUploadingFile,
    currentUploadedFilesCounter,
    totalUploadingProgress,
    uploadSpeed,
    uploadTimeLeft,
    resultsInfoVisibility,
    resultsErrors,
    handleResetInitialUploadState,
    handleResetCurrentUploadingStatus,
    handleUpdateCurrentUploadingStatus,
    handleUpdateResultsDisplay,
  } = useUploadStats();

  const {
    documents,
    handleAddDocument,
    handleUpdateDocument,
    handleResetInitialDocumentsState,
  } = useDocuments();

  const {
    pages,
    handleAddPage,
    handleRemovePageSelection,
    handleClearPageSelection,
    handlePageSelection,
    handlePagesSelection,
    handleResetInitialPagesstate,
  } = usePages();

  const handlehandleResetInitialStates = () => {
    handleResetInitialDocumentsState();
    handleResetInitialUploadState();
    handleResetInitialPagesstate();
    updateFormStep(0);
    setExtractionOption(1);
  };

  const handleChange = (event) => {
    //Calling handlePDFToImageFileSelection function to extract pdf pages and their data and insert them in an array
    handlePDFToImageFileSelection(
      event,
      setLoadedFilesCount,
      handleAddDocument,
      handleAddPage,
      t,
      mountedRef,
      PDFToJPGTool
    );
  };

  const handleImageExtraction = async () => {
    //reset upload status
    handleResetCurrentUploadingStatus();

    //extract selected Pages indexes
    const selectedIndexesArray = [];
    pages.map((page, i) => {
      if (page.selected === true) {
        selectedIndexesArray.push(i + 1);
      }
    });

    /**
     * Files compressing will be done on three steps:
     *** First step : uploading files one by one to server & Start Files Processing
     *** Second step : sending periodic download requests to check if files are done compressing and return the result, sending individual download requests for each file.
     */

    //updating form step in UI
    updateFormStep(3);
    //First step : Uploading Files & Start Files Processing
    // storing selectedIndexesArray in Array-like object
    const data = {
      selectedIndexesArray: selectedIndexesArray,
    };
    const { uploadResponsesArray, uploadResponsesUnseccessfulRequests } =
      await uploadFiles({
        signal: requestSignal,
        documents: documents,
        handleUpdateCurrentUploadingStatus: handleUpdateCurrentUploadingStatus,
        uri: PDFToJPGTool.URI,
        data: data,
      });

    //updating form step in UI
    updateFormStep(4);

    // Second step : Check if files are done processing
    const { downloadResponsesArray, downloadResponsesUnseccessfulRequests } =
      await downloadFiles({
        responseMimeType: PDFToJPGTool.outputFileMimeType,
        signal: requestSignal,
        uploadResponsesArray: uploadResponsesArray,
        handleUpdateDocument: handleUpdateDocument,
      });

    // stroing all failed documents from each step in an array
    const failedFiles = [
      ...uploadResponsesUnseccessfulRequests,
      ...downloadResponsesUnseccessfulRequests,
    ];

    //check if all documents have been processed, no failed documents
    if (downloadResponsesArray.length === 1) {
      handleUpdateResultsDisplay(true, []);
    } else {
      //check if all documents have failed being processed
      handleUpdateResultsDisplay(false, failedFiles);
    }

    //updating form step in UI
    updateFormStep(5);
  };

  const handleDownload = () => {
    saveNewFiles(documents);
  };

  useEffect(() => {
    //set mountedRef to true
    mountedRef.current = true;

    //Axios AbortController to abort requests
    const controller = new AbortController();
    const signal = controller.signal;
    setRequestSignal(signal);
    setScrollOptions({
      container: document.body,
      getScrollPosition: () => [
        document.body.scrollLeft,
        document.body.scrollTop,
      ],
      throttleTime: 0,
      threshold: 0,
    });

    //cleanup function
    return () => {
      // cancel all the requests
      controller.abort();
      //set mounedRef to false
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // if loadedfilesCount (count of file currently being loaded) is greater than zero than show spinner
    if (loadedfilesCount > 0) {
      //show spinner
      if (mountedRef.current) {
        setIsSpinnerActive(true);
      }
    } else {
      //after all files are loaded, hide spinner
      if (mountedRef.current) {
        setIsSpinnerActive(false);
      }
    }
  }, [loadedfilesCount]);

  useEffect(() => {
    if (documents.length <= 0) {
      updateFormStep(0);
    } else {
      updateFormStep(1);
    }
  }, [documents.length]);

  const pagesComponentsArray = (
    <div
      className={`previewer_content ${styles.previewer_content} d-flex flex-wrap ${styles.previewer_content_scrollable}`}
    >
      {!isMobile && (
        <Selecto
          dragContainer={".previewer_content"}
          selectableTargets={[".preview"]}
          selectByClick={false}
          selectFromInside={false}
          toggleContinueSelect={["ctrl"]}
          boundContainer={false}
          hitRate={0}
          ratio={0}
          onSelectStart={(e) => {
            if (
              pages.filter((page) => page.selected === true).length > 0 &&
              !e.inputEvent.ctrlKey
            ) {
              handleClearPageSelection();
            }
          }}
          onSelect={(e) => {
            e.added.forEach((el) => {
              const index = parseInt(el.getAttribute("data-index"));
              handlePageSelection(index);
            });
            e.removed.forEach((el) => {
              const removedIndex = parseInt(el.getAttribute("data-index"));
              if (e.selected.length === 0) {
                handleClearPageSelection();
              } else {
                handleRemovePageSelection(removedIndex);
              }
            });
          }}
          scrollOptions={scrollOptions}
          onScroll={(e) => {
            document.body.scrollBy(e.direction[0] * 10, e.direction[1] * 10);
          }}
        />
      )}

      {pages.map((page, i) => {
        return (
          <DocumentPreviewSelectable
            key={"page-" + page.id}
            page={page}
            index={i}
            onSelectionChange={handlePagesSelection}
          />
        );
      })}
    </div>
  );

  return (
    <>
      <Head>
        {/* Anything you add here will be added to this page only */}
        <title>Convert PDF to JPG | Best PDF to JPG Converter Online</title>
        <meta
          name="description"
          content="Convert your PDF files to high-quality JPG images with our fast and easy-to-use online PDF to JPG converter tool. No need to install any software, simply upload your PDF file and download the converted JPG images."
        />
        <meta
          name="Keywords"
          content="PDF to JPG converter, convert PDF to JPG, online PDF to JPG converter, PDF to JPG conversion tool, free PDF to JPG converter, PDF to image converter."
        />
        {/* You can add your canonical link here */}
        <link
          rel="canonical"
          href={`https://pdf.onlineprimetools.com${PDFToJPGTool.href}`}
          key="canonical"
        />
        {/* You can add your alternate links here, example: */}
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/en${PDFToJPGTool.href}`}
          hrefLang="en"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/es${PDFToJPGTool.href}`}
          hrefLang="es"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ar${PDFToJPGTool.href}`}
          hrefLang="ar"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/zh${PDFToJPGTool.href}`}
          hrefLang="zh"
        />{" "}
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/de${PDFToJPGTool.href}`}
          hrefLang="de"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/fr${PDFToJPGTool.href}`}
          hrefLang="fr"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/it${PDFToJPGTool.href}`}
          hrefLang="it"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/pt${PDFToJPGTool.href}`}
          hrefLang="pt"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ru${PDFToJPGTool.href}`}
          hrefLang="ru"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/uk${PDFToJPGTool.href}`}
          hrefLang="uk"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/id${PDFToJPGTool.href}`}
          hrefLang="id"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/da${PDFToJPGTool.href}`}
          hrefLang="da"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/nl${PDFToJPGTool.href}`}
          hrefLang="nl"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/hi${PDFToJPGTool.href}`}
          hrefLang="hi"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ko${PDFToJPGTool.href}`}
          hrefLang="ko"
        />
        <link
          rel="alternate"
          href={`https://pdf.onlineprimetools.com/ja${PDFToJPGTool.href}`}
          hrefLang="ja"
        />
      </Head>

      <main>
        <header className="page_section header mb-0">
          <h1 className="title">{t("pdf-to-jpg:page_header_title")}</h1>
          <p className="description">{t("pdf-to-jpg:page_header_text")}</p>
        </header>
        <section className="page_section mt-0">
          <article className="container">
            <section className={pageStyles.tool_container_wrapper}>
              {/* Container start */}
              {formStep === 0 && (
                <UploadAreaFormStep
                  handleChange={handleChange}
                  isSpinnerActive={isSpinnerActive}
                  isMultipleInput={false}
                  acceptedMimeType={PDFToJPGTool.acceptedInputMimeType}
                />
              )}

              {formStep === 1 && (
                <SelectOptionFormStep
                  title={t("common:select_conversion_option")}
                  action={() => {
                    //CONVERT ENTIRE PAGES
                    if (extractionOption === 1) {
                      handleImageExtraction();
                    } else {
                      //Next Step select images to extact
                      updateFormStep(2);
                    }
                  }}
                  /* Start Images Extraction or Select Images to be extracted */
                  actionTitle={t("common:next")}
                >
                  <Option
                    onChange={() => setExtractionOption(1)}
                    isChecked={extractionOption === 1}
                    value="all"
                    icon={
                      <>
                        <FileEarmarkPdf size={50} color="#ffa34f" />
                        <ArrowRight size={30} />
                        <CardImage size={50} />
                      </>
                    }
                  >
                    <span className={`${styles.pdf_to_image_option_title}`}>
                      {t("common:convert_all_pages")}
                    </span>
                    <span className={`${styles.pdf_to_image_option_desc}`}>
                      {t("common:convert_all_pages_description")}
                    </span>
                  </Option>

                  <Option
                    onChange={() => setExtractionOption(2)}
                    isChecked={extractionOption === 2}
                    value="selected"
                    icon={
                      <>
                        <FileEarmarkPdf size={50} color="#ffa34f" />
                        <ArrowRight size={30} />
                        <Images size={50} alt="images" />
                      </>
                    }
                  >
                    <span className={`${styles.pdf_to_image_option_title}`}>
                      {t("common:convert_selected_pages")}
                    </span>
                    <span className={`${styles.pdf_to_image_option_desc}`}>
                      {t("common:convert_selected_pages_description")}
                    </span>
                  </Option>
                </SelectOptionFormStep>
              )}

              {formStep === 2 && (
                <EditFilesFormStep
                  showTitle={t("common:select_pages_to_convert")}
                  acceptedMimeType={PDFToJPGTool.acceptedInputMimeType}
                  files={pages}
                  enableAddingMoreFiles={false}
                  filesComponents={pagesComponentsArray}
                  handleChange={handleChange}
                  isSpinnerActive={isSpinnerActive}
                  isMultipleInput={false}
                  isFilesSelectionActive={true}
                  isPanelTopSticky={true}
                  isPanelBottomSticky={true}
                  positionPanelBottomItems={styles.spaced}
                  action={() => {
                    handleImageExtraction();
                  }}
                  actionTitle={t("common:start_images_extraction")}
                />
              )}

              {formStep === 3 && (
                <UploadingFilesFormStep
                  title={`${t(
                    "common:uploading_file"
                  )} ${currentUploadedFilesCounter} ${t("common:of")} ${
                    documents.length
                  }`}
                  uploadTimeLeft={uploadTimeLeft}
                  uploadSpeed={uploadSpeed}
                  totalUploadingProgress={totalUploadingProgress}
                  currentUploadingFileName={currentUploadingFile?.fileName}
                  currentUploadingFileSize={currentUploadingFile?.file.size}
                />
              )}

              {formStep === 4 && (
                <ProcessingFilesFormStep
                  progress={t("common:extracting_images")}
                />
              )}

              {formStep === 5 && (
                <DownloadFilesFormStep
                  title={t("common:images_extraction_is_complete")}
                  handleDownload={handleDownload}
                  handleResetInitialState={handlehandleResetInitialStates}
                >
                  {resultsInfoVisibility && (
                    <div className="row w-100 d-flex justify-content-center text-center mt-5 mb-5">
                      <Check2Circle size={130} color="#25ac61" />
                    </div>
                  )}
                  {resultsErrors.length > 0 && (
                    <Alerts
                      alerts={resultsErrors}
                      type="error"
                      icon={<ExclamationTriangle size={22} />}
                    />
                  )}
                </DownloadFilesFormStep>
              )}
              {/* Conatiner end */}
            </section>
          </article>
        </section>
        {/* steps Start */}
        <Steps
          title={t("pdf-to-jpg:how_to_title")}
          stepsArray={[
            {
              number: 1,
              description: t("pdf-to-jpg:how_to_step_one"),
            },
            {
              number: 2,
              description: t("pdf-to-jpg:how_to_step_two"),
            },
            {
              number: 3,
              description: t("pdf-to-jpg:how_to_step_three"),
            },
            {
              number: 4,
              description: t("pdf-to-jpg:how_to_step_four"),
            },
            {
              number: 5,
              description: t("pdf-to-jpg:how_to_step_one"),
            },
            {
              number: 6,
              description: t("pdf-to-jpg:how_to_step_two"),
            },
          ]}
        />
        {/* steps end */}
        {/* features start */}
        <Features
          title={t("common:features_title")}
          featuresArray={[
            {
              title: t("pdf-to-jpg:feature_one_title"),
              description: t("pdf-to-jpg:feature_one_text"),
              icon: <LightningChargeFill />,
            },
            {
              title: t("pdf-to-jpg:feature_two_title"),
              description: t("pdf-to-jpg:feature_two_text"),
              icon: <InfinityIcon />,
            },
            {
              title: t("pdf-to-jpg:feature_three_title"),
              description: t("pdf-to-jpg:feature_three_text"),
              icon: <GearFill />,
            },
            {
              title: t("pdf-to-jpg:feature_four_title"),
              description: t("pdf-to-jpg:feature_four_text"),
              icon: <ShieldFillCheck />,
            },
            {
              title: t("pdf-to-jpg:feature_five_title"),
              description: t("pdf-to-jpg:feature_five_text"),
              icon: <HeartFill />,
            },

            {
              title: t("pdf-to-jpg:feature_six_title"),
              description: t("pdf-to-jpg:feature_six_text"),
              icon: <AwardFill />,
            },
          ]}
        />
        {/* features end */}

        <AvailableTools />
        <Share />
      </main>
    </>
  );
};
export default PDFToJPGPage;
