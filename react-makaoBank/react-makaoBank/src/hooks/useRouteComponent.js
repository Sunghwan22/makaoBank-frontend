import AccountPage from '../pages/AccountPage';
import Homepage from '../pages/HomePage';
import TransactionsPage from '../pages/TransactionsPage';
import TransferPage from '../pages/TransferPage';

export default function useRouteComponent() {
  const { pathName } = window.location;

  const components = {
    '/': Homepage,
    '/account': AccountPage,
    '/transfer': TransferPage,
    '/transactions': TransactionsPage,
  };

  return components[pathName] || Homepage;
}
