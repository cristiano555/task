import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

type ErrorViewPropsTypes = {
  errorMessage: string;
}

const ErrorView = ({ errorMessage }: ErrorViewPropsTypes) => (
  <Alert
    severity="error"
    style={{
      marginBottom: '15px',
      textAlign: 'left',
    }}
  >
    <AlertTitle>
      Error
    </AlertTitle>
    {errorMessage}
  </Alert>
);

export default ErrorView;
