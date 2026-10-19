import { useNavigate } from "react-router";
import Text from "../../components/Text/Text";
import Styles from "./PageNotFound.module.css";
import { AlertTriangle } from "reicon-react";
import { Button } from "../../components/Input/Button";

const PageNotFound = () => {
  const navigate = useNavigate();
  function handleNavigateBack() {
    navigate("/");
  }
  return (
    <div className={Styles.page_container}>
      <div className={Styles.cont}>
        <div className={Styles.text_cont}>
          <Text variant="h1">404</Text>
          <Text variant="h2">Interesting Discovery</Text>
          <Text variant="p">The page you are looking for was not found</Text>
        </div>
        <div className={Styles.icon_cont}>
          <AlertTriangle size={75} color="white" />
        </div>
        <div className={Styles.btn_cont}>
          <Button onClick={handleNavigateBack} content="Go back home" />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
