import { useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { selectUiError, selectIsUiError } from "redux/slices/uiSelectors";
import Loader from "./Loader";

const getWrapperClass = (isPage) => classNames(
  'h-100',
  { 'container-fluid': !isPage },
  { 'container my-4 overflow-hidden rounded shadow': isPage }
);

const Wrapper = ({ isLoading, children, isPage }) => {
  const { t } = useTranslation();
  const uiError = useSelector(selectUiError);
  const isUiError = useSelector(selectIsUiError);

  useEffect(() => {
    if (isUiError) {
      toast.error(t(`global.error.${uiError}`));
    }
  }, [uiError, isUiError]);

  return (
    <div className={getWrapperClass(isPage)}>
      {isLoading ? (
        <Loader />
      ) : (
        children
      )}
    </div>
  );
};

export default Wrapper;
