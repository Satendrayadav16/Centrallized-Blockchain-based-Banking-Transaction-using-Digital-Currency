import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { DarkModeContext } from "./Login Authentication/Authentication/darkModeContext";
import { AuthContext } from "./Login Authentication/Authentication/AuthContext";

import "./App.css";
import Header from "./components/Header";
import Transaction from "./pages/Transaction/Transaction";
import TransactionList from "./pages/Transaction/TransactionList";
import TransactionDetails from "./pages/Transaction/TransactionDetails";
import Data from "./viewDetails/Data";
import BlockDetail from "./viewDetails/BlockDetail";
import Reset from "./Login Authentication/Password Reset/Reset";
import UnverifiedAccountList from "./pages/Account/unverified Accounts/JS File/unverifiedAccountList";
import UnverifiedAccountListDetails from "./pages/Account/unverified Accounts/JS File/UnverifiedAccountListDetails";
import SearchTransaction from "./pages/Account/UserTransaction/SearchTransaction";
import FirstTransaction from "./Coins/Banking Transaction/FirstTransaction";
import CoinDetails from "./Coins/Coin Dashboard/Coindetails";
import VerifyAccount from "./pages/Account/unverified Accounts/JS File/VerifyAccount";
import DeleteAccount from "./pages/Account/unverified Accounts/JS File/deleteAccount";
import AccountList from "./pages/Account/Account Data/JS/AccountList";
import AccountDetails from "./pages/Account/unverified Accounts/JS File/AccountDetails";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <div className={darkMode ? "app dark" : "app"}>
        <Header />
        <ToastContainer position="top-center" />

        <Routes>
         
          <Route exact path="/" element={ <RequireAuth><Data /> </RequireAuth>} />
          <Route
            path="/trans"
            element={
              <RequireAuth>
                <Transaction />
              </RequireAuth>
            }
          />
          <Route
            path="/blocks/:blockHeight"
            element={
              <RequireAuth>
                <BlockDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/transactionList"
            element={
              <RequireAuth>
                <TransactionList />
              </RequireAuth>
            }
          />
          <Route
            path="/transactionDetails/:hash"
            element={
              <RequireAuth>
                <TransactionDetails />
              </RequireAuth>
            }
          />
         
          <Route
            path="/reset"
            element={
              <RequireAuth>
                <Reset />
              </RequireAuth>
            }
          />
          <Route
            path="/unverifiedAccounts"
            element={
              <RequireAuth>
                <UnverifiedAccountList />
              </RequireAuth>
            }
          />
          <Route
            path="/unverifiedAccountslistDetails/:accountAddress"
            element={
              <RequireAuth>
                <UnverifiedAccountListDetails />
              </RequireAuth>
            }
          />
            <Route
            path="/verifyAccount/:accountAddress"
            element={
              <RequireAuth>
                <VerifyAccount />
              </RequireAuth>
            }
          />
              <Route
            path="/deleteAccount/:accountAddress"
            element={
              <RequireAuth>
                <DeleteAccount />
              </RequireAuth>
            }
          />
           <Route
            path="/accountList"
            element={
              <RequireAuth>
                <AccountList />
              </RequireAuth>
            }
          />
           {/* <Route
            path="/accountDetails/:accountAddress"
            element={
              <RequireAuth>
                <AccountDetails />
              </RequireAuth>
            }
          /> */}
          <Route
            path="/searchTransaction"
            element={
              <RequireAuth>
                <SearchTransaction />
              </RequireAuth>
            }
          />
          <Route
            path="/firstTransaction"
            element={
              <RequireAuth>
                <FirstTransaction />
              </RequireAuth>
            }
          />
          <Route
            path="/coindetails"
            element={
              <RequireAuth>
                <CoinDetails />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
