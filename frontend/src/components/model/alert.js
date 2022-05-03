import { Alert } from "react-bootstrap";

const AlertModal = ({ action, message, msgHeading}) => {
  
      return (
        <Alert variant={msgHeading === "Success"? "success":"danger"} onClose={() => action()} dismissible>
          <Alert.Heading>{msgHeading}</Alert.Heading>
          <p>
            {message}
          </p>
        </Alert>
      );
  }

  export default AlertModal;
  