import GlobalWrapper from "./wrappers/GlobalWrapper";
import NavigationManager from "./navigations/NavigationManager";
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <GlobalWrapper>
                    <NavigationManager />
            </GlobalWrapper>
            <ToastContainer />
        </>
    )
}

export default App
