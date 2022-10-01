import { useNavigate, useLocation } from "react-router-dom";

const useNavigateTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (navigationConfig) => {
    const { path, dataset, key, callback } = navigationConfig;

    if (!path && (!key || !dataset)) return;

    const goTo = (target) => {
      if (target === location.pathname) window.scrollTo(0, 0);
      if (target !== location.pathname) navigate(target);
    };

    if (path && dataset && key) {
      const target = dataset[key] ? `${path}${dataset[key]}` : `${path}`;
      if (!target) return;
      goTo(target);
    }
    if (path && (!key || !dataset)) goTo(path);
    if (!path && key && dataset) {
      const target = `${dataset[key]}`;
      if (!target) return;
      goTo(target);
    }

    if (callback) callback();
  };
  return navigateTo;
};
export default useNavigateTo;
