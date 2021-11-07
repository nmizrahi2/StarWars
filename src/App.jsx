import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import theme from './theme';
import normalize from './theme/normalize';
import StarWarsLogo from './assets/starWarsLogo';
import Summary from './components/Summary';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AppHeader = styled.div`
  width: 100%;
  padding: 1rem 8rem;
  background-color: ${p => p.theme.color.primary};
  color: ${p => p.theme.color.white};
  font-size: 3rem;
  font-weight: bold;
  user-select: none;
`;

const AppLogo = styled(StarWarsLogo)`
  height: 6rem;
  width: auto;
  margin-left: -17px;
`;

const AppContent = styled.div`
  padding: 8rem;
  flex: 1;
  overflow: auto;
`;

const GlobalStyles = createGlobalStyle`
    ${normalize};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <AppHeader>
          <AppLogo />
        </AppHeader>
        <AppContent>
          <Summary />
        </AppContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
