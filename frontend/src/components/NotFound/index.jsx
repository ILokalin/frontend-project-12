import { useTranslation } from 'react-i18next';
import notfoundImg from 'assets/notfound.jpg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center p-4">
      <img
        className="rounded-circle mb-4"
        src={notfoundImg}
        alt="not found page"
      />
      <h1 className="h4 text-muted">{t('notFoundPage.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.butYouCanMove')}
        {' '}
        <a href="/">{t('notFoundPage.toHomePage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
